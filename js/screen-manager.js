/* ==========================================================================
   RIBAS DUKE — INTERACTIVE SCREEN, CONTEXTUAL POPOVERS & PDF CONTROLLER
   ========================================================================== */

(function () {
  const contentLayer = document.getElementById('screens-content-layer');
  let activePopover = null;
  let popoverTimeout = null;
  let activeModal = null;

  // Sync active screen content & vertical dash indicator
  window.updateScreenContent = function (screenIndex) {
    if (contentLayer) {
      const allScreens = contentLayer.querySelectorAll('.screen-content');
      allScreens.forEach((el) => {
        const idx = parseInt(el.getAttribute('data-screen'), 10);
        if (idx === screenIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }

    // Update Vertical Indicators
    const indicators = document.querySelectorAll('.indicator-item');
    indicators.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-screen'), 10);
      if (idx === screenIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Hide/Show bottom scroll hint
    const scrollHint = document.getElementById('bottom-scroll-hint');
    if (scrollHint) {
      if (screenIndex > 1) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    }
  };

  // Hide all screen content smoothly on transition start
  window.hideAllScreenContent = function () {
    const layer = document.getElementById('screens-content-layer');
    if (layer) {
      const allScreens = layer.querySelectorAll('.screen-content');
      allScreens.forEach((el) => el.classList.remove('active'));
    }
    window.closeAllPopovers();
  };

  // Toast Notification
  window.showDukeToast = function (message) {
    let toast = document.getElementById('duke-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'duke-toast';
      toast.className = 'duke-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Copy Wi-Fi Password with Green Visual Feedback across all Wi-Fi triggers
  window.copyWifiPassword = function (btn) {
    const pass = '06062014';
    const btnElem = btn || document.getElementById('wifi-copy-btn');
    
    const applyGreen = (el) => {
      if (!el) return;
      el.classList.add('is-copied-green');
      const valEl = el.querySelector('.mob-tile-val, #mob-wifi-val');
      const labelEl = el.querySelector('.mob-tile-label, #mob-wifi-label');
      const origVal = valEl ? valEl.textContent : '';
      const origLabel = labelEl ? labelEl.textContent : '';

      if (valEl) {
        valEl.textContent = '✓ Скопійовано!';
        if (labelEl) labelEl.textContent = '06062014';
        setTimeout(() => {
          el.classList.remove('is-copied-green');
          if (valEl) valEl.textContent = origVal;
          if (labelEl) labelEl.textContent = origLabel;
        }, 2200);
      } else {
        const origBtnText = el.getAttribute('data-orig-text') || el.innerHTML;
        el.setAttribute('data-orig-text', origBtnText);
        el.innerHTML = '✓ СКОПІЙОВАНО (06062014)';
        setTimeout(() => {
          el.classList.remove('is-copied-green');
          el.innerHTML = origBtnText;
        }, 2200);
      }
    };

    const onCopied = () => {
      if (btnElem) applyGreen(btnElem);
      const mobTile = document.getElementById('mob-wifi-tile-btn');
      if (mobTile && mobTile !== btnElem) applyGreen(mobTile);
      if (window.showDukeToast) {
        window.showDukeToast('Пароль Wi-Fi: 06062014 скопійовано!');
      }
    };

    onCopied();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pass).catch(() => {});
    } else {
      const input = document.createElement('input');
      input.value = pass;
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(input);
    }
  };

  // ==========================================================================
  // Floating Contextual Popovers (Under Header Pills)
  // ==========================================================================
  
  window.openPopover = function (triggerBtn, type) {
    clearTimeout(popoverTimeout);
    let container = document.getElementById('contextual-popover');
    if (!container) {
      container = document.createElement('div');
      container.id = 'contextual-popover';
      container.className = 'contextual-popover';
      document.body.appendChild(container);

      // Keep open when hovering over popover box
      container.addEventListener('mouseenter', () => clearTimeout(popoverTimeout));
      container.addEventListener('mouseleave', () => window.scheduleClosePopover());
    }

    let contentHtml = '';
    const t = window.t || ((k) => k);

    if (type === 'wifi') {
      contentHtml = `
        <div class="popover-box">
          <div class="popover-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
            ${t('wifi_title')}
          </div>
          <div class="popover-data-row">
            <span class="popover-label">${t('wifi_network_label')}</span>
            <span class="popover-val-highlight">hotel-duke</span>
          </div>
          <div class="popover-data-row">
            <span class="popover-label">${t('wifi_password_label')}</span>
            <span class="popover-val-code">06062014</span>
          </div>
          <button id="wifi-copy-btn" onclick="window.copyWifiPassword(this)" class="btn-popover-accent">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            ${t('wifi_copy_btn')}
          </button>
        </div>
      `;
    } else if (type === 'reception') {
      contentHtml = `
        <div class="popover-box">
          <div class="popover-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${t('reception_title')}
          </div>
          <p class="popover-desc">${t('reception_desc')}</p>
          <div class="popover-badge-info">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${t('reception_internal')}
          </div>
          <a href="tel:+380487053775" class="btn-popover-accent">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${t('reception_call_btn')}
          </a>
        </div>
      `;
    } else if (type === 'chat') {
      contentHtml = `
        <div class="popover-box">
          <div class="popover-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${t('chat_title')}
          </div>
          <p class="popover-desc">${t('chat_desc')}</p>
          <div class="popover-chat-btns">
            <a href="https://t.me/ribashotels" target="_blank" class="btn-popover-messenger tg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
              Telegram
            </a>
            <a href="viber://chat?number=%2B380487053775" class="btn-popover-messenger vb">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Viber
            </a>
          </div>
        </div>
      `;
    } else if (type === 'menu') {
      contentHtml = `
        <div class="popover-box">
          <div class="popover-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 6px;"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            ${t('menu_title')}
          </div>
          <p class="popover-desc">${t('menu_desc')}</p>
          <button onclick="window.openRestaurantWebMenuModal()" class="btn-popover-accent">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            ${t('menu_open_pdf')}
          </button>
        </div>
      `;
    }

    container.innerHTML = contentHtml;

    // Position popover directly under the trigger button
    const rect = triggerBtn.getBoundingClientRect();
    const popoverLeft = rect.left + rect.width / 2;
    const popoverTop = rect.bottom + 12;

    container.style.left = `${popoverLeft}px`;
    container.style.top = `${popoverTop}px`;
    container.classList.add('show');
    activePopover = type;
  };

  window.scheduleClosePopover = function () {
    popoverTimeout = setTimeout(() => {
      window.closeAllPopovers();
    }, 300);
  };

  window.closeAllPopovers = function () {
    const container = document.getElementById('contextual-popover');
    if (container) {
      container.classList.remove('show');
    }
    activePopover = null;
  };

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    const isInsideNav = e.target.closest('.header-nav-capsule');
    const isInsidePopover = e.target.closest('.contextual-popover');
    if (!isInsideNav && !isInsidePopover) {
      window.closeAllPopovers();
    }
  });

  // Re-render open popover on language switch
  window.refreshActivePopover = function () {
    if (activePopover) {
      const btn = document.querySelector(`.nav-pill-btn[data-popover="${activePopover}"]`);
      if (btn) window.openPopover(btn, activePopover);
    }
  };

  // ==========================================================================
  // Fullscreen Interactive Restaurant Web Menu Modal (Clean with Crown & Close)
  // ==========================================================================

  window.openWebMenuModal = function (url, titleText, iconSvg) {
    window.closeAllPopovers();
    let overlay = document.getElementById('duke-webmenu-modal');
    
    const defaultIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 8px;"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`;
    const resolvedIcon = iconSvg || defaultIcon;
    const resolvedTitle = titleText || (window.t ? window.t('menu_title') : 'Меню');
    const resolvedUrl = url || 'https://menu.ps.me/cHxkIpsD2dU';

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'duke-webmenu-modal';
      overlay.className = 'duke-modal-overlay';
      overlay.innerHTML = `
        <div class="duke-webmenu-box">
          <div class="webmenu-header-bar">
            <h3 class="webmenu-modal-title">
              <span class="webmenu-title-icon">${resolvedIcon}</span>
              <span class="webmenu-title-text">${resolvedTitle}</span>
            </h3>
            <button class="btn-webmenu-close" onclick="window.closeRestaurantWebMenuModal()" aria-label="Закрити">✕</button>
          </div>
          <div class="webmenu-embed-wrapper">
            <iframe id="restaurant-web-menu-iframe" class="webmenu-embed-iframe" src="${resolvedUrl}" frameborder="0" allow="geolocation; camera; microphone"></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeRestaurantWebMenuModal();
      });
    } else {
      const iconSpan = overlay.querySelector('.webmenu-title-icon');
      const textSpan = overlay.querySelector('.webmenu-title-text');
      const iframe = document.getElementById('restaurant-web-menu-iframe');
      
      if (iconSpan) iconSpan.innerHTML = resolvedIcon;
      if (textSpan) textSpan.textContent = resolvedTitle;
      if (iframe) iframe.src = resolvedUrl;
    }

    overlay.classList.add('active');
    activeModal = overlay;
  };

  window.openRestaurantWebMenuModal = function () {
    const t = window.t || ((k) => k);
    const crownIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -2px; margin-right: 8px;"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`;
    window.openWebMenuModal('https://menu.ps.me/cHxkIpsD2dU', t('screen2_btn_menu_short') || 'Меню ресторану', crownIcon);
  };

  window.closeRestaurantWebMenuModal = function () {
    const overlay = document.getElementById('duke-webmenu-modal');
    if (overlay) {
      overlay.classList.remove('active');
    }
    if (activeModal === overlay) activeModal = null;
  };

  // ==========================================================================
  // Fullscreen In-Page Embedded Modals (Centered & Streamlined)
  // ==========================================================================
  const PDF_PAGE_MAP = {
    'pillow_menu': ['docs/pillow_page_1.webp', 'docs/pillow_page_2.webp'],
    'duke_hotel_info': ['docs/hotel_info_page_1.webp'],
    'hotel_info': ['docs/hotel_info_page_1.webp'],
    'duke_safe_instructions': ['docs/safe_clean_page_1.webp', 'docs/safe_clean_page_2.webp', 'docs/safe_clean_page_3.webp', 'docs/safe_clean_page_4.webp'],
    'safe_clean': ['docs/safe_clean_page_1.webp', 'docs/safe_clean_page_2.webp', 'docs/safe_clean_page_3.webp', 'docs/safe_clean_page_4.webp'],
    'safe_guide': ['docs/safe_clean_page_1.webp', 'docs/safe_clean_page_2.webp', 'docs/safe_clean_page_3.webp', 'docs/safe_clean_page_4.webp'],
    'safe': ['docs/safe_clean_page_1.webp', 'docs/safe_clean_page_2.webp', 'docs/safe_clean_page_3.webp', 'docs/safe_clean_page_4.webp'],
    'duke_guest_guide': ['docs/guest_guide_page_1.webp']
  };

  window.openDukePdfModal = function (title, subtitle, pdfUrl, ctaHtml) {
    let overlay = document.getElementById('duke-pdf-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'duke-pdf-modal';
      overlay.className = 'duke-modal-overlay';
      overlay.innerHTML = `
        <div class="duke-pdf-modal-box">
          <button class="duke-modal-close" onclick="window.closeDukeModal()" aria-label="Закрити">✕</button>
          <div class="pdf-modal-header">
            <h3 id="pdf-modal-title" class="pdf-modal-title"></h3>
            <p id="pdf-modal-subtitle" class="pdf-modal-subtitle"></p>
          </div>
          <div class="pdf-embed-wrapper" id="pdf-embed-wrapper">
            <iframe id="pdf-modal-iframe" class="pdf-embed-iframe" src="" frameborder="0"></iframe>
            <div id="pdf-pages-scroll" class="pdf-pages-scroll" style="display: none;"></div>
          </div>
          <div id="pdf-modal-footer" class="pdf-modal-footer"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeDukeModal();
      });
    }

    document.getElementById('pdf-modal-title').textContent = title;
    document.getElementById('pdf-modal-subtitle').textContent = subtitle;
    
    const iframe = document.getElementById('pdf-modal-iframe');
    const pagesContainer = document.getElementById('pdf-pages-scroll');
    
    let matchingKey = null;
    if (pdfUrl) {
      for (const k in PDF_PAGE_MAP) {
        if (pdfUrl.includes(k)) {
          matchingKey = k;
          break;
        }
      }
    }

    if (matchingKey && PDF_PAGE_MAP[matchingKey]) {
      iframe.style.display = 'none';
      pagesContainer.style.display = 'flex';
      pagesContainer.innerHTML = PDF_PAGE_MAP[matchingKey].map((src, i) => `
        <img src="${src}" alt="${title} - Page ${i + 1}" class="pdf-rendered-page" loading="eager" decoding="async">
      `).join('');
    } else {
      pagesContainer.style.display = 'none';
      iframe.style.display = 'block';
      iframe.src = `${pdfUrl}#toolbar=0&view=FitH`;
    }

    document.getElementById('pdf-modal-footer').innerHTML = ctaHtml || '';

    overlay.classList.add('active');
    activeModal = overlay;
  };

  // 1. Pillow Menu Modal
  window.openPillowModal = function () {
    window.closeAllPopovers();
    const t = window.t || ((k) => k);
    const cta = `
      <div class="modal-cta-wrap">
        <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>${t('pillow_order_btn') || 'ЗАМОВИТИ В НОМЕР (101)'}</span>
        </a>
      </div>
    `;
    window.openDukePdfModal(
      t('pillow_modal_title') || 'Меню Подушок — Ribas Duke',
      t('pillow_modal_desc') || 'Ідеальний сон — мистецтво відпочинку. Оберіть подушку та замовте на рецепції (101).',
      'docs/pillow_menu.pdf',
      cta
    );
  };

  // 2. Restaurant Menu
  window.openRestaurantPdfModal = function () {
    window.openRestaurantWebMenuModal();
  };

  // 3. Mini-bar Modal
  window.openMinibarModal = function () {
    const t = window.t || ((k) => k);
    const wineBottleIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 8px;"><path d="M9 2h6v3a1 1 0 0 1-1 1v3a4 4 0 0 0 2 3.46V20a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-7.54A4 4 0 0 0 10 9V6a1 1 0 0 1-1-1V2z"/><line x1="8" y1="2" x2="16" y2="2"/><line x1="8" y1="16" x2="16" y2="16"/></svg>`;
    window.openWebMenuModal('https://menu.ps.me/cHxkIpsD2dU/category/9', t('screen2_btn_minibar_short') || 'Міні-бар', wineBottleIcon);
  };

  // 4. SPA Menu & Wellness Modal
  window.openSpaPdfModal = function () {
    window.closeAllPopovers();
    const t = window.t || ((k) => k);
    let overlay = document.getElementById('duke-spa-modal');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'duke-spa-modal';
      overlay.className = 'duke-modal-overlay';
      overlay.innerHTML = `
        <div class="duke-spa-modal-box">
          <div class="spa-modal-header-bar">
            <h3 class="spa-modal-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="vertical-align: -3px; margin-right: 8px;"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              <span data-i18n="spa_modal_title">${t('spa_modal_title')}</span>
            </h3>
            <button class="spa-modal-close-btn" onclick="window.closeSpaModal()" aria-label="Закрити">✕</button>
          </div>

          <div class="spa-modal-body">
            <!-- Top Hero Section: Photo + Latin Philosophy -->
            <div class="spa-modal-hero">
              <div class="spa-modal-hero-photo">
                <img src="images/spa/spa_pool_main.png" alt="SPA Басейн Ribas Duke">
                <div class="spa-hero-badge" data-i18n="spa_modal_badge_pool">${t('spa_modal_badge_pool')}</div>
              </div>
              <div class="spa-modal-hero-text">
                <div class="spa-latin-tag" data-i18n="spa_modal_tag">${t('spa_modal_tag')}</div>
                <h4 class="spa-hero-heading" data-i18n="spa_modal_heading">${t('spa_modal_heading')}</h4>
                <p class="spa-hero-p" data-i18n="spa_modal_intro">
                  ${t('spa_modal_intro')}
                </p>
              </div>
            </div>

            <!-- Core Services Grid (4 Blocks) -->
            <div class="spa-modal-services-grid">
              <div class="spa-service-card">
                <div class="card-icon-title">
                  <span class="card-ico"><svg viewBox="0 0 24 24"><path d="M2 12h20M2 17h20M2 7h20"/></svg></span>
                  <h5 data-i18n="spa_modal_card1_title">${t('spa_modal_card1_title')}</h5>
                </div>
                <p data-i18n="spa_modal_card1_desc">${t('spa_modal_card1_desc')}</p>
              </div>

              <div class="spa-service-card">
                <div class="card-icon-title">
                  <span class="card-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                  <h5 data-i18n="spa_modal_card2_title">${t('spa_modal_card2_title')}</h5>
                </div>
                <p data-i18n="spa_modal_card2_desc">${t('spa_modal_card2_desc')}</p>
              </div>

              <div class="spa-service-card">
                <div class="card-icon-title">
                  <span class="card-ico"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><polygon points="12 6 13.5 9.5 17 10 14.5 12.5 15 16 12 14 9 16 9.5 12.5 7 10 10.5 9.5 12 6"/></svg></span>
                  <h5 data-i18n="spa_modal_card3_title">${t('spa_modal_card3_title')}</h5>
                </div>
                <p data-i18n="spa_modal_card3_desc">${t('spa_modal_card3_desc')}</p>
              </div>

              <div class="spa-service-card">
                <div class="card-icon-title">
                  <span class="card-ico"><svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg></span>
                  <h5 data-i18n="spa_modal_card4_title">${t('spa_modal_card4_title')}</h5>
                </div>
                <p data-i18n="spa_modal_card4_desc">${t('spa_modal_card4_desc')}</p>
              </div>
            </div>

            <!-- Guest Visits & Pricing Banner -->
            <div class="spa-modal-pricing-banner">
              <div class="pricing-banner-header">
                <span class="pricing-badge" data-i18n="spa_modal_guest_badge">${t('spa_modal_guest_badge')}</span>
                <h4 data-i18n="spa_modal_guest_heading">${t('spa_modal_guest_heading')}</h4>
                <p class="pricing-note-mini" data-i18n="spa_modal_note">${t('spa_modal_note')}</p>
              </div>

              <div class="price-item-card">
                <div class="price-item-header">
                  <span class="price-name" data-i18n="spa_modal_plan1_title">${t('spa_modal_plan1_title')}</span>
                  <span class="price-val" data-i18n="spa_modal_price_hour">${t('spa_modal_price_hour')}</span>
                </div>
                <ul class="price-features">
                  <li data-i18n="spa_modal_plan1_f1">${t('spa_modal_plan1_f1')}</li>
                  <li data-i18n="spa_modal_plan1_f2">${t('spa_modal_plan1_f2')}</li>
                </ul>
              </div>

              <div class="price-item-card featured">
                <div class="price-item-header">
                  <span class="price-name" data-i18n="spa_modal_plan2_title">${t('spa_modal_plan2_title')}</span>
                  <span class="price-val gold" data-i18n="spa_modal_price_hour">${t('spa_modal_price_hour')}</span>
                </div>
                <ul class="price-features">
                  <li data-i18n="spa_modal_plan2_f1">${t('spa_modal_plan2_f1')}</li>
                  <li data-i18n="spa_modal_plan2_f2">${t('spa_modal_plan2_f2')}</li>
                  <li data-i18n="spa_modal_plan2_f3">${t('spa_modal_plan2_f3')}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Footer CTA Actions -->
          <div class="spa-modal-footer">
            <div class="modal-cta-duo">
              <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>РЕЦЕПЦІЯ (101)</span>
              </a>
              <a href="https://t.me/ribashotels" target="_blank" class="btn-card-glass modal-cta-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                <span>TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeSpaModal();
      });
    }

    // Refresh translations
    const elements = overlay.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.innerHTML = val;
    });

    overlay.classList.add('active');
    activeModal = overlay;
  };

  window.closeSpaModal = function () {
    const overlay = document.getElementById('duke-spa-modal');
    if (overlay) {
      overlay.classList.remove('active');
    }
    if (activeModal === overlay) activeModal = null;
  };

  // 5. Conference & Events Modal
  window.openConferencePdfModal = function () {
    window.closeAllPopovers();
    const cta = `
      <div class="modal-cta-wrap">
        <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>ЗАМОВИТИ РОЗРАХУНОК (101)</span>
        </a>
      </div>
    `;
    window.openDukePdfModal(
      "Конференц-сервіс та заходи — Ribas Duke",
      "Презентація залів, схем розсадки, обладнання та банкетного обслуговування:",
      'docs/duke_hotel_info.pdf',
      cta
    );
  };

  // 6. Event Inquiry Lead Form Modal (First Name, Last Name, Phone Number, Event Type)
  window.openEventInquiryModal = function () {
    window.closeAllPopovers();

    let overlay = document.getElementById('duke-inquiry-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'duke-inquiry-modal';
      overlay.className = 'duke-modal-overlay';
      overlay.innerHTML = `
        <div class="duke-inquiry-modal-box">
          <button class="duke-modal-close" onclick="window.closeEventInquiryModal()" aria-label="Закрити">✕</button>
          
          <div class="inquiry-modal-header">
            <div class="inquiry-gold-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" style="margin-right: 6px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span data-i18n="inquiry_badge">КОНФЕРЕНЦ-СЕРВІС RIBAS DUKE</span>
            </div>
            <h3 class="inquiry-modal-title" data-i18n="inquiry_modal_title">Запит на розрахунок події</h3>
            <p class="inquiry-modal-subtitle" data-i18n="inquiry_modal_subtitle">
              Залиште ваші контактні дані, і персональний менеджер підготує індивідуальну пропозицію залів, обладнання та кейтерингу:
            </p>
          </div>

          <!-- Form View -->
          <form id="duke-inquiry-form" class="inquiry-modal-form" onsubmit="window.submitEventInquiry(event)">
            <div class="inquiry-form-row duo">
              <div class="inquiry-input-group">
                <label for="inquiry-first-name" class="inquiry-label" data-i18n="inquiry_first_name_label">Ім'я *</label>
                <input type="text" id="inquiry-first-name" name="first_name" class="inquiry-input" placeholder="Олександр" required autocomplete="given-name">
              </div>
              <div class="inquiry-input-group">
                <label for="inquiry-last-name" class="inquiry-label" data-i18n="inquiry_last_name_label">Прізвище *</label>
                <input type="text" id="inquiry-last-name" name="last_name" class="inquiry-input" placeholder="Коваленко" required autocomplete="family-name">
              </div>
            </div>

            <div class="inquiry-form-row">
              <div class="inquiry-input-group">
                <label for="inquiry-phone" class="inquiry-label" data-i18n="inquiry_phone_label">Номер телефону *</label>
                <div class="inquiry-phone-wrap">
                  <svg class="phone-icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input type="tel" id="inquiry-phone" name="phone" class="inquiry-input phone" placeholder="+38 (0__) ___-__-__" required autocomplete="tel">
                </div>
              </div>
            </div>

            <div class="inquiry-form-row">
              <div class="inquiry-input-group">
                <label for="inquiry-event-type" class="inquiry-label" data-i18n="inquiry_type_label">Формат події (необов'язково)</label>
                <select id="inquiry-event-type" name="event_type" class="inquiry-select">
                  <option value="Конференція / Семінар" data-i18n="inquiry_opt_conf">Конференція / Семінар</option>
                  <option value="Ділова зустріч / Переговори" data-i18n="inquiry_opt_meeting">Ділова зустріч / Переговори</option>
                  <option value="Банкет / Урочистість" data-i18n="inquiry_opt_banquet">Банкет / Урочистість</option>
                  <option value="Презентація / Воркшоп" data-i18n="inquiry_opt_presentation">Презентація / Воркшоп</option>
                </select>
              </div>
            </div>

            <button type="submit" id="btn-inquiry-submit" class="btn-card-gold inquiry-submit-btn">
              <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              <span data-i18n="inquiry_submit_btn">НАДІСЛАТИ ЗАПИТ МЕНЕДЖЕРУ</span>
            </button>
          </form>

          <!-- Success Message View -->
          <div id="inquiry-success-view" class="inquiry-success-view" style="display: none;">
            <div class="inquiry-success-icon">
              <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h4 class="inquiry-success-title" data-i18n="inquiry_success_title">Запит успішно надіслано!</h4>
            <p class="inquiry-success-desc" id="inquiry-success-desc" data-i18n="inquiry_success_desc">
              Дякуємо! Наш менеджер подій зв'яжеться з вами за вказаним номером телефону протягом 15 хвилин.
            </p>
            <div class="modal-cta-wrap" style="margin-top: 18px; width: 100%;">
              <button onclick="window.closeEventInquiryModal()" class="btn-card-gold modal-cta-btn">
                <span data-i18n="inquiry_success_close">ЗАКРИТИ</span>
              </button>
            </div>
          </div>

          <!-- Direct Quick Contact Footer -->
          <div class="inquiry-modal-footer">
            <span class="inquiry-footer-note" data-i18n="inquiry_or_contact">Або зв'яжіться з нами напряму:</span>
            <div class="modal-cta-duo">
              <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>МЕНЕДЖЕР (101)</span>
              </a>
              <a href="https://t.me/ribashotels" target="_blank" rel="noopener" class="btn-card-glass modal-cta-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                <span>TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) window.closeEventInquiryModal();
      });
    }

    // Reset form view when opening
    const formEl = overlay.querySelector('#duke-inquiry-form');
    const successEl = overlay.querySelector('#inquiry-success-view');
    if (formEl) formEl.style.display = 'flex';
    if (successEl) successEl.style.display = 'none';

    if (window.applyCurrentTranslations) {
      window.applyCurrentTranslations(overlay);
    }

    overlay.classList.add('active');
    activeModal = overlay;
  };

  window.closeEventInquiryModal = function () {
    const overlay = document.getElementById('duke-inquiry-modal');
    if (overlay) overlay.classList.remove('active');
    if (activeModal === overlay) activeModal = null;
  };

  window.submitEventInquiry = function (e) {
    e.preventDefault();
    const form = e.target;
    const firstName = form.first_name ? form.first_name.value.trim() : '';
    const lastName = form.last_name ? form.last_name.value.trim() : '';
    const phone = form.phone ? form.phone.value.trim() : '';

    if (!firstName || !lastName || !phone) return;

    const submitBtn = form.querySelector('#btn-inquiry-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Надсилання...</span>`;
    }

    setTimeout(() => {
      form.style.display = 'none';
      const successView = document.getElementById('inquiry-success-view');
      const successDesc = document.getElementById('inquiry-success-desc');
      if (successDesc) {
        successDesc.textContent = `${firstName}, дякуємо! Наш менеджер подій зв'яжеться з вами за номером ${phone} найближчим часом.`;
      }
      if (successView) {
        successView.style.display = 'flex';
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          <span data-i18n="inquiry_submit_btn">НАДІСЛАТИ ЗАПИТ МЕНЕДЖЕРУ</span>
        `;
      }
    }, 600);
  };

  // 7. Odesa Map Modal
  window.openOdesaMapPdfModal = function () {
    window.closeAllPopovers();
    const cta = `
      <div class="modal-cta-wrap">
        <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
          <span>ЗАМОВИТИ ЕКСКУРСІЮ (101)</span>
        </a>
      </div>
    `;
    window.openDukePdfModal(
      "Авторська карта-маршрут «Центр Одеси»",
      "Пам'ятки архітектури, легендарні дворики та кращі маршрути від консьєржа Ribas Duke:",
      'docs/duke_hotel_info.pdf',
      cta
    );
  };

  // 8. Tickets & Excursions Action
  window.openConciergeTourModal = function () {
    window.closeAllPopovers();
    window.openDukePdfModal(
      "Театральні квитки та авторські екскурсії",
      "Консьєрж-служба допоможе забронювати кращі місця в Опері та організує приватного гіда:",
      'docs/duke_hotel_info.pdf',
      `
        <div class="modal-cta-duo">
          <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>КОНСЬЄРЖ (101)</span>
          </a>
          <a href="https://t.me/ribashotels" target="_blank" class="btn-card-glass modal-cta-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            <span>TELEGRAM</span>
          </a>
        </div>
      `
    );
  };

  // 9. Transfer Booking Action
  window.openTransferModal = function () {
    window.closeAllPopovers();
    window.openDukePdfModal(
      "Комфортний трансфер — Ribas Duke",
      "Індивідуальні поїздки до аеропорту, залізничного вокзалу або по узбережжю Одеси:",
      'docs/duke_hotel_info.pdf',
      `
        <div class="modal-cta-duo">
          <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>ТРАНСФЕР (101)</span>
          </a>
          <a href="https://t.me/ribashotels" target="_blank" class="btn-card-glass modal-cta-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            <span>TELEGRAM</span>
          </a>
        </div>
      `
    );
  };

  // 10. Safe Instructions Modal
  window.openSafeInstructionsPdfModal = function () {
    window.closeAllPopovers();
    const cta = `
      <div class="modal-cta-wrap">
        <a href="tel:+380487053775" class="btn-card-gold modal-cta-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>ДОПОМОГА РЕЦЕПЦІЇ (101)</span>
        </a>
      </div>
    `;
    window.openDukePdfModal(
      "Інструкція до електронного сейфа",
      "Покроковий посібник зі встановлення особистого цифрового коду та блокування:",
      'docs/duke_safe_instructions.pdf',
      cta
    );
  };

  // 11. Luggage & Reception Call Action
  window.openLuggageServiceModal = function () {
    window.location.href = "tel:+380487053775";
  };

  // 12. Fullscreen Interactive Map Pop-up Modal
  window.openGoogleMapModal = function () {
    window.closeAllPopovers();
    const mapIframeUrl = 'https://maps.google.com/maps?q=Ribas+Duke+Boutique+Hotel,+Teatralnyi+Ln,+10,+Odesa,+Odesa+Oblast,+Ukraine,+65000&t=&z=17&ie=UTF8&iwloc=&output=embed';
    const mapIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--duke-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 8px;"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`;
    const title = window.t ? window.t('screen7_map_modal_title') : 'Маршрут на карті — Ribas Duke';
    window.openWebMenuModal(mapIframeUrl, title, mapIcon);
  };

  window.closeDukeModal = function () {
    if (activeModal) {
      activeModal.classList.remove('active');
      const iframe = document.getElementById('pdf-modal-iframe');
      if (iframe) iframe.src = '';
      activeModal = null;
    }
  };

  // Close modals & popovers on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeDukeModal();
      window.closeAllPopovers();
    }
  });

  // ==========================================================================
  // 12. Interactive Typography & Font Testing Studio (10 Titles + 10 Subtitles)
  // ==========================================================================
  const TITLE_FONTS = [
    { name: "01. Playfair", font: "'Playfair Display', serif", weight: "500", spacing: "0.06em", label: "Playfair Display" },
    { name: "02. Cormorant", font: "'Cormorant Garamond', serif", weight: "500", spacing: "0.08em", label: "Cormorant Garamond" },
    { name: "03. Bodoni", font: "'Bodoni Moda', serif", weight: "500", spacing: "0.08em", label: "Bodoni Moda" },
    { name: "04. Prata", font: "'Prata', serif", weight: "400", spacing: "0.08em", label: "Prata" },
    { name: "05. Tenor", font: "'Tenor Sans', sans-serif", weight: "400", spacing: "0.08em", label: "Tenor Sans" },
    { name: "06. El Messiri", font: "'El Messiri', sans-serif", weight: "500", spacing: "0.06em", label: "El Messiri" },
    { name: "07. Forum", font: "'Forum', serif", weight: "400", spacing: "0.1em", label: "Forum" },
    { name: "08. Philosopher", font: "'Philosopher', sans-serif", weight: "400", spacing: "0.08em", label: "Philosopher" },
    { name: "09. Raleway", font: "'Raleway', sans-serif", weight: "400", spacing: "0.12em", label: "Raleway" },
    { name: "10. Arsenal", font: "'Arsenal', sans-serif", weight: "400", spacing: "0.09em", label: "Arsenal" }
  ];

  const SUBTITLE_FONTS = [
    { name: "01. Lora", font: "'Lora', serif", weight: "400", spacing: "0.02em", label: "Lora" },
    { name: "02. Manrope", font: "'Manrope', sans-serif", weight: "400", spacing: "0.02em", label: "Manrope" },
    { name: "03. Mulish", font: "'Mulish', sans-serif", weight: "300", spacing: "0.03em", label: "Mulish" },
    { name: "04. Montserrat", font: "'Montserrat', sans-serif", weight: "300", spacing: "0.04em", label: "Montserrat" },
    { name: "05. Jost", font: "'Jost', sans-serif", weight: "300", spacing: "0.04em", label: "Jost" },
    { name: "06. Onest", font: "'Onest', sans-serif", weight: "300", spacing: "0.02em", label: "Onest" },
    { name: "07. Commissioner", font: "'Commissioner', sans-serif", weight: "300", spacing: "0.03em", label: "Commissioner" },
    { name: "08. Golos", font: "'Golos Text', sans-serif", weight: "400", spacing: "0.02em", label: "Golos Text" },
    { name: "09. Spectral", font: "'Spectral', serif", weight: "300", spacing: "0.03em", label: "Spectral" },
    { name: "10. Jakarta", font: "'Plus Jakarta Sans', sans-serif", weight: "400", spacing: "0.02em", label: "Plus Jakarta Sans" }
  ];

  let currentFontTarget = 'title';
  let activeTitleFont = TITLE_FONTS[4].font; // default Tenor Sans
  let activeSubtitleFont = SUBTITLE_FONTS[9].font; // default Plus Jakarta Sans

  window.renderFontPills = function () {
    const container = document.getElementById('font-pills-row');
    if (!container) return;

    const list = currentFontTarget === 'title' ? TITLE_FONTS : SUBTITLE_FONTS;
    const activeCurrent = currentFontTarget === 'title' ? activeTitleFont : activeSubtitleFont;

    container.innerHTML = list.map((item) => {
      const isActive = item.font === activeCurrent ? 'active' : '';
      return `
        <button class="font-pill ${isActive}" 
          data-font="${item.font}" 
          data-weight="${item.weight}" 
          data-spacing="${item.spacing}" 
          data-label="${item.label}" 
          onclick="window.selectFont(this)">
          ${item.name}
        </button>
      `;
    }).join('');
  };

  window.setFontTarget = function (target) {
    currentFontTarget = target;
    const titleBtn = document.getElementById('target-title-btn');
    const subtitleBtn = document.getElementById('target-subtitle-btn');
    if (titleBtn && subtitleBtn) {
      if (target === 'title') {
        titleBtn.classList.add('active');
        subtitleBtn.classList.remove('active');
      } else {
        subtitleBtn.classList.add('active');
        titleBtn.classList.remove('active');
      }
    }
    window.renderFontPills();
  };

  window.selectFont = function (btn) {
    const font = btn.getAttribute('data-font');
    const weight = btn.getAttribute('data-weight') || '400';
    const spacing = btn.getAttribute('data-spacing') || '0.05em';
    const label = btn.getAttribute('data-label') || font;

    if (currentFontTarget === 'title') {
      activeTitleFont = font;
      document.documentElement.style.setProperty('--font-active-title', font);
      document.documentElement.style.setProperty('--font-active-weight', weight);
      document.documentElement.style.setProperty('--font-active-spacing', spacing);
      window.showDukeToast(`Заголовок: ${label}`);
    } else {
      activeSubtitleFont = font;
      document.documentElement.style.setProperty('--font-active-subtitle', font);
      document.documentElement.style.setProperty('--font-subtitle-weight', weight);
      document.documentElement.style.setProperty('--font-subtitle-spacing', spacing);
      window.showDukeToast(`Підзаголовок: ${label}`);
    }

    // Update active pill
    const container = document.getElementById('font-pills-row');
    if (container) {
      container.querySelectorAll('.font-pill').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    }
  };

  // Restaurant Featured Photo Showcase Controller (Single Slide)
  let currentRestaurantSlide = 0;
  const totalRestaurantSlides = 4;
  let restaurantSliderTimer = null;

  window.setRestaurantSlide = function (index) {
    currentRestaurantSlide = (index + totalRestaurantSlides) % totalRestaurantSlides;
    const slides = document.querySelectorAll('.showcase-slide, .restaurant-slide');
    const dots = document.querySelectorAll('#restaurant-slider-dots .showcase-dot, #restaurant-slider-dots .slider-dot');
    const pills = document.querySelectorAll('#showcase-pills-row .showcase-pill');
    
    slides.forEach((s, idx) => {
      if (idx === currentRestaurantSlide) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    dots.forEach((d, idx) => {
      if (idx === currentRestaurantSlide) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });

    pills.forEach((p, idx) => {
      if (idx === currentRestaurantSlide) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  };

  window.nextRestaurantSlide = function () {
    window.setRestaurantSlide(currentRestaurantSlide + 1);
  };

  window.prevRestaurantSlide = function () {
    window.setRestaurantSlide(currentRestaurantSlide - 1);
  };

  window.pauseRestaurantSlider = function () {
    if (restaurantSliderTimer) {
      clearInterval(restaurantSliderTimer);
      restaurantSliderTimer = null;
    }
  };

  window.resumeRestaurantSlider = function () {
    window.pauseRestaurantSlider();
    restaurantSliderTimer = setInterval(() => {
      // only advance if screen 2 is active
      const screen2 = document.querySelector('.screen-content[data-screen="2"]');
      if (screen2 && screen2.classList.contains('active')) {
        window.nextRestaurantSlide();
      }
    }, 4800);
  };

  // Start autoplay
  window.resumeRestaurantSlider();

  // ==========================================
  // MOBILE FULLSCREEN BURGER MENU CONTROLLER
  // ==========================================
  window.toggleMobileMenu = function () {
    const overlay = document.getElementById('mobile-menu-overlay');
    const burger = document.getElementById('mobile-burger-trigger');
    if (!overlay) return;
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      window.closeMobileMenu();
    } else {
      window.openMobileMenu();
    }
  };

  window.openMobileMenu = function () {
    const overlay = document.getElementById('mobile-menu-overlay');
    const burger = document.getElementById('mobile-burger-trigger');
    if (overlay) {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    }
    if (burger) {
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
    }
  };

  window.closeMobileMenu = function () {
    const overlay = document.getElementById('mobile-menu-overlay');
    const burger = document.getElementById('mobile-burger-trigger');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (burger) {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  };

  window.navMobileScreen = function (screenIndex) {
    window.closeMobileMenu();
    if (window.fadeToScreenEngine) {
      window.fadeToScreenEngine(screenIndex);
    } else if (window.goToScreenEngine) {
      window.goToScreenEngine(screenIndex);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.renderFontPills();
    });
  } else {
    window.renderFontPills();
  }
})();
