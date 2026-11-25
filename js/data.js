/* Geek — каталог. Магазин и товары вымышленные; игровые диски показаны по фото заказчика. */
window.GEEK_CATS = [
  { id: 'games', name: 'Видеоигры', short: 'Диски PS3 и ретро', img: 'g-unc2.jpg' },
  { id: 'comics', name: 'Комиксы и манга', short: 'Выпуски и тома', art: { k: 'comic', t: 'ГИК', n: '#7', c: ['#ec4a3f', '#f6c945', '#101012'], s: 11 } },
  { id: 'figures', name: 'Аниме-фигурки', short: 'Коллекционные', art: { k: 'neko', c: ['#3b86e0', '#d8b46b', '#101012'] } },
  { id: 'music', name: 'Музыка', short: 'Винил и CD', art: { k: 'vinyl', t: 'NEON URAL', c: ['#ec4a3f', '#f6c945', '#101012'] } },
  { id: 'food', name: 'Еда', short: 'Азия и снеки', art: { k: 'ramen', t: 'RAMEN', c: ['#ec4a3f', '#f6c945', '#101012'] } },
  { id: 'drinks', name: 'Напитки', short: 'Газировки и чай', art: { k: 'can', t: 'CRIT', c: ['#3b86e0', '#f6c945', '#101012'] } },
  { id: 'gear', name: 'Гаджеты и головоломки', short: 'Кубики, кеды, геймпады', img: 'c-cube-c.jpg' }
];

(function () {
  var P = [];
  function add(o) { P.push(o); }
  function game(i, img, name, price, desc, extra) { add(Object.assign({ id: i, cat: 'games', img: img, name: name, price: price, desc: desc, cond: 'Б/у, отличное', stock: 2 + (price % 4) }, extra || {})); }

  game('g-heavyrain', 'g-heavyrain.jpg', 'Heavy Rain, Essentials (PS3)', 1290, 'Нуарный детектив, где каждое решение меняет финал. Издание Essentials, диск без царапин, проверен в консоли.', { badge: 'Классика', hot: 1 });
  game('g-tlou', 'g-tlou.jpg', 'The Last of Us, русская версия (PS3)', 1490, 'Путь через постапокалиптическую Америку. Русские субтитры и озвучка, коробка в отличном состоянии.', { badge: 'Хит', hot: 1 });
  game('g-unc2', 'g-unc2.jpg', 'Uncharted 2: Among Thieves (PS3)', 990, 'Приключенческий блокбастер с поездом, горами и лучшим моментом сюжета в серии.', { hot: 1 });
  game('g-bat-asylum', 'g-bat-asylum.jpg', 'Batman: Arkham Asylum (PS3)', 890, 'Ночь в лечебнице для безумцев. Стелс, драки и целая коллекция загадок.', {});
  game('g-ff13', 'g-ff13.jpg', 'Final Fantasy XIII (PS3)', 1190, 'Японская ролевая игра с ярким визуалом. Лицензионный диск, коллекционный вид.', {});
  game('g-nier', 'g-nier.jpg', 'NieR (PS3)', 1790, 'Культовая ролевая история про отца и сестру. Тираж давно разошёлся.', { badge: 'Редкость', hot: 1, stock: 1 });
  game('g-mgs4', 'g-mgs4.jpg', 'Metal Gear Solid 4, Platinum (PS3)', 1090, 'Финал саги о Снейке. Платиновое издание с жёлтой кромкой.', {});
  game('g-beyond', 'g-beyond.jpg', 'Beyond: Две души (PS3)', 990, 'Интерактивная драма о девушке и её невидимом спутнике. Русская обложка.', {});
  game('g-deusex', 'g-deusex.jpg', 'Deus Ex: Human Revolution (PS3)', 1090, 'Киберпанк с выбором: тихо, громко или словами.', {});
  game('g-mk', 'g-mk.jpg', 'Mortal Kombat, Komplete Edition (PS3)', 1190, 'Файтинг с полным набором бойцов и дополнений.', {});
  game('g-gta4', 'g-gta4.jpg', 'Grand Theft Auto IV (PS3)', 790, 'Либерти-Сити в лучшие годы. Диск и руководство в комплекте.', {});
  game('g-unc1', 'g-unc1.jpg', 'Uncharted: Судьба Дрейка, Platinum (PS3)', 790, 'С чего всё началось. Платиновое издание с карточкой.', {});
  game('g-unc3', 'g-unc3.jpg', 'Uncharted 3: Иллюзии Дрейка, Essentials (PS3)', 890, 'Пустыня, корабль и погоня. Издание Essentials.', {});
  game('g-re5', 'g-re5.jpg', 'Resident Evil 5, Gold Edition (PS3)', 1190, 'Кооперативный хоррор с экшеном. Золотое издание.', {});
  game('g-ninja', 'g-ninja.jpg', 'Ninja Gaiden Sigma 2 (PS3)', 1390, 'Быстрые мечи и сложные боссы. Для тех, кто любит проигрывать красиво.', {});
  game('g-bat-origins', 'g-bat-origins.jpg', 'Batman: Arkham Origins (PS3)', 790, 'Рождественская ночь в Готэме и охота на героя. Белая обложка.', {});
  game('g-bat-city', 'g-bat-city.jpg', 'Batman: Arkham City (PS3)', 990, 'Целый город-тюрьма в открытом мире.', {});
  game('g-infamous2', 'g-infamous2.jpg', 'inFamous 2, русская версия (PS3)', 890, 'Герой с молниями в открытом городе, русская обложка.', {});

  add({ id: 'c-neo', cat: 'comics', name: 'Нео-Урал №1', price: 590, desc: 'Первый выпуск киберпанк-серии о курьерах Екатеринбурга 2077 года. Мягкая обложка, 48 страниц.', art: { k: 'comic', t: 'НЕО-УРАЛ', n: '#1', c: ['#ec4a3f', '#f6c945', '#101012'], s: 3 }, badge: 'New', stock: 14 });
  add({ id: 'c-sogun', cat: 'comics', name: 'Хроники Кибер-Сёгуна, том 1', price: 1190, desc: 'Манга о механическом самурае, который ищет своего сюзерена. Правое направление чтения, суперобложка.', art: { k: 'comic', t: 'КИБЕР СЁГУН', n: 'T1', c: ['#3b86e0', '#efe8da', '#0c1220'], s: 5 }, stock: 9 });
  add({ id: 'c-courier', cat: 'comics', name: 'Полночный курьер, омнибус', price: 2490, desc: 'Три арки в одной книге: твёрдый переплёт, 380 страниц, закладка-ляссе.', art: { k: 'comic', t: 'ПОЛНОЧНЫЙ КУРЬЕР', n: 'ALL', c: ['#d8b46b', '#101012', '#1a1408'], s: 9 }, badge: 'New', stock: 6 });
  add({ id: 'c-pawn', cat: 'comics', name: 'Звёздный ломбард №3', price: 490, desc: 'Комедийный космос и клиенты с самыми странными закладами.', art: { k: 'comic', t: 'ЗВЁЗДНЫЙ ЛОМБАРД', n: '#3', c: ['#3fbf7f', '#f6c945', '#0b1a12'], s: 14 }, stock: 18 });
  add({ id: 'c-bridge', cat: 'comics', name: 'Тени Медного моста, лимитка', price: 3900, desc: 'Ограниченное издание с нумерацией и постером. Тираж 300 копий.', art: { k: 'comic', t: 'ТЕНИ МЕДНОГО МОСТА', n: 'LTD', c: ['#ec4a3f', '#efe8da', '#1a0a0a'], s: 21 }, badge: 'Редкость', hot: 1, stock: 2 });

  add({ id: 'f-neko', cat: 'figures', name: 'Ронин-Нэко, 24 см', price: 5900, desc: 'Кот-мечник в синем кимоно. ПВХ, ручная покраска, подставка в комплекте.', art: { k: 'neko', c: ['#3b86e0', '#d8b46b', '#101012'] }, hot: 1, stock: 5 });
  add({ id: 'f-mecha', cat: 'figures', name: 'Мех-Страж Курогане, 1/12', price: 8400, desc: 'Подвижная фигура с 30 точками артикуляции. Сменные кисти и дымовой эффект.', art: { k: 'mecha', c: ['#ec4a3f', '#d9d9e0', '#101012'] }, stock: 3 });
  add({ id: 'f-dragon', cat: 'figures', name: 'Дракон Тэнсё на пьедестале', price: 12900, desc: 'Статуя с позолотой по гребню. Лимитированная партия, пронумерованная коробка.', art: { k: 'dragon', c: ['#3fbf7f', '#d8b46b', '#101012'] }, badge: 'Редкость', hot: 1, stock: 1 });
  add({ id: 'f-witch', cat: 'figures', name: 'Чиби-ведьма с котлом', price: 2600, desc: 'Маленькая фигурка для рабочего стола, 11 см.', art: { k: 'neko', c: ['#f6c945', '#ec4a3f', '#101012'] }, stock: 12 });
  add({ id: 'f-pilot', cat: 'figures', name: 'Робо-пилот «Кайдзю-ремонт»', price: 4300, desc: 'Сборная модель, 140 деталей. Клей не нужен.', art: { k: 'mecha', c: ['#3b86e0', '#f6c945', '#101012'] }, stock: 7 });

  add({ id: 'm-neon', cat: 'music', name: 'Neon Ural 2077, винил', price: 3200, desc: 'Тёмный синтвейв, 180 г, красный полупрозрачный винил. Двойной конверт.', art: { k: 'vinyl', t: 'NEON URAL 2077', c: ['#ec4a3f', '#f6c945', '#101012'] }, hot: 1, stock: 6 });
  add({ id: 'm-8bit', cat: 'music', name: '8-bit Lullabies, CD', price: 890, desc: 'Колыбельные в чиптюне. Бонус: версия «для сна» на 40 минут.', art: { k: 'cd', t: '8-BIT LULLABIES', c: ['#3b86e0', '#c9ccd4', '#101012'] }, stock: 20 });
  add({ id: 'm-sysadmin', cat: 'music', name: 'Тёплый синтвейв для сисадминов, винил', price: 2900, desc: 'Лоу-фай для ночных деплоев. Жёлтый винил, вкладыш с логами.', art: { k: 'vinyl', t: 'SYSADMIN WAVE', c: ['#3fbf7f', '#101012', '#0b1a12'] }, stock: 8 });
  add({ id: 'm-forest', cat: 'music', name: 'Меднолесье, саундтрек, CD', price: 1100, desc: 'Оркестровая музыка к приключенческой игре. Буклет на 24 страницы.', art: { k: 'cd', t: 'МЕДНОЛЕСЬЕ OST', c: ['#d8b46b', '#efe8da', '#1a1408'] }, stock: 11 });

  add({ id: 'd-ramen', cat: 'food', name: 'Рамен-кап «Красный дракон»', price: 290, desc: 'Острый рамен в стакане. Заливается кипятком, готов за 3 минуты. Перец: 4 из 5.', art: { k: 'ramen', t: 'RED DRAGON', c: ['#ec4a3f', '#f6c945', '#101012'] }, hot: 1, stock: 60 });
  add({ id: 'd-mochi', cat: 'food', name: 'Моти «Сакура», 6 шт.', price: 690, desc: 'Рисовые пирожные с пастой из красной фасоли. Хранить в холодильнике.', art: { k: 'mochi', c: ['#f7b3c4', '#bfe3c4', '#101012'] }, badge: 'New', stock: 24 });
  add({ id: 'd-chips', cat: 'food', name: 'Чипсы «Нори-краб»', price: 230, desc: 'Хрустящие чипсы с водорослями нори и вкусом краба.', art: { k: 'chips', t: 'NORI KRAB', c: ['#3b86e0', '#f6c945', '#101012'] }, stock: 80 });
  add({ id: 'd-pixel', cat: 'food', name: 'Печенье «8-бит», 12 шт.', price: 540, desc: 'Пиксельное печенье с шоколадной крошкой в подарочной коробке.', art: { k: 'pixel', c: ['#d8b46b', '#6b3d1e', '#101012'] }, stock: 30 });

  add({ id: 'k-ramune', cat: 'drinks', name: 'Лимонад «Рамунэ-пиксель»', price: 210, desc: 'Японская газировка в бутылке с шариком. Вкус лимона и мяты.', art: { k: 'bottle', t: 'RAMUNE PX', c: ['#3b86e0', '#f6c945', '#101012'] }, stock: 50 });
  add({ id: 'k-matcha', cat: 'drinks', name: 'Матча-набор для латте', price: 1150, desc: 'Порошок матча 30 г, венчик и мерная ложка в одной коробке.', art: { k: 'bowl', c: ['#3fbf7f', '#d8f0c8', '#101012'] }, badge: 'New', stock: 15 });
  add({ id: 'k-crit', cat: 'drinks', name: 'Энергетик «Критический удар»', price: 190, desc: 'Банка 450 мл. Вкус тропиков. Не рекомендован детям и беременным.', art: { k: 'can', t: 'CRIT HIT', c: ['#ec4a3f', '#f6c945', '#101012'] }, hot: 1, stock: 90 });
  add({ id: 'k-yuzu', cat: 'drinks', name: 'Холодный чай «Юдзу-квест»', price: 230, desc: 'Зелёный чай с цитрусом юдзу, без сахара.', art: { k: 'can', t: 'YUZU QUEST', c: ['#f6c945', '#3fbf7f', '#101012'] }, stock: 45 });

  add({ id: 'g-cube', cat: 'gear', name: 'Кубик 3×3 «Скоростной»', price: 790, img: 'c-cube-a.jpg', desc: 'Магнитный кубик для спидкубинга. Смазка и чехол в комплекте.', stock: 25, hot: 1 });
  add({ id: 'g-cube2', cat: 'gear', name: 'Кубик 3×3 «Классика»', price: 590, img: 'c-cube-b.jpg', desc: 'Яркие грани и плавный ход. Подойдёт для первого собирания.', stock: 40 });
  add({ id: 'g-pad', cat: 'gear', name: 'Геймпад «Ночной режим»', price: 4900, img: 'c-pad.jpg', desc: 'Беспроводной, чёрный матовый. Работает с ПК и консолями, до 20 часов без зарядки.', stock: 9 });
  add({ id: 'g-shoe', cat: 'gear', name: 'Кеды «Алый коммит»', price: 5400, img: 'c-shoe.jpg', desc: 'Красные высокие кеды с кремовой шнуровкой. Размеры 36–46.', stock: 16, badge: 'Хит' });
  add({ id: 'g-phone', cat: 'gear', name: 'Ретро-раскладушка «Y2K»', price: 3200, img: 'c-phone.jpg', desc: 'Телефон-раскладушка для тех, кто скучает по звонкам без ленты. 2G и 3G.', stock: 4 });

  window.GEEK_PRODUCTS = P;
  window.GEEK_BY_ID = {};
  P.forEach(function (p) { window.GEEK_BY_ID[p.id] = p; });
})();
