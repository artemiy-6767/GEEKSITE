/* Geek — общий скрипт: корзина, XP, окна, курсор, анимации. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mem = {};
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('geek.' + k); return v === null ? (k in mem ? mem[k] : d) : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem('geek.' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (n) { return Math.round(n).toLocaleString('ru-RU') + ' ₽'; };
  var CATS = window.GEEK_CATS || [], BY = window.GEEK_BY_ID || {};
  var catName = function (id) { var c = CATS.filter(function (x) { return x.id === id; })[0]; return c ? c.name : ''; };

  var G = window.Geek = { $: $, $$: $$, store: store, fmt: fmt, reduce: reduce, catName: catName };

  /* ---------- XP ---------- */
  var STEP = 60, TITLES = ['Новичок', 'Коллекционер', 'Охотник за редкостями', 'Сенсей', 'Легенда'];
  G.level = function () { var xp = store.get('xp', 0); return Math.floor(xp / STEP) + 1; };
  G.addXP = function (n, why, once) {
    if (once) { var seen = store.get('seen', {}); if (seen[once]) return; seen[once] = 1; store.set('seen', seen); }
    var before = G.level(); store.set('xp', store.get('xp', 0) + n); G.paintXP();
    G.toast('<b>+' + n + ' XP</b> ' + (why || ''));
    var after = G.level();
    if (after > before) { setTimeout(function () { G.toast('Новый уровень: <b>' + after + '</b> — ' + (TITLES[Math.min(after - 1, TITLES.length - 1)])); G.boom(); if (after === 3) G.toast('Открыт промокод <b>LEVEL3</b>: −12%'); }, 700); }
  };
  G.paintXP = function () {
    var xp = store.get('xp', 0), lv = G.level(), el = $('.xp');
    if (!el) return;
    $('b', el).innerHTML = '<span>LVL ' + lv + '</span><span>' + xp + ' XP</span>';
    $('i', el).style.setProperty('--p', ((xp % STEP) / STEP * 100) + '%');
    el.title = TITLES[Math.min(lv - 1, TITLES.length - 1)] + ' — действия на сайте дают XP, уровни открывают промокоды';
  };

  /* ---------- toast / confetti ---------- */
  G.toast = function (html) {
    var box = $('.toasts'); if (!box) return;
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; box.appendChild(t);
    while (box.children.length > 3) box.removeChild(box.firstChild);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 2800);
  };
  var COLORS = ['#d8b46b', '#f2d99a', '#ec4a3f', '#3b86e0', '#f6c945', '#3fbf7f'];
  G.boom = function (o) {
    if (reduce || !window.confetti) return;
    window.confetti(Object.assign({ particleCount: 110, spread: 80, origin: { y: .7 }, colors: COLORS, disableForReducedMotion: true }, o || {}));
  };
  G.pixels = function () {
    if (reduce || !window.confetti) return;
    var end = Date.now() + 1800;
    (function f() { window.confetti({ particleCount: 9, angle: 60, spread: 70, origin: { x: 0, y: .8 }, colors: COLORS, shapes: ['square'], scalar: 1.3 }); window.confetti({ particleCount: 9, angle: 120, spread: 70, origin: { x: 1, y: .8 }, colors: COLORS, shapes: ['square'], scalar: 1.3 }); if (Date.now() < end) requestAnimationFrame(f); })();
  };

  /* ---------- корзина ---------- */
  var cart = store.get('cart', {});
  var CODES = {
    GEEK10: { pct: 10, ok: function () { return true; }, hint: '−10%' },
    REG15: { pct: 15, ok: function () { return !!store.get('profile', null); }, hint: 'нужна регистрация' },
    LEVEL3: { pct: 12, ok: function () { return G.level() >= 3; }, hint: 'нужен 3-й уровень' },
    KONAMI: { pct: 20, ok: function () { return !!store.get('konami', false); }, hint: 'секретный код' }
  };
  var promo = store.get('promo', '');
  function lines() { return Object.keys(cart).filter(function (id) { return BY[id]; }).map(function (id) { return { p: BY[id], q: cart[id] }; }); }
  function totals() {
    var sub = lines().reduce(function (s, l) { return s + l.p.price * l.q; }, 0), c = CODES[promo], pct = c && c.ok() ? c.pct : 0;
    return { sub: sub, pct: pct, off: sub * pct / 100, tot: sub - sub * pct / 100 };
  }
  G.cartCount = function () { return lines().reduce(function (s, l) { return s + l.q; }, 0); };
  function saveCart() { store.set('cart', cart); paintCart(); }
  G.add = function (id, q, silent) {
    var p = BY[id]; if (!p) return;
    cart[id] = Math.min((cart[id] || 0) + (q || 1), 9); saveCart();
    if (!silent) { G.toast('В корзине: <b>' + p.name + '</b>'); G.addXP(10, 'за покупку в корзину'); }
    var b = $('.cart-btn'); if (b && window.gsap && !reduce) window.gsap.fromTo(b, { scale: 1.25 }, { scale: 1, duration: .6, ease: 'elastic.out(1,.5)' });
  };
  function paintCart() {
    var n = G.cartCount(), badge = $('.cart-btn .n'); if (badge) { badge.textContent = n; badge.classList.toggle('on', n > 0); }
    var box = $('.lines'); if (!box) return;
    var ls = lines();
    if (!ls.length) {
      box.innerHTML = '<div class="empty"><p>Корзина пуста. Самое время что-нибудь найти.</p><a class="btn btn-gold btn-sm" href="catalog.html">Открыть каталог</a></div>';
    } else {
      box.innerHTML = ls.map(function (l) {
        return '<div class="ln"><div class="th">' + window.Art.render(l.p) + '</div><div><b>' + l.p.name + '</b><div class="qty"><button data-q="-1" data-id="' + l.p.id + '" aria-label="Меньше">−</button><span>' + l.q + '</span><button data-q="1" data-id="' + l.p.id + '" aria-label="Больше">+</button></div></div><div class="price">' + fmt(l.p.price * l.q) + '</div></div>';
      }).join('');
    }
    var t = totals();
    var f = $('.drawer footer'); if (!f) return;
    $('.s-sub', f).textContent = fmt(t.sub);
    $('.s-off', f).textContent = t.pct ? '−' + fmt(t.off) + ' (' + t.pct + '%)' : '—';
    $('.s-tot', f).textContent = fmt(t.tot);
    $('.checkout', f).disabled = !ls.length;
  }
  G.openCart = function (on) {
    $('.drawer').classList.toggle('on', on); $('.veil').classList.toggle('on', on);
    $('.drawer').setAttribute('aria-hidden', on ? 'false' : 'true');
    if (on) { paintCart(); var c = $('.drawer .x'); c && c.focus(); }
  };

  /* ---------- быстрый просмотр ---------- */
  G.quick = function (id) {
    var p = BY[id]; if (!p) return;
    var m = $('.modal');
    $('.art', m).innerHTML = window.Art.render(p);
    $('.txt', m).innerHTML = '<div class="tags"><span class="tg">' + catName(p.cat) + '</span>' + (p.cond ? '<span class="tg">' + p.cond + '</span>' : '') + (p.badge ? '<span class="tg">' + p.badge + '</span>' : '') + '<span class="tg">В наличии: ' + p.stock + ' шт.</span></div><h2 id="qv-t" style="font-size:clamp(1.4rem,3vw,2rem)">' + p.name + '</h2><p class="lead" style="font-size:1rem">' + p.desc + '</p><div class="price">' + fmt(p.price) + '</div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-gold" data-add="' + p.id + '">В корзину</button><button class="btn" data-close="1">Продолжить</button></div>';
    m.classList.add('on'); $('.veil').classList.add('on'); m.setAttribute('aria-hidden', 'false');
    $('.x', m).focus();
    G.addXP(3, 'за любопытство', 'qv:' + id);
  };
  function closeAll() {
    $('.modal').classList.remove('on'); $('.modal').setAttribute('aria-hidden', 'true');
    $('.drawer').classList.remove('on'); $('.drawer').setAttribute('aria-hidden', 'true');
    $('.veil').classList.remove('on');
  }

  /* ---------- карточка товара ---------- */
  G.card = function (p, i) {
    var badge = p.badge ? '<span class="badge ' + (/new/i.test(p.badge) ? 'new' : /ред/i.test(p.badge) ? 'rare' : '') + '">' + p.badge + '</span>' : '';
    return '<article class="pc in" data-tilt style="animation-delay:' + Math.min((i || 0) * 40, 400) + 'ms"><button class="art" data-qv="' + p.id + '" aria-label="Быстрый просмотр: ' + p.name + '">' + badge + window.Art.render(p) + '<span class="qv">Быстрый просмотр</span></button>' +
      '<div class="info"><div class="meta">' + catName(p.cat) + (p.cond ? ' · ' + p.cond : '') + '</div><h3>' + p.name + '</h3><div class="row"><span class="price">' + fmt(p.price) + '</span><button class="add" data-add="' + p.id + '" aria-label="В корзину: ' + p.name + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button></div></div></article>';
  };
  G.tilt = function (root) {
    if (!window.VanillaTilt || reduce || !window.matchMedia('(pointer:fine)').matches) return;
    $$('[data-tilt]', root || document).forEach(function (el) { if (el.vanillaTilt) return; window.VanillaTilt.init(el, { max: 7, speed: 500, glare: true, 'max-glare': .16, scale: 1.015, perspective: 1100 }); });
  };

  /* ---------- анимации ---------- */
  var smooth;
  G.reveal = function (sel, o) {
    if (!window.gsap || !window.ScrollTrigger || reduce) return;
    $$(sel).forEach(function (el, i) {
      window.gsap.from(el, Object.assign({ y: 30, opacity: .15, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }, o || {}));
    });
  };
  G.counters = function () {
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suf') || '', full = el.textContent;
      if (!window.gsap || !window.ScrollTrigger || reduce) return;
      var o = { v: 0 };
      window.ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { window.gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v).toLocaleString('ru-RU') + suf; }, onComplete: function () { el.textContent = full; } }); } });
    });
  };

  /* ---------- курсор и магниты ---------- */
  function cursor() {
    if (!window.matchMedia('(pointer:fine)').matches || reduce) return;
    var ring = document.createElement('div'), dot = document.createElement('div');
    ring.className = 'cur'; dot.className = 'cur-dot'; document.body.appendChild(ring); document.body.appendChild(dot);
    var x = 0, y = 0, rx = 0, ry = 0, on = false;
    document.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; dot.style.transform = 'translate(' + x + 'px,' + y + 'px)'; if (!on) { on = true; ring.classList.add('on'); dot.classList.add('on'); } });
    document.addEventListener('mouseleave', function () { on = false; ring.classList.remove('on'); dot.classList.remove('on'); });
    (function loop() { rx += (x - rx) * .16; ry += (y - ry) * .16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', function (e) { ring.classList.toggle('big', !!e.target.closest('a,button,.art,.cat,.hot,.face,[role="button"],.stk,input,label')); });
  }
  function magnets() {
    if (!window.gsap || reduce || !window.matchMedia('(pointer:fine)').matches) return;
    $$('.btn-gold, .cart-btn, .logo').forEach(function (el) {
      var qx = window.gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' }), qy = window.gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .22); qy((e.clientY - r.top - r.height / 2) * .3); });
      el.addEventListener('mouseleave', function () { qx(0); qy(0); });
    });
  }

  /* ---------- konami ---------- */
  function konami() {
    var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], pos = 0;
    document.addEventListener('keydown', function (e) {
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos === seq.length) {
        pos = 0; G.pixels();
        if (!store.get('konami', false)) { store.set('konami', true); G.addXP(100, 'секретный уровень найден'); G.toast('Промокод <b>KONAMI</b>: −20% на всё'); }
        else G.toast('Секретный уровень уже пройден. Но пиксели никогда не лишние.');
      }
    });
  }

  /* ---------- инициализация ---------- */
  function shell() {
    var d = document.createElement('div');
    d.innerHTML =
      '<div class="veil" data-close="1"></div>' +
      '<aside class="drawer" aria-label="Корзина" aria-hidden="true" role="dialog"><header><h3>Корзина</h3><button class="x" data-close="1" aria-label="Закрыть корзину">×</button></header><div class="lines"></div>' +
      '<footer><div class="promo"><input type="text" id="promo-in" placeholder="Промокод" aria-label="Промокод" autocomplete="off"><button class="btn btn-sm" id="promo-ok">Применить</button></div><div class="note" id="promo-msg">Подсказка: GEEK10 работает всегда. Остальные коды открываются за активность на сайте.</div>' +
      '<div class="sum"><span>Товары</span><span class="s-sub mono"></span></div><div class="sum"><span>Скидка</span><span class="s-off mono"></span></div><div class="sum tot"><span>Итого</span><span class="price s-tot"></span></div>' +
      '<button class="btn btn-gold checkout">Оформить заказ</button><div class="note">Демо-витрина: оплата и доставка не подключены, заказ никуда не отправляется.</div></footer></aside>' +
      '<div class="modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="qv-t" data-close="1"><div class="box"><button class="x" data-close="1" aria-label="Закрыть">×</button><div class="art"></div><div class="txt"></div></div></div>' +
      '<div class="toasts" aria-live="polite"></div>';
    while (d.firstChild) document.body.appendChild(d.firstChild);
  }

  function init() {
    shell();
    var page = document.body.getAttribute('data-page') || 'home';
    var nav = $('.nav'), burger = $('.burger');
    if (burger) burger.addEventListener('click', function () { var on = nav.classList.toggle('on'); burger.setAttribute('aria-expanded', on); });
    var prof = store.get('profile', null); if (prof) { var rl = $('.nav a[href="register.html"]'); if (rl) rl.textContent = 'Мой профиль'; var hb = $('.hdr .btn-gold'); if (hb) hb.textContent = prof.name.split(' ')[0]; }

    document.addEventListener('click', function (e) {
      var t = e.target;
      var a = t.closest('[data-add]'); if (a) { G.add(a.getAttribute('data-add')); return; }
      var q = t.closest('[data-qv]'); if (q) { G.quick(q.getAttribute('data-qv')); return; }
      var c = t.closest('[data-q]'); if (c) { var id = c.getAttribute('data-id'), n = (cart[id] || 0) + parseInt(c.getAttribute('data-q'), 10); if (n <= 0) delete cart[id]; else cart[id] = Math.min(n, 9); saveCart(); return; }
      if (t.closest('.cart-btn')) { G.openCart(true); return; }
      var cl = t.closest('[data-close]');
      if (cl && (cl === t || cl.tagName === 'BUTTON' || cl.classList.contains('veil'))) { closeAll(); return; }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

    $('#promo-ok').addEventListener('click', function () {
      var v = $('#promo-in').value.trim().toUpperCase(), m = $('#promo-msg'), c = CODES[v];
      if (!c) { m.textContent = 'Такого кода нет. Попробуйте GEEK10.'; m.style.color = '#ff8a80'; return; }
      if (!c.ok()) { m.textContent = 'Код ' + v + ' пока закрыт: ' + c.hint + '.'; m.style.color = '#ff8a80'; return; }
      promo = v; store.set('promo', v); m.textContent = 'Код ' + v + ' применён: −' + c.pct + '%.'; m.style.color = 'var(--gold-2)'; paintCart(); G.boom({ particleCount: 50, origin: { x: .85, y: .7 } });
    });
    $('.checkout').addEventListener('click', function () {
      var n = 'G-' + (1000 + Math.floor(Math.random() * 8999)); cart = {}; saveCart(); closeAll(); G.boom({ particleCount: 180, spread: 110 });
      G.toast('Демо-заказ <b>' + n + '</b> собран. Настоящая оплата не подключена.'); G.addXP(25, 'за демо-заказ');
    });

    paintCart(); G.paintXP();
    G.addXP(5, 'за визит на страницу', 'visit:' + page);

    if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    if (window.Lenis && !reduce) {
      try {
        smooth = new window.Lenis({ duration: 1.1, smoothWheel: true });
        if (window.ScrollTrigger) smooth.on('scroll', window.ScrollTrigger.update);
        if (window.gsap) window.gsap.ticker.add(function (t) { smooth.raf(t * 1000); }); else (function r(t) { smooth.raf(t); requestAnimationFrame(r); })(0);
        window.gsap && window.gsap.ticker.lagSmoothing(0);
        document.addEventListener('click', function (e) { if (e.target.closest('.veil,.drawer,.modal')) return; });
        var lock = function (on) { on ? smooth.stop() : smooth.start(); };
        new MutationObserver(function () { lock(!!$('.veil.on')); }).observe($('.veil'), { attributes: true, attributeFilter: ['class'] });
      } catch (e) {}
    }
    cursor(); magnets(); konami();
    G.reveal('[data-rv]'); G.counters();
    window.addEventListener('load', function () { window.ScrollTrigger && window.ScrollTrigger.refresh(); });
    document.dispatchEvent(new CustomEvent('geek:ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
