const cartContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const gstEl = document.getElementById("gst");
const grandTotalEl = document.getElementById("grandTotal");
const paymentBtn = document.getElementById("paymentBtn");

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  subtotalEl.textContent = "";
  gstEl.textContent = "";
  grandTotalEl.textContent = "";
  let subtotal = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    paymentBtn.disabled = true;
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    div.innerHTML = `
      <div>
        <h3>${item.name} (x${item.quantity})</h3>
        <p>₹${item.price} each | Total: ₹${itemTotal}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">❌</button>
    `;

    cartContainer.appendChild(div);
  });

  const gstAmount = +(subtotal * 0.03).toFixed(2); // 3% GST
  const grandTotal = +(subtotal + gstAmount).toFixed(2);

  subtotalEl.textContent = `Subtotal: ₹${subtotal}`;
  gstEl.textContent = `GST (3%): ₹${gstAmount}`;
  grandTotalEl.textContent = `Grand Total: ₹${grandTotal}`;

  paymentBtn.disabled = false;
}

function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

paymentBtn.addEventListener("click", () => {
  const invoice = {
    number: Math.floor(Math.random() * 100000),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };

  const customer = {
    name: "Walk-in",
    contact: "N/A"
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Save invoice and customer for bill page
  localStorage.setItem("invoice", JSON.stringify(invoice));
  localStorage.setItem("customer", JSON.stringify(customer));

  // Save in bill history too
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = +(subtotal * 0.03).toFixed(2);
  const grandTotal = +(subtotal + gst).toFixed(2);
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];
  billHistory.push({
    invoice,
    customer,
    cart,
    summary: {
      totalQty,
      subtotal: subtotal.toFixed(2),
      sgst: (gst / 2).toFixed(2),
      cgst: (gst / 2).toFixed(2),
      finalBill: grandTotal.toFixed(2)
    }
  });
  localStorage.setItem("billHistory", JSON.stringify(billHistory));

  alert("Payment Successful!");

  // Redirect to bill page
  window.location.href = "bill.html";
});

renderCart();
