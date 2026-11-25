/* Geek — регистрация и карта клуба */
(function () {
  document.addEventListener('geek:ready', function () {
    var G = window.Geek, $ = G.$, $$ = G.$$;
    var CLS = {
      collector: { n: 'Коллекционер', c1: '#f2d99a', c2: '#a8792b', perk: 'Ранний доступ к лимитированным изданиям и номерным фигуркам.', sw: '#d8b46b' },
      gamer: { n: 'Геймер', c1: '#8cc0ff', c2: '#1d4f9a', perk: 'Скидка на диски и первый выбор среди редких релизов.', sw: '#3b86e0' },
      otaku: { n: 'Отаку', c1: '#ff9b92', c2: '#8f1f19', perk: 'Предзаказы фигурок и манги из Японии без очереди.', sw: '#ec4a3f' },
      gourmet: { n: 'Гурман', c1: '#8fe3b8', c2: '#1b6b44', perk: 'Дегустационные наборы еды и напитков раз в месяц.', sw: '#3fbf7f' }
    };
    var INT = ['Комиксы', 'Манга', 'Фигурки', 'Винил', 'Видеоигры', 'Настолки', 'Рамен', 'Ретро-техника'];
    var st = { cls: 'collector', name: '', email: '', pass: '', ints: [], step: 0 };
    var prof = G.store.get('profile', null);

    $('#classes').innerHTML = Object.keys(CLS).map(function (k) { var c = CLS[k]; return '<button type="button" class="cls" data-k="' + k + '" aria-pressed="' + (k === st.cls) + '"><span class="sw" style="background:' + c.sw + '"></span><b>' + c.n + '</b><span>' + c.perk + '</span></button>'; }).join('');
    $('#ints').innerHTML = INT.map(function (i) { return '<button type="button" class="chip" aria-pressed="false">' + i + '</button>'; }).join('');

    function num(name) { var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 9000; return 'GK-' + String(1000 + h).slice(0, 4); }
    var MON = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    function paintCard() {
      var c = CLS[st.cls], card = $('#mcard');
      card.style.setProperty('--c1', c.c1); card.style.setProperty('--c2', c.c2);
      $('#m-name', card).textContent = (st.name.trim() || 'Ваше имя').toUpperCase();
      $('#m-cls', card).textContent = c.n.toUpperCase();
      $('#m-num', card).textContent = num(st.name.trim() || 'geek');
      var d = new Date(); $('#m-since', card).textContent = 'с ' + d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear();
    }
    function show(n) {
      st.step = n; $$('.pane').forEach(function (p, i) { p.classList.toggle('on', i === n); });
      $$('.steps i').forEach(function (s, i) { s.classList.toggle('on', i <= n); });
      var w = $('#form-wrap'); if (window.gsap && !G.reduce) window.gsap.fromTo(w, { y: 10 }, { y: 0, duration: .4, ease: 'power2.out' });
    }
    function err(id, msg) { var i = $('#' + id), e = $('#e-' + id); e.textContent = msg || ''; i.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg; }
    function strength(p) {
      var s = 0; if (p.length >= 8) s++; if (/[a-zа-я]/.test(p) && /[A-ZА-Я]/.test(p)) s++; if (/\d/.test(p)) s++; if (/[^\w\sа-яА-Я]/.test(p) || p.length >= 14) s++;
      var cols = ['#ec4a3f', '#f6c945', '#9bd36b', '#3fbf7f'];
      $$('#str i').forEach(function (b, i) { b.style.background = i < s ? cols[s - 1] : ''; });
      $('#str-t').textContent = p ? ['Слабый', 'Слабый', 'Так себе', 'Хороший', 'Надёжный'][s] : '';
    }

    $('#classes').addEventListener('click', function (e) {
      var b = e.target.closest('.cls'); if (!b) return; st.cls = b.getAttribute('data-k');
      $$('.cls').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); paintCard();
      if (window.gsap && !G.reduce) window.gsap.fromTo('#mcard', { rotateY: -14, scale: .97 }, { rotateY: 0, scale: 1, duration: .7, ease: 'elastic.out(1,.6)' });
    });
    $('#ints').addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); });
    $('#f-name').addEventListener('input', function (e) { st.name = e.target.value; paintCard(); if (e.target.getAttribute('aria-invalid') === 'true') err('f-name'); });
    $('#f-email').addEventListener('input', function (e) { st.email = e.target.value; if (e.target.getAttribute('aria-invalid') === 'true') err('f-email'); });
    $('#f-pass').addEventListener('input', function (e) { st.pass = e.target.value; strength(st.pass); if (e.target.getAttribute('aria-invalid') === 'true') err('f-pass'); });
    $('#pass-toggle').addEventListener('click', function (e) { var i = $('#f-pass'), on = i.type === 'password'; i.type = on ? 'text' : 'password'; e.target.textContent = on ? 'Скрыть' : 'Показать'; });

    $('#to-1').addEventListener('click', function () { show(1); $('#f-name').focus(); });
    $('#back-0').addEventListener('click', function () { show(0); });
    $('#to-2').addEventListener('click', function () {
      var a = err('f-name', st.name.trim().length < 2 ? 'Введите имя, хотя бы два символа.' : '');
      var b = err('f-email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(st.email.trim()) ? '' : 'Проверьте адрес почты, например name@mail.ru.');
      var c = err('f-pass', st.pass.length < 8 ? 'Пароль короче 8 символов.' : '');
      if (a && b && c) show(2);
    });
    $('#back-1').addEventListener('click', function () { show(1); });

    function finish(p) {
      $$('.pane').forEach(function (x) { x.classList.remove('on'); }); $('.steps').hidden = true; $('#done').classList.add('on');
      $('#d-name').textContent = p.name.split(' ')[0]; $('#d-cls').textContent = CLS[p.cls].n;
      st.cls = p.cls; st.name = p.name; paintCard();
    }
    $('#form').addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = $('#f-agree').checked; $('#e-agree').textContent = ok ? '' : 'Без согласия мы не сможем создать карту.';
      if (!ok) return;
      var ints = $$('#ints .chip').filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return c.textContent; });
      var p = { name: st.name.trim(), cls: st.cls, num: num(st.name.trim()), ints: ints };
      G.store.set('profile', p);
      finish(p); G.addXP(50, 'за вступление в клуб', 'register'); G.boom({ particleCount: 200, spread: 120, origin: { y: .55 } });
      var nl = $('.nav a[href="register.html"]'); if (nl) nl.textContent = 'Мой профиль';
      var hb = $('.hdr .btn-gold'); if (hb) hb.textContent = p.name.split(' ')[0];
      if (window.gsap && !G.reduce) window.gsap.fromTo('#mcard', { rotateY: 180, scale: .8 }, { rotateY: 0, scale: 1, duration: 1.1, ease: 'power3.out' });
    });
    $('#copy-code').addEventListener('click', function () {
      function ok() { G.toast('Код <b>REG15</b> скопирован. Вставьте его в корзине.'); }
      function fb() { var r = document.createRange(); r.selectNodeContents($('#code-t')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); G.toast('Код выделен, скопируйте его вручную.'); }
      try { navigator.clipboard.writeText('REG15').then(ok, fb); } catch (e) { fb(); }
    });
    $('#logout').addEventListener('click', function () {
      G.store.set('profile', null); G.toast('Профиль удалён из этого браузера.');
      setTimeout(function () { location.reload(); }, 700);
    });

    if (prof && prof.name) finish(prof); else { show(0); paintCard(); }
    if (window.VanillaTilt && !G.reduce && matchMedia('(pointer:fine)').matches) window.VanillaTilt.init($('#mcard'), { max: 12, speed: 400, glare: true, 'max-glare': .3, perspective: 900 });
    if (window.gsap && !G.reduce) window.gsap.from('.reg > *', { y: 36, opacity: 0, duration: .9, stagger: .15, ease: 'power3.out' });
  });
})();
