document.addEventListener("alpine:init", () => {
  Alpine.data("theme", function () {
    return {
      light: this.$persist(true),

      toggle() {
        if (this.light) this.light = false;
        else this.light = true;
      },
    };
  });
});
