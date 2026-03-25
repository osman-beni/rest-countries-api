import { FC } from "hono/jsx";
import { Country, CountryResponse } from "../../types/countries";

export const BorderCountryPill: FC<{ borderCountries: CountryResponse }> = (
  props,
) => {
  return (
    <>
      <h2>Border Countries</h2>
      <ul>
        {props.borderCountries.map((country) => (
          <a href={"/" + country.cca3}>{country.name.common}</a>
        ))}
      </ul>
    </>
  );
};
