(() => {
  const style = document.createElement('style');
  style.textContent = `
    .journal-order{display:flex;align-items:center;flex-wrap:wrap;gap:9px;margin:0 0 20px;padding:13px 15px;border:1px solid #dfd5cc;border-radius:15px;background:#fffaf4}
    .journal-order span{margin-right:auto;color:#6d635d;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
    .journal-order button{border:1px solid #cdbeb4;border-radius:999px;padding:9px 12px;background:#fff;color:#1d0806;font-weight:800;cursor:pointer}
    .journal-order button.active{border-color:#aa151b;background:#aa151b;color:#fff}
    @media (min-width:901px){
      .page{padding:clamp(28px,3.2vw,52px)!important}
      .hero{grid-template-columns:minmax(0,1fr) minmax(300px,.62fr)!important;align-items:center!important}
      .hero h1{font-size:clamp(58px,6.4vw,96px)!important;line-height:.92!important;max-width:100%!important}
      .hero-card{min-width:0!important}
      .journal-head{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(280px,.7fr)!important;align-items:end!important}
      .entry{grid-template-columns:72px minmax(0,1fr)!important}
      .entry-card{min-width:0!important}
      .entry-body{grid-template-columns:minmax(0,1fr) minmax(250px,.42fr)!important}
    }
    @media (min-width:901px) and (max-width:1180px){.hero,.entry-body,.journal-head{grid-template-columns:1fr!important}}
  `;
  document.head.appendChild(style);

  const timeline = document.getElementById('journalEntries');
  const heading = document.querySelector('.journal-head');
  if (!timeline || !heading) return;

  const controls = document.createElement('div');
  controls.className = 'journal-order';
  controls.setAttribute('aria-label', 'Journal entry order');
  controls.innerHTML = '<span>Browse the journal</span><button type="button" data-order="newest" class="active">Newest first</button><button type="button" data-order="oldest">Read from the beginning</button>';
  heading.insertAdjacentElement('afterend', controls);

  function reorder(direction) {
    const entries = [...timeline.querySelectorAll('.entry')];
    entries.sort((a, b) => {
      const aLesson = Number(a.id.replace(/\D/g, '')) || 0;
      const bLesson = Number(b.id.replace(/\D/g, '')) || 0;
      return direction === 'oldest' ? aLesson - bLesson : bLesson - aLesson;
    });
    entries.forEach(entry => timeline.appendChild(entry));
    controls.querySelectorAll('button').forEach(button => {
      const active = button.dataset.order === direction;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-order]');
    if (button) reorder(button.dataset.order);
  });

  const observer = new MutationObserver(() => {
    if (timeline.querySelector('.entry')) {
      reorder('newest');
      observer.disconnect();
    }
  });
  observer.observe(timeline, {childList:true});
})();
