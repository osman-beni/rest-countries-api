import { html } from "hono/html";

export const Layout = (props: { children: any }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <link rel="stylesheet" href="/css/output.css" />
      <script src="/scripts/htmx.min.js"></script>
      <script src="/scripts/alpine.min.js"></script>
      <script src="/scripts/app.js"></script>
      <script src="/scripts/theme.js"></script>
      <title>Countries</title>
    </head>
    <body
      x-bind:class="darkMode ? 'theme--dark' : 'theme--light';"
      x-data="countriesApp()"
      x-init="init()"
      class="font-[Nunito-Sans]"
    >
      <header class="shadow">
        <div
          class="flex justify-between items-center max-w-6xl mx-auto p-4 lg:px-0"
        >
          <a class="text-2xl font-bold" href="/"> Where in the world? </a>
          <button
            class="flex gap-1"
            x-on:click="toggleDarkMode()"
            aria-label="Toggle Dark Mode"
          >
            <img
              x-bind:src="darkMode ? '/assets/images/dark-mode-moon-icon.svg' : '/assets/images/light-mode-moon-icon.svg'"
              alt=""
            />
            <span x-text="darkMode ? 'Light Mode' : 'Dark Mode'"></span>
          </button>
        </div>
      </header>
      <div class="flex my-6 px-4 justify-between lg:p-0 max-w-6xl mx-auto">
        <div class="search-container">
          <h3>Search Countries</h3>

          <div style="position: relative; display: inline-block;">
            <input
              type="search"
              name="q"
              placeholder="Begin typing a country..."
              hx-get="/search"
              hx-trigger="input changed delay:500ms, search"
              hx-target="#search-results"
              hx-indicator="#loading-spinner"
            />

            <img
              id="loading-spinner"
              class="htmx-indicator"
              src="/assets/images/oval.svg"
              width="20"
              style="position: absolute; right: 10px; top: 10px; background-color: black;"
            />
          </div>

          <ul id="search-results"></ul>
        </div>
        <!--<div
          class="search-container"
          x-data="countrySearch()"
          x-on:click.outside="close()"
        >
          <input
            type="text"
            x-model="query"
            x-on:input.debounce.500ms="searchCountries()"
            placeholder="Search for a country..."
            class="searchInput"
          />

          <div x-show="loading" class="circle-spin-1"></div>

          <div x-show="open && results.length > 0" class="dropdown stack">
            <template x-for="country in results" x-bind:key="country.cca3">
              <a
                x-on:click="selectCountry(country)"
                style="display: flex; gap: 1rem"
                x-bind:href="'/countries/' + country.cca3"
              >
                <img x-bind:src="country.flags.svg" width="40px" />
                <span x-text="country.name.common"></span>
              </a>
            </template>
          </div>

          <div
            x-show="open && !loading && noResults"
            class="dropdown no-result"
          >
            No results found.
          </div>
        </div>-->
        <select>
          <template x-for="region in regions">
            <option x-bind:value="region" x-text="region"></option>
          </template>
        </select>
      </div>
      <div class="bg-[#fafafa] max-w-6xl mx-auto">${props.children}</div>
    </body>
  </html>
`;
