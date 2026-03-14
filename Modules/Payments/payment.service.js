import axios from "axios";

const BASE_URL = "https://accept.paymob.com/v1";

async function createIntention({ amount, currency = "EGP", billingData, items = [], orderId }) {

  const amountInCents = Math.round(amount * 100);

  const formattedItems = items.map(item => {
    const productPrice = item.product?.price || 0;
    
    const formattedItem = {
      name: item.product?.name || "Product",
      description: item.product?.description || "",
      amount: Math.round(productPrice * 100),
      quantity: item.quantity || 1
    };

    return formattedItem;
  });

  const totalFromItems = formattedItems.reduce((sum, item) => {
    return sum + (item.amount * item.quantity);
  }, 0);

  if (totalFromItems !== amountInCents && totalFromItems > 0) {
    const discountAmount = totalFromItems - amountInCents;
    
    formattedItems.push({
      name: "Discount",
      description: "Discount Applied",
      amount: -discountAmount,
      quantity: 1
    });
  }

  const payload = {
    amount: amountInCents,
    currency,
    payment_methods: [Number(process.env.PAYMOB_INTEGRATION_ID)],
    billing_data: billingData,
    special_reference: orderId || `order-${Date.now()}`,
    notification_url: process.env.PAYMOB_NOTIFICATION_URL,
    redirection_url: process.env.PAYMOB_REDIRECTION_URL,
  };

  if (formattedItems.length > 0) {
    payload.items = formattedItems;
  }

  console.log("Paymob Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      `${BASE_URL}/intention/`,
      payload,
      {
        headers: {
          Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Paymob API Error Details:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}


function buildCheckoutUrl(clientSecret) {
  return `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}&clientSecret=${clientSecret}`;
}

export { createIntention, buildCheckoutUrl };