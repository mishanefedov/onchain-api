import { Request, Response } from 'express';
import {
	acceptPaymentIntent,
	cancelPaymentIntent,
	createPaymentIntent
} from '../services/stripeService';

export const getConfigController = async (req: Request, res: Response) => {
	try {
		return res.send({
			publishableKey: process.env.STRIPE_PUBLIC_KEY,
		});
	} catch (e) {
		return res.sendStatus(500)
	}
}

export const createPaymentIntentController = async (req: Request, res: Response) => {
	try {
		if(req.body.chargeAmount === undefined){
			return res.status(400).send({});
		} 
		const chargeAmount = req.body.chargeAmount * 100;
		if (chargeAmount < 50) {
			return res.send({
				clientSecret: "-1",
				paymentIntentId: "-1",
			});
		}
		const paymentIntent = await createPaymentIntent(chargeAmount);

		return res.send({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
		});
	} catch (e) {
		console.log(e)
		return res.sendStatus(500)
	}
}

export const acceptPaymentIntentController = async (req: Request, res: Response) => {
	try {
		if(req.body.paymentIntentId === undefined){
			return res.status(400).send({});
		} 
		const paymentIntentId = req.body.paymentIntentId;
		if (paymentIntentId === "-1") {
			return res.send({
				clientSecret: "-1",
				paymentIntentId: "-1",
			});
		}
		const paymentIntent = await acceptPaymentIntent(paymentIntentId);
		return res.send({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
		});
	} catch (e) {
		return res.sendStatus(500)
	}
}

export const cancelPaymentIntentController = async (req: Request, res: Response) => {
	try {
		if(req.body.paymentIntentId === undefined){
			return res.status(400).send({});
		} 
		const paymentIntentId = req.body.paymentIntentId;
		if (paymentIntentId === "-1") {
			return res.send({
				clientSecret: "-1",
				paymentIntentId: "-1",
			});
		}
		const paymentIntent = await cancelPaymentIntent(paymentIntentId);
		return res.send({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
    	});
	} catch (e) {
		return res.sendStatus(500)
	}
}
