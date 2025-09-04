// Retrieve invoice or create a new one
const invoice = JSON.parse(localStorage.getItem("invoice")) || {
  number: Date.now(), // Using Date.now() for unique, non-rounded invoice number
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
};

// Retrieve customer info
const customer = JSON.parse(localStorage.getItem("customer")) || {
  name: "Walk-in",
  contact: "N/A"
};

// Retrieve cart
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display invoice and customer details
document.getElementById("billNo").innerText = invoice.number;
document.getElementById("billDate").innerText = invoice.date;
document.getElementById("billTime").innerText = invoice.time;
document.getElementById("custName").innerText = customer.name;
document.getElementById("custContact").innerText = customer.contact;

let totalQty = 0;
let subtotal = 0;
const gstRate = 0.03;

// Generate table rows for each cart item
const itemsHTML = cart.map(item => {
  const qty = item.quantity || 1;
  const price = item.price || 0;
  const total = qty * price;

  totalQty += qty;
  subtotal += total;

  return `<tr>
    <td>${item.name}</td>
    <td>3%</td>
    <td>${qty}</td>
    <td>${price.toFixed(2)}</td>
    <td>0</td>
    <td>${total.toFixed(2)}</td>
  </tr>`;
}).join("");

// GST calculations
const gstAmount = +(subtotal * gstRate).toFixed(2);
const sgst = +(gstAmount / 2).toFixed(2);
const cgst = +(gstAmount / 2).toFixed(2);
const grandTotal = +(subtotal + gstAmount).toFixed(2);

// Update bill totals in the DOM
document.getElementById("billItems").innerHTML = itemsHTML;
document.getElementById("netQty").innerText = totalQty;
document.getElementById("grossAmt").innerText = subtotal.toFixed(2);
document.getElementById("sgst").innerText = sgst.toFixed(2);
document.getElementById("cgst").innerText = cgst.toFixed(2);
document.getElementById("finalAmt").innerText = grandTotal.toFixed(2);
document.getElementById("tenderAmt").innerText = grandTotal.toFixed(2);

// Save current bill to history
const billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];
billHistory.push({
  invoice,
  customer,
  cart,
  summary: {
    totalQty,
    subtotal: subtotal.toFixed(2),
    sgst: sgst.toFixed(2),
    cgst: cgst.toFixed(2),
    finalBill: grandTotal.toFixed(2)
  }
});
localStorage.setItem("billHistory", JSON.stringify(billHistory));

// Save current state (to persist if reloaded)
localStorage.setItem("invoice", JSON.stringify(invoice));
localStorage.setItem("customer", JSON.stringify(customer));
localStorage.setItem("cart", JSON.stringify(cart)); // ensure cart stays
