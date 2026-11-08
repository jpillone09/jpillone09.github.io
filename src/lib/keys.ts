// Shows ⌘ on Apple devices and Ctrl everywhere else.
export const mod = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl";
