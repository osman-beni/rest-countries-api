window.addEventListener("pageshow", (event) => {
  // event.persisted is true if the page was restored from bfcache
  if (event.persisted) {
    console.log("working");
    const theme = localStorage.getItem("theme") || "light";

    // If you use a class on the html element:
    if (theme === "dark") {
      document.body.classList.add("theme--dark");
      document.body.classList.remove("theme--light");
    } else {
      document.body.classList.add("theme--light");
      document.body.classList.remove("theme--dark");
    }
  }
});
