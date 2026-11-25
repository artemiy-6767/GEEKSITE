/* Geek — главная страница */
(function () {
  document.addEventListener('geek:ready', function () {
    var G = window.Geek, $ = G.$, $$ = G.$$, P = window.GEEK_PRODUCTS, BY = window.GEEK_BY_ID;

    /* категории */
    var counts = {}; P.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    $('#cats').innerHTML = window.GEEK_CATS.map(function (c) {
      var pic = c.img ? '<img src="img/' + c.img + '" alt="" loading="lazy">' : window.Art.render({ name: c.name, art: c.art });
      return '<a class="cat" href="catalog.html#' + c.id + '" data-rv><div class="pic">' + pic + '</div><div class="lbl"><div><h3>' + c.name + '</h3><small>' + c.short + ' · ' + counts[c.id] + ' поз.</small></div><span class="go" aria-hidden="true">→</span></div></a>';
    }).join('');

    /* бегущая строка */
    var words = ['Комиксы', 'Аниме-фигурки', 'Винил', 'Видеоигры', 'Рамен', 'Газировка', 'Кубики', 'Геймпады', 'Манга', 'Лимитки'];
    var one = words.map(function (w) { return '<span>' + w + '</span>'; }).join('');
    $('#track').innerHTML = one + one;

    /* полка с точками */
    var rows = [
      { y: 23.3, xs: [15.5, 30.4, 44.2, 57.5, 71.0, 84.5], ids: ['g-beyond', 'g-heavyrain', 'g-tlou', 'g-deusex', 'g-mk', 'g-gta4'] },
      { y: 47.4, xs: [15.2, 30.4, 44.2, 57.5, 71.0, 86.2], ids: ['g-unc1', 'g-unc2', 'g-unc3', 'g-nier', 'g-re5', 'g-ninja'] },
      { y: 76.4, xs: [10.2, 24.3, 40.9, 57.5, 72.7, 90.3], ids: ['g-bat-origins', 'g-bat-city', 'g-bat-asylum', 'g-ff13', 'g-mgs4', 'g-infamous2'] }
    ];
    var shelf = $('#shelf'), tip = $('#tip'), n = 0, openBtn = null;
    rows.forEach(function (r) {
      r.ids.forEach(function (id, i) {
        var b = document.createElement('button'); b.className = 'hot'; b.type = 'button'; b.textContent = '+';
        b.style.left = r.xs[i] + '%'; b.style.top = r.y + '%'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', BY[id].name); b.setAttribute('data-id', id);
        b.style.animationDelay = (n++ * 90) + 'ms';
        shelf.appendChild(b);
      });
    });
    function closeTip() { tip.classList.remove('on'); if (openBtn) openBtn.setAttribute('aria-expanded', 'false'); openBtn = null; }
    shelf.addEventListener('click', function (e) {
      var b = e.target.closest('.hot');
      if (!b) { if (!e.target.closest('#tip')) closeTip(); return; }
      if (openBtn === b) { closeTip(); return; }
      closeTip(); openBtn = b; b.setAttribute('aria-expanded', 'true');
      var p = BY[b.getAttribute('data-id')];
      tip.innerHTML = '<h4>' + p.name + '</h4><div class="meta mono" style="font-size:12px;color:var(--muted)">' + p.cond + ' · в наличии ' + p.stock + ' шт.</div><div class="pr">' + G.fmt(p.price) + '</div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-gold btn-sm" data-add="' + p.id + '">В корзину</button><button class="btn btn-sm" data-qv="' + p.id + '">Подробнее</button></div>';
      tip.classList.add('on');
      var W = shelf.clientWidth, H = shelf.clientHeight, x = b.offsetLeft, y = b.offsetTop, tw = tip.offsetWidth, th = tip.offsetHeight;
      tip.style.left = Math.max(8, Math.min(x + 24, W - tw - 8)) + 'px';
      tip.style.top = Math.max(8, Math.min(y + 24, H - th - 8)) + 'px';
      G.addXP(2, 'за изучение полки', 'shelf');
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeTip(); });

    /* горячие товары */
    var hot = P.filter(function (p) { return p.hot; }).slice(0, 8);
    $('#feat').innerHTML = hot.map(function (p, i) { return G.card(p, i); }).join('');
    G.tilt($('#feat'));

    /* стикеры героя */
    var seen = {};
    $$('.stk').forEach(function (s) {
      s.addEventListener('click', function (e) {
        var k = s.getAttribute('data-k');
        if (k === 'code') G.toast('Промокод <b>GEEK10</b>: −10%. Введите его в корзине.');
        if (k === 'rare') window.Geek.quick('g-nier');
        if (k === 'egg') G.toast('Подсказка: ↑ ↑ ↓ ↓ ← → ← → B A');
        G.boom({ particleCount: 30, spread: 60, origin: { x: e.clientX / innerWidth, y: e.clientY / innerHeight } });
        if (!seen[k]) { seen[k] = 1; G.addXP(5, 'за клик по стикеру', 'stk:' + k); }
      });
    });

    /* вход в hero и параллакс */
    if (window.gsap && !G.reduce) {
      var gs = window.gsap;
      gs.from('.hero-copy > *', { y: 40, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out', clearProps: 'all' });
      gs.from('.hero-art .card', { scale: .9, opacity: 0, rotate: -3, duration: 1.2, ease: 'power3.out', delay: .2 });
      gs.from('.stk', { scale: 0, duration: .7, stagger: .12, delay: .9, ease: 'back.out(2)' });
      var art = $('.hero-art'), img = $('.hero-art img');
      if (art && window.matchMedia('(pointer:fine)').matches) {
        var qx = gs.quickTo(img, 'x', { duration: .8 }), qy = gs.quickTo(img, 'y', { duration: .8 });
        art.addEventListener('mousemove', function (e) { var r = art.getBoundingClientRect(); qx(((e.clientX - r.left) / r.width - .5) * -24); qy(((e.clientY - r.top) / r.height - .5) * -18); });
        art.addEventListener('mouseleave', function () { qx(0); qy(0); });
      }
    }

    /* куб */
    var faces = [['games', 'Видеоигры', 'PS3 и ретро'], ['comics', 'Комиксы', 'и манга'], ['figures', 'Фигурки', 'аниме'], ['music', 'Музыка', 'винил и CD'], ['food', 'Еда', 'из Азии'], ['drinks', 'Напитки', 'с шариком']];
    var cube = $('#cube'), out = $('#cube-out');
    cube.innerHTML = faces.map(function (f, i) { return '<div class="face f' + (i + 1) + '" data-cat="' + f[0] + '">' + f[1] + '<small>' + f[2] + '</small></div>'; }).join('');
    var rx = -22, ry = 28, vx = 0, vy = .35, drag = false, lx = 0, ly = 0, moved = 0, scene = $('#scene');
    function paint() { cube.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)'; }
    paint();
    scene.addEventListener('pointerdown', function (e) { drag = true; moved = 0; lx = e.clientX; ly = e.clientY; scene.setPointerCapture(e.pointerId); });
    scene.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - lx, dy = e.clientY - ly; moved += Math.abs(dx) + Math.abs(dy); ry += dx * .55; rx -= dy * .55; vy = dx * .12; vx = -dy * .12; lx = e.clientX; ly = e.clientY; paint(); });
    scene.addEventListener('pointerup', function (e) {
      drag = false;
      if (moved < 8) { var el = document.elementFromPoint(e.clientX, e.clientY), f = el && el.closest('.face'); if (f) { out.textContent = 'Открываю раздел: ' + f.firstChild.textContent + '…'; G.addXP(3, 'за вращение куба', 'cube'); setTimeout(function () { location.href = 'catalog.html#' + f.getAttribute('data-cat'); }, 450); } }
      else G.addXP(3, 'за вращение куба', 'cube');
    });
    if (!G.reduce) (function spin() { if (!drag) { ry += vy; rx += vx; vy += (.25 - vy) * .02; vx *= .96; paint(); } requestAnimationFrame(spin); })();
  });
})();
