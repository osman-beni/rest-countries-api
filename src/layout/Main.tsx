import { html } from "hono/html";

export const Layout = (props: { children: any }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <!--<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>-->
      <!--<link rel="stylesheet" href="/css/output.css" />-->
      <script src="/scripts/htmx.min.js"></script>
      <script src="/scripts/alpine.min.js"></script>
      <script src="/scripts/app.js"></script>
      <script src="/scripts/theme.js"></script>
      <link rel="stylesheet" href="/css/src/main.css" />
      <title>Countries</title>
    </head>
    <body
      x-bind:class="darkMode ? 'theme--dark' : 'theme--light';"
      x-data="countriesApp()"
      x-init="init()"
    >
      <header class="page-header">
        <div class="container">
          <h1 class="title">
            <a class="" href="/" hx-boost="true"> Where in the world? </a>
          </h1>
          <button
            class="theme-toggle"
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

      <div class="bg-[#fafafa] max-w-6xl mx-auto select-filter">
        ${props.children}
      </div>
    </body>
  </html>
`;
