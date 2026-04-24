import { jsxRenderer } from "hono/jsx-renderer";
import { css, Style } from "hono/css";
import ThemeToggle from "../components/ThemeToggle";
import SearchInput from "../components/SearchInput";

export const Layout = jsxRenderer(({ children }) => {
  const globalClass = css`
    :-hono-global {
      html {
        font-family: "Nunito Sans";
      }

      html.dark {
        background-color: var(--gray-10);
      }
    }
  `;
  return (
    <html x-data="theme" x-bind:class="!light && 'dark'">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/scripts/htmx.min.js"></script>
        <script defer src="/scripts/persist.min.js"></script>
        <script defer src="/scripts/alpine.min.js"></script>
        <link rel="stylesheet" href="/css/open-props.min.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Countries</title>
        <Style />
      </head>
      <body class={globalClass}>
        <div>{children}</div>
        <script src="/scripts/theme.js"></script>
      </body>
    </html>
  );
});
