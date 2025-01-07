const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_51Qe5S5CO8wO6DXWdCdcRDDzJmlFvzU6M296ScXmvhcC6ujZOOBJokJGVBGZWc9B85kC3PYBD2TvWoHXJDNvn1JRF00DMZjUwE6");
const admin = require('firebase-admin');
const cors = require('cors'); // Import the CORS module
admin.initializeApp();

// Initialize the CORS middleware
const corsHandler = cors({ origin: true }); // This allows all origins. You can restrict it to specific domains like 'http://localhost:5173'

// Stripe payment intent request function with CORS
exports.stripePaymentIntentRequest = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            let customerId;

            // Get the customer who's email matches the one sent by the client
            const customerList = await stripe.customers.list({
                email: req.body.email,
                limit: 1
            });
                    
            // Check if the customer exists, if not create a new customer
            if (customerList.data.length !== 0) {
                customerId = customerList.data[0].id;
            } else {
                const customer = await stripe.customers.create({
                    email: req.body.email
                });
                customerId = customer.id;
            }

            // Create a temporary secret key linked with the customer
            const ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2022-11-15' }
            );

            // Create a new payment intent with the amount passed in from the client
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(req.body.amount),
                currency: 'usd',
                customer: customerId,
            });

            // Send the response with the necessary data
            res.status(200).send({
                paymentIntent: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
                ephemeralKey: ephemeralKey.secret,
                customer: customerId,
                success: true,
            });
        } catch (error) {
            res.status(404).send({ success: false, error: error.message });
        }
    });
});

// Stripe refund request function with CORS
exports.stripeRefundRequest = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const refund = await stripe.refunds.create({
                payment_intent: req.body.payment_intent,
            });
            res.status(200).send({
                success: true,
                refundAmount: refund.amount,
            });
        } catch (error) {
            res.status(404).send({ success: false, error: error.message });
        }
    });
});
