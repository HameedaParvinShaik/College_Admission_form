document.getElementById('admissionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg');
  msg.textContent = 'Submitting...';

  const formData = new FormData(e.target);

  const res = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    msg.textContent = '✅ Form submitted successfully!';
    e.target.reset();
  } else {
    msg.textContent = '❌ Something went wrong';
  }
});
