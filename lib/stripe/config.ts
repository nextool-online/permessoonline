export const stripeConfig = {
  priceId: process.env.STRIPE_PRICE_ID!,
  successUrl: "http://localhost:3001/thank-you",
  cancelUrl: "http://localhost:3001/checkout",
};