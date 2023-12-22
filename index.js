// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions");

let express = require("express");
let cors = require("cors");

let stripe = require("stripe")(
    "sk_test_51OJFxZLTo8uXWRuh1XEsiIzW0ek0PCjMEax5b6xQMEJA53lOhmHizJeYA42QXIw9SlM8ZjzRqOV5gXScW0TJiaFF00f9MmCSCZ"
);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd",
    });
    // created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
// Listen command
// exports.api = functions.https.onRequest(app);

app.listen(5001, console.log(`Amazon server running on port: 5001`));
