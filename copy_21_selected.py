import os
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Source paths
base_screens = "e:/ribas_Dyk/screens_photos"
out_dir = "e:/ribas_Dyk/selected_21_photos"
artifact_out = "C:/Users/Jaku/.gemini/antigravity/brain/6ca1e297-358e-42e1-a4d1-ed8c43dec42b/selected_21_photos"

os.makedirs(out_dir, exist_ok=True)
os.makedirs(artifact_out, exist_ok=True)

# Define 21 exact photo picks (3 per screen)
selection = {
    "screen_1_welcome": [
        ("screen_1_welcome_facade/Duke_2026_Facade_DSC_5881.jpg", "screen_1_photo_1_facade_front_day.jpg", "Фронтальный монументальный фасад отеля Duke с парадным входом-ракушкой и вывеской"),
        ("screen_1_welcome_facade/Facade_Classic__MG_1166.jpg", "screen_1_photo_2_facade_classic_street.jpg", "Классический перспективный вид фасада с фонарями, брусчаткой и коваными балконами"),
        ("screen_1_welcome_facade/Duke_2026_Facade_DSC_5852.jpg", "screen_1_photo_3_facade_entrance_terrace.jpg", "Ракурс на парадный козырек отеля и летнюю террасу ресторана")
    ],
    "screen_2_restaurant": [
        ("screen_2_restaurant_bar/ресторан___MG_1285.jpg", "screen_2_photo_1_lenmar_grand_hall.jpg", "Панорамный зал ресторана LenMar: шахматный мрамор, люстры, сервированные столы и карта 1917 г."),
        ("screen_2_restaurant_bar/ЛенМар_Банкет___MG_1250.jpg", "screen_2_photo_2_lenmar_warm_evening.jpg", "Вечерняя теплая атмосфера ресторана с сервировкой бокалов и мягким янтарным светом"),
        ("screen_2_restaurant_bar/Зйомка_банкетного_меню_Ленмар_18.06.2025__FIL_7208.jpg", "screen_2_photo_3_lenmar_dish_wine.jpg", "Изысканная ресторанная подача блюда и бокал вина (акцент на высокой гастрономии)")
    ],
    "screen_3_spa": [
        ("screen_3_spa_wellness/Spa__DSC_5899.jpg", "screen_3_photo_1_spa_pool_waterfall.jpg", "Бассейн с кристально-бирюзовой водой, водопадом и мозаичным гербом Duke"),
        ("screen_3_spa_wellness/спа_центр___MG_1328.jpg", "screen_3_photo_2_spa_sauna_wood.jpg", "Финская сауна из натурального дерева с мягкой медовой подсветкой"),
        ("screen_3_spa_wellness/Spa__DSC_5908.jpg", "screen_3_photo_3_spa_lounge_beds.jpg", "Зона релакса с шезлонгами у бассейна и атмосферой приватного SPA-отдыха")
    ],
    "screen_4_conference": [
        ("screen_4_conference_events/english_hall__IMG_7556.jpg", "screen_4_photo_1_english_hall_luxury.jpg", "Английский зал: ряды изумрудных бархатных кресел, хрустальные люстры и темное дерево"),
        ("screen_4_conference_events/meeting_room__RV__IMG_6662-2.jpg", "screen_4_photo_2_boardroom_executive.jpg", "Executive Boardroom: стол для переговоров, кожаные кресла и брендированный экран DUKE"),
        ("screen_4_conference_events/marine_hall__IMG_6971.jpg", "screen_4_photo_3_marine_hall_wide.jpg", "Морской зал: просторный светлый конференц-зал для масштабных событий и банкетов")
    ],
    "screen_5_rooms": [
        ("screen_5_rooms_pillows/Duke_интерьер_2026___Люкс_з_балконом_(302)__DSC_4822-HDR.jpg", "screen_5_photo_1_suite_302_king_bed.jpg", "Люкс 302: кровать King-Size, 4 премиальные подушки, французский балкон и теплое освещение"),
        ("screen_5_rooms_pillows/3_номер_Люкс___MG_1881.jpg", "screen_5_photo_2_suite_classic_boudoir.jpg", "Классический двухкомнатный люкс с будуарной зоной и роскошной спальней"),
        ("screen_5_rooms_pillows/Напівлюкс_(301)__DSC_4741-HDR.jpg", "screen_5_photo_3_junior_suite_301.jpg", "Полулюкс 301: элегантный номер с акцентом на уют, мягкую мебель и комфортный сон")
    ],
    "screen_6_leisure": [
        ("screen_6_leisure_odessa/Зйомка_балкон_жовтень_2025__IMG_6468.JPG", "screen_6_photo_1_balcony_odessa_morning.jpg", "Вид с кованого балкона отеля Duke на старинные фасады Одессы за чашкой утреннего кофе"),
        ("screen_6_leisure_odessa/Зйомка_балкон_жовтень_2025__IMG_6472.JPG", "screen_6_photo_2_balcony_street_architecture.jpg", "Архитектурная панорама переулка Чайковского (2 минуты до Оперного театра)"),
        ("screen_6_leisure_odessa/одеса_собака__DSC00972.JPG", "screen_6_photo_3_leisure_pet_friendly.jpg", "Pet-Friendly концепция отеля: милый пушистый гость в номере Duke (домашний уют и забота)")
    ],
    "screen_7_lobby": [
        ("screen_7_lobby_reception/Rec_2026__DSC_5816.jpg", "screen_7_photo_1_reception_desk_marble.jpg", "Монументальная мраморная стойка рецепции с гербом Duke, люстрой и 3D-полом"),
        ("screen_7_lobby_reception/Лестница__IMG_6926.jpg", "screen_7_photo_2_spiral_marble_staircase.jpg", "Парадная винтовая мраморная лестница с зеркальным потолком и коваными перилами"),
        ("screen_7_lobby_reception/рецепция___MG_1147_горизонт.jpg", "screen_7_photo_3_lobby_corridor_wood_map.jpg", "Лобби-холл с исторической деревянной резной картой Одессы 1800 года и зоной отдыха")
    ]
}

copied_info = []

for screen_id, items in selection.items():
    print(f"\nProcessing {screen_id}...")
    for rel_src, new_name, desc in items:
        full_src = os.path.join(base_screens, rel_src)
        if not os.path.exists(full_src):
            print(f"  ❌ NOT FOUND: {full_src}")
            continue
        dest_local = os.path.join(out_dir, new_name)
        dest_artifact = os.path.join(artifact_out, new_name)
        shutil.copy2(full_src, dest_local)
        shutil.copy2(full_src, dest_artifact)
        size_mb = os.path.getsize(dest_local) / (1024*1024)
        print(f"  ✅ Copied: {new_name} ({size_mb:.2f} MB)")
        copied_info.append({
            "screen": screen_id,
            "filename": new_name,
            "local_path": dest_local,
            "artifact_path": dest_artifact,
            "description": desc
        })

print(f"\nTotal copied: {len(copied_info)} / 21 photos.")
