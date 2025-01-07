const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.testkey);
const admin = require('firebase-admin');
const cors = require('cors'); 
admin.initializeApp();


const corsHandler = cors({ origin: true }); 

// Stripe payment intent request function with CORS
exports.stripePaymentIntentRequest = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            let customerId;


            const customerList = await stripe.customers.list({
                email: req.body.email,
                limit: 1
            });
                    

            if (customerList.data.length !== 0) {
                customerId = customerList.data[0].id;
            } else {
                const customer = await stripe.customers.create({
                    email: req.body.email
                });
                customerId = customer.id;
            }


            const ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2022-11-15' }
            );


            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(req.body.amount),
                currency: 'usd',
                customer: customerId,
            });


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
