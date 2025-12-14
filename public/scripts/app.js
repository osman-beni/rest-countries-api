function countriesApp() {
  return {
    countries: [],
    regions: ["All Regions", "Africa", "Americas", "Asia", "Europe", "Oceania"],
    search: "",
    region: "",
    darkMode: false,

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("theme", this.darkMode ? "dark" : "light");
    },

    init() {
      this.darkMode = localStorage.getItem("theme") === "dark";
      fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital"
      )
        .then((res) => res.json())
        .then((data) => (this.countries = data));
    },

    filteredCountries() {
      return this.countries.filter((c) => {
        const matchRegion = this.region ? c.region === this.region : true;
        const matchSearch = c.name.common
          .toLowerCase()
          .includes(this.search.toLowerCase());
        return matchRegion && matchSearch;
      });
    },

    async showDetails(country) {
      this.selectedCountry = null;

      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${country.cca3}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
      );
      const data = await response.json();

      this.selectedCountry = data[0] || data;
    },

    async showBorderCountry(code) {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}?fields=name,cca3,flags,population,region,subregion,capital,tld,currencies,languages,borders`
      );
      const data = await res.json();
      this.selectedCountry = data[0] || data;
    },

    getCountryName(code) {
      const c = this.countries.find((c) => c.cca3 === code);
      return c ? c.name.common : code;
    },

    getCurrencies(currencies) {
      if (!currencies) return "—";
      return Object.values(currencies)
        .map((c) => c.name)
        .join(", ");
    },
    getLanguages(languages) {
      if (!languages) return "—";
      return Object.values(languages).join(", ");
    },
    getNativeName(nativeNames) {
      if (!nativeNames) return "—";
      const first = Object.values(nativeNames)[0];
      return first?.common || "—";
    },
  };
}

function countrySearch() {
  return {
    query: "",
    loading: false,
    results: [],
    open: false,
    noResults: false,
    async searchCountries() {
      if (!this.query.trim()) {
        this.results = [];
        this.open = false;
        this.noResults = false;
        return;
      }
      this.loading = true;
      this.open = true;
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${this.query}`
        );
        const data = await response.json();
        if (!Array.isArray(data) || data.status === 404) {
          this.results = [];
          this.noResults = true;
        } else {
          this.results = data;
          this.noResults = data.length === 0;
        }
      } catch (err) {
        this.results = [];
        this.noResults = true;
      } finally {
        this.loading = false;
      }
    },
    selectCountry(country) {
      console.log("Selected country:", country.name.common);
      this.query = country.name.common;
      this.open = false;
    },
    close() {
      this.open = false;
    },
  };
}
