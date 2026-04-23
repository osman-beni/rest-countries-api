import { Hono } from "hono";
import Country from "../../views/components/Country";
import { Home } from "../../views/pages/home";
import { BorderCountryPill } from "../../views/components/BorderTownPill";
import { Header } from "../../views/layout/header";
import { CountryDetail } from "../../pages/Country";
import data from "../../../data.json";

const countries = new Hono();

countries.get("/", (c) => {
  const places = data.map((d) => <li>{d.name}</li>);
  return c.render(<></>);
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
