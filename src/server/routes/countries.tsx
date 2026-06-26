import { Hono } from "hono";
import data from "../../../data.json";
import CardsContainer from "../../views/layout/CardsContainer";
import { CountryDetail } from "../../views/pages/CountryDetail";
import { Home } from "../../views/pages/Home";

const countries = new Hono();

countries.get("/", (c) => {
  const region = c.req.query("q") || "";

  const filteredList = data
    .filter((country) =>
      region !== ""
        ? region.toLowerCase() == country.region.toLowerCase()
        : true,
    )
    .slice(0, 30);

  return c.render(
    <>
      <Home selectedRegion={region} countries={filteredList} />
    </>,
  );
});

countries.get("/:region/:page", (c) => {
  const { region } = c.req.param();
  const page = parseInt(c.req.param("page"));
  const perPage = 30;
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const filteredList = data.filter((country) =>
    region !== "all"
      ? region.toLowerCase() == country.region.toLowerCase()
      : true,
  );

  const countriesSlice = filteredList.slice(start, end);
  const areThereCountries = countriesSlice.length > 0;
  if (areThereCountries) {
    return c.html(
      <CardsContainer
        hx-get={`/${region === "" ? "all" : region}/${page + 1}`}
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

  const found = data.find(c => c.alpha3Code === id)

  return c.render(<CountryDetail country={found!}/>);
});

export default countries;
