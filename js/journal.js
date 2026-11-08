document.addEventListener('DOMContentLoaded', () => {
  let entries = [];
  let visibleCount = 0;
  const step = 4;

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
            const [titleHtml, ...rest] = entry.event.split('<br>');
      const title = titleHtml.replace(/<\/?strong>/g, '');
      const desc = rest.join('<br>');

      const metaParts = [
        `<span>${entry.date}</span>`,
        `<span>XP ${entry.xp}</span>`,
        entry.amount ? `<span>${entry.amount}</span>` : '',
        entry.youtube ? `<button type="button" class="vid-link yt" data-yt="${entry.youtube}"><i class="ri-youtube-fill"></i> Video</button>` : '',
        entry.tiktok ? `<a class="vid-link tt" href="${entry.tiktok}" target="_blank" rel="noopener"><i class="ri-tiktok-fill"></i> Video</a>` : ''
      ].filter(Boolean);

      const ytId = entry.youtube ? getYouTubeId(entry.youtube) : null;
      const videoThumb = ytId && !entry.image;   // видео есть, своего фото нет
      const thumbImg = videoThumb ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : '';
      const div = document.createElement('div');
      div.className = 'journal-entry';
      div.innerHTML = `
            <div class="thumb" ${videoThumb
        ? `style="background-image:url('${thumbImg}')" data-yt="${entry.youtube}" role="button" tabindex="0" aria-label="Play video"`
        : entry.image
          ? `style="background-image:url('${entry.image}')" data-img="${entry.imageFull || entry.image}" role="button" tabindex="0" aria-label="Open photo"`
          : ''}>${videoThumb ? '<i class="ri-play-fill"></i>' : (entry.image ? '' : title.trim().slice(0, 2))}</div>
      <div class="body">
          <div class="top">
            <h4>${entry.link ? `<a href="${entry.link}" target="_blank">${title}</a>` : title}</h4>
            ${i === 0 ? '<span class="badge">Latest</span>' : ''}
          </div>
          <p class="desc">${desc}</p>
          <div class="meta">${metaParts.join('<span class="sep">·</span>')}</div>
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

    // ----- Окно с видео YouTube -----
  function getYouTubeId(url) {
    const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    return m ? m[1] : null;
  }

  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-box">
      <button class="video-modal-close" aria-label="Close">×</button>
      <div class="video-frame"></div>
    </div>`;
  document.body.appendChild(modal);
  const frame = modal.querySelector('.video-frame');

  function closeModal() {
    modal.classList.remove('open');
    frame.innerHTML = ''; // останавливает видео
  }

  document.getElementById('journal-container').addEventListener('click', e => {
    const btn = e.target.closest('[data-yt]');
    if (!btn) return;
    const id = getYouTubeId(btn.dataset.yt);
    if (!id) { window.open(btn.dataset.yt, '_blank'); return; }
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('video-modal-close')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ----- Open Photo -----
  const imgModal = document.createElement('div');
  imgModal.className = 'image-modal';
  imgModal.innerHTML = `
    <div class="image-modal-box">
      <button class="image-modal-close" aria-label="Close">×</button>
      <img alt="">
    </div>`;
  document.body.appendChild(imgModal);
  const modalImg = imgModal.querySelector('img');

  function closeImage() {
    imgModal.classList.remove('open');
    modalImg.removeAttribute('src');
  }

  document.getElementById('journal-container').addEventListener('click', e => {
    const thumb = e.target.closest('[data-img]');
    if (!thumb) return;
    modalImg.src = thumb.dataset.img;
    imgModal.classList.add('open');
  });

  imgModal.addEventListener('click', e => {
    if (e.target === imgModal || e.target.classList.contains('image-modal-close')) closeImage();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImage(); });

  loadJournal();

});
