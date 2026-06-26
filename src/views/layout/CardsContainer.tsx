import type { FC } from "hono/jsx";
import { css } from "hono/css";
import { CountryI } from "../../types/countries";
import Country from "../components/Country";

export const gridContainer = css`
  display: grid;
  gap: var(--size-5);
  margin-top: var(--size-5);

  @media screen and (width >= 576px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (width >= 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const CardsContainer: FC<{ countries: CountryI[]; [key: string]: any }> = ({
  countries,
  ...delegated
}) => {
  return (
    <div class={gridContainer} id="cards-container" {...delegated}>
      {countries.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
};

export default CardsContainer;
