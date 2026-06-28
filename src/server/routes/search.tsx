import { Hono } from "hono";
import data from "../../../data.json";
import SearchNoneItems from "../../views/components/SearchNoneItems";
import CardsContainer from "../../views/layout/CardsContainer";

const search = new Hono();

search.get("/", (c) => {
  // 1. Get the query string value for 'q'
  const query = c.req.query("q") || "";

  if (!query.trim()) {
    return c.html("");
  }

  // 2. Filter your country list (logic example)
  const results = data.filter((country) =>
    country.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  // 3. Return a fragment of HTML (important for htmx!)
  if (results.length === 0) {
    return c.html(<SearchNoneItems />);
  }

  return c.html(<CardsContainer countries={results} />);
});

export default search;
