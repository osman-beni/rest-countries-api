import { Hono } from "hono";
import type { FC } from "hono/jsx";

const app = new Hono();

export const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/css/styles.css" />
        <script src="/scripts/htmx.min.js"></script>
        <script defer src="/scripts/alpine.min.js"></script>
        <script src="/scripts/app.js"></script>
        <script src="/scripts/theme.js"></script>
      </head>
      <body
        x-bind:class="darkMode ? 'theme--dark' : 'theme--light';"
        x-data="countriesApp()"
        x-init="init()"
      >
        <header class="header">
          <div class="header__container">
            <a class="header__title" href="/">
              Where in the world?
            </a>
            <button
              class="header__toggle"
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
        <div class="main__controls">
          <div
            class="search-container"
            x-data="countrySearch()"
            {...{ "x-on:click.outside": "close()" }}
          >
            <input
              type="text"
              x-model="query"
              {...{ "x-on:input.debounce.500ms": "searchCountries()" }}
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
          </div>

          <select>
            <template x-for="region in regions">
              <option x-bind:value="region" x-text="region"></option>
            </template>
          </select>
        </div>
        {props.children}
      </body>
    </html>
  );
};
