import {
  CountriesResponse,
  Country,
  CountryResponse,
} from "../types/countries";

export let countriesCache: CountryResponse | null = null;

export async function fetchCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital",
  );
  const data: CountryResponse = await response.json();
  countriesCache = data;
  return countriesCache.slice(0, 30);
}

export async function fetchCountry(id: string) {
  const response = await fetch("https://restcountries.com/v3.1/alpha/" + id);
  return (await response.json())[0] as Country;
}

export async function getBorderCountries(borders: string[]) {
  const codes = borders.join(",");
  console.log("codes", codes);
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codes}`,
  );
  return (await res.json()) as CountryResponse;
}

//

export function getLanguages(country: Country) {
  return Object.values(country.languages);
}

export function getCurrencies(country: Country) {
  return Object.values(country.currencies);
}
