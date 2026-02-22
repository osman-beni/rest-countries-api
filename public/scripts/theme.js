function setupTheme() {
  const themeToggler = document.querySelector(".theme-toggle");
  const themeImage = document.querySelector(".theme-image");
  const themeBtnText = themeToggler.querySelector("span");

  function toggleTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === null || theme === "light") {
      localStorage.setItem("theme", "dark");
      initTheme();
    } else {
      localStorage.setItem("theme", "light");
      initTheme();
    }
  }

  function initTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === null || theme === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
      themeBtnText.textContent = "Dark Mode";
      themeImage.src = "/assets/images/light-mode-moon-icon.svg";
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
      themeBtnText.textContent = "Light Mode";
      themeImage.src = "/assets/images/dark-mode-moon-icon.svg";
    }
  }
  // On Load
  initTheme();

  // Event Listeners
  themeToggler.removeEventListener("click", toggleTheme);
  themeToggler.addEventListener("click", toggleTheme);

  window.addEventListener("pageshow", initTheme);
}

setupTheme();

// 2. Run every time HTMX swaps (changes) content
document.addEventListener("htmx:afterSwap", setupTheme);
