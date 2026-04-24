import type { FC } from "hono/jsx";
import { CountryI } from "../../types/countries";
import { css } from "hono/css";

const Country: FC<{ country: CountryI }> = ({ country }) => {
  const anchor = css`
    color: var(--gray-10);
    text-decoration: none;
    display: block;
  `;

  const card = css`
    background-color: var(--gray-0);
    box-shadow: var(--shadow-2);
    padding: var(--size-3);
    border-radius: var(--radius-2);

    > * {
      margin: 0;
    }

    > * + * {
      margin-top: var(--size-3);
    }
  `;
  const formattedPopulation = country.population.toLocaleString("en-US");
  return (
    <a class={anchor} href={"/" + country.alpha3Code} hx-swap="innerHTML">
      <article class={card}>
        <h2>{country.name}</h2>
        <p>
          <strong>Population:</strong> <span>{formattedPopulation}</span>
        </p>
        <p>
          <strong>Region:</strong> <span>{country.region}</span>
        </p>
        <p>
          <strong>Capital:</strong> <span>{country.capital}</span>
        </p>
      </article>
    </a>
  );
};

export default Country;
