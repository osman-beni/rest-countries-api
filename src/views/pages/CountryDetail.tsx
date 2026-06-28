import type { FC } from "hono/jsx";
import { CountryI } from "../../types/countries";
import { Header } from "../layout/header";
import data from "../../../data";

export const CountryDetail: FC<{ country: CountryI }> = (props) => {
  return (
    <>
      <Header />
      <main class="main">
        <section>
          <div class="grid">
            <div>
              <img src={props.country.flags.svg} />
              {props.country.latlng && (
                <a
                  target={"_blank"}
                  href={`https://www.google.com/maps?q=${props.country.latlng[0]},${props.country.latlng[1]}`}
                >
                  View on google
                </a>
              )}
            </div>

            <div>
              <h2>{props.country.name}</h2>

              <p>
                <strong>Native Name: </strong>
                <span>{props.country.nativeName}</span>
              </p>
              <p>
                <strong>Population: </strong>{" "}
                <span>{props.country.population.toLocaleString()}</span>
              </p>
              <p>
                <strong>Region:</strong> <span>{props.country.region}</span>
              </p>
              <p>
                <strong>Sub Region: </strong>
                <span>{props.country.subregion}</span>
              </p>
              <p>
                <strong>Capital: </strong> <span>{props.country.capital}</span>
              </p>
              <p>
                <strong>Currencies: </strong>{" "}
                <span>{getCurrencyNames(props.country).join(", ")}</span>
              </p>
              <p>
                <strong>Languages: </strong>{" "}
                <span>{getLanguages(props.country).join(", ")}</span>
              </p>
              <p>
                <strong>Borders: </strong>{" "}
                <div style="display: flex; flex-wrap: wrap; gap: var(--size-1)">
                  {getBorderCountryObjects(props.country).map(
                    (borderCountry) => (
                      <BorderCountry country={borderCountry} />
                    ),
                  )}
                </div>
              </p>

              <p>
                <strong>Top level domain: </strong>
                <span>{props.country.topLevelDomain}</span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

function getCurrencyNames(dataObj: CountryI) {
  // 1. (dataObj.currencies ?? []) means: if currencies is missing, use an empty list [] instead.
  // 2. Then we use .map() to get the names.
  return (dataObj.currencies ?? []).map(
    (currency) => currency?.name ?? "Unknown Currency",
  );
}
function getLanguages(dataObj: CountryI) {
  return (dataObj.languages ?? []).map(
    (language) => language?.name ?? "Unknown Language",
  );
}

function getBorderCountryObjects(currentCountry: CountryI) {
  // 1. Get the borders safely (use empty list [] if missing)
  const borderCodes = currentCountry.borders ?? [];

  // 2. Filter the global array to find matching countries
  return (
    borderCodes
      .map((code) => {
        // Find the country object that has the matching alphaCode
        return data.find((country) => country.alpha3Code === code);
      })
      // 3. Remove any "undefined" results (in case a code wasn't found in the global array)
      .filter((country) => country !== undefined)
  );
}

const BorderCountry: FC = (props) => {
  return (
    <a href={`/${props.country.alpha3Code}`}>
      <button class="secondary">{props.country.name}</button>
    </a>
  );
};
