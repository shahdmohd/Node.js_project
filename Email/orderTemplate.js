export const orderTemplate = (order, action = "placed") => {
  const itemsList = order.items.map(item => 
    `${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
  ).join("\n");

  let heading = "Order Confirmation";
  let message = "Thank you for your order!";

  if (action === "cancelled") {
    heading = "Order Cancelled";
    message = "Your order has been cancelled.";
  } else if (action === "completed") {
    heading = "Order Completed";
    message = "Your order is ready for delivery.";
  } else if (action === "pending") {
    heading = "Order Status Update";
    message = "Your order status has been updated to pending.";
  }

  return `
Hi ${order.user.name},

${heading}
${message}

Order ID: ${order._id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Status: ${order.status.toUpperCase()}

Items:
${itemsList}

Total: $${order.totalAmount.toFixed(2)}

Thank you for shopping with us!
  `;
};
