import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import countries from "./routes/countries";
import search from "./routes/search";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.route("/", countries);
app.route("/search", search);

export default app;
