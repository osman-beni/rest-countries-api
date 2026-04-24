import { Hono } from "hono";
import data from "../../../data.json";
import SelectRegion from "../../views/components/SelectRegion";
import CardsContainer from "../../views/layout/CardsContainer";
import Country from "../../views/components/Country";

const countries = new Hono();

countries.get("/", (c) => {
  const region = c.req.query("q") || "";

  const filteredList = data
    .filter((country) =>
      region !== ""
        ? region.toLowerCase() == country.region.toLowerCase()
        : true,
    )
    .slice(0, 29);

  return c.render(
    <>
      <SelectRegion region={region} />
      <CardsContainer countries={filteredList} />

      <button
        id="button"
        hx-target="#cards-container"
        hx-get={`/${region === "" ? "all" : region}/2`}
        hx-swap="beforeend"
        hx-trigger="revealed"
      >
        Load More
      </button>
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
  const areThereCountries = filteredList.slice(start).length > 30;
  return c.html(
    <>
      {countriesSlice.map((country) => (
        <Country country={country} />
      ))}
      {areThereCountries && (
        <button
          id="button"
          hx-swap-oob="outerHTML"
          hx-get={`/${region}/${page + 1}`}
          hx-swap="beforeend"
          hx-target="#cards-container"
          hx-trigger="revealed"
        >
          Load More
        </button>
      )}
    </>,
  );
});

// countries.get("/countries", async (c) => {
//   const page = parseInt(c.req.query("page") || "1", 10);
//   const region = c.req.query("region") || "";
//   const perPage = 30;

//   const data = await fetchCountries();

//   // Slice the results for the current page
//   const start = (page - 1) * perPage;
//   const end = page * perPage;
//   const filteredList = data.filter((country) =>
//     region ? region.toLowerCase() == country.region.toLowerCase() : true,
//   );

//   const slice = filteredList.slice(start, end);

//   const isHTMX = c.req.header("HX-Request") === "true";

//   // This is the "Partial" HTML
//   const content = (
//     <>
//       <>{slice.map(Country)}</>
//       <div class="btn-container" id="button-container" hx-swap-oob="true">
//         {end < filteredList.length && (
//           <button
//             hx-get={`/countries?page=${page + 1}&${region ? "region=" + region : ""}`}
//             hx-target="#countries-container"
//             hx-swap="beforeend"
//           >
//             Load More
//           </button>
//         )}
//       </div>
//     </>
//   );

//   if (isHTMX) {
//     // If HTMX called it, just send the content
//     return c.html(content);
//   } else {
//     // If user REFRESHED, wrap the content in your full Layout
//     return c.html(
//       <Layout>
//         <Header selectedRegion={region} show={true} />
//         <Home regionSelected={region}>
//           <>{content}</>
//         </Home>
//       </Layout>,
//     );
//   }
// });

countries.get("/:id", async (c) => {
  const id = c.req.param("id");

  return c.json(data.find((d) => d.alpha3Code === id));
});

export default countries;
