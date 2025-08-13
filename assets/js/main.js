// Smooth scroll for nav links (optional, Bootstrap already handles scrollspy if needed)
document.querySelectorAll('a.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Example: Formspree integration (uncomment and configure endpoint)
// fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(formEl) })
//   .then(() => alert('Đã gửi đăng ký!')).catch(() => alert('Gửi lỗi, vui lòng thử lại.'));
