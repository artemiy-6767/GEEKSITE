/* Geek — каталог: фильтры, поиск, сортировка */
(function () {
  document.addEventListener('geek:ready', function () {
    var G = window.Geek, $ = G.$, $$ = G.$$, P = window.GEEK_PRODUCTS, CATS = window.GEEK_CATS;
    var maxP = Math.max.apply(null, P.map(function (p) { return p.price; }));
    var st = { cat: 'all', q: '', sort: 'pop', max: maxP, stock: false };
    var ids = CATS.map(function (c) { return c.id; });
    function fromHash() { var h = (location.hash || '').slice(1); st.cat = ids.indexOf(h) >= 0 ? h : 'all'; }
    fromHash();

    var chips = $('#chips');
    function paintChips() {
      var counts = { all: P.length }; P.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });
      var list = [{ id: 'all', name: 'Всё' }].concat(CATS);
      chips.innerHTML = list.map(function (c) { return '<button class="chip" type="button" data-c="' + c.id + '" aria-pressed="' + (st.cat === c.id) + '">' + c.name + ' <em>' + counts[c.id] + '</em></button>'; }).join('');
    }
    var rng = $('#rng'); rng.max = maxP; rng.value = maxP; rng.step = 100;
    function paintRng() { $('#rng-v').textContent = 'до ' + G.fmt(st.max); }

    function list() {
      var q = st.q.trim().toLowerCase();
      var r = P.filter(function (p) {
        return (st.cat === 'all' || p.cat === st.cat) && p.price <= st.max && (!st.stock || p.stock > 0) &&
          (!q || (p.name + ' ' + p.desc + ' ' + G.catName(p.cat)).toLowerCase().indexOf(q) >= 0);
      });
      if (st.sort === 'asc') r.sort(function (a, b) { return a.price - b.price; });
      else if (st.sort === 'desc') r.sort(function (a, b) { return b.price - a.price; });
      else if (st.sort === 'name') r.sort(function (a, b) { return a.name.localeCompare(b.name, 'ru'); });
      else r.sort(function (a, b) { return (b.hot || 0) - (a.hot || 0) || a.price - b.price; });
      return r;
    }
    function render() {
      var r = list(), grid = $('#grid');
      $$('.pc', grid).forEach(function (el) { if (el.vanillaTilt) el.vanillaTilt.destroy(); });
      grid.innerHTML = r.map(function (p, i) { return G.card(p, i); }).join('');
      $('#none').hidden = r.length > 0; grid.hidden = r.length === 0;
      $('#count').textContent = 'Найдено: ' + r.length + ' из ' + P.length + (st.cat !== 'all' ? ' · раздел «' + G.catName(st.cat) + '»' : '');
      var h = $('#h1'); h.textContent = st.cat === 'all' ? 'Каталог' : G.catName(st.cat);
      G.tilt(grid); paintChips(); paintRng();
    }

    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      st.cat = b.getAttribute('data-c'); try { history.replaceState(null, '', st.cat === 'all' ? location.pathname + location.search : '#' + st.cat); } catch (x) { location.hash = st.cat === 'all' ? '' : st.cat; }
      render();
    });
    window.addEventListener('hashchange', function () { fromHash(); render(); });
    var t;
    $('#q').addEventListener('input', function (e) { clearTimeout(t); t = setTimeout(function () { st.q = e.target.value; render(); if (st.q) G.addXP(2, 'за поиск', 'search'); }, 160); });
    $('#sort').addEventListener('change', function (e) { st.sort = e.target.value; render(); });
    rng.addEventListener('input', function (e) { st.max = +e.target.value; render(); });
    $('#stock').addEventListener('change', function (e) { st.stock = e.target.checked; render(); });
    $('#reset').addEventListener('click', function () { st = { cat: 'all', q: '', sort: 'pop', max: maxP, stock: false }; $('#q').value = ''; $('#sort').value = 'pop'; rng.value = maxP; $('#stock').checked = false; try { history.replaceState(null, '', location.pathname); } catch (x) {} render(); });
    $('#reset2').addEventListener('click', function () { $('#reset').click(); });

    render();
    if (window.gsap && !G.reduce) window.gsap.from('.page-head > *', { y: 30, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out' });
  });
})();
