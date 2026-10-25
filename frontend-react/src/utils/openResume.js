/**
 * Utility to trigger the macOS Resume Window with the Genie Effect from ANY section.
 * Calculates the exact viewport origin coordinates of the clicked button so the Genie effect
 * streams out of and sucks back into that specific button.
 */
export const triggerOpenResume = (e) => {
  let origin = null;
  if (e && e.currentTarget) {
    const rect = e.currentTarget.getBoundingClientRect();
    origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  } else if (typeof window !== 'undefined') {
    origin = {
      x: window.innerWidth * 0.88,
      y: 36,
    };
  }
  window.dispatchEvent(new CustomEvent('open-resume', { detail: { origin } }));
};
