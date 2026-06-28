import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Layout } from "./src/views/layout/main";
import countries from "./src/server/routes/countries";
import search from "./src/server/routes/search";

const port = process.env.PORT || 5173;
const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));
app.use("/*", Layout);

app.route("/search", search);
app.route("/", countries);

export default {
  port: port,
  fetch: app.fetch,
};
