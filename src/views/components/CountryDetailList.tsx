import type { FC } from "hono/jsx";

const CountryDetailList: FC<{ title: string }> = (props) => {
  return (
    <li>
      <strong>Population:</strong>{" "}
      <span>{props.country.population.toLocaleString()}</span>
    </li>
  );
};
