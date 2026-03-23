// Simple event bus to signal auth failures from outside React tree
const AUTH_LOGOUT_EVENT = "auth:logout";

export const emitLogout = () => {
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
};

export const onLogout = (cb: () => void) => {
  window.addEventListener(AUTH_LOGOUT_EVENT, cb);
  return () => window.removeEventListener(AUTH_LOGOUT_EVENT, cb);
};
