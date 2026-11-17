/**
 * FORMA Scrollytelling Sequence Canvas Controller (600 Frames)
 * ATELIER Interior Design Studio - Home Page 1
 * 
 * Optimized for rock-solid stability (Zero-shake) and smooth, relaxed pacing.
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

  // Pre-load frame 1 as anchor
  const anchorImg = new Image();
  anchorImg.src = framePath(1);
  anchorImg.onload = () => {
    images[0] = anchorImg;
    if (lastDrawnFrame === -1) {
      drawFrame(0);
    }
  };

  /**
   * Safe Frame Retrieval:
   * NEVER jumps forward or to distant frames.
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

  // Draw frame with object-cover aspect ratio
  function drawFrame(index) {
    const img = getSafeFrame(index);
    // If target frame is not ready, KEEP current canvas content without clearing or jumping
    if (!img || !img.complete || !img.naturalWidth) {
      return;
    }

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

  // Responsive canvas sizing with DPR scaling
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    lastDrawnFrame = -1;
    drawFrame(Math.round(currentFrame));
  }

  // Calculate scroll progress through extended 850vh hero section (slower, relaxed speed)
  function updateScrollTarget() {
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const scrollableDistance = hero.offsetHeight - window.innerHeight;

    const scrolled = Math.max(0, Math.min(scrollableDistance, -rect.top));

    const scrollProgress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;

    targetFrame = scrollProgress * (frameCount - 1);
  }

  // Smooth, relaxed interpolation loop (gentle 0.08 lerp for cinematographic slow pacing)
  function animationLoop() {
    const delta = targetFrame - currentFrame;
    if (Math.abs(delta) > 0.005) {
      // Gentle damping factor (0.08) eliminates violent acceleration and jitter
      currentFrame += delta * 0.08;
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

    if (progress && hero) {
      const scrollableDistance = hero.offsetHeight - window.innerHeight;
      const rect = hero.getBoundingClientRect();
      const scrolled = Math.max(0, Math.min(scrollableDistance, -rect.top));
      const pct = scrollableDistance > 0 ? (scrolled / scrollableDistance) * 100 : 0;
      progress.style.width = `${pct}%`;
    }

    requestAnimationFrame(animationLoop);
  }

  // Sequential, Pipeline-Controlled Image Loader
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

      // Strict sequential order loader to ensure continuous contiguous buffer
      let nextIndexToLoad = 0;
      const maxConcurrent = 12; // Maintain up to 12 active connections in strict numerical order
      let activeRequests = 0;

      function spawnNext() {
        while (activeRequests < maxConcurrent && nextIndexToLoad < frameCount) {
          const idx = nextIndexToLoad++;
          activeRequests++;

          const img = new Image();
          img.src = framePath(idx + 1);

          img.onload = () => {
            images[idx] = img;
            loadedCount++;
            activeRequests--;

            const pct = Math.round((loadedCount / frameCount) * 100);
            if (loaderText) loaderText.textContent = `PREPARING YOUR EXPERIENCE ${pct}%`;
            if (loaderProgress) loaderProgress.style.width = `${pct}%`;

            // Unlock once first 50 contiguous frames are ready
            if (loadedCount >= 50) {
              unlock();
            }

            spawnNext();
          };

          img.onerror = () => {
            loadedCount++;
            activeRequests--;
            if (loadedCount >= 50) {
              unlock();
            }
            spawnNext();
          };
        }

        if (loadedCount >= frameCount) {
          unlock();
        }
      }

      spawnNext();

      // Maximum safety fallback (2.0s)
      setTimeout(unlock, 2000);
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
