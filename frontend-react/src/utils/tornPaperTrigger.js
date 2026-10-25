/**
 * Global trigger utility to initiate the Torn Paper Reveal transition to any section.
 * Can be called from anywhere:
 *   triggerTornPaperReveal('about', 'About The Developer');
 */
export function triggerTornPaperReveal(targetId, targetLabel = '') {
  window.dispatchEvent(
    new CustomEvent('trigger-torn-paper', {
      detail: { targetId, targetLabel },
    })
  );
}
