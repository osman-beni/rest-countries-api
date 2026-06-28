import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Layout } from "../views/layout/main";
import countries from "./routes/countries";
import search from "./routes/search";

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
