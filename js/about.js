/* Geek — о компании */
(function () {
  document.addEventListener('geek:ready', function () {
    var G = window.Geek, $ = G.$, $$ = G.$$;

    var team = [['Артём', 'Основатель, закупки манги и фигурок', '#3b86e0', '#efe8da'], ['Илья', 'Основатель, видеоигры и железо', '#ec4a3f', '#f6c945'], ['Марина', 'Куратор винила и CD', '#3fbf7f', '#101012'], ['Ксения', 'Шеф кафе-бара и вкусов', '#d8b46b', '#101012']];
    $('#team').innerHTML = team.map(function (m, i) { return '<div class="tm" data-rv><div class="av">' + window.Art.avatar(i + 3, m[2], m[3]) + '</div><div class="tx"><h3>' + m[0] + '</h3><span>' + m[1] + '</span></div></div>'; }).join('');

    /* линия времени */
    var tl = $('.tl'), prog = $('.prog', tl), evs = $$('.ev', tl);
    if (window.ScrollTrigger && window.gsap && !G.reduce) {
      window.gsap.to(prog, { height: function () { return tl.offsetHeight - 16; }, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 70%', scrub: .6 } });
      evs.forEach(function (ev) { window.ScrollTrigger.create({ trigger: ev, start: 'top 70%', onEnter: function () { ev.classList.add('lit'); }, onLeaveBack: function () { ev.classList.remove('lit'); } }); });
    } else { prog.style.height = 'calc(100% - 16px)'; evs.forEach(function (e) { e.classList.add('lit'); }); }

    /* FAQ */
    $$('.q button').forEach(function (b) {
      b.addEventListener('click', function () {
        var q = b.parentNode, on = !q.classList.contains('open');
        $$('.q.open').forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
        if (on) { q.classList.add('open'); b.setAttribute('aria-expanded', 'true'); G.addXP(2, 'за любопытство', 'faq'); }
      });
    });

    /* копирование почты */
    var cb = $('#copy-mail');
    cb.addEventListener('click', function () {
      var txt = $('#mail').textContent;
      function ok() { G.toast('Адрес скопирован: <b>' + txt + '</b>'); }
      function fallback() { var r = document.createRange(); r.selectNodeContents($('#mail')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); G.toast('Адрес выделен, скопируйте его вручную.'); }
      try { navigator.clipboard.writeText(txt).then(ok, fallback); } catch (e) { fallback(); }
    });

    if (window.gsap && !G.reduce) window.gsap.from('.about-hero > *', { y: 36, opacity: 0, duration: .9, stagger: .15, ease: 'power3.out' });
  });
})();
