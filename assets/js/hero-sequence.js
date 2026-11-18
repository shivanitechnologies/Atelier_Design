/**
 * FORMA Scrollytelling Sequence Canvas Controller (150 Frames, WebP)
 * ATELIER Interior Design Studio - Home Page 1
 * 
 * 150 frames at 1920px width in high-efficiency WebP format.
 * Zero-shake, fluid lerp interpolation, and optimized progressive preloader.
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

  const frameCount = 150;
  const images = new Array(frameCount);

  let currentFrame = 0;
  let targetFrame = 0;
  let lastDrawnFrame = -1;
  let loadedCount = 0;
  let isUnlocked = false;

  // Primary path uses optimized 1920px WebP; falls back to jpg if needed
  function framePath(index, ext = "webp") {
    return `frames/frame_${String(index).padStart(4, "0")}.${ext}`;
  }

  // Pre-load frame 1 as anchor image
  const anchorImg = new Image();
  anchorImg.src = framePath(1, "webp");
  anchorImg.onerror = () => {
    anchorImg.src = framePath(1, "jpg");
  };
  anchorImg.onload = () => {
    images[0] = anchorImg;
    if (lastDrawnFrame === -1) {
      drawFrame(0);
    }
  };

  /**
   * Safe Frame Retrieval:
   * NEVER jumps forward or across scenes.
   * Only looks backward by up to 2 frames if a single frame is pending.
   * If not available, returns null so canvas retains last drawn image without flickering.
   */
  function getSafeFrame(index) {
    if (images[index] && images[index].complete && images[index].naturalWidth) {
      return images[index];
    }
    // Check immediate previous 2 frames only
    for (let i = index - 1; i >= Math.max(0, index - 2); i--) {
      if (images[i] && images[i].complete && images[i].naturalWidth) {
        return images[i];
      }
    }
    return null;
  }

  function getCanvasViewport() {
    const parent = canvas.parentElement;
    return {
      width: parent && parent.clientWidth ? parent.clientWidth : window.innerWidth,
      height: parent && parent.clientHeight ? parent.clientHeight : window.innerHeight
    };
  }

  // Draw frame with object-cover aspect ratio
  function drawFrame(index) {
    const img = getSafeFrame(index);
    // If target frame is not ready, KEEP current canvas content without clearing or jumping
    if (!img || !img.complete || !img.naturalWidth) {
      return;
    }

    const { width, height } = getCanvasViewport();

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

    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    lastDrawnFrame = index;
  }

  // Responsive canvas sizing with DPR scaling
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = getCanvasViewport();

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    lastDrawnFrame = -1;
    drawFrame(Math.round(currentFrame));
  }

  const heroContent = document.querySelector("#hero .hero-content");

  // Calculate scroll progress through hero section
  function updateScrollTarget() {
    if (!hero) return;

    const scrollableDistance = hero.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, Math.min(scrollableDistance, window.scrollY));
    const scrollProgress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;

    targetFrame = scrollProgress * (frameCount - 1);

    // Smooth fade out of hero narrative text between 0% and 18% of scroll
    if (heroContent) {
      const fadeProgress = Math.min(1, scrollProgress / 0.18);
      const opacity = Math.max(0, 1 - fadeProgress);
      heroContent.style.opacity = opacity.toFixed(2);
      heroContent.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
      heroContent.style.transform = `translateY(calc(-50% - ${fadeProgress * 25}px))`;
    }

    // Dynamic header styling: Dark glass over hero canvas, luxury frosted on page content
    const header = document.getElementById("main-header");
    if (header) {
      if (window.scrollY >= (hero.offsetHeight - 80)) {
        header.classList.add("header-scrolled-page");
        header.classList.remove("header-on-hero");
      } else {
        header.classList.add("header-on-hero");
        header.classList.remove("header-scrolled-page");
      }
    }
  }

  // Smooth, relaxed interpolation loop (0.12 lerp for silky, responsive pacing)
  function animationLoop() {
    const delta = targetFrame - currentFrame;
    if (Math.abs(delta) > 0.005) {
      currentFrame += delta * 0.12;
    } else {
      currentFrame = targetFrame;
    }

    const frameToDraw = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrame)));
    if (frameToDraw !== lastDrawnFrame) {
      drawFrame(frameToDraw);
    }

    if (counter) {
      counter.textContent = `${String(frameToDraw + 1).padStart(3, "0")} / 150`;
    }

    if (progress && hero) {
      const scrollableDistance = hero.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(scrollableDistance, window.scrollY));
      const pct = scrollableDistance > 0 ? (scrolled / scrollableDistance) * 100 : 0;
      progress.style.width = `${pct}%`;
    }

    requestAnimationFrame(animationLoop);
  }

  // Optimized Sequential Preloader for 150 WebP Frames
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
            }, 500);
          }
          drawFrame(0);
          resolve();
        }
      };

      let nextIndexToLoad = 0;
      const maxConcurrent = 10;
      let activeRequests = 0;

      function spawnNext() {
        while (activeRequests < maxConcurrent && nextIndexToLoad < frameCount) {
          const idx = nextIndexToLoad++;
          activeRequests++;

          const img = new Image();
          img.src = framePath(idx + 1, "webp");

          img.onload = () => {
            images[idx] = img;
            loadedCount++;
            activeRequests--;

            const pct = Math.round((loadedCount / frameCount) * 100);
            if (loaderText) loaderText.textContent = `PREPARING YOUR EXPERIENCE ${pct}%`;
            if (loaderProgress) loaderProgress.style.width = `${pct}%`;

            // Instant unlock as soon as first 20 frames are ready
            if (loadedCount >= 20) {
              unlock();
            }

            spawnNext();
          };

          img.onerror = () => {
            // Fallback to jpg if browser doesn't load webp
            const fallback = new Image();
            fallback.src = framePath(idx + 1, "jpg");
            fallback.onload = () => {
              images[idx] = fallback;
              loadedCount++;
              activeRequests--;
              if (loadedCount >= 20) unlock();
              spawnNext();
            };
            fallback.onerror = () => {
              loadedCount++;
              activeRequests--;
              if (loadedCount >= 20) unlock();
              spawnNext();
            };
          };
        }

        if (loadedCount >= frameCount) {
          unlock();
        }
      }

      spawnNext();

      // Safety timeout: 1.5s
      setTimeout(unlock, 1500);
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
