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
    height: 100%;
    border-radius: var(--radius-2);
    overflow: hidden;
  `;

  const imgContainer = css`
    padding: 0;
  `;

  const formattedPopulation = country.population.toLocaleString("en-US");
  return (
    <a class={anchor} href={"/" + country.alpha3Code}>
      <article class={card}>
        <header class={imgContainer}>
          {/*<img src={country.flags.svg}/>*/}
        </header>
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
