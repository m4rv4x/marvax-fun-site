(function () {
  const DEFAULT_TIMEOUT = 8000;

  function setBadge(el, state, text) {
    if (!el) return;
    el.className = 'badge-' + state;
    el.textContent = text;
  }

  function setDot(dot, state) {
    if (!dot) return;
    dot.className = 'status-dot ' + state;
  }

  async function checkUrl(url, timeout) {
    const started = performance.now();
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout || DEFAULT_TIMEOUT);

    try {
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
        credentials: 'omit',
        signal: controller.signal
      });
      return { status: 'up', time: Math.round(performance.now() - started) };
    } catch (error) {
      return { status: 'down', time: Math.round(performance.now() - started), error: String(error) };
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function refreshBoard(root) {
    const cards = Array.from(root.querySelectorAll('[data-service-url]'));
    const results = await Promise.all(cards.map(async (card) => {
      const result = await checkUrl(card.dataset.serviceUrl, Number(root.dataset.timeout || DEFAULT_TIMEOUT));
      return { card, result };
    }));

    let downCount = 0;

    results.forEach(({ card, result }) => {
      const dot = card.querySelector('[data-role="dot"]');
      const label = card.querySelector('[data-role="label"]');
      const time = card.querySelector('[data-role="time"]');

      setDot(dot, result.status);
      if (label) {
        label.textContent = result.status === 'up' ? 'Operational' : 'Indisponible';
      }
      if (time) {
        time.textContent = result.time + ' ms';
      }

      if (result.status === 'down') {
        downCount += 1;
      }
    });

    const overall = root.querySelector('[data-role="overall"]');
    const stamp = root.querySelector('[data-role="timestamp"]');

    if (stamp) {
      stamp.textContent = new Date().toLocaleTimeString('fr-FR');
    }

    if (downCount === 0) {
      setBadge(overall, 'success', 'Tous les services suivis répondent');
    } else if (downCount === cards.length) {
      setBadge(overall, 'danger', 'Aucun service suivi ne répond');
    } else {
      setBadge(overall, 'warning', 'Disponibilité partielle');
    }
  }

  function initBoard(root) {
    if (!root || root.dataset.statusReady === '1') return;
    root.dataset.statusReady = '1';

    const interval = Number(root.dataset.interval || 60000);
    const lazy = root.dataset.lazy === 'true';

    const start = () => {
      if (root.dataset.statusStarted === '1') return;
      root.dataset.statusStarted = '1';
      refreshBoard(root);
      window.setInterval(() => {
        if (!document.hidden) {
          refreshBoard(root);
        }
      }, interval);
    };

    if (lazy && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        }
      }, { rootMargin: '280px 0px' });
      observer.observe(root);
      return;
    }

    start();
  }

  function initAllBoards() {
    document.querySelectorAll('[data-status-board]').forEach(initBoard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllBoards, { once: true });
  } else {
    initAllBoards();
  }
})();
