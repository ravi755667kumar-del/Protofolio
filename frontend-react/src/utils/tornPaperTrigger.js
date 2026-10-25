/**
 * Global trigger utility to initiate the Torn Paper Reveal transition to any section.
 * Can be called from anywhere:
 *   triggerTornPaperReveal('about', 'About The Developer');
 */
export function triggerTornPaperReveal(targetId, targetLabel = '', fromId = '') {
  // If navigating TO experience, reset any vanished cards so it's fresh and visible
  if (targetId === 'experience') {
    window.dispatchEvent(new CustomEvent('experience:reset-vanish'));
  }

  // Check if leaving the Experience section
  const expEl = document.getElementById('experience');
  let isCurrentlyAtExperience = false;

  if (fromId === 'experience') {
    isCurrentlyAtExperience = true;
  } else if (expEl && targetId !== 'experience') {
    const rect = expEl.getBoundingClientRect();
    // In viewport if experience covers the viewport or center
    isCurrentlyAtExperience = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3;
  }

  // If leaving Experience, trigger the Particle Spray Vanish effect first!
  if (isCurrentlyAtExperience && targetId !== 'experience') {
    window.dispatchEvent(
      new CustomEvent('experience:spray-vanish', {
        detail: { targetId, targetLabel },
      })
    );

    // Give 350ms for the particle spray to blast before torn paper rips
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('trigger-torn-paper', {
          detail: { targetId, targetLabel },
        })
      );
      // Immediately refresh and clear spray so the next page is clean
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('experience:clear-spray'));
      }, 150);
    }, 350);
    return;
  }

  window.dispatchEvent(
    new CustomEvent('trigger-torn-paper', {
      detail: { targetId, targetLabel },
    })
  );
}
