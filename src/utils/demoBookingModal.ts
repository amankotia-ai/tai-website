export const OPEN_DEMO_BOOKING_MODAL_EVENT = 'tai:open-demo-booking-modal';

export function openDemoBookingModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_DEMO_BOOKING_MODAL_EVENT));
}
