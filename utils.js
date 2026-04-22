let toastTimer;

export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("toast--show");
  toastTimer = setTimeout(() => toast.classList.remove("toast--show"), 2500);
}
