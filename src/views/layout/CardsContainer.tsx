import type { FC } from "hono/jsx";
import { css } from "hono/css";
import { CountryI } from "../../types/countries";
import Country from "../components/Country";

export const container = css`
  display: grid;
  gap: var(--size-3);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
const CardsContainer: FC<{ countries: CountryI[] }> = ({ countries }) => {
  return (
    <div class={container} id="cards-container">
      {countries.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
};

export default CardsContainer;
