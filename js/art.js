/* Geek — оригинальные векторные иллюстрации товаров (никаких известных персонажей). */
(function () {
  var uid = 0;
  function id(p) { return p + (++uid); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  function frame(inner, c, seed) {
    var g = id('bg'), p = id('gr');
    return '<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">' +
      '<defs><radialGradient id="' + g + '" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="' + c[0] + '" stop-opacity=".55"/><stop offset="1" stop-color="' + (c[2] || '#101012') + '"/></radialGradient>' +
      '<pattern id="' + p + '" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern></defs>' +
      '<rect width="400" height="500" fill="url(#' + g + ')"/><rect width="400" height="500" fill="url(#' + p + ')"/>' + inner + '</svg>';
  }

  function lines(t, max) {
    var w = String(t).split(' '), out = [], cur = '';
    w.forEach(function (x) { if ((cur + ' ' + x).trim().length > max && cur) { out.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); });
    if (cur) out.push(cur);
    return out.slice(0, 3);
  }

  var kinds = {
    comic: function (it) {
      var a = it.art, c = a.c, r = rnd(a.s || 7), i, pts = [], n = 28;
      for (i = 0; i < n * 2; i++) { var ang = Math.PI * i / n, rad = i % 2 ? 120 : 205; pts.push((200 + Math.cos(ang) * rad).toFixed(1) + ',' + (230 + Math.sin(ang) * rad).toFixed(1)); }
      var dots = id('dt'), sky = '', x = 0;
      while (x < 400) { var w = 26 + r() * 34, h = 60 + r() * 150; sky += '<rect x="' + x.toFixed(0) + '" y="' + (500 - h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="#0a0a0b"/>'; for (var k = 0; k < 4; k++) if (r() > .5) sky += '<rect x="' + (x + 5 + r() * (w - 12)).toFixed(0) + '" y="' + (500 - h + 10 + r() * (h - 24)).toFixed(0) + '" width="5" height="7" fill="' + c[1] + '"/>'; x += w; }
      var ls = lines(a.t, 11), fs = ls.length > 2 ? 40 : 46, ty = 70, tx = '';
      ls.forEach(function (l, j) { tx += '<text x="200" y="' + (ty + j * (fs + 4)) + '" text-anchor="middle" font-family="Unbounded,Arial Black,sans-serif" font-weight="800" font-size="' + fs + '" fill="' + c[1] + '" stroke="#0a0a0b" stroke-width="6" paint-order="stroke">' + esc(l) + '</text>'; });
      return frame('<defs><pattern id="' + dots + '" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.2" fill="' + c[0] + '"/></pattern></defs>' +
        '<polygon points="' + pts.join(' ') + '" fill="url(#' + dots + ')" opacity=".9"/>' + sky + tx +
        '<g transform="translate(330 400)"><circle r="34" fill="' + c[1] + '" stroke="#0a0a0b" stroke-width="5"/><text y="9" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="24" fill="#0a0a0b">' + esc(a.n || '#1') + '</text></g>', c);
    },
    neko: function (it) {
      var c = it.art.c;
      return frame('<ellipse cx="200" cy="430" rx="130" ry="22" fill="#000" opacity=".5"/><ellipse cx="200" cy="418" rx="120" ry="20" fill="' + c[1] + '"/><ellipse cx="200" cy="410" rx="120" ry="20" fill="#2a2a30"/>' +
        '<path d="M130 400 L150 270 Q200 240 250 270 L270 400 Z" fill="' + c[0] + '"/><path d="M150 270 Q200 300 250 270 L240 252 Q200 270 160 252 Z" fill="' + c[1] + '"/>' +
        '<path d="M268 392 L318 150" stroke="#e8e8ee" stroke-width="7" stroke-linecap="round"/><path d="M262 372 L282 380" stroke="' + c[1] + '" stroke-width="11" stroke-linecap="round"/>' +
        '<polygon points="140,170 148,100 190,140" fill="' + c[0] + '"/><polygon points="260,170 252,100 210,140" fill="' + c[0] + '"/>' +
        '<circle cx="200" cy="186" r="64" fill="#f1e6d3"/><path d="M140 176 Q200 120 260 176 Q250 150 200 144 Q150 150 140 176Z" fill="' + c[0] + '"/>' +
        '<ellipse cx="176" cy="192" rx="9" ry="12" fill="#101012"/><ellipse cx="224" cy="192" rx="9" ry="12" fill="#101012"/><circle cx="179" cy="187" r="3" fill="#fff"/><circle cx="227" cy="187" r="3" fill="#fff"/>' +
        '<path d="M192 214 Q200 222 208 214" stroke="#101012" stroke-width="3" fill="none" stroke-linecap="round"/>', c);
    },
    mecha: function (it) {
      var c = it.art.c;
      return frame('<ellipse cx="200" cy="440" rx="120" ry="20" fill="#000" opacity=".5"/><rect x="110" y="428" width="180" height="16" rx="6" fill="#2a2a30"/>' +
        '<rect x="150" y="330" width="40" height="100" rx="8" fill="' + c[0] + '"/><rect x="210" y="330" width="40" height="100" rx="8" fill="' + c[0] + '"/><rect x="144" y="410" width="52" height="22" rx="6" fill="#3a3a42"/><rect x="204" y="410" width="52" height="22" rx="6" fill="#3a3a42"/>' +
        '<rect x="140" y="215" width="120" height="125" rx="14" fill="' + c[1] + '"/><rect x="170" y="240" width="60" height="46" rx="8" fill="#101012"/><circle cx="200" cy="263" r="12" fill="' + c[0] + '"/>' +
        '<rect x="92" y="205" width="56" height="52" rx="12" fill="' + c[0] + '"/><rect x="252" y="205" width="56" height="52" rx="12" fill="' + c[0] + '"/><rect x="100" y="257" width="34" height="86" rx="10" fill="#3a3a42"/><rect x="266" y="257" width="34" height="86" rx="10" fill="#3a3a42"/>' +
        '<rect x="160" y="130" width="80" height="78" rx="18" fill="#d9d9e0"/><rect x="170" y="156" width="60" height="16" rx="6" fill="#101012"/><rect x="176" y="161" width="48" height="6" rx="3" fill="' + c[0] + '"/><path d="M200 130 V92" stroke="#d9d9e0" stroke-width="5"/><circle cx="200" cy="88" r="8" fill="' + c[0] + '"/>', c);
    },
    dragon: function (it) {
      var c = it.art.c, sp = '', i;
      for (i = 0; i < 7; i++) sp += '<circle cx="' + (150 + i * 14) + '" cy="' + (350 - i * 28) + '" r="7" fill="' + c[1] + '"/>';
      return frame('<ellipse cx="200" cy="440" rx="130" ry="22" fill="#000" opacity=".5"/><ellipse cx="200" cy="428" rx="125" ry="20" fill="#2a2a30"/>' +
        '<path d="M110 410 C60 330 320 350 270 260 S130 190 250 130" fill="none" stroke="' + c[0] + '" stroke-width="40" stroke-linecap="round"/><path d="M110 410 C60 330 320 350 270 260 S130 190 250 130" fill="none" stroke="' + c[1] + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>' +
        '<circle cx="262" cy="118" r="38" fill="' + c[0] + '"/><polygon points="240,92 224,40 262,82" fill="' + c[1] + '"/><polygon points="282,88 308,38 296,100" fill="' + c[1] + '"/><circle cx="276" cy="112" r="7" fill="#101012"/><path d="M296 128 Q326 134 336 120" stroke="' + c[1] + '" stroke-width="6" fill="none" stroke-linecap="round"/>', c);
    },
    vinyl: function (it) {
      var c = it.art.c, g = '', i, ls = lines(it.art.t || '', 12), tx = '';
      for (i = 0; i < 9; i++) g += '<circle cx="245" cy="290" r="' + (52 + i * 9) + '" fill="none" stroke="#2c2c32" stroke-width="1.4"/>';
      ls.forEach(function (l, j) { tx += '<text x="64" y="' + (110 + j * 26) + '" font-family="Unbounded,sans-serif" font-weight="800" font-size="20" fill="' + c[1] + '">' + esc(l) + '</text>'; });
      return frame('<circle cx="245" cy="290" r="138" fill="#0b0b0d"/>' + g + '<circle cx="245" cy="290" r="40" fill="' + c[1] + '"/><circle cx="245" cy="290" r="6" fill="#101012"/>' +
        '<rect x="40" y="70" width="230" height="230" fill="' + c[0] + '"/><circle cx="155" cy="240" r="64" fill="' + c[1] + '" opacity=".9"/><rect x="40" y="258" width="230" height="42" fill="#101012" opacity=".55"/>' + tx, c);
    },
    cd: function (it) {
      var c = it.art.c, g = id('cd'), ls = lines(it.art.t || '', 14), tx = '';
      ls.forEach(function (l, j) { tx += '<text x="200" y="' + (440 + j * 22) + '" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="700" font-size="16" fill="' + c[1] + '">' + esc(l) + '</text>'; });
      return frame('<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f8"/><stop offset=".35" stop-color="' + c[1] + '"/><stop offset=".6" stop-color="#9aa0aa"/><stop offset="1" stop-color="#f4f4f8"/></linearGradient></defs>' +
        '<circle cx="200" cy="230" r="150" fill="url(#' + g + ')"/><circle cx="200" cy="230" r="100" fill="none" stroke="' + c[0] + '" stroke-width="26" opacity=".55"/><circle cx="200" cy="230" r="46" fill="#101012" opacity=".92"/><circle cx="200" cy="230" r="20" fill="' + (c[2] || '#101012') + '"/>' + tx, c);
    },
    ramen: function (it) {
      var c = it.art.c;
      return frame('<path d="M150 118 Q130 70 156 40 M200 118 Q180 60 206 24 M250 118 Q232 70 256 44" stroke="#fff" stroke-opacity=".35" stroke-width="6" fill="none" stroke-linecap="round"/>' +
        '<path d="M80 150 H320 L290 420 Q288 440 268 440 H132 Q112 440 110 420 Z" fill="' + c[0] + '"/><path d="M96 250 H304 L296 330 H104 Z" fill="' + c[1] + '"/>' +
        '<text x="200" y="305" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="30" fill="#101012">' + esc(it.art.t || 'RAMEN') + '</text><ellipse cx="200" cy="150" rx="122" ry="20" fill="#e9e3d6"/><ellipse cx="200" cy="146" rx="112" ry="13" fill="#f6f1e6"/>' +
        '<path d="M250 140 L350 40" stroke="#d8b46b" stroke-width="7" stroke-linecap="round"/><path d="M268 146 L360 66" stroke="#d8b46b" stroke-width="7" stroke-linecap="round"/>', c);
    },
    mochi: function (it) {
      var c = it.art.c, cols = [c[0], c[1], '#f5efe2'], s = '';
      [[140, 300], [260, 300], [200, 230]].forEach(function (p, i) { s += '<ellipse cx="' + p[0] + '" cy="' + (p[1] + 52) + '" rx="64" ry="14" fill="#000" opacity=".25"/><path d="M' + (p[0] - 62) + ' ' + (p[1] + 40) + ' Q' + (p[0] - 62) + ' ' + (p[1] - 40) + ' ' + p[0] + ' ' + (p[1] - 40) + ' Q' + (p[0] + 62) + ' ' + (p[1] - 40) + ' ' + (p[0] + 62) + ' ' + (p[1] + 40) + ' Z" fill="' + cols[i] + '"/><circle cx="' + (p[0] - 18) + '" cy="' + (p[1] + 6) + '" r="5" fill="#101012"/><circle cx="' + (p[0] + 18) + '" cy="' + (p[1] + 6) + '" r="5" fill="#101012"/><path d="M' + (p[0] - 8) + ' ' + (p[1] + 18) + ' Q' + p[0] + ' ' + (p[1] + 26) + ' ' + (p[0] + 8) + ' ' + (p[1] + 18) + '" stroke="#101012" stroke-width="3" fill="none" stroke-linecap="round"/>'; });
      return frame('<ellipse cx="200" cy="372" rx="160" ry="30" fill="#e9e3d6"/><ellipse cx="200" cy="366" rx="148" ry="24" fill="#2a2a30"/>' + s, c);
    },
    chips: function (it) {
      var c = it.art.c, z = '', i, ls = lines(it.art.t || '', 8), tx = '';
      for (i = 0; i < 11; i++) z += (i ? 'L' : 'M') + (90 + i * 22) + ' ' + (i % 2 ? 78 : 62) + ' ';
      var z2 = ''; for (i = 10; i >= 0; i--) z2 += 'L' + (90 + i * 22) + ' ' + (i % 2 ? 448 : 432) + ' ';
      ls.forEach(function (l, j) { tx += '<text x="200" y="' + (250 + j * 34) + '" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="30" fill="#101012">' + esc(l) + '</text>'; });
      return frame('<path d="' + z + z2 + 'Z" fill="' + c[0] + '"/><circle cx="200" cy="260" r="100" fill="' + c[1] + '"/>' + tx + '<path d="M104 400 Q200 360 296 400" stroke="' + c[1] + '" stroke-width="8" fill="none"/>', c);
    },
    pixel: function (it) {
      var c = it.art.c, m = ['..XXXXXX..', '.XXXXXXXXX.', 'XXXXXXXXXXX', 'XXXdXXXXdXX', 'XXXXXXXXXXX', 'XXXXdXXXXXX', 'XXdXXXXXdXX', 'XXXXXXXXXXX', '.XXXXXXXXX.', '..XXXXXX..'], s = '', y, x, q = 30;
      for (y = 0; y < m.length; y++) for (x = 0; x < m[y].length; x++) { var ch = m[y][x]; if (ch !== '.') s += '<rect x="' + (45 + x * q) + '" y="' + (100 + y * q) + '" width="' + q + '" height="' + q + '" fill="' + (ch === 'd' ? c[1] : c[0]) + '"/>'; }
      return frame('<g>' + s + '</g><rect x="45" y="410" width="330" height="10" fill="#000" opacity=".35"/>', c);
    },
    can: function (it) {
      var c = it.art.c, ls = lines(it.art.t || '', 9), tx = '';
      ls.forEach(function (l, j) { tx += '<text x="200" y="' + (330 + j * 26) + '" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="20" fill="#101012">' + esc(l) + '</text>'; });
      return frame('<ellipse cx="200" cy="452" rx="92" ry="14" fill="#000" opacity=".5"/><rect x="110" y="90" width="180" height="350" rx="22" fill="' + c[0] + '"/><rect x="110" y="90" width="180" height="40" rx="18" fill="#c9ccd4"/><rect x="110" y="410" width="180" height="30" rx="14" fill="#c9ccd4"/>' +
        '<polygon points="214,160 164,256 198,256 184,318 240,220 204,220" fill="' + c[1] + '"/><rect x="122" y="300" width="156" height="70" fill="' + c[1] + '" opacity=".92"/>' + tx + '<rect x="128" y="96" width="14" height="330" rx="7" fill="#fff" opacity=".18"/>', c);
    },
    bottle: function (it) {
      var c = it.art.c, ls = lines(it.art.t || '', 9), tx = '';
      ls.forEach(function (l, j) { tx += '<text x="200" y="' + (318 + j * 24) + '" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="18" fill="#101012">' + esc(l) + '</text>'; });
      return frame('<ellipse cx="200" cy="452" rx="84" ry="13" fill="#000" opacity=".5"/><path d="M178 60 H222 V120 Q262 150 262 200 V420 Q262 442 240 442 H160 Q138 442 138 420 V200 Q138 150 178 120 Z" fill="' + c[0] + '" opacity=".88"/><circle cx="200" cy="130" r="14" fill="#e8f4ff"/><rect x="138" y="280" width="124" height="76" fill="' + c[1] + '"/>' + tx + '<rect x="150" y="170" width="10" height="240" rx="5" fill="#fff" opacity=".25"/>', c);
    },
    bowl: function (it) {
      var c = it.art.c, w = '';
      for (var i = 0; i < 9; i++) w += '<line x1="' + (250 + i * 3) + '" y1="260" x2="' + (320 + i * 4) + '" y2="80" stroke="#d8b46b" stroke-width="3"/>';
      return frame('<ellipse cx="200" cy="420" rx="120" ry="16" fill="#000" opacity=".45"/><path d="M80 250 H320 Q320 410 200 410 Q80 410 80 250 Z" fill="#e9e3d6"/><ellipse cx="200" cy="250" rx="120" ry="30" fill="' + c[0] + '"/><ellipse cx="200" cy="246" rx="96" ry="20" fill="' + c[1] + '"/>' + w + '<path d="M120 330 Q200 372 280 330" stroke="' + c[0] + '" stroke-width="10" fill="none" opacity=".8"/>', c);
    }
  };

  window.Art = {
    render: function (it) {
      if (it.img) return '<img src="img/' + it.img + '" alt="' + esc(it.name) + '" loading="lazy" decoding="async">';
      var f = kinds[it.art.k] || kinds.comic;
      return f(it);
    },
    avatar: function (seed, a, b) {
      var r = rnd(seed);
      return '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="' + a + '"/><circle cx="60" cy="52" r="26" fill="' + b + '"/><path d="M14 120 Q60 56 106 120Z" fill="' + b + '"/><rect x="' + (36 + r() * 6) + '" y="40" width="48" height="12" rx="6" fill="#101012" opacity=".85"/></svg>';
    }
  };
})();
