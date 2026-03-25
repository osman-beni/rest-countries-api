import { Country } from "../../types/countries";

function Country(country: Country) {
  const formattedPopulation = country.population.toLocaleString("en-US");
  return (
    <a class="country-card" href={"/" + country.cca3} hx-swap="innerHTML">
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

export default Country;
