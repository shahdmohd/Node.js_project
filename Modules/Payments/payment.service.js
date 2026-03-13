import axios from "axios";

const BASE_URL = "https://accept.paymob.com/v1";

async function createIntention({ amount, currency = "EGP", billingData, items = [], orderId }) {
  const response = await axios.post(
    `${BASE_URL}/intention/`,
    {
      amount,                         
      currency,
      payment_methods: [Number(process.env.PAYMOB_INTEGRATION_ID)],
      items,
      billing_data: billingData,
      special_reference: orderId || `order-${Date.now()}`,
      notification_url: process.env.PAYMOB_NOTIFICATION_URL,
      redirection_url: process.env.PAYMOB_REDIRECTION_URL,
    },
    {
      headers: {
        Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data; 
}


function buildCheckoutUrl(clientSecret) {
  return `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${clientSecret}`;
}

export { createIntention, buildCheckoutUrl };