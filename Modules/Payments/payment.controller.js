import { createIntention, buildCheckoutUrl } from "./payment.service.js";

async function initiatePayment(req, res) {
  try {
    const { amount, currency, orderId, special_reference, billingData, items } = req.body;

    if (!amount || !billingData) {
      return res.status(400).json({ message: "amount and billingData are required" });
    }

    const intention = await createIntention({ amount, currency, special_reference, billingData, items });
    const checkoutUrl = buildCheckoutUrl(intention.client_secret);

    return res.status(200).json({
      success: true,
      clientSecret: intention.client_secret,
      checkoutUrl,           
    });
  } catch (error) {
    console.error("Paymob error:", error?.response?.data || error.message);
    console.error("Full error:", error);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
}


export { initiatePayment };