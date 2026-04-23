import { Hono } from "hono";
import data from "../../../data.json";
import SearchListItem from "../../views/components/SearchListItem";
import SearchNoneItems from "../../views/components/SearchNoneItems";

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

  const htmlList = results.map((country) => (
    <SearchListItem alpha3Code={country.alpha3Code} name={country.name} />
  ));
  return c.html(<>{htmlList}</>);
});

export default search;
