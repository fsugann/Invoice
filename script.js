// DOM elements
const form = document.querySelector('.form');
const invoiceItems = document.querySelector('.invoice-items');
const totalAmount = document.querySelector('.total-amount');
const btnAddItem = document.querySelector('.btn-add-item');
const btnGenerateInvoice = document.querySelector('.btn-generate-invoice');


// Array to store invoice items
let items = [];

// Add event listener to form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const product = form.product.value.trim();
  const quantity = form.quantity.value.trim();
  const price = form.price.value.trim();

  // Validate input fields
  if (product === '' || quantity === '' || price === '') {
    alert('Please fill in all fields');
    return;
  }

  // Create new invoice item object
  const item = {
    product,
    quantity: parseInt(quantity),
    price: parseFloat(price)
  };

  // Add item to items array
  items.push(item);

  // Add item to invoice items list
  invoiceItems.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${item.product}
      <span class="badge badge-primary badge-pill">${item.quantity}</span>
      <span class="badge badge-secondary badge-pill">$${item.price.toFixed(2)}</span>
    </li>
  `;

  // Calculate total amount
  const total = calculateTotal(items);
  totalAmount.textContent = `Total Amount: $${total.toFixed(2)}`;

  // Clear form input fields
  form.reset();
});

// Add event listener to "Generate Invoice" button
btnGenerateInvoice.addEventListener('click', function() {
  // Check if there are items in the invoice
  if (items.length === 0) {
    alert('Please add items to the invoice first');
    return;
  }

  // Calculate total amount
  const total = calculateTotal(items);

  // Calculate discount and GST amounts
  const discount = parseFloat(form.discount.value.trim()) || 0;
  const gst = parseFloat(form.gst.value.trim()) || 0;
  const discountAmount = total * (discount / 100);
  const gstAmount = total * (gst / 100);

  // Calculate final amount
  const finalAmount = total - discountAmount + gstAmount;

  // Create invoice summary string
  const summary = `
    Total: $${total.toFixed(2)}
    Discount: ${discount.toFixed(2)}%
    Discount Amount: $${discountAmount.toFixed(2)}
    GST: ${gst.toFixed(2)}%
    GST Amount: $${gstAmount.toFixed(2)}
    Final Amount: $${finalAmount.toFixed(2)}
  `;

  // Show invoice summary in alert
  alert(summary);

  // Reset items array and form fields
  items = [];
  invoiceItems.innerHTML = '';
  totalAmount.textContent = 'Total Amount: $0.00';
  form.reset();
});

// Function to calculate total amount
function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.quantity * item.price;
  });
  return total;
}


