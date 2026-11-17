/**
 * FORMA Scrollytelling Sequence Canvas Controller (600 Frames)
 * ATELIER Interior Design Studio - Home Page 1
 */

(function () {
  const canvas = document.getElementById("sequence");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const hero = document.getElementById("hero");
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");

  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loaderText");
  const loaderProgress = document.getElementById("loaderProgress");

  const frameCount = 600;
  const images = new Array(frameCount);

  let currentFrame = 0;
  let targetFrame = 0;
  let lastDrawnFrame = -1;
  let loadedCount = 0;
  let isUnlocked = false;

  function framePath(index) {
    return `frames/frame_${String(index).padStart(4, "0")}.jpg`;
  }

  // Pre-instantiate initial fallback image
  const fallbackImg = new Image();
  fallbackImg.src = framePath(1);
  let hasFallback = false;
  fallbackImg.onload = () => {
    hasFallback = true;
    if (lastDrawnFrame === -1) drawFrame(0);
  };

  function getBestFrame(index) {
    if (images[index] && images[index].complete && images[index].naturalWidth) {
      return images[index];
    }
    // Search backward for closest loaded frame
    for (let i = index - 1; i >= 0; i--) {
      if (images[i] && images[i].complete && images[i].naturalWidth) return images[i];
    }
    // Search forward for closest loaded frame
    for (let i = index + 1; i < frameCount; i++) {
      if (images[i] && images[i].complete && images[i].naturalWidth) return images[i];
    }
    return hasFallback ? fallbackImg : null;
  }

  // Draw frame with object-cover aspect ratio
  function drawFrame(index) {
    const img = getBestFrame(index);
    if (!img || !img.complete || !img.naturalWidth) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const imageRatio = img.naturalWidth / img.naturalHeight;
    const screenRatio = width / height;

    let drawWidth, drawHeight;

    if (imageRatio > screenRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
    }

    const x = (width - drawWidth) * 0.5;
    const y = (height - drawHeight) * 0.5;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    lastDrawnFrame = index;
  }

  // Handle responsive canvas sizing with device pixel ratio
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    lastDrawnFrame = -1;
    drawFrame(Math.round(currentFrame));
  }

  // Calculate scroll progress through 500vh hero section
  function updateScrollTarget() {
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const scrollableDistance = hero.offsetHeight - window.innerHeight;

    const scrolled = Math.max(0, Math.min(scrollableDistance, -rect.top));

    const scrollProgress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;

    targetFrame = scrollProgress * (frameCount - 1);
  }

  // Silky 60fps/120fps interpolation animation loop
  function animationLoop() {
    const delta = targetFrame - currentFrame;
    if (Math.abs(delta) > 0.005) {
      // Exponential lerp easing
      currentFrame += delta * 0.16;
    } else {
      currentFrame = targetFrame;
    }

    const frameToDraw = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrame)));
    if (frameToDraw !== lastDrawnFrame) {
      drawFrame(frameToDraw);
    }

    if (counter) {
      counter.textContent = `${String(frameToDraw + 1).padStart(3, "0")} / 600`;
    }

    if (progress) {
      const scrollableDistance = hero ? hero.offsetHeight - window.innerHeight : 1;
      const rect = hero ? hero.getBoundingClientRect() : { top: 0 };
      const scrolled = Math.max(0, Math.min(scrollableDistance, -rect.top));
      const pct = scrollableDistance > 0 ? (scrolled / scrollableDistance) * 100 : 0;
      progress.style.width = `${pct}%`;
    }

    requestAnimationFrame(animationLoop);
  }

  // Intelligent Prioritized Image Loader
  function loadImages() {
    return new Promise((resolve) => {
      const unlock = () => {
        if (!isUnlocked) {
          isUnlocked = true;
          if (loader) {
            loader.classList.add("hidden");
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
            setTimeout(() => {
              loader.style.display = "none";
            }, 600);
          }
          drawFrame(0);
          resolve();
        }
      };

      // 1. High priority batch: first 30 frames for instantaneous responsiveness
      let initialCount = 0;
      for (let i = 0; i < 30; i++) {
        const img = new Image();
        img.src = framePath(i + 1);
        img.onload = () => {
          initialCount++;
          loadedCount++;
          const pct = Math.round((loadedCount / frameCount) * 100);
          if (loaderText) loaderText.textContent = `PREPARING YOUR EXPERIENCE ${pct}%`;
          if (loaderProgress) loaderProgress.style.width = `${pct}%`;
          if (initialCount >= 10) unlock();
        };
        img.onerror = () => {
          initialCount++;
          loadedCount++;
          if (initialCount >= 10) unlock();
        };
        images[i] = img;
      }

      // 2. Progressive background batch loader (50 frames per batch)
      let batchIdx = 30;
      function loadNextBatch() {
        const batchEnd = Math.min(frameCount, batchIdx + 50);
        for (let i = batchIdx; i < batchEnd; i++) {
          const img = new Image();
          img.src = framePath(i + 1);
          img.onload = () => {
            loadedCount++;
            const pct = Math.round((loadedCount / frameCount) * 100);
            if (loaderText && !isUnlocked) loaderText.textContent = `PREPARING YOUR EXPERIENCE ${pct}%`;
            if (loaderProgress && !isUnlocked) loaderProgress.style.width = `${pct}%`;
            if (loadedCount >= frameCount) unlock();
          };
          img.onerror = () => {
            loadedCount++;
            if (loadedCount >= frameCount) unlock();
          };
          images[i] = img;
        }
        batchIdx = batchEnd;
        if (batchIdx < frameCount) {
          setTimeout(loadNextBatch, 25);
        }
      }

      setTimeout(loadNextBatch, 50);

      // Safety fallback: unlock after 1.2s max so user experience is never blocked
      setTimeout(unlock, 1200);
    });
  }

  window.addEventListener("scroll", updateScrollTarget, { passive: true });
  window.addEventListener("resize", () => {
    resizeCanvas();
    updateScrollTarget();
  });

  async function init() {
    resizeCanvas();
    updateScrollTarget();
    animationLoop();
    await loadImages();
    drawFrame(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
