(() => {
  const sectionData = {
    loginCards: [
      {
        title: 'Blog',
        body: 'Billets, notes et publications publiques pour suivre les idées, les itérations et les points visibles.',
        cta: 'Open blog',
        href: 'https://blog.marvax.fun'
      },
      {
        title: 'GitHub',
        body: 'Dépôts publics, prototypes et références de code disponibles depuis le profil principal.',
        cta: 'Open GitHub',
        href: 'https://github.com/m4rv4x'
      },
      {
        title: 'Resources',
        body: 'Pages compactes pour retrouver rapidement les surfaces publiques, le statut et les liens utiles.',
        cta: 'Open resources',
        href: '/docs.html'
      },
      {
        title: 'User access',
        body: 'Entrée publique vers la surface utilisateur quand la stack exposée est effectivement ouverte.',
        cta: 'Open access',
        href: '/user.html'
      }
    ],
    docsCards: [
      {
        heading: 'Blog & notes',
        badge: 'Public writing',
        body: 'Le blog sert de canal principal pour les notes, les billets et les contenus publics à suivre.',
        code: 'https://blog.marvax.fun'
      },
      {
        heading: 'GitHub & code',
        badge: 'Repositories',
        body: 'Le profil GitHub regroupe les dépôts publics, les prototypes et les références techniques visibles.',
        code: 'https://github.com/m4rv4x'
      },
      {
        heading: 'Status & access',
        badge: 'Public entry points',
        body: 'La page statut et la page d’accès gardent la lecture publique claire sans exposer de surfaces internes.',
        code: 'https://marvax.fun/status\nhttps://marvax.fun/user'
      }
    ],
    statusCards: [
      {
        label: 'Homepage',
        title: 'https://marvax.fun',
        body: 'Vitrine principale, contexte, ressources et liens publics utiles.',
        cta: 'Open home',
        href: '/index.html'
      },
      {
        label: 'Blog',
        title: 'https://blog.marvax.fun',
        body: 'Publications, billets et notes visibles publiquement.',
        cta: 'Open blog',
        href: 'https://blog.marvax.fun'
      },
      {
        label: 'Access',
        title: 'https://api.marvax.fun/user',
        body: 'Entrée applicative publique quand la surface utilisateur est réellement ouverte.',
        cta: 'Access page',
        href: '/user.html'
      },
      {
        label: 'Status',
        title: 'https://marvax.fun/status',
        body: 'Lecture publique du statut des surfaces observables et des points à vérifier manuellement.',
        cta: 'Open status',
        href: '/status.html'
      }
    ]
  };

  const setText = (el, text) => {
    if (el) el.textContent = text;
  };

  const setLink = (el, { text, href }) => {
    if (!el) return;
    if (text != null) el.textContent = text;
    if (href != null) el.href = href;
    if (/^https?:\/\//.test(href)) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  };

  const replaceWithLink = (el, { text, href, className }) => {
    if (!el) return null;
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    link.className = className || el.className || '';
    if (/^https?:\/\//.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    el.replaceWith(link);
    return link;
  };

  const applyHead = () => {
    document.title = 'Marvax — laboratoire d’agents, de projets et de signaux publics';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.content = 'Marvax est un laboratoire personnel autour des agents, des projets visibles, des ressources publiques et du suivi de disponibilité.';
    }
  };

  function patchHero() {
    const hero = document.querySelector('section[code-path="src/sections/Hero.tsx:91:5"]');
    if (!hero || hero.dataset.roguePatched === '1') return false;

    applyHead();

    const navLabels = ['Aperçu', 'Ressources', 'Statut', 'Contact'];
    hero.querySelectorAll('nav button span').forEach((span, index) => setText(span, navLabels[index] || span.textContent));

    setText(hero.querySelector('h1'), 'AGENTS THAT ACT');
    setText(
      hero.querySelector('p[code-path="src/sections/Hero.tsx:151:9"]'),
      'Laboratoire personnel autour des agents, des projets visibles, des ressources publiques et des signaux qui méritent vraiment d’être suivis.'
    );

    const ctaContainer = hero.querySelector('div[code-path="src/sections/Hero.tsx:159:9"]');
    if (ctaContainer) {
      const actions = Array.from(ctaContainer.children);
      if (actions[0]) {
        const first = actions[0].tagName === 'BUTTON'
          ? replaceWithLink(actions[0], { text: 'Blog', href: 'https://blog.marvax.fun', className: actions[0].className })
          : actions[0];
        setLink(first, { text: 'Blog', href: 'https://blog.marvax.fun' });
      }
      if (actions[1]) {
        const second = actions[1].tagName === 'BUTTON'
          ? replaceWithLink(actions[1], { text: 'GitHub', href: 'https://github.com/m4rv4x', className: actions[1].className })
          : actions[1];
        setLink(second, { text: 'GitHub', href: 'https://github.com/m4rv4x' });
      }
    }

    const statusBits = hero.querySelectorAll('div[code-path="src/sections/Hero.tsx:179:7"] p');
    setText(statusBits[0], 'PUBLIC SIGNAL');
    setText(statusBits[1], 'blog.marvax.fun • live');

    hero.dataset.roguePatched = '1';
    return true;
  }

  function patchLogin() {
    const section = document.getElementById('login');
    if (!section || section.dataset.roguePatched === '1') return false;

    const ps = section.querySelectorAll('p');
    setText(ps[0], 'Aperçu');
    setText(section.querySelector('h2'), 'PROJECTS AND ENTRY POINTS');
    setText(ps[1], 'Cette partie de la vitrine rassemble les points d’entrée publics les plus utiles : blog, GitHub, ressources compactes et accès utilisateur quand la surface est ouverte.');

    const topLinks = section.querySelectorAll('div[code-path="src/sections/AlbumCube.tsx:45:13"] a');
    setLink(topLinks[0], { text: 'Open blog', href: 'https://blog.marvax.fun' });
    setLink(topLinks[1], { text: 'Open GitHub', href: 'https://github.com/m4rv4x' });

    setText(ps[2], 'Public flow');
    setText(ps[3], '1. Read');
    setText(ps[4], 'Billets, notes et publications publiques depuis le blog.');
    setText(ps[5], '2. Explore');
    setText(ps[6], 'Code, prototypes et références techniques depuis GitHub.');
    setText(ps[7], '3. Check');
    setText(ps[8], 'Pages ressources, statut et accès pour garder une lecture publique propre.');

    const articles = section.querySelectorAll('article');
    articles.forEach((article, index) => {
      const card = sectionData.loginCards[index];
      if (!card) return;
      const heading = article.querySelector('h3');
      const body = article.querySelector('p.mt-4');
      const link = article.querySelector('a');
      setText(heading, card.title);
      setText(body, card.body);
      setLink(link, { text: card.cta, href: card.href });
    });

    section.dataset.roguePatched = '1';
    return true;
  }

  function patchDocs() {
    const section = document.getElementById('docs');
    if (!section || section.dataset.roguePatched === '1') return false;

    const ps = section.querySelectorAll('p');
    setText(ps[0], 'Resources');
    setText(section.querySelector('h2'), 'PUBLIC RESOURCES AND REFERENCE POINTS');
    setText(ps[1], 'Cette partie regroupe les destinations utiles publiquement : contenus, code, statut et accès. Elle ne cherche pas à refléter les surfaces internes ou d’admin.');
    setText(ps[2], 'Blog');
    setText(ps[3], 'Billets, notes et publications visibles');
    setText(ps[4], 'GitHub');
    setText(ps[5], 'Dépôts publics et prototypes');
    setText(ps[6], 'Status');
    setText(ps[7], 'Lecture honnête des surfaces visibles');
    setText(ps[8], 'Access');
    setText(ps[9], 'Entrées publiques à vérifier proprement');

    const articles = section.querySelectorAll('article');
    articles.forEach((article, index) => {
      const data = sectionData.docsCards[index];
      if (!data) return;
      const heading = article.querySelector('h3');
      const paragraphs = article.querySelectorAll('p');
      const code = article.querySelector('code');
      setText(heading, data.heading);
      setText(paragraphs[1], data.badge);
      setText(paragraphs[2], data.body);
      setText(code, data.code);
    });

    const links = section.querySelectorAll('a');
    setLink(links[0], { text: 'Open resources page', href: '/docs.html' });
    setLink(links[1], { text: 'Open live status', href: '/status.html' });

    section.dataset.roguePatched = '1';
    return true;
  }

  function patchStatus() {
    const section = document.getElementById('status');
    if (!section || section.dataset.roguePatched === '1') return false;

    const ps = section.querySelectorAll('p');
    setText(ps[0], 'Surfaces');
    setText(section.querySelector('h2'), 'PUBLIC SURFACES AND TRUSTED SIGNALS');
    setText(ps[1], 'La vitrine garde ici une lecture simple : les surfaces visibles, leur rôle public et la bonne destination pour aller plus loin sans faux état applicatif.');

    const articles = section.querySelectorAll('article');
    articles.forEach((article, index) => {
      const data = sectionData.statusCards[index];
      if (!data) return;
      const paragraphs = article.querySelectorAll('p');
      const heading = article.querySelector('h3');
      const link = article.querySelector('a');
      setText(paragraphs[0], data.label);
      setText(heading, data.title);
      setText(paragraphs[1], data.body);
      setLink(link, { text: data.cta, href: data.href });
    });

    setText(ps[10], 'Monitoring note');
    setText(ps[11], 'Le statut détaillé vit sur la page dédiée. La homepage reste une vitrine et liste les points publics sans inventer de verdict quand aucun signal fiable n’est disponible.');

    section.dataset.roguePatched = '1';
    return true;
  }

  function patchFooter() {
    const section = document.getElementById('contact');
    if (!section || section.dataset.roguePatched === '1') return false;

    const h2 = section.querySelector('h2');
    const topP = section.querySelector('p[code-path="src/sections/Footer.tsx:104:11"]');
    const platformPs = section.querySelectorAll('p[code-path="src/sections/Footer.tsx:111:11"], p[code-path="src/sections/Footer.tsx:115:11"]');
    const mainDesc = section.querySelector('p[code-path="src/sections/Footer.tsx:135:15"]');

    setText(h2, 'KEEP THE SIGNAL CLEAR');
    setText(topP, 'Public notes, useful tools, honest status');
    setText(platformPs[0], 'PUBLIC FRONT DOOR');
    setText(section.querySelector('h3[code-path="src/sections/Footer.tsx:114:11"]'), 'MARVAX');
    setText(platformPs[1], 'Agents · tools · notes');
    setText(mainDesc, 'Vitrine personnelle pour suivre les surfaces publiques, retrouver les ressources utiles et pointer vers les projets visibles sans exposer le reste.');

    const social = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:143:21"]');
    if (social[1]) {
      social[1].href = 'https://blog.marvax.fun';
      social[1].target = '_blank';
      social[1].rel = 'noopener noreferrer';
      social[1].setAttribute('aria-label', 'Blog');
    }
    if (social[0]) {
      social[0].setAttribute('aria-label', 'GitHub');
    }

    const quickLinks = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:164:21"]');
    [
      { text: 'Blog', href: 'https://blog.marvax.fun' },
      { text: 'GitHub', href: 'https://github.com/m4rv4x' },
      { text: 'Resources', href: '/docs.html' },
      { text: 'Status', href: '/status.html' },
      { text: 'Privacy', href: '/privacy.html' }
    ].forEach((item, index) => setLink(quickLinks[index], item));

    const contactTitles = section.querySelectorAll('p[code-path="src/sections/Footer.tsx:185:21"], p[code-path="src/sections/Footer.tsx:194:21"], p[code-path="src/sections/Footer.tsx:201:21"]');
    setText(contactTitles[0], 'Email');
    setText(contactTitles[1], 'Blog');
    setText(contactTitles[2], 'GitHub');

    const contactValues = [
      section.querySelector('a[code-path="src/sections/Footer.tsx:186:21"]'),
      section.querySelector('span[code-path="src/sections/Footer.tsx:195:21"]'),
      section.querySelector('span[code-path="src/sections/Footer.tsx:202:21"]')
    ];
    setText(contactValues[0], 'hello@marvax.fun');
    setText(contactValues[1], 'blog.marvax.fun');
    setText(contactValues[2], 'github.com/m4rv4x');

    setText(section.querySelector('h4[code-path="src/sections/Footer.tsx:210:15"]'), 'Start Here');
    setText(section.querySelector('p[code-path="src/sections/Footer.tsx:213:15"]'), 'Open the resources page or jump to public status from here.');
    const input = section.querySelector('input[code-path="src/sections/Footer.tsx:217:17"]');
    if (input) input.classList.add('rogue-hidden');
    const button = section.querySelector('button[code-path="src/sections/Footer.tsx:222:17"]');
    if (button) {
      button.textContent = 'Open resources';
      button.classList.add('rogue-footer-button');
      button.onclick = () => { window.location.href = '/docs.html'; };
    }

    const bottomLinks = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:268:17"]');
    [
      { text: 'Privacy', href: '/privacy.html' },
      { text: 'Resources', href: '/docs.html' },
      { text: 'Blog', href: 'https://blog.marvax.fun' },
      { text: 'Status', href: '/status.html' }
    ].forEach((item, index) => setLink(bottomLinks[index], item));

    section.dataset.roguePatched = '1';
    return true;
  }

  function patchPage() {
    applyHead();
    const checks = [patchHero(), patchLogin(), patchDocs(), patchStatus(), patchFooter()];
    return checks.every(Boolean);
  }

  function boot() {
    if (patchPage()) return;
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (patchPage() || attempts > 120) {
        clearInterval(timer);
      }
    }, 250);

    const observer = new MutationObserver(() => {
      if (patchPage()) {
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
