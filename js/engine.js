/**
 * RIBAS DUKE BOUTIQUE HOTEL — SEAMLESS VIDEO SCROLL ENGINE
 * High-performance, hardware-accelerated dual-direction video transitions
 */

(function () {
  'use strict';

  // --- Configuration ---
  const TOTAL_SCREENS = 7;
  const SCREENS_CONFIG = {
    1: { name: 'Фасад', image: 'Photo_screens/1 - Hero.webp', isHero: true },
    2: { name: 'Ресторан LenMar', image: 'Photo_screens/2 - Restaurant_new.webp?v=110' },
    3: { name: 'SPA & Басейн', image: 'Photo_screens/3 - Spa.webp?v=110' },
    4: { name: 'Конференц-зал', image: 'Photo_screens/4 - Hall.webp' },
    5: { name: 'Балкон & Одеса', image: 'Photo_screens/5 - Balcony.webp' },
    6: { name: 'Рецепція & Лоббі', image: 'Photo_screens/6 - Lobby.webp' },
    7: { name: 'Вечірній Дюк', image: 'Photo_screens/7 - Footer.webp' }
  };

  // --- DOM Elements ---
  const heroLayer = document.getElementById('hero-layer');
  const heroVideo1 = document.getElementById('hero-video-1');
  const heroVideo2 = document.getElementById('hero-video-2');
  const transitionLayer = document.getElementById('transition-layer');
  const transitionVideo = document.getElementById('transition-video');
  const imageLayer = document.getElementById('image-layer');
  const screenImg = document.getElementById('screen-img');
  const currentScreenNum = document.getElementById('current-screen-num');
  const navDots = document.querySelectorAll('.indicator-item, .nav-dot');
  const scrollHint = document.getElementById('scroll-hint');

  // --- State ---
  let currentScreen = 1;
  let isTransitioning = false;
  let touchStartY = 0;
  let wheelTimeout = null;

  // --- Mobile Viewport & Video Path Resolver ---
  function isMobileViewport() {
    return window.innerWidth <= 820 || window.matchMedia('(max-width: 820px)').matches || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function getTransitionVideoSrc(from, to) {
    if (isMobileViewport()) {
      return `Photo_screens/mob_video/${from}-${to}.mp4?v=110`;
    }
    return `Photo_screens/${from}-${to}.mp4?v=110`;
  }

  function getHeroVideoSrc() {
    if (isMobileViewport()) {
      return 'Photo_screens/mob_video/Hero_mob.mp4';
    }
    return 'Photo_screens/Hero_new.mp4';
  }

  function getScreenImage(screenIndex) {
    if (isMobileViewport()) {
      if (screenIndex >= 2 && screenIndex <= 7) {
        return `Photo_screens/mob_video/screen${screenIndex}.png`;
      }
      return 'Photo_screens/1 - Hero.webp';
    }
    return SCREENS_CONFIG[screenIndex] ? SCREENS_CONFIG[screenIndex].image : 'Photo_screens/1 - Hero.webp';
  }

  // --- Hero Video Seamless Soft Crossfade Loop Manager ---
  const HERO_FADE_LEAD_TIME = 1.3; // Start soft crossfade 1.3s before video ends
  let heroActivePlayer = 1;
  let heroCrossfading = false;

  function initHeroLoop() {
    if (!heroVideo1 || !heroVideo2) return;

    const heroSrc = getHeroVideoSrc();
    if (heroVideo1.src.indexOf(heroSrc) === -1) {
      heroVideo1.src = heroSrc;
    }
    if (heroVideo2.src.indexOf(heroSrc) === -1) {
      heroVideo2.src = heroSrc;
    }

    heroVideo1.addEventListener('timeupdate', () => {
      if (currentScreen !== 1 || isTransitioning) return;
      if (!heroVideo1.duration) return;
      if (heroVideo1.currentTime >= heroVideo1.duration - HERO_FADE_LEAD_TIME && !heroCrossfading && heroActivePlayer === 1) {
        heroCrossfading = true;
        heroVideo2.currentTime = 0;
        heroVideo2.play().catch(console.error);
        heroVideo2.classList.add('active');
        heroVideo1.classList.remove('active');
        heroActivePlayer = 2;
      }
    });

    heroVideo2.addEventListener('timeupdate', () => {
      if (currentScreen !== 1 || isTransitioning) return;
      if (!heroVideo2.duration) return;
      if (heroVideo2.currentTime >= heroVideo2.duration - HERO_FADE_LEAD_TIME && !heroCrossfading && heroActivePlayer === 2) {
        heroCrossfading = true;
        heroVideo1.currentTime = 0;
        heroVideo1.play().catch(console.error);
        heroVideo1.classList.add('active');
        heroVideo2.classList.remove('active');
        heroActivePlayer = 1;
      }
    });

    heroVideo1.addEventListener('ended', () => {
      heroCrossfading = false;
      heroVideo1.pause();
    });

    heroVideo2.addEventListener('ended', () => {
      heroCrossfading = false;
      heroVideo2.pause();
    });
  }

  function playHeroLoop() {
    if (!heroVideo1 || !heroVideo2) return;
    const heroSrc = getHeroVideoSrc();
    if (heroVideo1.src.indexOf(heroSrc) === -1) {
      heroVideo1.src = heroSrc;
    }
    if (heroVideo2.src.indexOf(heroSrc) === -1) {
      heroVideo2.src = heroSrc;
    }

    heroActivePlayer = 1;
    heroCrossfading = false;
    heroVideo1.currentTime = 0;
    heroVideo1.play().catch(console.error);
    heroVideo1.classList.add('active');
    heroVideo2.classList.remove('active');
    heroVideo2.pause();
  }

  function pauseHeroLoop() {
    if (heroVideo1) heroVideo1.pause();
    if (heroVideo2) heroVideo2.pause();
  }

  // --- Smart Dynamic Adjacent Preload Engine ---
  const preloadedUrls = new Set();
  function preloadResource(url, type) {
    if (!url || preloadedUrls.has(url)) return;
    preloadedUrls.add(url);

    if (type === 'video') {
      const v = document.createElement('video');
      v.preload = 'auto';
      v.muted = true;
      v.playsInline = true;
      v.src = url;
    } else {
      const img = new Image();
      img.src = url;
    }
  }

  function preloadAdjacent(screenIndex) {
    // Forward step
    if (screenIndex < TOTAL_SCREENS) {
      preloadResource(getTransitionVideoSrc(screenIndex, screenIndex + 1), 'video');
      preloadResource(getScreenImage(screenIndex + 1), 'image');
    }
    // Backward step
    if (screenIndex > 1) {
      preloadResource(getTransitionVideoSrc(screenIndex, screenIndex - 1), 'video');
      preloadResource(getScreenImage(screenIndex - 1), 'image');
    }
  }

  function preloadTransitions() {
    if (transitionVideo) {
      transitionVideo.src = getTransitionVideoSrc(1, 2);
      transitionVideo.preload = 'auto';
    }
    preloadAdjacent(1);
  }

  // --- Update UI Indicators ---
  function updateUI(screenIndex) {
    preloadAdjacent(screenIndex);

    if (currentScreenNum) {
      currentScreenNum.textContent = String(screenIndex).padStart(2, '0');
    }

    if (navDots && navDots.length > 0) {
      navDots.forEach((dot) => {
        const dotScreen = parseInt(dot.getAttribute('data-screen'), 10);
        if (dotScreen === screenIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    if (scrollHint) {
      if (screenIndex > 1) {
        scrollHint.classList.add('hidden');
      } else {
        scrollHint.classList.remove('hidden');
      }
    }

    const btnTop = document.getElementById('btn-scroll-top');
    if (btnTop) {
      if (screenIndex > 1) {
        btnTop.classList.add('visible');
      } else {
        btnTop.classList.remove('visible');
      }
    }

    if (window.updateScreenContent) {
      window.updateScreenContent(screenIndex);
    }
  }

  // --- Transition Logic ---
  function goToScreen(targetScreen) {
    if (isTransitioning || targetScreen === currentScreen) return;
    if (targetScreen < 1 || targetScreen > TOTAL_SCREENS) return;

    isTransitioning = true;
    const fromScreen = currentScreen;
    const direction = targetScreen > fromScreen ? 1 : -1;
    const nextStep = fromScreen + direction;

    // Video path for this step (resolves to mob_video on mobile devices)
    const videoSrc = getTransitionVideoSrc(fromScreen, nextStep);
    const isFromHero = fromScreen === 1;
    const isToHero = nextStep === 1;

    let safetyTimer = null;
    let uiHideTimer = null;
    let transitionFinished = false;

    const cleanupListeners = () => {
      clearTimeout(safetyTimer);
      clearTimeout(uiHideTimer);
      transitionVideo.removeEventListener('ended', onEnded);
      transitionVideo.removeEventListener('error', onError);
      transitionVideo.removeEventListener('playing', onPlaying);
    };

    // Delay UI & overlay fade-out by ~500ms after video starts playing
    const triggerDelayedUiHide = () => {
      if (uiHideTimer || transitionFinished) return;
      uiHideTimer = setTimeout(() => {
        if (!transitionFinished) {
          document.body.classList.add('is-transitioning');
          if (window.hideAllScreenContent) window.hideAllScreenContent();
        }
      }, 500);
    };

    const onPlaying = () => {
      // Transition video is now actively rendering frames on screen!
      // Safely switch the destination image UNDER the opaque video layer so it is ready on ended
      if (!isToHero) {
        screenImg.src = getScreenImage(nextStep);
      }
      if (isFromHero) {
        pauseHeroLoop();
        heroLayer.classList.remove('active');
      }
      triggerDelayedUiHide();
    };

    // When transition completes -> restore UI & reveal new screen content
    const onEnded = () => {
      if (transitionFinished) return;
      transitionFinished = true;
      cleanupListeners();
      transitionVideo.pause();

      // Case A: Moving into Hero Screen (Screen 1) -> Switch to Hero Video Loop
      if (isToHero) {
        playHeroLoop();
        heroLayer.classList.add('active');
        imageLayer.classList.remove('active');
        transitionLayer.classList.remove('active');

        currentScreen = 1;
        document.body.classList.remove('is-transitioning');
        updateUI(currentScreen);
        isTransitioning = false;

        if (targetScreen !== currentScreen) {
          goToScreen(targetScreen);
        }
      } 
      // Case B: Moving into Screens 2 - 7 -> Switch to static image
      else {
        screenImg.src = getScreenImage(nextStep);
        imageLayer.classList.add('active');
        heroLayer.classList.remove('active');
        transitionLayer.classList.remove('active');

        currentScreen = nextStep;
        document.body.classList.remove('is-transitioning');
        updateUI(currentScreen);
        isTransitioning = false;

        if (targetScreen !== currentScreen) {
          goToScreen(targetScreen);
        }
      }
    };

    const onError = () => {
      console.warn(`Transition video error for ${videoSrc}, performing instant fallback.`);
      onEnded();
    };

    transitionVideo.addEventListener('ended', onEnded);
    transitionVideo.addEventListener('error', onError);
    transitionVideo.addEventListener('playing', onPlaying, { once: true });

    // Ensure transition video element has mandatory attributes for mobile WebKit & Blink
    transitionVideo.muted = true;
    transitionVideo.defaultMuted = true;
    transitionVideo.playsInline = true;
    transitionVideo.setAttribute('playsinline', '');
    transitionVideo.setAttribute('webkit-playsinline', '');
    transitionVideo.setAttribute('muted', '');

    // Activate transition layer so it is ready on top
    transitionLayer.classList.add('active');

    // Ensure transition video src is correct and loaded
    let isSrcChanged = false;
    if (transitionVideo.src.indexOf(videoSrc) === -1) {
      transitionVideo.src = videoSrc;
      transitionVideo.load();
      isSrcChanged = true;
    } else {
      transitionVideo.currentTime = 0;
    }

    const startTransitionPlay = () => {
      transitionVideo.removeEventListener('loadeddata', startTransitionPlay);
      transitionVideo.removeEventListener('canplay', startTransitionPlay);
      
      const playPromise = transitionVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // onPlaying will handle delayed UI hide and destination image update
        }).catch((err) => {
          console.warn('Transition play catch:', err);
          onEnded();
        });
      }
    };

    if (!isSrcChanged && transitionVideo.readyState >= 2) {
      startTransitionPlay();
    } else {
      transitionVideo.addEventListener('loadeddata', startTransitionPlay, { once: true });
      transitionVideo.addEventListener('canplay', startTransitionPlay, { once: true });
    }

    // Safety timeout: max 3.2 seconds so transitions never hang
    safetyTimer = setTimeout(() => {
      if (!transitionFinished) {
        console.warn('Safety timeout reached for transition, restoring screen.');
        onEnded();
      }
    }, 3200);
  }

  // --- Instant Crossfade Navigation (For sidebar indicator / direct clicks) ---
  function fadeToScreen(targetScreen) {
    if (isTransitioning || targetScreen === currentScreen) return;
    if (targetScreen < 1 || targetScreen > TOTAL_SCREENS) return;

    isTransitioning = true;
    const isToHero = targetScreen === 1;

    // 1. Hide UI during crossfade
    document.body.classList.add('is-transitioning');
    if (window.hideAllScreenContent) window.hideAllScreenContent();

    // 2. Pause any ongoing transition video
    if (transitionVideo) {
      transitionVideo.pause();
      transitionLayer.classList.remove('active');
    }

    if (isToHero) {
      // Transitioning to Hero (Screen 1)
      playHeroLoop();
      heroLayer.classList.add('active');
      imageLayer.classList.remove('active');
      transitionLayer.classList.remove('active');

      setTimeout(() => {
        currentScreen = 1;
        document.body.classList.remove('is-transitioning');
        updateUI(currentScreen);
        isTransitioning = false;
        
        // Preload next forward transition video
        transitionVideo.src = getTransitionVideoSrc(1, 2);
        transitionVideo.load();
      }, 400);
    } else {
      // Transitioning to Screens 2 - 7 via silky crossfade
      pauseHeroLoop();
      heroLayer.classList.remove('active');
      transitionLayer.classList.remove('active');

      imageLayer.style.transition = 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
      imageLayer.style.opacity = '0';

      const nextImg = new Image();
      nextImg.src = getScreenImage(targetScreen);
      
      const applyTargetImage = () => {
        screenImg.src = getScreenImage(targetScreen);
        imageLayer.classList.add('active');
        imageLayer.style.opacity = '1';

        setTimeout(() => {
          imageLayer.style.transition = '';
          currentScreen = targetScreen;
          document.body.classList.remove('is-transitioning');
          updateUI(currentScreen);
          isTransitioning = false;
        }, 350);
      };

      if (nextImg.complete) {
        setTimeout(applyTargetImage, 100);
      } else {
        nextImg.onload = applyTargetImage;
        nextImg.onerror = applyTargetImage;
      }
    }
  }

  // Helper to check if any modal is currently open or event occurred inside a modal
  function isAnyModalActive(target) {
    if (target && typeof target.closest === 'function') {
      if (target.closest('.duke-modal-overlay') || 
          target.closest('.duke-pdf-modal-box') || 
          target.closest('.pdf-embed-wrapper') || 
          target.closest('.pdf-pages-scroll') ||
          target.closest('.duke-inquiry-modal-box') ||
          target.closest('.duke-webmenu-box') ||
          target.closest('.duke-spa-modal-box')) {
        return true;
      }
    }
    const activeModal = document.querySelector('.duke-modal-overlay.active');
    return !!activeModal;
  }

  // --- Input Handlers (Wheel, Touch, Keyboard) ---
  function onWheel(e) {
    if (isAnyModalActive(e.target)) {
      // Allow native natural scrolling inside PDF/Modal without blocking or sliding backgrounds!
      return;
    }

    e.preventDefault();
    if (isTransitioning) return;

    // Minimum scroll threshold to avoid accidental triggers
    if (Math.abs(e.deltaY) < 25) return;

    if (e.deltaY > 0) {
      goToScreen(currentScreen + 1);
    } else {
      goToScreen(currentScreen - 1);
    }
  }

  function onTouchStart(e) {
    if (isAnyModalActive(e.target)) {
      touchStartY = null;
      return;
    }
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }

  function onTouchEnd(e) {
    if (touchStartY === null || isTransitioning) return;
    if (isAnyModalActive(e.target)) {
      touchStartY = null;
      return;
    }
    if (e.changedTouches && e.changedTouches.length === 1) {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      touchStartY = null;

      // Swipe threshold: 45px
      if (Math.abs(diffY) > 45) {
        if (diffY > 0) {
          goToScreen(currentScreen + 1); // Swipe up -> scroll down
        } else {
          goToScreen(currentScreen - 1); // Swipe down -> scroll up
        }
      }
    }
  }

  function onKeyDown(e) {
    if (isAnyModalActive(e.target)) {
      if (e.key === 'Escape') {
        if (window.closeDukeModal) window.closeDukeModal();
        if (window.closeRestaurantWebMenuModal) window.closeRestaurantWebMenuModal();
        if (window.closeInquiryModal) window.closeInquiryModal();
        if (window.closeTransferModal) window.closeTransferModal();
        if (window.closeSpaModal) window.closeSpaModal();
      }
      return;
    }
    if (isTransitioning) return;

    if (['ArrowDown', 'PageDown', 'Space', 'KeyJ'].includes(e.code)) {
      e.preventDefault();
      goToScreen(currentScreen + 1);
    } else if (['ArrowUp', 'PageUp', 'KeyK'].includes(e.code)) {
      e.preventDefault();
      goToScreen(currentScreen - 1);
    } else if (e.key >= '1' && e.key <= String(TOTAL_SCREENS)) {
      e.preventDefault();
      goToScreen(parseInt(e.key, 10));
    }
  }

  // --- Attach Event Listeners ---
  function initEvents() {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    // Sidebar Dot/Bar Navigation Click — Triggers smooth video flights!
    navDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetScreen = parseInt(dot.getAttribute('data-screen'), 10);
        goToScreen(targetScreen);
      });
    });
  }

  // --- Initialize App ---
  function init() {
    window.goToScreenEngine = goToScreen;
    window.fadeToScreenEngine = goToScreen;
    window.scrollToMainScreen = function () {
      goToScreen(1);
    };
    window.startHeroFromPreloader = playHeroLoop;
    preloadTransitions();
    updateUI(1);
    initEvents();

    const overlay = document.querySelector('.cinematic-screen-overlay');
    if (overlay) overlay.classList.add('active');

    // Initialize seamless soft crossfade loop for hero video
    initHeroLoop();
    if (!document.getElementById('duke-preloader-root') || window.sitePreloaderFinished) {
      playHeroLoop();
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
