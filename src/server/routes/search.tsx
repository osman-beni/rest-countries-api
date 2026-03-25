import { Hono } from "hono";

const search = new Hono();

search.get("/search", (c) => {
  // 1. Get the query string value for 'q'
  const query = c.req.query("q") || "";

  if (!query.trim()) {
    return c.html("");
  }

  // 2. Filter your country list (logic example)
  const results = countriesCache.filter((country) =>
    country.name.common.toLowerCase().includes(query.trim().toLowerCase()),
  );

  // 3. Return a fragment of HTML (important for htmx!)
  if (results.length === 0) {
    return c.html(<li>No countries found</li>);
  }

  const htmlList = results.map((country) => (
    <li>
      <a href={"/countries/" + country.cca3}>
        <img src={country.flags.svg} width="40px" />
        <span>{country.name.common}</span>
      </a>
    </li>
  ));
  return c.html(<>{htmlList}</>);
});

export default search;
