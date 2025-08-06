(function () {
  const DEBUG = false;

  const gradeColors = {
    A: '#27ae60',
    B: '#2ecc71',
    C: '#f1c40f',
    D: '#e67e22',
    F: '#e74c3c',
  };

  const seen = new Set();

  function log(...args) {
    if (DEBUG) console.log('[ReviewGuard]', ...args);
  }

  function calculateGrade(text, isVerified, rating) {
    const len = text.length;
    let score = 0;

    if (isVerified) score += 2;
    if (len > 250) score += 2;
    else if (len > 100) score += 1;

    if (rating >= 2 && rating <= 4) score += 1;
    if (rating === 1 || rating === 5) score -= 1;

    if (text.match(/(scam|fake|waste|garbage|broke|didn’t work)/i)) score -= 2;
    if (text.match(/(love|perfect|recommend|great|amazing)/i)) score += 1;
    if (/(?:\b\w+\b)(?:\s+\1)+/i.test(text)) score -= 1; // repeated words penalty

    if (score >= 4) return 'A';
    if (score === 3) return 'B';
    if (score === 2) return 'C';
    if (score === 1) return 'D';
    return 'F';
  }

  function applyBadges() {
    const reviews = document.querySelectorAll('[data-hook="review"]');
    let processedCount = 0;

    reviews.forEach(review => {
      const reviewId = review.getAttribute('id');
      if (!reviewId || seen.has(reviewId)) return;

      const textEl = review.querySelector('[data-hook="review-body"]') || review.querySelector('.review-text');
      const ratingEl = review.querySelector('[data-hook="review-star-rating"]') || review.querySelector('[data-hook="cmps-review-star-rating"]');
      const verifiedEl = review.querySelector('[data-hook="avp-badge"]');
      const titleEl = review.querySelector('[data-hook="review-title"]');

      if (!textEl || !ratingEl || !titleEl) return;

      const text = textEl.innerText.trim();
      const rating = parseFloat((ratingEl.innerText.match(/([0-5](?:\.\d)?) out/) || [])[1]) || 0;
      const isVerified = !!verifiedEl;

      const grade = calculateGrade(text, isVerified, rating);

      const badge = document.createElement('span');
      badge.className = 'arg-badge';
      badge.style.backgroundColor = gradeColors[grade];
      badge.textContent = grade;
      badge.title = `Trust grade: ${grade}`;

      titleEl.appendChild(badge);
      seen.add(reviewId);
      processedCount++;
    });

    log(`Processed ${processedCount} reviews`);
  }

  // ⏱️ Poll every 1s for up to 10s after load
  function startReviewProcessing() {
    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(() => {
      applyBadges();
      attempts++;
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 1000);
  }

  // 🌐 Listen to dynamic navigation in Amazon (SPA-like)
  window.addEventListener('pageshow', startReviewProcessing);
  window.addEventListener('popstate', startReviewProcessing);
  window.addEventListener('DOMContentLoaded', startReviewProcessing);
  window.addEventListener('load', startReviewProcessing);

  // 📡 Mutation observer for any new elements injected
  let debounceTimer;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      applyBadges();
    }, 600);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
