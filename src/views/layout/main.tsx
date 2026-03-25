import { html } from "hono/html";

export const Layout = (props: { children: any }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <script src="/scripts/htmx.min.js"></script>
      <script src="/scripts/app.js"></script>
      <script defer src="/scripts/theme.js"></script>

      <link rel="stylesheet" href="/css/src/main.css" />
      <title>Countries</title>
    </head>
    <body hx-boost="true">
      <header class="page-header">
        <div class="container">
          <h1 class="title">
            <a class="" href="/"> Where in the world? </a>
          </h1>
          <button class="theme-toggle" aria-label="Toggle Dark Mode">
            Switch Theme
          </button>
        </div>
      </header>

      <div class="bg-[#fafafa] max-w-6xl mx-auto select-filter">
        ${props.children}
      </div>
    </body>
  </html>
`;
