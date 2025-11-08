// public/script.js
// Shared client-side functions used by all pages

// Helper: fetch list (default range)
async function fetchList(range) {
  const url = range ? `/list?range=${encodeURIComponent(range)}` : '/list';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch error: ' + res.statusText);
  return res.json();
}

// Add row (name, quantity, price)
async function addRow(name, quantity, price) {
  const res = await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

/* -------- Dashboard page functions -------- */
async function loadDashboard() {
  try {
    const data = await fetchList(); // full A:D by default
    if (!Array.isArray(data) || data.length <= 1) {
      document.getElementById('totalProducts').textContent = '0';
      document.getElementById('totalQty').textContent = '0';
      document.getElementById('totalValue').textContent = '0.00';
      return;
    }
    // assume first row is header
    const rows = data.slice(1);
    const totalProducts = rows.length;
    let totalQty = 0;
    let totalValue = 0;
    rows.forEach(r => {
      const qty = Number(r[1]) || 0;
      const price = Number(r[2]) || 0;
      totalQty += qty;
      totalValue += qty * price;
    });
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalQty').textContent = totalQty;
    document.getElementById('totalValue').textContent = totalValue.toFixed(2);
  } catch (err) {
    console.error(err);
  }
}

/* -------- Inventory page functions -------- */
async function loadInventory() {
  try {
    const data = await fetchList();
    const tbody = document.querySelector('#inventoryTable tbody');
    const empty = document.getElementById('inventoryEmpty');
    tbody.innerHTML = '';
    if (!Array.isArray(data) || data.length <= 1) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    const rows = data.slice(1);
    rows.forEach((r, i) => {
      const tr = document.createElement('tr');

      const nameTd = document.createElement('td');
      nameTd.textContent = r[0] || '';
      tr.appendChild(nameTd);

      const qtyTd = document.createElement('td');
      qtyTd.textContent = r[1] || '';
      tr.appendChild(qtyTd);

      const priceTd = document.createElement('td');
      priceTd.textContent = r[2] || '';
      tr.appendChild(priceTd);

      const dateTd = document.createElement('td');
      dateTd.textContent = r[3] || '';
      tr.appendChild(dateTd);

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

async function onAddInventory() {
  const name = document.getElementById('name').value.trim();
  const quantity = Number(document.getElementById('quantity').value);
  const price = Number(document.getElementById('price').value);
  if (!name || !quantity || !price) return alert('Fill all fields correctly');
  try {
    await addRow(name, quantity, price);
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    loadInventory();
    alert('Item added');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

/* -------- Movement page functions (check in/out) -------- */
async function onRecordMovement() {
  const name = document.getElementById('movName').value.trim();
  let qty = Number(document.getElementById('movQty').value);
  const action = document.getElementById('movAction').value;
  if (!name || !qty) return alert('Fill all fields');
  if (action === 'out') qty = -Math.abs(qty);
  try {
    // we record movement as a row with price 0 (or optionally include price)
    await addRow(name + (action === 'in' ? ' (IN)' : ' (OUT)'), qty, 0);
    document.getElementById('movName').value = '';
    document.getElementById('movQty').value = '';
    alert('Movement recorded');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}