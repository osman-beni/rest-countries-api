import { jsxRenderer } from "hono/jsx-renderer";
import { css, Style } from "hono/css";

export const Layout = jsxRenderer(({ children }) => {
  const globalClass = css`
    :-hono-global {
      html {
        font-family: Inter, Helvetica, sans-serif;
      }
    }
  `;
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <script src="/scripts/htmx.min.js"></script>
        <script defer src="/scripts/alpine.min.js"></script>
        <script src="/scripts/app.js"></script>
        <title>Countries</title>
        <Style />
      </head>
      <body class={globalClass}>
        <header>
          <div class="container">
            <h1 class="title">
              <a class="" href="/">
                Where in the world?
              </a>
            </h1>
            <button x-data x-on:click="console.log('Hello World!')">
              Switch Theme
            </button>
          </div>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
});
