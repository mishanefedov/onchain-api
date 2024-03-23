
require("dotenv").config()
const stripe = require('stripe');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const Stripe = stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27'
});


export const createPaymentIntent = async (chargeAmount: any) => {
  const result =  await Stripe.paymentIntents.create({
    currency: "USD",
    amount: chargeAmount,
    automatic_payment_methods: { enabled: true },
    capture_method: "manual",
  });
  return result;
}

export const acceptPaymentIntent = async (paymentIntentId: any) => {
  try {
    const result = await Stripe.paymentIntents.capture(
      paymentIntentId
    )
    return result
  } catch (error) {
    console.error('Error accepting PaymentIntent:', error);
  }
}

export const cancelPaymentIntent= async (paymentIntentId: any) => {
  try {
    const canceledPaymentIntent = await Stripe.paymentIntents.cancel(
      paymentIntentId
    )
    return canceledPaymentIntent;
  } catch (error) {
    console.error('Error canceling PaymentIntent:', error);
  }
}

export const getPaymentIntent = async (paymentIntentId: any) => {
  const paymentIntent = await Stripe.paymentIntents.retrieve(
    paymentIntentId
  )
  return paymentIntent
}