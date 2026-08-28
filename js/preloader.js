/**
 * Ribas Duke Boutique Hotel — Cinematic Preloader System
 * Dual-stage:
 * 1. Minimalist Black screen with Percentage counter (0% -> 100%) while buffering preloader video (~1MB)
 * 2. Fullscreen 5-second video preloader (darkened slightly) with 2-second slow fade-in logo
 * Parallel background preloading of Screen 1 Hero video & assets during the 5s playback
 */

(function () {
  'use strict';

  function isMobile() {
    return window.innerWidth <= 820 || window.matchMedia('(max-width: 820px)').matches || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const preloaderRoot = document.getElementById('duke-preloader-root');
  const counterStage = document.getElementById('preloader-counter-stage');
  const counterVal = document.getElementById('preloader-counter-val');
  const barFill = document.getElementById('preloader-bar-fill');
  const videoStage = document.getElementById('preloader-video-stage');
  const videoPlayer = document.getElementById('preloader-video-player');
  const logoWrap = document.getElementById('preloader-logo-wrap');

  if (!preloaderRoot || !videoPlayer) return;

  // Select video source based on viewport
  const videoSrc = isMobile()
    ? 'Photo_screens/mob_video/preloader_mob.mp4'
    : 'Photo_screens/preloader.mp4';

  videoPlayer.muted = true;
  videoPlayer.defaultMuted = true;
  videoPlayer.playsInline = true;
  videoPlayer.setAttribute('playsinline', '');
  videoPlayer.setAttribute('muted', '');
  videoPlayer.src = videoSrc;
  videoPlayer.load();

  let percent = 0;
  let preloaderVideoReady = false;
  let preloaderFinished = false;

  // --- Phase 1: Percentage Counter Animation ---
  const interval = setInterval(() => {
    if (!preloaderVideoReady) {
      // Smoothly advance to ~85-92% while waiting for video buffer
      if (percent < 88) {
        percent += Math.floor(Math.random() * 8) + 4;
        if (percent > 88) percent = 88;
      }
    } else {
      // Rapidly complete to 100%
      percent += 14;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        onCounterComplete();
      }
    }

    if (counterVal) counterVal.textContent = String(percent);
    if (barFill) barFill.style.width = percent + '%';
  }, 40);

  // When video has buffered enough to play smoothly
  function onVideoReady() {
    if (preloaderVideoReady) return;
    preloaderVideoReady = true;
  }

  videoPlayer.addEventListener('canplaythrough', onVideoReady, { once: true });
  videoPlayer.addEventListener('loadeddata', onVideoReady, { once: true });
  // Fallback if network event is delayed
  setTimeout(onVideoReady, 800);

  // --- Phase 2: Start Video Preloader & 2s Slow Logo Fade-In ---
  function onCounterComplete() {
    setTimeout(() => {
      // Hide percentage counter
      if (counterStage) counterStage.classList.add('hidden');

      // Start preloader video
      videoPlayer.muted = true;
      const playPromise = videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoPlayer.muted = true;
          videoPlayer.play().catch(() => {});
        });
      }

      // Smooth cinematic fade-in of the hotel logo starting 1 second after video playback starts
      setTimeout(() => {
        if (logoWrap) logoWrap.classList.add('show');
      }, 1000);

      // Trigger background asset preloading during this 5-second video!
      preloadCoreAssetsInBackground();

      // Listen for video end or fallback to 5.0s
      videoPlayer.addEventListener('ended', finishPreloader, { once: true });
      setTimeout(finishPreloader, 5100);

    }, 120);
  }

  // --- Parallel Background Preloading of Site Assets ---
  function preloadCoreAssetsInBackground() {
    const mob = isMobile();

    // 1. Hero Video for Screen 1
    const heroSrc = mob ? 'Photo_screens/mob_video/Hero_mob.mp4' : 'Photo_screens/1 - Hero.mp4';
    const linkHero = document.createElement('link');
    linkHero.rel = 'preload';
    linkHero.as = 'video';
    linkHero.href = heroSrc;
    document.head.appendChild(linkHero);

    // 2. Transition videos (1-2 and 2-3)
    const t12Src = mob ? 'Photo_screens/mob_video/1-2.mp4?v=60' : 'Photo_screens/1-2.mp4?v=60';
    const linkT12 = document.createElement('link');
    linkT12.rel = 'preload';
    linkT12.as = 'video';
    linkT12.href = t12Src;
    document.head.appendChild(linkT12);

    const t23Src = mob ? 'Photo_screens/mob_video/2-3.mp4?v=60' : 'Photo_screens/2-3.mp4?v=60';
    const linkT23 = document.createElement('link');
    linkT23.rel = 'preload';
    linkT23.as = 'video';
    linkT23.href = t23Src;
    document.head.appendChild(linkT23);

    // 3. Screen 2 background image
    const img2 = new Image();
    img2.src = mob ? 'Photo_screens/mob_video/screen2.png?v=54' : 'Photo_screens/2 - Restaurant_new.webp?v=54';

    // 4. Prime the Dual Hero Players in engine if already in DOM
    const hv1 = document.getElementById('hero-video-1');
    const hv2 = document.getElementById('hero-video-2');
    if (hv1 && !hv1.src) {
      hv1.src = heroSrc;
      hv1.load();
    }
    if (hv2 && !hv2.src) {
      hv2.src = heroSrc;
      hv2.load();
    }
  }

  // --- Finish Preloader & Transition to Main Experience ---
  function finishPreloader() {
    if (preloaderFinished) return;
    preloaderFinished = true;
    window.sitePreloaderFinished = true;

    if (preloaderRoot) {
      preloaderRoot.classList.add('fade-out');
    }

    // Wake up main engine hero video
    if (window.startHeroFromPreloader) {
      window.startHeroFromPreloader();
    }

    // Fully cleanup preloader layer from DOM
    setTimeout(() => {
      if (preloaderRoot && preloaderRoot.parentNode) {
        preloaderRoot.style.display = 'none';
      }
    }, 900);
  }

  // Expose global hook
  window.finishDukePreloader = finishPreloader;
})();
