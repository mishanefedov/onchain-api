// import { Request, Response } from 'express';
// import {
// 	deleteFailedBids, setBidPaymentAccepted
// } from '../services/firebaseService'
// import { cancelPaymentIntent } from '../services/stripeService';

// export const webhook = async (req: Request, res: Response) =>{
// 	try {
// 		let event = req.body
// 		switch (event.type) {
// 			case 'charge.failed':
// 				console.log(`[Got event type] ${event.type}.`);
// 				var paymentIntentId = event['data']['object']['payment_intent']
// 				cancelPaymentIntent(paymentIntentId)
// 				deleteFailedBids(paymentIntentId);
// 				break;
// 			case 'charge.succeeded':
// 				console.log(`[Got event type] ${event.type}.`);
// 				var paymentIntentId = event['data']['object']['payment_intent']
// 				setBidPaymentAccepted(paymentIntentId, true)
// 				break;
// 		default:
// 			// Unexpected event type
// 			console.log(`[Unhandled event type] ${event.type}.`);
//     }

// 		res.send()
// 	} catch (e) {
// 		console.error(e)
// 	}
// }