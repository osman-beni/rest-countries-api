import type { FC } from "hono/jsx";

export const CountryDetail: FC = (props) => {
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
                <strong>Population:</strong>{" "}
                <span>{props.country.population.toLocaleString()}</span>
              </li>
              <li>
                <strong>Region:</strong> <span>{props.country.region}</span>
              </li>
              <li>
                <strong>Capital:</strong>{" "}
                <span>{props.country.capital.join(", ")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
