// Shared show/hide for the full-screen overlays (PDF viewer, photo lightbox).
// They are `hidden` in the static HTML and become `flex` when open, and each
// one locks page scrolling while it is up.

export const isOverlayOpen = (el: Element | null): el is HTMLElement =>
  el instanceof HTMLElement && !el.classList.contains("hidden");

export const openOverlay = (el: HTMLElement) => {
  el.classList.remove("hidden");
  el.classList.add("flex");
  document.body.classList.add("overflow-hidden");
};

export const closeOverlay = (el: HTMLElement) => {
  el.classList.add("hidden");
  el.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
};
