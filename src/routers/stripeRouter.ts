import express from 'express'
import {
	acceptPaymentIntentController,
	cancelPaymentIntentController,
	createPaymentIntentController,
	getConfigController
} from '../controllers/stripeController';
// import { webhook } from '../controllers/stripeWebhook';


const stripeRouter = express.Router({ mergeParams: true });

stripeRouter.get(
	"/config",
	getConfigController
)

stripeRouter.post(
	"/create-payment-intent",
	createPaymentIntentController
)

stripeRouter.post(
	"/accept-payment-intent",
	acceptPaymentIntentController
)

stripeRouter.post(
	"/cancel-payment-intent",
	cancelPaymentIntentController
)

// stripeRouter.post(
// 	"/webhook",
// 	webhook
// )

export default stripeRouter