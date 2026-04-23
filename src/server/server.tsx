import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Layout } from "../views/layout/main";
import countries from "./routes/countries";
import search from "./routes/search";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));
app.use("/*", Layout);

app.route("/search", search);
app.route("/", countries);

export default {
  port: 5173,
  fetch: app.fetch,
};
