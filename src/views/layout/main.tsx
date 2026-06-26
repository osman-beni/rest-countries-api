import { jsxRenderer } from "hono/jsx-renderer";
import { css, Style } from "hono/css";
import ThemeToggle from "../components/ThemeToggle";
import SearchInput from "../components/SearchInput";
import { Fragment } from "hono/jsx/jsx-runtime";

export const Layout = jsxRenderer(({ children }) => {
  const globalClass = css`
    :-hono-global {
      html {
        font-family: "Nunito Sans";
      }

      h1,
      h2 {
        font-family: "Nunito Sans";
      }
    }
  `;
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/scripts/htmx.min.js"></script>
        <link rel="stylesheet" href="/css/open-props.min.css" />
        <link rel="stylesheet" href="/css/pico.min.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Countries</title>
        <Style />
      </head>
      <body class={globalClass}>
        <main class="container">{children}</main>
        <script src="/scripts/theme.js"></script>
      </body>
    </html>
  );
});
