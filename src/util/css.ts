export default function css(content) {
  if (typeof document === "undefined") {
    return;
  }

  const style = document.createElement("style");
  style.textContent = content;
  document.head.appendChild(style);
}
