import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Home } from "./pages/Home";
import { Layout } from "./layout/Main";
import { CountryDetail } from "./pages/CountryDetail";
import { Header } from "./layout/Header";

export type CountryI = {
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
    "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital",
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

loadCountries();

function Country(country: CountryI) {
  const formattedPopulation = country.population.toLocaleString("en-US");
  return (
    <a
      class="country-card"
      href={"/countries/" + country.cca3}
      hx-boost="true"
      hx-swap="innerHTML"
    >
      <img src={country.flags.svg} class="h-52 w-full object-cover" />
      <div class="details">
        <h2 class="text-xl font-bold">{country.name.common}</h2>
        <p class="mt-3">
          <strong>Population:</strong>
          <span>{formattedPopulation}</span>
        </p>
        <p class="mt-2">
          <strong>Region:</strong> <span>{country.region}</span>
        </p>
        <p class="mt-2">
          <strong>Capital:</strong>

          <span>{country.capital}</span>
        </p>
      </div>
    </a>
  );
}

function findCountry(id: string) {
  const data = countriesCache.find((c) => c.cca3 === id);
  return data;
}

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.get("/", async (c) => {
  const data = await loadCountries();
  const countries = data.map(Country);

  return c.html(
    <Layout>
      <Header show={true} />
      <Home />
    </Layout>,
  );
});

app.get("/countries", async (c) => {
  const page = parseInt(c.req.query("page") || "1", 10);
  const region = c.req.query("region") || "";
  const perPage = 30;

  const data = await loadCountries();

  // Slice the results for the current page
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const filteredList = data.filter((country) =>
    region ? region.toLowerCase() == country.region.toLowerCase() : true,
  );

  const slice = filteredList.slice(start, end);

  const isHTMX = c.req.header("HX-Request") === "true";

  // This is the "Partial" HTML
  const content = (
    <>
      <>{slice.map(Country)}</>
      <div class="btn-container" id="button-container" hx-swap-oob="true">
        {end < filteredList.length && (
          <button
            hx-get={`/countries?page=${page + 1}&${region ? "region=" + region : ""}`}
            hx-target="#countries-container"
            hx-swap="beforeend"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );

  if (isHTMX) {
    // If HTMX called it, just send the content
    return c.html(content);
  } else {
    // If user REFRESHED, wrap the content in your full Layout
    return c.html(
      <Layout>
        <Header selectedRegion={region} show={true} />
        <Home regionSelected={region}>
          <>{content}</>
        </Home>
      </Layout>,
    );
  }
});

app.get("/countries/:id", async (c) => {
  const id = c.req.param("id");

  // Load cache if empty
  await loadCountries();

  const country = findCountry(id!);

  if (!country) {
    return c.text("Country not found", 404);
  }

  return c.html(
    <Layout>
      <Header show={false} />
      <CountryDetail country={country} />
    </Layout>,
  );
});

app.get("/search", (c) => {
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
      <a href={"/countries/" + country.cca3} hx-boost="true">
        <img src={country.flags.svg} width="40px" />
        <span>{country.name.common}</span>
      </a>
    </li>
  ));
  return c.html(<>{htmlList}</>);
});

export default app;
