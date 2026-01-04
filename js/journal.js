document.addEventListener('DOMContentLoaded', () => {
  let entries = [];
  let visibleCount = 0;
  const step = 5;

  async function loadJournal() {
    try {
      const res = await fetch('/data/journal.json'); // путь правильный
      if (!res.ok) throw new Error('Failed to load JSON');
      entries = await res.json();
      showNextEntries();
    } catch (e) {
      console.error('Error loading journal:', e);
      document.getElementById('journal-container').textContent = 'Failed to load journal entries.';
    }
  }

  function showNextEntries() {
    const container = document.getElementById('journal-container');
    for (let i = visibleCount; i < visibleCount + step; i++) {
      if (!entries[i]) break;

      const entry = entries[i];
      const div = document.createElement('div');
      div.className = 'journal-entry';
      div.innerHTML = `
        <div class="date">${entry.date}</div>
        <div class="event">
          ${entry.link ? `<a href="${entry.link}" target="_blank">${entry.event}</a>` : entry.event}
        </div>
        <div class="meta">
          ${entry.amount ? `${entry.amount} | ` : ''}XP ${entry.xp}
        </div>
      `;
      container.appendChild(div);
    }

    visibleCount += step;

    if (visibleCount >= entries.length) {
      document.getElementById('load-more').style.display = 'none';
    }
  }

  const loadMoreBtn = document.getElementById('load-more');
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', showNextEntries);

  loadJournal();
});
