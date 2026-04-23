import { jsxRenderer } from "hono/jsx-renderer";
import { css, Style } from "hono/css";
import ThemeToggle from "../components/ThemeToggle";

export const Layout = jsxRenderer(({ children }) => {
  const globalClass = css`
    :-hono-global {
      html {
        font-family: "Nunito Sans";
      }

      html.dark {
        background-color: #2b3743;
      }
    }
  `;
  return (
    <html x-data="theme" x-bind:class="!light && 'dark'">
      <head>
        <meta charset="UTF-8" />
        <script src="/scripts/htmx.min.js"></script>
        <script defer src="/scripts/persist.min.js"></script>
        <script defer src="/scripts/alpine.min.js"></script>
        <link rel="stylesheet" href="/css/open-props.min.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Countries</title>
        <Style />
      </head>
      <body class={globalClass}>
        <ThemeToggle />

        <div>{children}</div>
        <script src="/scripts/theme.js"></script>
      </body>
    </html>
  );
});
