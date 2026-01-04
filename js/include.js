function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
      const file = el.getAttribute('data-include');
      fetch(file)
        .then(res => res.text())
        .then(data => el.innerHTML = data)
        .catch(err => el.innerHTML = 'Error');
    });
  }
  
  document.addEventListener('DOMContentLoaded', includeHTML);