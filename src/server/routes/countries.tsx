import { Hono } from "hono";
import data from "../../../data.json";
import CardsContainer from "../../views/layout/CardsContainer";
import { CountryDetail } from "../../views/pages/CountryDetail";
import { Home } from "../../views/pages/Home";
import { CountryI } from "../../types/countries";

const countries = new Hono();

countries.get("/", (c) => {
  const region = c.req.query("region") || "";
  const sortBy = c.req.query("sortBy") || "";
  const sortedCountries = sortCountries(data, sortBy);

  const filteredList = sortedCountries
    .filter((country) =>
      region !== ""
        ? region.toLowerCase() == country.region.toLowerCase()
        : true,
    )
    .slice(0, 30);

  return c.render(
    <>
      <Home selectedRegion={region} countries={filteredList} sortBy={sortBy} />
    </>,
  );
});

countries.get("/:region/:page", (c) => {
  const { region } = c.req.param();
  const page = parseInt(c.req.param("page"));
  const sortBy = c.req.query("sortBy") as string;
  const perPage = 30;
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const filteredList = data.filter((country) =>
    region !== "all"
      ? region.toLowerCase() == country.region.toLowerCase()
      : true,
  );

  const sortedCountries = sortCountries(filteredList, sortBy);

  const countriesSlice = sortedCountries.slice(start, end);
  const areThereCountries = countriesSlice.length > 0;
  if (areThereCountries) {
    return c.html(
      <CardsContainer
        hx-get={`/${region === "" ? "all" : region}/${page + 1}?sortBy=${sortBy}`}
        hx-swap="afterend"
        hx-trigger="revealed"
        countries={countriesSlice}
      />,
    );
  }
  return c.html("");
});

countries.get("/:id", async (c) => {
  const id = c.req.param("id");

  const found = data.find((c) => c.alpha3Code === id);

  return c.render(<CountryDetail country={found!} />);
});

export default countries;

function sortCountries(countryArray: CountryI[], sortBy: string) {
  // .slice() makes a copy of the array so we don't mess up the original list
  return countryArray.slice().sort((a, b) => {
    if (sortBy === "population-high-low") {
      return b.population - a.population; // Biggest population first
    }

    if (sortBy === "population-low-high") {
      return a.population - b.population; // Smallest population first
    }

    if (sortBy === "") {
      // Compare text letters from A to Z
      return a.name.localeCompare(b.name);
    }

    return 0; // Do not change order if nothing matches
  });
}
