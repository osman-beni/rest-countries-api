import { Hono } from "hono";
import {
  fetchCountries,
  fetchCountry,
  getBorderCountries,
  countriesCache,
} from "../../lib/country";
import Country from "../../views/components/Country";
import { Home } from "../../views/pages/home";
import { CountriesResponse, CountryResponse } from "../../types/countries";
import { BorderCountryPill } from "../../views/components/BorderTownPill";
import { Layout } from "../../views/layout/Main";
import { Header } from "../../views/layout/Header";
import { CountryDetail } from "../../pages/Country";

const countries = new Hono();

countries.get("/", async (c) => {
  const data = countriesCache ?? (await fetchCountries());
  const countries = data.map(Country);
  console.log(countries);
  return c.html(<Home>{countries}</Home>);
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
  const country = await fetchCountry(id);
  const borderCountries = await getBorderCountries(country.borders);

  return c.html(
    <Layout>
      <Header />
      <CountryDetail country={country}>
        <BorderCountryPill borderCountries={borderCountries} />
      </CountryDetail>
    </Layout>,
  );
});

export default countries;
