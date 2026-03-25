import type { FC } from "hono/jsx";
import { BorderCountryPill } from "../views/components/BorderTownPill";
import { getCurrencies, getLanguages } from "../lib/country";
import { Country } from "../types/countries";

export const CountryDetail: FC<{ country: Country; children: any }> = (
  props,
) => {
  return (
    <main class="main">
      <section class="country-detail">
        <div class="country-detail__content">
          <img
            src={props.country.flags.svg}
            alt={props.country.flags.alt}
            class="details__flag"
          />

          <div class="country-detail__info">
            <h2 class="country-detail__name">{props.country.name.common}</h2>

            <ul class="country-detail__list">
              <li>
                <strong>Native Name:</strong>
                <span>
                  {Object.values(props.country.name.nativeName)[0].common}
                </span>
              </li>
              <li>
                <strong>Population:</strong>{" "}
                <span>{props.country.population.toLocaleString()}</span>
              </li>
              <li>
                <strong>Region:</strong> <span>{props.country.region}</span>
              </li>
              <li>
                <strong>Sub Region:</strong>
                <span>{props.country.subregion}</span>
              </li>
              <li>
                <strong>Capital:</strong>{" "}
                <span>{props.country.capital.join(", ")}</span>
              </li>
            </ul>

            <ul>
              <li>
                <strong>Top level domain:</strong>
                <span>{props.country.tld[0]}</span>
              </li>
              <li>
                <strong>Currencies:</strong>
                <ul>
                  {getCurrencies(props.country).map((currency) => (
                    <li>{currency.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Languages:</strong>
                <ul>
                  {getLanguages(props.country).map((lang) => (
                    <li>{lang}</li>
                  ))}
                </ul>
              </li>
            </ul>
            {props.children}
          </div>
        </div>
      </section>
    </main>
  );
};
