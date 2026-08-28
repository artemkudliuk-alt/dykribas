/* ==========================================================================
   RIBAS DUKE — 3-LANGUAGE I18N LOCALIZATION ENGINE (UA / EN / RU)
   ========================================================================== */

(function () {
  const translations = {
    ua: {
      // Header
      nav_wifi: "Wi-Fi",
      nav_reception: "Рецепція",
      nav_chat: "Написати нам",
      nav_menu: "Меню",
      
      // Floating Right Widget
      pillow_widget: "Меню подушок",
      
      // Screen Indicators
      screen_1: "01. Вітання",
      screen_2: "02. Ресторан LenMar",
      screen_3: "03. SPA & Басейн",
      screen_4: "04. Конференції & Події",
      screen_5: "05. Гід по Одесі",
      screen_6: "06. Рецепція & Сервіси",
      screen_7: "07. Контакти & Локація",

      // 1-Word Sidebar Indicator Labels
      ind_screen_1: "Головна",
      ind_screen_2: "Ресторан",
      ind_screen_3: "СПА",
      ind_screen_4: "Конференції",
      ind_screen_5: "Одеса",
      ind_screen_6: "Рецепція",
      ind_screen_7: "Контакти",

      // Mobile Menu Screen Links
      mob_screen_1: "Готель • Головна",
      mob_screen_2: "Ресторан LenMar",
      mob_screen_3: "SPA & Басейн",
      mob_screen_4: "Конференції & Події",
      mob_screen_5: "Гід по Одесі & Дозвілля",
      mob_screen_6: "Рецепція & Сервіси",
      mob_screen_7: "Контакти & Локація",
      
      // Scroll Hint
      scroll_hint: "СКРОЛЬТЕ ВНИЗ",
      
      // Screen 1 Hero Content
      hero_title: "Ласкаво просимо до Одеси",
      hero_desc: "Ribas Duke — ваш 5-зірковий простір затишку та вишуканості поруч із видатним Оперним театром. Ми подбали про найменші деталі, щоб ваше перебування у місті біля моря було бездоганним.",
      
      // Screen 2: Restaurant LenMar
      screen2_tagline: "ГАСТРОНОМІЧНИЙ ПРОСТІР",
      screen2_title: "Ресторан LenMar: гастрономічні акценти Одеси",
      screen2_desc: "Вишукана європейська та авторська одеська кухня в елегантній атмосфері. Свіжі морепродукти, локальні делікатеси та вишукана винна карта для ваших сніданків, ділових обідів і романтичних вечерь.",
      screen2_breakfast_title: "Сніданки (шведський стіл / авторська подача)",
      screen2_breakfast_time: "08:00–11:00",
      screen2_restaurant_title: "Ресторан LenMar",
      screen2_restaurant_time: "12:00–23:00",
      screen2_bar_title: "Бар",
      screen2_bar_time: "Цілодобово",
      screen2_roomservice_title: "Room Service (обслуговування в номерах)",
      screen2_roomservice_time: "08:00–21:00",
      screen2_btn_menu: "Переглянути онлайн-меню ресторану",
      screen2_btn_reserve: "Забронювати столик на вечір",
      screen2_btn_roomservice: "Замовити їжу та напої в номер",
      screen2_btn_minibar: "Меню міні-бар",
      screen2_services_title: "Послуги ресторану",
      screen2_btn_menu_short: "Меню ресторану",
      screen2_btn_minibar_short: "Міні-бар",
      screen2_btn_roomservice_short: "Замовити в номер",
      screen2_btn_reserve_short: "Забронювати столик",
      slider_dish_1: "Філе качки з трюфельним пюре · 680 ₴",
      slider_dish_2: "Особуко з шафрановим різотто · 840 ₴",
      slider_dish_3: "Паста з морепродуктами · 705 ₴",
      slider_dish_4: "Салат «Цезар» з куркою · 410 ₴",
      slider_dish_5: "Креветки в паніровці з пармезану · 670 ₴",
      pill_dish_1: "Качка",
      pill_dish_2: "Особуко",
      pill_dish_3: "Паста",
      pill_dish_4: "Цезар",
      pill_dish_5: "Креветки",
      
      // Screen 3: SPA & Wellness
      screen3_tagline: "SPA & WELLNESS КОМПЛЕКС",
      screen3_title: "ЗОНА ГАРМОНІЇ<br>ТА ВІДНОВЛЕННЯ",
      screen3_desc: "Відновіть сили та життєвий тонус після насиченого дня в Одесі. Наш СПА-комплекс пропонує критий басейн, зону відпочинку, а також фінську сауну та традиційний хамам.",
      screen3_pool_title: "СПА-центр та басейн",
      screen3_pool_time: "Працюють цілодобово 24/7",
      screen3_robe_title: "Дрес-код та комфорт",
      screen3_robe_desc: "Можна спуститися з номера безпосередньо в халаті та капцях",
      screen3_massage_title: "Масажні кабінети та сауна",
      screen3_massage_desc: "Індивідуальні години за попереднім записом на рецепції (+380 93 198 21 39)",
      screen3_btn_menu: "Переглянути SPA-меню та вартість процедур",
      screen3_btn_book: "Записатися на СПА",
      
      // Screen 4: Conference & Events
      screen4_tagline: "КОНФЕРЕНЦ-СЕРВІС ТА ЗАХОДИ",
      screen4_title: "ПРОСТІР ДЛЯ УСПІШНИХ ПОДІЙ<br>ТА БІЗНЕС-ЗУСТРІЧЕЙ",
      screen4_desc: "Готель Ribas Duke запрошує провести ваші найважливіші події на найвищому рівні. До ваших послуг — вишуканий банкетний зал для масштабних конференцій та сучасні зали для переговорів, оснащені преміальним мультимедійним обладнанням. Створюйте бездоганне враження під час презентацій, ділових зустрічей чи закритих урочистостей у самому серці Одеси.",
      screen4_desc_p1: "Готель Ribas Duke запрошує провести ваші найважливіші події на найвищому рівні.",
      screen4_desc_p2: "До ваших послуг — вишуканий банкетний зал для масштабних конференцій та сучасні зали для переговорів, оснащені преміальним мультимедійним обладнанням.",
      screen4_desc_p3: "Створюйте бездоганне враження під час презентацій, ділових зустрічей чи закритих урочистостей у самому серці Одеси.",
      screen4_safe_note: "Завдяки наявності спеціально облаштованого залу в укритті, ваші заходи пройдуть безпечно та без жодних перерв за будь-яких обставин.",
      screen4_conf_title: "Конференц-зали",
      screen4_conf_desc: "Гнучка розсадка (50–80 осіб), професійний звук та проекційне обладнання",
      screen4_coffeebreak_title: "Кава-брейки та фуршети",
      screen4_coffeebreak_desc: "Індивідуальне меню від шеф-кухаря ресторану",
      screen4_manager_title: "Персональний менеджер події",
      screen4_manager_desc: "Повний супровід від організації до завершення заходу",
      screen4_btn_pdf: "Конференц-можливості",
      screen4_btn_inquiry: "Запит на розрахунок події",
      
      // Inquiry Lead Form Modal
      inquiry_badge: "КОНФЕРЕНЦ-СЕРВІС RIBAS DUKE",
      inquiry_modal_title: "Запит на розрахунок події",
      inquiry_modal_subtitle: "Залиште ваші контактні дані, і персональний менеджер підготує індивідуальну пропозицію залів, обладнання та кейтерингу:",
      inquiry_first_name_label: "Ім'я *",
      inquiry_last_name_label: "Прізвище *",
      inquiry_phone_label: "Номер телефону *",
      inquiry_type_label: "Формат події (необов'язково)",
      inquiry_opt_conf: "Конференція / Семінар",
      inquiry_opt_meeting: "Ділова зустріч / Переговори",
      inquiry_opt_banquet: "Банкет / Урочистість",
      inquiry_opt_presentation: "Презентація / Воркшоп",
      inquiry_submit_btn: "НАДІСЛАТИ ЗАПИТ МЕНЕДЖЕРУ",
      inquiry_success_title: "Запит успішно надіслано!",
      inquiry_success_desc: "Дякуємо! Наш менеджер подій зв'яжеться з вами за вказаним номером телефону протягом 15 хвилин.",
      inquiry_success_close: "ЗАКРИТИ",
      inquiry_or_contact: "Або зв'яжіться з нами напряму:",
      
      // Screen 5: Odesa Leisure & Culture
      screen5_tagline: "КУЛЬТУРА ТА ДОЗВІЛЛЯ",
      screen5_title: "ВІДКРИЙТЕ ДЛЯ СЕБЕ ОДЕСУ<br>РАЗОМ ІЗ RIBAS DUKE",
      screen5_desc: "Найвидатніші пам'ятки архітектури, театри та атмосферні вулиці знаходяться буквально за декілька кроків від нашого готелю.",
      screen5_opera_title: "Культурне життя & Оперний театр",
      screen5_opera_desc: "Прямо навпроти готелю. Допоможемо з квитками",
      screen5_center_title: "Історичний центр & Дерибасівська",
      screen5_center_desc: "2 хвилини пішки до Приморського бульвару",
      screen5_sea_title: "Прогулянки до моря та узбережжя",
      screen5_sea_desc: "Морське узбережжя, пляжі та мальовничі одеські парки",
      screen5_tours_title: "Індивідуальні екскурсії містом",
      screen5_tours_desc: "Одеські дворики, катакомби та таємниці з гідом",
      screen5_btn_map: "Туристична карта-маршрут",
      screen5_btn_tickets: "Афіша подій Одеси",
      screen5_events_modal_title: "Афіша подій Одеси — Karabas",
      screen5_btn_transfer: "Замовити трансфер",
      
      // Transfer Booking Modal
      transfer_badge: "ТРАНСФЕР & КОНСЬЄРЖ RIBAS DUKE",
      transfer_modal_title: "Замовлення трансферу",
      transfer_modal_subtitle: "Вкажіть ваші дані та бажаний маршрут, і служба консьєржа організує комфортну поїздку на авто преміум-класу:",
      transfer_route_label: "Маршрут трансферу",
      transfer_opt_airport: "Аеропорт Одеса (ODS)",
      transfer_opt_station: "Головний Залізничний вокзал",
      transfer_opt_city: "Поїздка по місту / Узбережжя",
      transfer_opt_intercity: "Міжміський трансфер",
      transfer_submit_btn: "ЗАМОВИТИ ТРАНСФЕР",
      transfer_success_title: "Заявку на трансфер прийнято!",
      transfer_success_desc: "Дякуємо! Консьєрж-служба зв'яжеться з вами за номером телефону для підтвердження часу подачі авто.",
      
      // GPSMyCity Tour Map Modal
      tourmap_badge: "GPSMYCITY • ТУРИСТИЧНИЙ МАРШРУТ",
      tourmap_modal_title: "Пішохідна карта «Одеса»",
      tourmap_modal_subtitle: "Популярний авторський туристичний маршрут історичним центром Одеси з детальним описом локацій та GPS-навігацією:",
      tourmap_distance: "Дистанція",
      tourmap_duration: "Тривалість",
      tourmap_spots: "Локацій",
      tour_spot_1: "Одеський академічний театр опери та балету",
      tour_spot_2: "Пам'ятник Дюку де Рішельє & Приморський бульвар",
      tour_spot_3: "Легендарні Потьомкінські сходи та фунікулер",
      tour_spot_4: "Вулиця Дерибасівська, Міський сад та Пасаж",
      tour_spot_5: "Воронцовський палац, Тещин міст та Колонада",
      tourmap_open_btn: "ВІДКРИТИ МАРШРУТ У GPSMYCITY",
      tourmap_concierge_note: "Бажаєте приватного гіда? Зв'яжіться з консьєржем:",
      
      // Screen 6: Useful Info & Services
      screen6_tagline: "КОРИСНЕ ПІД ЧАС ПРОЖИВАННЯ",
      screen6_title: "УСЕ ДЛЯ ВАШОГО<br>БЕЗДОГАННОГО ПЕРЕБУВАННЯ",
      screen6_checkin_title: "🕑 Заїзд: з 14:00 • 🕛 Виїзд: до 12:00",
      screen6_checkin_desc: "Бажаєте оформити ранній заїзд або пізній виїзд? Будь ласка, зверніться на рецепцію заздалегідь.",
      screen6_wifi_title: "Wi-Fi в номері та готелі",
      screen6_wifi_desc: "Мережа: hotel-duke • Пароль: 06062014",
      screen6_luggage_title: "Багажна кімната та відправка багажу",
      screen6_luggage_desc: "Безкоштовне зберігання або експрес-доставка Новою Поштою",
      screen6_parking_title: "Паркінг для гостей",
      screen6_parking_desc: "Зручні послуги паркування авто поруч із готелем",
      screen6_safe_title: "Інструкція до сейфа",
      screen6_safe_desc: "Електронний сейф у вашій шафі • Допомога рецепції 24/7",
      screen6_btn_wifi: "Скопіювати пароль Wi-Fi",
      screen6_btn_safe: "Інструкція до сейфа",
      screen6_btn_luggage: "Послуги багажу",
      screen6_btn_reception: "Викликати рецепцію",
      
      // Screen 7: Footer & Contacts
      screen7_tagline: "RIBAS DUKE BOUTIQUE HOTEL",
      screen7_title: "ДЯКУЄМО, ЩО ОБРАЛИ НАС",
      screen7_farewell: "Бажаємо вам неповторного та натхненного відпочинку в Одесі!<br>З повагою та турботою, команда Ribas Duke.",
      screen7_address_label: "Адреса",
      screen7_address_val: "Україна, м. Одеса, пров. Театральний, 10",
      screen7_phone_label: "Телефони",
      screen7_phone_val: "+38 (048) 705-37-75 • +38 (048) 705-37-73",
      screen7_btn_call: "Зателефонувати в готель",
      screen7_btn_route: "Маршрут на карті",
      screen7_map_modal_title: "Маршрут до Ribas Duke (пров. Театральний, 10)",
      
      // Wi-Fi Popover
      wifi_title: "Wi-Fi в готелі",
      wifi_network_label: "МЕРЕЖА:",
      wifi_password_label: "ПАРОЛЬ:",
      wifi_copy_btn: "СКОПІЮВАТИ ПАРОЛЬ",
      wifi_copied_btn: "✓ СКОПІЙОВАНО!",
      wifi_copied_toast: "Пароль Wi-Fi (06062014) скопійовано!",
      
      // Reception Popover
      reception_title: "Служба рецепції 24/7",
      reception_desc: "Цілодобовий зв'язок з консьєржем та адміністратором:",
      reception_internal: "Внутрішній номер: 101",
      reception_call_btn: "ПОДЗВОНИТИ НА РЕЦЕПЦІЮ",
      
      // Chat Popover
      chat_title: "Написати нам",
      chat_desc: "Оберіть зручний месенджер для швидкої відповіді:",
      
      // Restaurant Menu Popover & Modal
      menu_title: "Ресторан LenMar",
      menu_desc: "Вишукані страви одеської та європейської кухні, авторська карта вин.",
      menu_open_pdf: "ВІДКРИТИ МЕНЮ",
      
      // Pillow Modal
      pillow_modal_title: "Меню Подушок — Ribas Duke",
      pillow_modal_desc: "Ідеальний сон — мистецтво відпочинку. Оберіть подушку та замовте на рецепції.",
      pillow_order_btn: "ЗАМОВИТИ НА РЕЦЕПЦІЇ",
      
      // SPA Complex Modal
      spa_modal_title: "SPA & Wellness Комплекс — Ribas Duke",
      spa_modal_badge_pool: "Басейн 35 м² • Зона релаксу",
      spa_modal_tag: "«SANUS PER AQUAM»",
      spa_modal_heading: "Здоров'я та гармонія через воду",
      spa_modal_intro: "Відновити сили та життєвий тонус після насиченого подіями дня ви зможете в СПА готелю Ribas Duke. Дотримуючись саме цієї концепції, ми створили простір відпочинку, де ви поринете в атмосферу цілковитої гармонії та спокою.",
      spa_modal_card1_title: "Критий басейн та зона відпочинку",
      spa_modal_card1_desc: "Критий басейн площею 35 кв.м. із кришталево чистою водою, водоспадом та комфортними шезлонгами для безтурботного релаксу.",
      spa_modal_card2_title: "Фінська сауна та хамам",
      spa_modal_card2_desc: "Парові та термічні процедури розслаблюють свідомість, поліпшують кровообіг, знімають стрес та позитивно впливають на нервову систему.",
      spa_modal_card3_title: "СПА-масажі з арома-оліями",
      spa_modal_card3_desc: "Цілющий ефект: глибоке розслаблення м'язів, покращення сну, збагачення шкіри вітамінами та мінералами для відновлення тонусу.",
      spa_modal_card4_title: "Тренажерний зал та кардіо-зона",
      spa_modal_card4_desc: "Сучасні кардіотренажери для підтримки тонусу та енергійних тренувань під час відпочинку в готелі.",
      spa_modal_guest_badge: "ТАРИФИ ТА ГОСТЬОВІ ВІЗИТИ",
      spa_modal_guest_heading: "Для відвідувачів без проживання в готелі",
      spa_modal_guest_sub: "Якщо ви не проживаєте в готелі Ribas Duke, ви можете замовити гостьовий візит у SPA-комплекс:",
      spa_modal_plan_single_title: "Гостьовий візит у SPA (від 2-х годин)",
      spa_modal_price_main: "700 ₴ / 2 години",
      spa_modal_price_extra: "+350 ₴ за кожну наступну годину",
      spa_modal_plan_f1: "Критий басейн 35 м² із гідромасажним водоспадом",
      spa_modal_plan_f2: "Фінська сауна, хамам та кардіо-тренажери",
      spa_modal_plan_f3: "Комфортні шезлонги, рушники та сервіс готелю",
      spa_modal_plan_f4: "Діти до 3-х років відвідують басейн та СПА безкоштовно",
      spa_modal_note: "Мінімальне замовлення — від 2 годин. Діти до 3-х років — безкоштовно. Попередній запис на рецепції готелю.",
      spa_modal_btn_book: "Забронювати на рецепції",
      
      // Safe Instructions Modal
      safe_modal_title: "Інструкція до електронного сейфа",
      safe_step1_title: "1. Як закрити сейф (Блокування)",
      safe_step1_desc: "Покладіть цінні речі, щільно притисніть дверцята, наберіть свій <b>4-значний код</b> і натисніть кнопку <b>#</b> (або <b>LOCK</b>). На дисплеї з'явиться <code>CLOSED</code>.",
      safe_step2_title: "2. Як відкрити сейф (Розблокування)",
      safe_step2_desc: "Введіть ваш <b>4-значний код</b>, який ви встановили під час закриття. На дисплеї з'явиться <code>OPENED</code>, після чого замок відкриється.",
      safe_step3_title: "Забули код чи сейф заблоковано?",
      safe_step3_desc: "Не хвилюйтеся! Зверніться на рецепцію готелю — черговий адміністратор допоможе відкрити сейф службовим майстер-ключем.",
      safe_modal_btn: "ДОПОМОГА РЕЦЕПЦІЇ",
      
      // Drawer
      drawer_title: "Навігація по готелю",
      drawer_address: "пров. Чайковського, 10, Одеса • 5 Stars Luxury"
    },
    en: {
      // Header
      nav_wifi: "Wi-Fi",
      nav_reception: "Reception",
      nav_chat: "Contact Us",
      nav_menu: "Menu",
      
      // Floating Right Widget
      pillow_widget: "Pillow Menu",
      
      // Screen Indicators
      screen_1: "01. Welcome",
      screen_2: "02. LenMar Restaurant",
      screen_3: "03. SPA & Pool",
      screen_4: "04. Conferences & Events",
      screen_5: "05. Odesa City Guide",
      screen_6: "06. Reception & Services",
      screen_7: "07. Contacts & Location",

      // 1-Word Sidebar Indicator Labels
      ind_screen_1: "Home",
      ind_screen_2: "Restaurant",
      ind_screen_3: "SPA",
      ind_screen_4: "Conference",
      ind_screen_5: "Odesa",
      ind_screen_6: "Reception",
      ind_screen_7: "Contacts",

      // Mobile Menu Screen Links
      mob_screen_1: "Hotel • Welcome",
      mob_screen_2: "LenMar Restaurant",
      mob_screen_3: "SPA & Pool",
      mob_screen_4: "Conferences & Events",
      mob_screen_5: "Odesa City Guide",
      mob_screen_6: "Reception & Services",
      mob_screen_7: "Contacts & Location",
      
      // Scroll Hint
      scroll_hint: "SCROLL DOWN",
      
      // Screen 1 Hero Content
      hero_title: "Welcome to Odesa",
      hero_desc: "Ribas Duke — your 5-star haven of comfort and elegance right next to the iconic Opera House. We have taken care of the smallest details so that your stay in the city by the sea is flawless.",
      
      // Screen 2: Restaurant LenMar
      screen2_tagline: "GASTRONOMIC SPACE",
      screen2_title: "LenMar Restaurant: Gastronomic Highlights of Odesa",
      screen2_desc: "Exquisite European and signature Odesa cuisine in an elegant atmosphere. Fresh seafood, local delicacies, and a fine wine list for your breakfasts, business lunches, and romantic dinners.",
      screen2_breakfast_title: "Breakfast (Buffet / Signature Serving)",
      screen2_breakfast_time: "08:00–11:00",
      screen2_restaurant_title: "LenMar Restaurant",
      screen2_restaurant_time: "12:00–23:00",
      screen2_bar_title: "Bar",
      screen2_bar_time: "24/7 Round-the-clock",
      screen2_roomservice_title: "Room Service",
      screen2_roomservice_time: "08:00–21:00",
      screen2_btn_menu: "View Online Restaurant Menu",
      screen2_btn_reserve: "Reserve an Evening Table",
      screen2_btn_roomservice: "Order Food & Drinks to Room",
      screen2_btn_minibar: "Minibar Menu",
      screen2_services_title: "Restaurant Services",
      screen2_btn_menu_short: "Restaurant Menu",
      screen2_btn_minibar_short: "Minibar",
      screen2_btn_roomservice_short: "Order to Room",
      screen2_btn_reserve_short: "Reserve a Table",
      slider_dish_1: "Duck Fillet with Truffle Potato Mousse · 680 ₴",
      slider_dish_2: "Veal Ossobuco with Saffron Risotto · 840 ₴",
      slider_dish_3: "Seafood Pasta · 705 ₴",
      slider_dish_4: "Caesar Salad with Chicken · 410 ₴",
      slider_dish_5: "Parmesan-Crusted Shrimp · 670 ₴",
      pill_dish_1: "Duck",
      pill_dish_2: "Ossobuco",
      pill_dish_3: "Pasta",
      pill_dish_4: "Caesar",
      pill_dish_5: "Shrimp",
      
      // Screen 3: SPA & Wellness
      screen3_tagline: "SPA & WELLNESS RETREAT",
      screen3_title: "ZONE OF HARMONY<br>& RESTORATION",
      screen3_desc: "Restore vitality and well-being after a vibrant day in Odesa. Our luxury SPA complex features an indoor heated pool, relaxation lounge, Finnish sauna, and traditional Turkish hammam.",
      screen3_pool_title: "SPA Center & Indoor Pool",
      screen3_pool_time: "Open 24/7 round the clock",
      screen3_robe_title: "Dress Code & Comfort",
      screen3_robe_desc: "Direct access from your room in bathrobe & slippers",
      screen3_massage_title: "Massage Rooms & Sauna",
      screen3_massage_desc: "Private sessions by advance appointment at reception (+380 93 198 21 39)",
      screen3_btn_menu: "View SPA Menu & Treatment Prices",
      screen3_btn_book: "Book SPA Access",
      
      // Screen 4: Conference & Events
      screen4_tagline: "CONFERENCE & EVENTS",
      screen4_title: "SPACE FOR SUCCESSFUL EVENTS<br>& BUSINESS MEETINGS",
      screen4_desc: "Ribas Duke Boutique Hotel invites you to host your most important events at the highest level. At your service: an exquisite banquet hall for large-scale conferences and modern meeting halls with premium multimedia equipment. Create an unforgettable impression in the heart of Odesa.",
      screen4_desc_p1: "Ribas Duke Boutique Hotel invites you to host your most important events at the highest level.",
      screen4_desc_p2: "At your service: an exquisite banquet hall for large-scale conferences and modern meeting halls with premium multimedia equipment.",
      screen4_desc_p3: "Create an unforgettable impression during presentations, business meetings, or private celebrations in the heart of Odesa.",
      screen4_safe_note: "With a specially equipped hall in the shelter, your events will run safely and without interruption under any circumstances.",
      screen4_conf_title: "Conference Halls",
      screen4_conf_desc: "Flexible seating (50–80 guests), professional acoustics & projection systems",
      screen4_coffeebreak_title: "Coffee Breaks & Banquets",
      screen4_coffeebreak_desc: "Custom gourmet catering menus crafted by our executive chef",
      screen4_manager_title: "Dedicated Event Manager",
      screen4_manager_desc: "Full end-to-end organizational support from planning to execution",
      screen4_btn_pdf: "Conference Facilities",
      screen4_btn_inquiry: "Event Cost Estimate",
      
      // Inquiry Lead Form Modal
      inquiry_badge: "CONFERENCE SERVICE RIBAS DUKE",
      inquiry_modal_title: "Event Planning Inquiry",
      inquiry_modal_subtitle: "Leave your contact details, and our dedicated event manager will prepare a custom proposal with hall layouts and catering:",
      inquiry_first_name_label: "First Name *",
      inquiry_last_name_label: "Last Name *",
      inquiry_phone_label: "Phone Number *",
      inquiry_type_label: "Event Format (optional)",
      inquiry_opt_conf: "Conference / Seminar",
      inquiry_opt_meeting: "Business Meeting / Negotiations",
      inquiry_opt_banquet: "Banquet / Gala Dinner",
      inquiry_opt_presentation: "Presentation / Workshop",
      inquiry_submit_btn: "SEND INQUIRY TO MANAGER",
      inquiry_success_title: "Inquiry Sent Successfully!",
      inquiry_success_desc: "Thank you! Our event manager will contact you at the provided phone number within 15 minutes.",
      inquiry_success_close: "CLOSE",
      inquiry_or_contact: "Or contact us directly:",
      
      // Screen 5: Odesa Leisure & Culture
      screen5_tagline: "CULTURE & LEISURE",
      screen5_title: "DISCOVER ODESA<br>WITH RIBAS DUKE",
      screen5_desc: "The city's most renowned architectural landmarks, iconic opera house, and atmospheric streets are just a few steps from our hotel.",
      screen5_opera_title: "Cultural Life & Opera House",
      screen5_opera_desc: "Located directly opposite. Concierge ticket service",
      screen5_center_title: "Historic Center & Derybasivska",
      screen5_center_desc: "2 minutes walk to Primorsky Boulevard & Potemkin Stairs",
      screen5_sea_title: "Sea Walks & Black Sea Coast",
      screen5_sea_desc: "Scenic coastline, beach promenade and lush parks",
      screen5_tours_title: "Private Guided City Tours",
      screen5_tours_desc: "Secret courtyards, catacombs & architectural gems",
      screen5_btn_map: "Self-Guided Walking Route",
      screen5_btn_tickets: "Odesa Events & Concerts",
      screen5_events_modal_title: "Odesa Events & Tickets — Karabas",
      screen5_btn_transfer: "Book a Transfer",
      
      // Transfer Booking Modal
      transfer_badge: "TRANSFER & CONCIERGE RIBAS DUKE",
      transfer_modal_title: "Book Hotel Transfer",
      transfer_modal_subtitle: "Specify your details and desired route, and our concierge team will arrange a comfortable ride in a premium vehicle:",
      transfer_route_label: "Transfer Route",
      transfer_opt_airport: "Odesa International Airport (ODS)",
      transfer_opt_station: "Main Railway Station",
      transfer_opt_city: "City Ride / Coastline Tour",
      transfer_opt_intercity: "Intercity Transfer",
      transfer_submit_btn: "BOOK TRANSFER",
      transfer_success_title: "Transfer Request Received!",
      transfer_success_desc: "Thank you! Our concierge team will contact you at your phone number to confirm vehicle pickup details.",
      
      // GPSMyCity Tour Map Modal
      tourmap_badge: "GPSMYCITY • WALKING TOUR ROUTE",
      tourmap_modal_title: "Odesa Walking Tour Map",
      tourmap_modal_subtitle: "Popular self-guided walking tour through Odesa's historic center with detailed landmark sights and GPS navigation:",
      tourmap_distance: "Distance",
      tourmap_duration: "Duration",
      tourmap_spots: "Sights",
      tour_spot_1: "Odesa National Academic Opera and Ballet Theater",
      tour_spot_2: "Monument to Duke de Richelieu & Primorsky Boulevard",
      tour_spot_3: "Iconic Potemkin Stairs & Funicular",
      tour_spot_4: "Derybasivska Street, City Garden & Passage",
      tour_spot_5: "Vorontsov Palace, Mother-in-Law Bridge & Colonnade",
      tourmap_open_btn: "OPEN ROUTE IN GPSMYCITY",
      tourmap_concierge_note: "Prefer a private guided tour? Contact concierge:",
      
      // Screen 6: Useful Info & Services
      screen6_tagline: "USEFUL HOTEL INFORMATION",
      screen6_title: "EVERYTHING FOR YOUR<br>SEAMLESS LUXURY STAY",
      screen6_checkin_title: "🕑 Check-in: from 14:00 • 🕛 Check-out: by 12:00",
      screen6_checkin_desc: "Need early check-in or late check-out? Please contact the reception in advance.",
      screen6_wifi_title: "Wi-Fi in Room & Hotel",
      screen6_wifi_desc: "Network: hotel-duke • Password: 06062014",
      screen6_luggage_title: "Luggage Room & Shipping",
      screen6_luggage_desc: "Free luggage storage or express courier dispatch via Nova Poshta",
      screen6_parking_title: "Guest Parking",
      screen6_parking_desc: "Convenient parking options adjacent to the hotel",
      screen6_safe_title: "In-Room Electronic Safe",
      screen6_safe_desc: "Located inside your wardrobe • 24/7 reception assistance",
      screen6_btn_wifi: "Copy Wi-Fi Password",
      screen6_btn_safe: "Safe Instructions",
      screen6_btn_luggage: "Luggage Services",
      screen6_btn_reception: "Call Reception",
      
      // Screen 7: Footer & Contacts
      screen7_tagline: "RIBAS DUKE BOUTIQUE HOTEL",
      screen7_title: "THANK YOU FOR CHOOSING US",
      screen7_farewell: "We wish you an unforgettable and inspiring stay in Odesa!<br>With warm regards and utmost care, the Ribas Duke team.",
      screen7_address_label: "Address",
      screen7_address_val: "10 Teatralny (Chaikovskogo) Lane, Odesa, Ukraine",
      screen7_phone_label: "Phone Lines",
      screen7_phone_val: "+38 (048) 705-37-75 • +38 (048) 705-37-73",
      screen7_btn_call: "Call Hotel",
      screen7_btn_route: "Google Maps Route",
      screen7_map_modal_title: "Route to Ribas Duke (10 Teatralny Lane)",
      
      // Wi-Fi Popover
      wifi_title: "Hotel Wi-Fi",
      wifi_network_label: "NETWORK:",
      wifi_password_label: "PASSWORD:",
      wifi_copy_btn: "COPY PASSWORD",
      wifi_copied_btn: "✓ COPIED!",
      wifi_copied_toast: "Wi-Fi Password (06062014) copied!",
      
      // Reception Popover
      reception_title: "24/7 Front Desk",
      reception_desc: "Direct round-the-clock concierge and reception service:",
      reception_internal: "Internal room extension: 101",
      reception_call_btn: "CALL RECEPTION",
      
      // Chat Popover
      chat_title: "Chat with Us",
      chat_desc: "Choose your preferred messenger for instant support:",
      
      // Restaurant Menu Popover & Modal
      menu_title: "LenMar Restaurant",
      menu_desc: "Exquisite Mediterranean and European cuisine with fine wines.",
      menu_open_pdf: "OPEN MENU",
      
      // Pillow Modal
      pillow_modal_title: "Pillow Menu — Ribas Duke",
      pillow_modal_desc: "Perfect sleep is the art of relaxation. Choose your pillow and order at reception.",
      pillow_order_btn: "ORDER AT RECEPTION",
      
      // SPA Complex Modal
      spa_modal_title: "SPA & Wellness Complex — Ribas Duke",
      spa_modal_badge_pool: "Indoor Pool 35 m² • Lounge Zone",
      spa_modal_tag: "«SANUS PER AQUAM»",
      spa_modal_heading: "Health & Vitality Through Water",
      spa_modal_intro: "Restore your vitality after an eventful day in Odesa at Ribas Duke SPA. Following the ancient concept of 'Sanus per Aquam', we created a sanctuary of tranquility where you immerse in total peace and harmony.",
      spa_modal_card1_title: "Indoor Heated Pool & Lounge",
      spa_modal_card1_desc: "A 35 sq.m. indoor heated swimming pool with crystal clear water, waterfall massage feature, and comfortable sun loungers.",
      spa_modal_card2_title: "Finnish Sauna & Turkish Hammam",
      spa_modal_card2_desc: "Steam and thermal treatments deeply relax the mind, enhance blood circulation, relieve fatigue, and rejuvenate the nervous system.",
      spa_modal_card3_title: "SPA Massages with Essential Oils",
      spa_modal_card3_desc: "Healing relaxation: deep muscle relief, improved sleep quality, and skin nourishment with pure botanical minerals and vitamins.",
      spa_modal_card4_title: "Fitness Room & Cardio Zone",
      spa_modal_card4_desc: "Modern cardio fitness equipment to stay energized and fit throughout your stay at the hotel.",
      spa_modal_guest_badge: "RATES & GUEST PASSES",
      spa_modal_guest_heading: "For Non-Resident Visitors",
      spa_modal_guest_sub: "If you are not staying at Ribas Duke, you can reserve a guest pass to the SPA complex:",
      spa_modal_plan_single_title: "SPA Guest Pass (from 2 hours)",
      spa_modal_price_main: "700 UAH / 2 hours",
      spa_modal_price_extra: "+350 UAH per each extra hour",
      spa_modal_plan_f1: "35 m² indoor heated pool with waterfall massage",
      spa_modal_plan_f2: "Finnish sauna, Turkish hammam & cardio fitness",
      spa_modal_plan_f3: "Sun loungers, fresh towels & luxury amenities",
      spa_modal_plan_f4: "Children under 3 years old visit pool & SPA free of charge",
      spa_modal_note: "Minimum duration is 2 hours. Children under 3 free. Advance reservation at reception.",
      spa_modal_btn_book: "Reserve at Front Desk",
      
      // Safe Instructions Modal
      safe_modal_title: "In-Room Electronic Safe Guide",
      safe_step1_title: "1. How to Lock the Safe",
      safe_step1_desc: "Place your valuables inside, close the door firmly, enter your personal <b>4-digit code</b>, and press <b>#</b> (or <b>LOCK</b>). The display will show <code>CLOSED</code>.",
      safe_step2_title: "2. How to Open the Safe",
      safe_step2_desc: "Enter your <b>4-digit code</b> set during locking. The display will show <code>OPENED</code> and the safe will unlock.",
      safe_step3_title: "Forgot Code or Safe Locked?",
      safe_step3_desc: "No worries! Contact reception — our duty manager will assist you with the master emergency key.",
      safe_modal_btn: "RECEPTION ASSISTANCE",
      
      // Drawer
      drawer_title: "Hotel Navigation",
      drawer_address: "10 Chaikovskogo Lane, Odesa • 5 Stars Luxury"
    },
    ru: {
      // Header
      nav_wifi: "Wi-Fi",
      nav_reception: "Рецепция",
      nav_chat: "Написать нам",
      nav_menu: "Меню",
      
      // Floating Right Widget
      pillow_widget: "Меню подушек",
      
      // Screen Indicators
      screen_1: "01. Приветствие",
      screen_2: "02. Ресторан LenMar",
      screen_3: "03. SPA & Бассейн",
      screen_4: "04. Конференции & События",
      screen_5: "05. Гид по Одессе",
      screen_6: "06. Рецепция & Сервисы",
      screen_7: "07. Контакты & Локация",

      // 1-Word Sidebar Indicator Labels
      ind_screen_1: "Главная",
      ind_screen_2: "Ресторан",
      ind_screen_3: "СПА",
      ind_screen_4: "Конференции",
      ind_screen_5: "Одесса",
      ind_screen_6: "Рецепция",
      ind_screen_7: "Контакты",

      // Mobile Menu Screen Links
      mob_screen_1: "Отель • Главная",
      mob_screen_2: "Ресторан LenMar",
      mob_screen_3: "SPA & Бассейн",
      mob_screen_4: "Конференции & События",
      mob_screen_5: "Гид по Одессе & Досуг",
      mob_screen_6: "Рецепция & Сервисы",
      mob_screen_7: "Контакты & Локация",
      
      // Scroll Hint
      scroll_hint: "СКРОЛЛЬТЕ ВНИЗ",
      
      // Screen 1 Hero Content
      hero_title: "Добро пожаловать в Одессу",
      hero_desc: "Ribas Duke — ваше 5-звездочное пространство уюта и изысканности рядом со знаменитым Оперным театром. Мы позаботились о мельчайших деталях, чтобы ваше пребывание в городе у моря было безупречным.",
      
      // Screen 2: Restaurant LenMar
      screen2_tagline: "ГАСТРОНОМИЧЕСКОЕ ПРОСТРАНСТВО",
      screen2_title: "Ресторан LenMar: гастрономические акценты Одессы",
      screen2_desc: "Изысканная европейская и авторская одесская кухня в элегантной атмосфере. Свежие морепродукты, локальные деликатесы и богатая винная карта для ваших завтраков, деловых обедов и романтических ужинов.",
      screen2_breakfast_title: "Завтраки (шведский стол / авторская подача)",
      screen2_breakfast_time: "08:00–11:00",
      screen2_restaurant_title: "Ресторан LenMar",
      screen2_restaurant_time: "12:00–23:00",
      screen2_bar_title: "Бар",
      screen2_bar_time: "Круглосуточно",
      screen2_roomservice_title: "Room Service (обслуживание в номерах)",
      screen2_roomservice_time: "08:00–21:00",
      screen2_btn_menu: "Посмотреть онлайн-меню ресторана",
      screen2_btn_reserve: "Забронировать столик на вечер",
      screen2_btn_roomservice: "Заказать еду и напитки в номер",
      screen2_btn_minibar: "Меню мини-бар",
      screen2_services_title: "Услуги ресторана",
      screen2_btn_menu_short: "Меню ресторана",
      screen2_btn_minibar_short: "Мини-бар",
      screen2_btn_roomservice_short: "Заказать в номер",
      screen2_btn_reserve_short: "Забронировать столик",
      slider_dish_1: "Филе утки с трюфельным пюре · 680 ₴",
      slider_dish_2: "Оссобуко с шафрановым ризотто · 840 ₴",
      slider_dish_3: "Паста с морепродуктами · 705 ₴",
      slider_dish_4: "Салат «Цезарь» с курицей · 410 ₴",
      slider_dish_5: "Креветки в панировке из пармезана · 670 ₴",
      pill_dish_1: "Утка",
      pill_dish_2: "Оссобуко",
      pill_dish_3: "Паста",
      pill_dish_4: "Цезарь",
      pill_dish_5: "Креветки",
      
      // Screen 3: SPA & Wellness
      screen3_tagline: "SPA & WELLNESS КОМПЛЕКС",
      screen3_title: "ЗОНА ГАРМОНИИ<br>И ВОССТАНОВЛЕНИЯ",
      screen3_desc: "Восстановите силы и жизненный тонус после насыщенного дня в Одессе. Наш СПА-комплекс предлагает крытый бассейн, зону отдыха, а также финскую сауну и традиционный хаммам.",
      screen3_pool_title: "СПА-центр и бассейн",
      screen3_pool_time: "Работают круглосуточно 24/7",
      screen3_robe_title: "Дресс-код и комфорт",
      screen3_robe_desc: "Можно спуститься из номера прямо в халате и тапочках",
      screen3_massage_title: "Массажные кабинеты и сауна",
      screen3_massage_desc: "Индивидуальные часы по предварительной записи на рецепции (+380 93 198 21 39)",
      screen3_btn_menu: "Смотреть SPA-меню и цены",
      screen3_btn_book: "Записаться на СПА",
      
      // Screen 4: Conference & Events
      screen4_tagline: "КОНФЕРЕНЦ-СЕРВИС И МЕРОПРИЯТИЯ",
      screen4_title: "ПРОСТРАНСТВО ДЛЯ УСПЕШНЫХ СОБЫТИЙ<br>И БИЗНЕС-ВСТРЕЧ",
      screen4_desc: "Отель Ribas Duke приглашает провести ваши важнейшие события на высшем уровне. К вашим услугам — изысканный банкетный зал для масштабных конференций и современные залы для переговоров, оснащенные премиальным мультимедийным оборудованием. Создавайте безупречное впечатление во время презентаций, деловых встреч или закрытых торжеств в самом сердце Одессы.",
      screen4_desc_p1: "Отель Ribas Duke приглашает провести ваши важнейшие события на высшем уровне.",
      screen4_desc_p2: "К вашим услугам — изысканный банкетный зал для масштабных конференций и современные залы для переговоров, оснащенные премиальным мультимедийным оборудованием.",
      screen4_desc_p3: "Создавайте безупречное впечатление во время презентаций, деловых встреч или закрытых торжеств в самом сердце Одессы.",
      screen4_safe_note: "Благодаря наличию специально обустроенного зала в укрытии, ваши мероприятия пройдут безопасно и без перерывов при любых обстоятельствах.",
      screen4_conf_title: "Конференц-залы",
      screen4_conf_desc: "Гибкая рассадка (50–80 человек), профессиональный звук и проекционное оборудование",
      screen4_coffeebreak_title: "Кофе-брейки и фуршеты",
      screen4_coffeebreak_desc: "Индивидуальное меню от шеф-повара ресторана",
      screen4_manager_title: "Персональный менеджер события",
      screen4_manager_desc: "Полное сопровождение от организации до завершения мероприятия",
      screen4_btn_pdf: "Конференц-возможности",
      screen4_btn_inquiry: "Запрос на расчет события",
      
      // Inquiry Lead Form Modal
      inquiry_badge: "КОНФЕРЕНЦ-СЕРВИС RIBAS DUKE",
      inquiry_modal_title: "Запрос на расчет мероприятия",
      inquiry_modal_subtitle: "Оставьте ваши контактные данные, и персональный менеджер подготовит индивидуальное предложение залов, оборудования и кейтеринга:",
      inquiry_first_name_label: "Имя *",
      inquiry_last_name_label: "Фамилия *",
      inquiry_phone_label: "Номер телефона *",
      inquiry_type_label: "Формат мероприятия (необязательно)",
      inquiry_opt_conf: "Конференция / Семинар",
      inquiry_opt_meeting: "Деловая встреча / Переговоры",
      inquiry_opt_banquet: "Банкет / Торжество",
      inquiry_opt_presentation: "Презентация / Воркшоп",
      inquiry_submit_btn: "ОТПРАВИТЬ ЗАПРОС МЕНЕДЖЕРУ",
      inquiry_success_title: "Запрос успешно отправлен!",
      inquiry_success_desc: "Спасибо! Наш менеджер мероприятий свяжется с вами по указанному номеру телефона в течение 15 минут.",
      inquiry_success_close: "ЗАКРЫТЬ",
      inquiry_or_contact: "Или свяжитесь с нами напрямую:",
      
      // Screen 5: Odesa Leisure & Culture
      screen5_tagline: "КУЛЬТУРА И ДОСУГ",
      screen5_title: "ОТКРОЙТЕ ДЛЯ СЕБЯ ОДЕССУ<br>ВМЕСТЕ С RIBAS DUKE",
      screen5_desc: "Главные архитектурные достопримечательности, знаменитый Оперный театр и атмосферные улицы находятся буквально в нескольких шагах от нашего отеля.",
      screen5_opera_title: "Культурная жизнь & Оперный театр",
      screen5_opera_desc: "Прямо напротив отеля. Консьерж поможет с билетами",
      screen5_center_title: "Исторический центр & Дерибасовская",
      screen5_center_desc: "2 минуты пешком до Приморского бульвара и Потемкинской лестницы",
      screen5_sea_title: "Прогулки к морю и побережью",
      screen5_sea_desc: "Морское побережье, пляжи и живописные парки",
      screen5_tours_title: "Индивидуальные экскурсии по городу",
      screen5_tours_desc: "Одесские дворики, катакомбы и тайны с персональным гидом",
      screen5_btn_map: "Туристическая карта-маршрут",
      screen5_btn_tickets: "Афиша событий Одессы",
      screen5_events_modal_title: "Афиша событий Одессы — Karabas",
      screen5_btn_transfer: "Заказать трансфер",
      
      // Transfer Booking Modal
      transfer_badge: "ТРАНСФЕР & КОНСЬЕРЖ RIBAS DUKE",
      transfer_modal_title: "Заказ трансфера",
      transfer_modal_subtitle: "Укажите ваши данные и желаемый маршрут, и служба консьержа организует комфортную поездку на авто премиум-класса:",
      transfer_route_label: "Маршрут трансфера",
      transfer_opt_airport: "Аэропорт Одесса (ODS)",
      transfer_opt_station: "Главный Железнодорожный вокзал",
      transfer_opt_city: "Поездка по городу / Побережье",
      transfer_opt_intercity: "Междугородний трансфер",
      transfer_submit_btn: "ЗАКАЗАТЬ ТРАНСФЕР",
      transfer_success_title: "Заявка на трансфер принята!",
      transfer_success_desc: "Спасибо! Служба консьержа свяжется с вами по указанному номеру телефона для подтверждения времени подачи авто.",
      
      // GPSMyCity Tour Map Modal
      tourmap_badge: "GPSMYCITY • ТУРИСТИЧЕСКИЙ МАРШРУТ",
      tourmap_modal_title: "Пешеходная карта «Одесса»",
      tourmap_modal_subtitle: "Популярный авторский туристический маршрут по историческому центру Одессы с описанием локаций и GPS-навигацией:",
      tourmap_distance: "Дистанция",
      tourmap_duration: "Длительность",
      tourmap_spots: "Локаций",
      tour_spot_1: "Одесский академический театр оперы и балета",
      tour_spot_2: "Памятник Дюку де Ришелье & Приморский бульвар",
      tour_spot_3: "Легендарная Потемкинская лестница и фуникулер",
      tour_spot_4: "Улица Дерибасовская, Городской сад и Пассаж",
      tour_spot_5: "Воронцовский дворец, Тещин мост и Колоннада",
      tourmap_open_btn: "ОТКРЫТЬ МАРШРУТ В GPSMYCITY",
      tourmap_concierge_note: "Желаете личного гида? Свяжитесь с консьержем:",
      
      // Screen 6: Useful Info & Services
      screen6_tagline: "ПОЛЕЗНОЕ ВО ВРЕМЯ ПРОЖИВАНИЯ",
      screen6_title: "ВСЁ ДЛЯ ВАШЕГО<br>БЕЗУПРЕЧНОГО ПРЕБЫВАНИЯ",
      screen6_checkin_title: "🕑 Заезд: с 14:00 • 🕛 Выезд: до 12:00",
      screen6_checkin_desc: "Желаете оформить ранний заезд или поздний выезд? Обратитесь на рецепцию заранее.",
      screen6_wifi_title: "Wi-Fi в номере и отеле",
      screen6_wifi_desc: "Сеть: hotel-duke • Пароль: 06062014",
      screen6_luggage_title: "Багажная комната и отправка багажа",
      screen6_luggage_desc: "Бесплатное хранение или экспресс-доставка через Новую Почту",
      screen6_parking_title: "Паркинг для гостей",
      screen6_parking_desc: "Удобные услуги парковки рядом с отелем",
      screen6_safe_title: "Инструкция к сейфу",
      screen6_safe_desc: "Электронный сейф в шкафу • Помощь рецепции 24/7",
      screen6_btn_wifi: "Скопировать пароль Wi-Fi",
      screen6_btn_safe: "Инструкция к сейфу",
      screen6_btn_luggage: "Услуги багажа",
      screen6_btn_reception: "Вызвать рецепцию",
      
      // Screen 7: Footer & Contacts
      screen7_tagline: "RIBAS DUKE BOUTIQUE HOTEL",
      screen7_title: "СПАСИБО, ЧТО ВЫБРАЛИ НАС",
      screen7_farewell: "Желаем вам неповторимого и вдохновляющего отдыха в Одессе!<br>С уважением и заботой, команда Ribas Duke.",
      screen7_address_label: "Адрес",
      screen7_address_val: "Украина, г. Одесса, пер. Театральный, 10",
      screen7_phone_label: "Телефоны",
      screen7_phone_val: "+38 (048) 705-37-75 • +38 (048) 705-37-73",
      screen7_btn_call: "Позвонить в отель",
      screen7_btn_route: "Маршрут на карте",
      screen7_map_modal_title: "Маршрут в Ribas Duke (пер. Театральный, 10)",
      
      // Wi-Fi Popover
      wifi_title: "Wi-Fi в отеле",
      wifi_network_label: "СЕТЬ:",
      wifi_password_label: "ПАРОЛЬ:",
      wifi_copy_btn: "СКОПИРОВАТЬ ПАРОЛЬ",
      wifi_copied_btn: "✓ СКОПИРОВАНО!",
      wifi_copied_toast: "Пароль Wi-Fi (06062014) скопирован!",
      
      // Reception Popover
      reception_title: "Служба рецепции 24/7",
      reception_desc: "Круглосуточная связь с консьержем и администрацией:",
      reception_internal: "Внутренний номер: 101",
      reception_call_btn: "ПОЗВОНИТЬ НА РЕЦЕПЦИЮ",
      
      // Chat Popover
      chat_title: "Написать нам",
      chat_desc: "Выберите удобный мессенджер для быстрого ответа:",
      
      // Restaurant Menu Popover & Modal
      menu_title: "Ресторан LenMar",
      menu_desc: "Изысканные блюда одесской и европейской кухни, авторская винная карта.",
      menu_open_pdf: "ОТКРЫТЬ МЕНЮ",
      
      // Pillow Modal
      pillow_modal_title: "Меню Подушек — Ribas Duke",
      pillow_modal_desc: "Идеальный сон — искусство отдыха. Выберите подушку и закажите на рецепции.",
      pillow_order_btn: "ЗАКАЗАТЬ НА РЕЦЕПЦИИ",
      
      // SPA Complex Modal
      spa_modal_title: "SPA & Wellness Комплекс — Ribas Duke",
      spa_modal_badge_pool: "Бассейн 35 м² • Зона релакса",
      spa_modal_tag: "«SANUS PER AQUAM»",
      spa_modal_heading: "Здоровье и гармония через воду",
      spa_modal_intro: "Восстановить силы и жизненный тонус после насыщенного дня в Одессе вы сможете в СПА отеля Ribas Duke. Следуя концепции «Sanus per Aquam», мы создали пространство отдыха, где вы погрузитесь в атмосферу полного покоя и гармонии.",
      spa_modal_card1_title: "Крытый бассейн и зона отдыха",
      spa_modal_card1_desc: "Крытый бассейн площадью 35 кв.м. с кристально чистой водой, водопадом и удобными шезлонгами для безмятежного релакса.",
      spa_modal_card2_title: "Финская сауна и хаммам",
      spa_modal_card2_desc: "Паровые и термальные процедуры расслабляют сознание, улучшают кровообращение, снимают стресс и благотворно влияют на весь организм.",
      spa_modal_card3_title: "СПА-массажи с арома-маслами",
      spa_modal_card3_desc: "Целебный эффект: глубокое расслабление мышц, улучшение сна, обогащение кожи витаминами и минералами для восстановления тонуса.",
      spa_modal_card4_title: "Тренажерный зал и кардио-зона",
      spa_modal_card4_desc: "Современные кардиотренажеры для поддержания тонуса и энергичных тренировок во время отдыха в отеле.",
      spa_modal_guest_badge: "ТАРИФЫ И ГОСТЕВЫЕ ВИЗИТЫ",
      spa_modal_guest_heading: "Для гостей без проживания в отеле",
      spa_modal_guest_sub: "Если вы не проживаете в отеле Ribas Duke, вы можете оформить гостевой визит в СПА-комплекс:",
      spa_modal_plan_single_title: "Гостевой визит в СПА (от 2-х часов)",
      spa_modal_price_main: "700 ₴ / 2 часа",
      spa_modal_price_extra: "+350 ₴ за каждый последующий час",
      spa_modal_plan_f1: "Крытый бассейн 35 м² с гидромассажным водопадом",
      spa_modal_plan_f2: "Финская сауна, хаммам и кардиотренажеры",
      spa_modal_plan_f3: "Шезлонги, полотенца и сервис отеля",
      spa_modal_plan_f4: "Дети до 3-х лет посещают бассейн и СПА бесплатно",
      spa_modal_note: "Минимальный заказ — от 2 часов. Дети до 3-х лет — бесплатно. Бронирование на рецепции отеля.",
      spa_modal_btn_book: "Забронировать на рецепции",
      
      // Safe Instructions Modal
      safe_modal_title: "Инструкция к электронному сейфу",
      safe_step1_title: "1. Как закрыть сейф (Блокировка)",
      safe_step1_desc: "Положите ценные вещи, плотно прижмите дверцу, наберите свой <b>4-значный код</b> и нажмите кнопку <b>#</b> (или <b>LOCK</b>). На дисплее появится <code>CLOSED</code>.",
      safe_step2_title: "2. Как открыть сейф (Разблокировка)",
      safe_step2_desc: "Введите ваш <b>4-значный код</b>, который вы установили при закрытии. На дисплее появится <code>OPENED</code>, после чего дверца откроется.",
      safe_step3_title: "Забыли код или сейф заблокирован?",
      safe_step3_desc: "Не волнуйтесь! Обратитесь на рецепцию отеля — дежурный администратор оперативно поможет открыть сейф служебным мастер-ключом.",
      safe_modal_btn: "ПОМОЩЬ РЕЦЕПЦИИ",
      
      // Drawer
      drawer_title: "Навигация по отелю",
      drawer_address: "пер. Чайковского, 10, Одесса • 5 Stars Luxury"
    }
  };

  let currentLang = localStorage.getItem('duke_language') || 'ua';

  window.t = function (key) {
    const langData = translations[currentLang] || translations.ua;
    return langData[key] || key;
  };

  window.getCurrentLanguage = function () {
    return currentLang;
  };

  window.setLanguage = function (lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('duke_language', lang);

    // Update active class on header language buttons
    const langBtns = document.querySelectorAll('.lang-link');
    langBtns.forEach((btn) => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = translations[lang][key];
      if (translation !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });

    // Update dynamically generated popovers if open
    if (window.refreshActivePopover) {
      window.refreshActivePopover();
    }
  };

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.setLanguage(currentLang);
  });
})();
