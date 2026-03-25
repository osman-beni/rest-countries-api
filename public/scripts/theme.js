function init() {
  var themeToggleBtn = document.querySelector(".theme-toggle");

  themeToggleBtn.addEventListener("click", () => {
    var pageIsDarkMode = document.body.classList.contains("dark");

    if (pageIsDarkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  var userPrefersDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;

  if (userPrefersDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  var savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else if (savedTheme === "light") {
    document.body.classList.remove("dark");
  }
}

init();
