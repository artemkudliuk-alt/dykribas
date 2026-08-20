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
    2: { name: 'Ресторан LenMar', image: 'Photo_screens/2 - Restaurant.webp' },
    3: { name: 'SPA & Басейн', image: 'Photo_screens/3 - Spa.webp' },
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
  const navDots = document.querySelectorAll('.nav-dot');
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
      return `Photo_screens/mob_video/${from}-${to}.mp4`;
    }
    return `Photo_screens/${from}-${to}.mp4`;
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

  // --- Preload All Video Files ---
  const preloadedVideos = {};
  function preloadTransitions() {
    if (transitionVideo) {
      transitionVideo.src = getTransitionVideoSrc(1, 2);
      transitionVideo.preload = 'metadata';
    }

    for (let i = 1; i < TOTAL_SCREENS; i++) {
      const forwardSrc = getTransitionVideoSrc(i, i + 1);
      const reverseSrc = getTransitionVideoSrc(i + 1, i);

      [forwardSrc, reverseSrc].forEach((src) => {
        const v = document.createElement('video');
        v.preload = 'none';
        v.muted = true;
        v.playsInline = true;
        v.src = src;
        preloadedVideos[src] = v;
      });
    }
  }

  // --- Update UI Indicators ---
  function updateUI(screenIndex) {
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

    // 1. Instantly hide ALL UI (logo, menu, buttons, indicators, overlay, text)
    document.body.classList.add('is-transitioning');
    if (window.hideAllScreenContent) window.hideAllScreenContent();

    // Video path for this step (resolves to mob_video on mobile devices)
    const videoSrc = getTransitionVideoSrc(fromScreen, nextStep);
    const isFromHero = fromScreen === 1;
    const isToHero = nextStep === 1;

    let safetyTimer = null;

    const cleanupListeners = () => {
      clearTimeout(safetyTimer);
      transitionVideo.removeEventListener('ended', onEnded);
      transitionVideo.removeEventListener('error', onError);
    };

    const onError = () => {
      console.warn(`Transition video failed for ${videoSrc}, performing instant fallback.`);
      cleanupListeners();
      onEnded();
    };

    // When transition video completes -> restore UI & reveal new screen content
    const onEnded = () => {
      cleanupListeners();
      transitionVideo.pause();

      // Case A: Moving into Hero Screen (Screen 1) -> Switch to Hero Video Loop
      if (isToHero) {
        playHeroLoop();
        heroLayer.classList.add('active');
        transitionLayer.classList.remove('active');
        imageLayer.classList.remove('active');

        currentScreen = 1;
        document.body.classList.remove('is-transitioning');
        updateUI(currentScreen);
        isTransitioning = false;

        // Preload next forward transition
        transitionVideo.src = getTransitionVideoSrc(1, 2);
        transitionVideo.load();

        if (targetScreen !== currentScreen) {
          goToScreen(targetScreen);
        }
      } 
      // Case B: Moving into Screens 2 - 7 -> Switch to static 4K image
      else {
        imageLayer.classList.add('active');
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

    transitionVideo.addEventListener('ended', onEnded);
    transitionVideo.addEventListener('error', onError);

    // Ensure transition video src is correct
    if (transitionVideo.src.indexOf(videoSrc) === -1) {
      transitionVideo.src = videoSrc;
    }
    transitionVideo.currentTime = 0;

    // As soon as video starts playing, update the background image to the destination screen
    const onPlaying = () => {
      transitionVideo.removeEventListener('playing', onPlaying);
      transitionLayer.classList.add('active');
      if (isFromHero) {
        pauseHeroLoop();
        heroLayer.classList.remove('active');
      }
      if (!isToHero) {
        screenImg.src = getScreenImage(nextStep);
      }
    };
    transitionVideo.addEventListener('playing', onPlaying);

    const playPromise = transitionVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        transitionLayer.classList.add('active');
        if (isFromHero) {
          pauseHeroLoop();
          heroLayer.classList.remove('active');
        }
        if (!isToHero) {
          screenImg.src = getScreenImage(nextStep);
        }
      }).catch((err) => {
        console.warn('Direct play error, waiting for buffer:', err);
        transitionVideo.addEventListener('canplaythrough', function onCanPlayOnce() {
          transitionVideo.removeEventListener('canplaythrough', onCanPlayOnce);
          transitionLayer.classList.add('active');
          if (isFromHero) {
            pauseHeroLoop();
            heroLayer.classList.remove('active');
          }
          if (!isToHero) {
            screenImg.src = getScreenImage(nextStep);
          }
          transitionVideo.play().catch(() => onEnded());
        });
      });
    }

    // Safety timeout: never hang more than 4.5 seconds under any circumstance
    safetyTimer = setTimeout(() => {
      if (isTransitioning) {
        console.warn('Safety timeout reached for transition, restoring screen.');
        onEnded();
      }
    }, 4500);
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

  // --- Input Handlers (Wheel, Touch, Keyboard) ---
  function onWheel(e) {
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
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }

  function onTouchEnd(e) {
    if (isTransitioning) return;
    if (e.changedTouches && e.changedTouches.length === 1) {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

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

    // Sidebar Dot/Bar Navigation Click — Now switches directly via FADE instead of video flight!
    navDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetScreen = parseInt(dot.getAttribute('data-screen'), 10);
        fadeToScreen(targetScreen);
      });
    });
  }

  // --- Initialize App ---
  function init() {
    window.goToScreenEngine = goToScreen;
    window.fadeToScreenEngine = fadeToScreen;
    window.scrollToMainScreen = function () {
      fadeToScreen(1);
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
