/* ----------  script2.js  ---------- */
document.addEventListener('DOMContentLoaded', () => {
    /* refs */
    const panel    = document.getElementById('preview');
    const closeBtn = document.getElementById('closePreview');
    const vid      = document.getElementById('prevVid');
    const titleEl  = document.getElementById('prevTitle');
    const descEl   = document.getElementById('prevDesc');
    const toolsEl  = document.getElementById('prevTools');
  
    /* helper → true when viewport is wide enough for hover UI */
    const wideEnough = () => window.matchMedia('(min-width: 768px)').matches;
  
    /* helpers to show / hide panel */
    function show(card) {
      titleEl.textContent = card.dataset.title  || '';
      descEl .textContent = card.dataset.desc   || '';
      toolsEl.textContent = card.dataset.tools  || '';
  
      if (card.dataset.video) {
        if (vid.src !== card.dataset.video) {
          vid.src = card.dataset.video;
          vid.load();
        }
        vid.style.display = 'block';
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.style.display = 'none';
      }
      panel.classList.add('show');
    }
    function hide() {
      panel.classList.remove('show');
      vid.pause();
    }
  
    /* bind once; decide inside the handler which path to run */
    document.querySelectorAll('.project-card').forEach(card => {
      /* — hover / focus — */
      card.addEventListener('mouseenter', () => {
        if (wideEnough()) show(card);
      });
      card.addEventListener('focus', () => {
        if (wideEnough()) show(card);
      });
      card.addEventListener('mouseleave', () => {
        if (wideEnough()) hide();
      });
      card.addEventListener('blur', () => {
        if (wideEnough()) hide();
      });
  
      /* — tap / click — */
      card.addEventListener('click', () => {
        if (!wideEnough()) {
          panel.classList.contains('show') ? hide() : show(card);
        }
      });
    });
  
    /* close button & backdrop */
    closeBtn.addEventListener('click', hide);
    panel.addEventListener('click', e => {
      if (e.target === panel) hide();
    });
  });
  