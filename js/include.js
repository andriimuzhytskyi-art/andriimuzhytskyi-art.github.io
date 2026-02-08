document.documentElement.classList.add('js');

async function includeHTML() {
  const elements = Array.from(document.querySelectorAll('[data-include]'));
  const tasks = elements.map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file);
      if (!res.ok) {
        throw new Error(`Failed load ${file}: ${res.status}`);
      }
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.error(err);
      el.innerHTML = '';
      el.setAttribute('data-include-error', 'true');
    }
  });

  await Promise.all(tasks);
}

document.addEventListener('DOMContentLoaded', async () => {
  await includeHTML();
  requestAnimationFrame(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  });
});
