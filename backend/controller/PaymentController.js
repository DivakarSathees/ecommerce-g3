const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.Payment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: "for e-commerce project",
    metadata: {
      company: "MERN",
    },
    // shipping: {
    //   name: "Random singh",
    //   address: {
    //     line1: "510 Townsend St",
    //     postal_code: "98140",
    //     city: "San Francisco",
    //     state: "CA",
    //     country: "US",
    //   },
    // },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
