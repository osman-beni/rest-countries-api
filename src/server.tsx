import { Hono } from "hono";
import { serveStatic } from "hono/bun";

type CountryI = {
  flags: { svg: string; alt: string };
  name: { common: string };
  cca3: string;
  capital: string[];
  region: string;
  population: number;
};

let countriesCache: CountryI[] = [];

async function fetchCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital"
  );
  const data: CountryI[] = await response.json();
  return data;
}

async function loadCountries() {
  if (countriesCache.length === 0) {
    countriesCache = await fetchCountries();
  }
  return countriesCache;
}

function Country(country: CountryI) {
  const formattedPopulation = country.population.toLocaleString("en-US");
  return (
    <article class="country-card">
      <img src={country.flags.svg} class="country-card__flag" />
      <div class="country-card__body">
        <h2>{country.name.common}</h2>
        <p>
          <strong>Population:</strong>
          <span>{formattedPopulation}</span>
        </p>
        <p>
          <strong>Region:</strong> <span>{country.region}</span>
        </p>
        <p>
          <strong>Capital:</strong>
          <span>{country.capital}</span>
        </p>
      </div>
    </article>
  );
}

function ResultCountry(country: CountryI) {
  return (
    <li class="item">
      <img src={country.flags.svg} width="40px" />{" "}
      <span>{country.name.common}</span>
    </li>
  );
}

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.get("/countries", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10);
  const perPage = 30;

  const data = await loadCountries();

  // Slice the results for the current page
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const slice = data.slice(start, end);

  return c.html(
    <>
      <>{slice.map(Country)}</>

      {/* Load More button (if there are more) */}
      <div class="btn-container" id="button-container" hx-swap-oob="true">
        {end < data.length && (
          <button
            hx-get={`/countries?page=${page + 1}`}
            hx-target="#countries-container"
            hx-swap="beforeend"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
});

app.get("/search-countries", async (c) => {
  const query = c.req.query("q") || "";

  // If input is empty, return nothing
  if (!query.trim()) {
    return c.text("");
  }

  try {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
      query
    )}`;
    const res = await fetch(url);

    // If failed or no results, just return a message
    if (!res.ok) {
      return c.html(<div>No results found</div>);
    }

    const data = await res.json();

    const results = data.map(ResultCountry);

    return c.html(
      <div id="search-results" class="search-results">
        <ul class="list stack">{results}</ul>
      </div>
    );
  } catch (e) {
    return c.text(`<div>Error fetching data</div>`, 200, {
      "Content-Type": "text/html",
    });
  }
});

export default app;
