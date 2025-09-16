const PASSWORD = "admin123"; // hardcoded password

function login() {
  const pass = document.getElementById("password").value;
  if (pass === PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadSubmissions();
  } else {
    document.getElementById("loginMsg").textContent = "Wrong password";
  }
}

async function loadSubmissions() {
  const res = await fetch('/api/submissions');
  const data = await res.json();
  renderTable(data);

  document.getElementById('search').addEventListener('input', () => {
    const q = document.getElementById('search').value.toLowerCase();
    renderTable(data.filter(d =>
      d.name.toLowerCase().includes(q) || d.course.toLowerCase().includes(q)
    ));
  });
}

function renderTable(data) {
  const tbody = document.querySelector('#submissionsTable tbody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.course}</td><td>${row.email}</td><td>${row.phone}</td><td>${new Date(row.time).toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}
