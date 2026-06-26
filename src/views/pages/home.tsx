import type { FC } from "hono/jsx";
import { Header } from "../layout/header";
import SearchInput from "../components/SearchInput";
import SelectRegion from "../components/SelectRegion";
import CardsContainer from "../layout/CardsContainer";
import { CountryI } from "../../types/countries";
import { css } from "hono/css";

export const Home: FC<{
  countries: CountryI[];
  selectedRegion: string | undefined;
}> = (props) => {
  const container = css`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--size-5);
    align-items: start;
  `;
  return (
    <>
      <Header />
      <div class={container}>
        <SearchInput />
        <SelectRegion region={props.selectedRegion} />
      </div>
      <section id="allCardsContainer">
        <CardsContainer
          hx-get={`/${props.selectedRegion === "" ? "all" : props.selectedRegion}/2`}
          hx-swap="afterend"
          hx-trigger="revealed"
          countries={props.countries}
        />
      </section>
    </>
  );
};
