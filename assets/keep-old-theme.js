(() => {
  const sectionData = {
    loginCards: [
      {
        title: 'Blog',
        body: 'Le journal public de Marvax: notes, billets et avancées publiés au fil de l’eau.',
        cta: 'Lire le blog',
        href: 'https://blog.marvax.fun'
      },
      {
        title: 'GitHub',
        body: 'Dépôts publics, prototypes et chantiers techniques visibles depuis le profil principal.',
        cta: 'Voir GitHub',
        href: 'https://github.com/m4rv4x'
      },
      {
        title: 'Ressources',
        body: 'Une page courte pour retrouver les liens utiles, la documentation et le statut public.',
        cta: 'Voir les ressources',
        href: '/docs.html'
      },
      {
        title: 'Accès utilisateur',
        body: 'Point d’entrée public quand un espace utilisateur est réellement ouvert.',
        cta: 'Ouvrir l’accès',
        href: '/user.html'
      }
    ],
    docsCards: [
      {
        heading: 'Blog',
        badge: 'Notes publiques',
        body: 'Articles, notes et publications qui donnent du contexte sur les projets en cours.',
        code: 'https://blog.marvax.fun'
      },
      {
        heading: 'GitHub',
        badge: 'Code public',
        body: 'Le profil principal rassemble les dépôts publics, les prototypes et les références techniques.',
        code: 'https://github.com/m4rv4x'
      },
      {
        heading: 'Docs & status',
        badge: 'Pages utiles',
        body: 'Les pages docs, status et user servent de repères publics. Elles pointent vers ce qui existe vraiment.',
        code: 'https://marvax.fun/docs\nhttps://marvax.fun/status\nhttps://marvax.fun/user'
      }
    ],
    statusCards: [
      {
        label: 'Accueil',
        title: 'https://marvax.fun',
        body: 'Page principale, navigation et vue d’ensemble.',
        cta: 'Voir l’accueil',
        href: '/index.html'
      },
      {
        label: 'Blog',
        title: 'https://blog.marvax.fun',
        body: 'Journal public et publications.',
        cta: 'Voir le blog',
        href: 'https://blog.marvax.fun'
      },
      {
        label: 'Accès',
        title: 'https://marvax.fun/user',
        body: 'Page d’accès public quand un espace utilisateur est disponible.',
        cta: 'Voir l’accès',
        href: '/user.html'
      },
      {
        label: 'Status',
        title: 'https://marvax.fun/status',
        body: 'Résumé public de ce qui est visible et maintenu.',
        cta: 'Voir le status',
        href: '/status.html'
      }
    ]
  };

  const setText = (el, text) => {
    if (el) el.textContent = text;
  };

  const setMeta = (selector, content) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', content);
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
    document.title = 'Marvax — projets, notes et accès publics';
    setMeta('meta[name="description"]', 'Marvax rassemble un blog, des dépôts publics et quelques pages utiles pour naviguer simplement entre les surfaces visibles.');
    setMeta('meta[property="og:title"]', 'Marvax — projets, notes et accès publics');
    setMeta('meta[property="og:description"]', 'Une vitrine sobre pour suivre les projets visibles, les notes publiques et les points d’accès réellement utiles.');
  };

  function patchHero() {
    const hero = document.querySelector('section[code-path="src/sections/Hero.tsx:91:5"]');
    if (!hero || hero.dataset.roguePatched === '1') return false;

    applyHead();

    const navLabels = ['Aperçu', 'Ressources', 'Statut', 'Contact'];
    hero.querySelectorAll('nav button span').forEach((span, index) => setText(span, navLabels[index] || span.textContent));

    setText(hero.querySelector('h1'), 'PROJECTS IN PUBLIC');
    setText(
      hero.querySelector('p[code-path="src/sections/Hero.tsx:151:9"]'),
      'Marvax regroupe ici ses notes, ses projets visibles et les quelques pages utiles qui servent vraiment côté public.'
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
    setText(statusBits[0], 'PUBLIC LINKS');
    setText(statusBits[1], 'blog.marvax.fun • online');

    hero.dataset.roguePatched = '1';
    return true;
  }

  function patchLogin() {
    const section = document.getElementById('login');
    if (!section || section.dataset.roguePatched === '1') return false;

    const ps = section.querySelectorAll('p');
    setText(ps[0], 'Aperçu');
    setText(section.querySelector('h2'), 'WHAT TO OPEN FIRST');
    setText(ps[1], 'Pas de faux portail ici. Cette section sert d’index public vers le blog, le code, les ressources et l’accès utilisateur quand il existe.');

    const topLinks = section.querySelectorAll('div[code-path="src/sections/AlbumCube.tsx:45:13"] a');
    setLink(topLinks[0], { text: 'Lire le blog', href: 'https://blog.marvax.fun' });
    setLink(topLinks[1], { text: 'Voir GitHub', href: 'https://github.com/m4rv4x' });

    setText(ps[2], 'Par où commencer');
    setText(ps[3], '1. Lire');
    setText(ps[4], 'Le blog concentre les notes, billets et annonces publiques.');
    setText(ps[5], '2. Explorer');
    setText(ps[6], 'GitHub montre le code, les prototypes et les dépôts vivants.');
    setText(ps[7], '3. Vérifier');
    setText(ps[8], 'Les pages ressources et status donnent une vue simple des entrées publiques.');

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
    setText(ps[0], 'Ressources');
    setText(section.querySelector('h2'), 'PUBLIC PAGES AND REFERENCES');
    setText(ps[1], 'Cette partie rassemble les pages qui servent vraiment: contenus, code, statut et accès public. Pas de promesse floue, pas de route morte.');
    setText(ps[2], 'Blog');
    setText(ps[3], 'Notes et billets');
    setText(ps[4], 'GitHub');
    setText(ps[5], 'Code et prototypes');
    setText(ps[6], 'Status');
    setText(ps[7], 'Vue publique');
    setText(ps[8], 'Accès');
    setText(ps[9], 'Entrée utilisateur');

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
    setLink(links[0], { text: 'Voir les ressources', href: '/docs.html' });
    setLink(links[1], { text: 'Voir le status', href: '/status.html' });

    section.dataset.roguePatched = '1';
    return true;
  }

  function patchStatus() {
    const section = document.getElementById('status');
    if (!section || section.dataset.roguePatched === '1') return false;

    const ps = section.querySelectorAll('p');
    setText(ps[0], 'Statut');
    setText(section.querySelector('h2'), 'PUBLIC SURFACES');
    setText(ps[1], 'Ici, la vitrine montre seulement les surfaces publiques maintenues et la bonne page pour vérifier ce qui est réellement accessible.');

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

    setText(ps[10], 'Note');
    setText(ps[11], 'La page d’accueil reste une vitrine. La page status concentre les vérifications et évite les faux voyants verts sur des services qui ne sont pas publics.');

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

    setText(h2, 'KEEP IT SIMPLE');
    setText(topP, 'Notes publiques, code utile, accès propres');
    setText(platformPs[0], 'MARVAX');
    setText(section.querySelector('h3[code-path="src/sections/Footer.tsx:114:11"]'), 'MARVAX');
    setText(platformPs[1], 'Projets · notes · surfaces publiques');
    setText(mainDesc, 'Marvax sert ici de vitrine sobre: un blog, des dépôts publics, quelques pages utiles et un point d’accès quand il existe.');

    const social = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:143:21"]');
    if (social[1]) {
      social[1].href = 'https://blog.marvax.fun';
      social[1].target = '_blank';
      social[1].rel = 'noopener noreferrer';
      social[1].setAttribute('aria-label', 'Blog');
    }
    if (social[0]) {
      social[0].href = 'https://github.com/m4rv4x';
      social[0].target = '_blank';
      social[0].rel = 'noopener noreferrer';
      social[0].setAttribute('aria-label', 'GitHub');
    }

    const quickLinks = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:164:21"]');
    [
      { text: 'Blog', href: 'https://blog.marvax.fun' },
      { text: 'GitHub', href: 'https://github.com/m4rv4x' },
      { text: 'Ressources', href: '/docs.html' },
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

    setText(section.querySelector('h4[code-path="src/sections/Footer.tsx:210:15"]'), 'Commencer ici');
    setText(section.querySelector('p[code-path="src/sections/Footer.tsx:213:15"]'), 'Ouvre les ressources ou le status public selon ce que tu cherches.');
    const input = section.querySelector('input[code-path="src/sections/Footer.tsx:217:17"]');
    if (input) {
      input.value = '';
      input.style.display = 'none';
    }
    const button = section.querySelector('button[code-path="src/sections/Footer.tsx:222:17"]');
    if (button) {
      button.textContent = 'Voir les ressources';
      button.style.minWidth = '12rem';
      button.style.justifyContent = 'center';
      button.onclick = () => { window.location.href = '/docs.html'; };
    }

    const bottomLinks = section.querySelectorAll('a[code-path="src/sections/Footer.tsx:268:17"]');
    [
      { text: 'Privacy', href: '/privacy.html' },
      { text: 'Ressources', href: '/docs.html' },
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
