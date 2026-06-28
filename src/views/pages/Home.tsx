import type { FC } from "hono/jsx";
import { Header } from "../layout/header";
import SearchInput from "../components/SearchInput";
import SelectRegion from "../components/SelectRegion";
import CardsContainer from "../layout/CardsContainer";
import { CountryI } from "../../types/countries";
import { css } from "hono/css";
import SelectSort from "../components/SelectSort";

export const Home: FC<{
  countries: CountryI[];
  selectedRegion: string | undefined;
  sortBy: string;
}> = (props) => {
  return (
    <>
      <Header />
      <SearchInput />
      <form
        hx-get="/"
        hx-trigger="change"
        hx-target="body"
        hx-swap="innerHTML"
        hx-push-url="true"
      >
        <div style="display: flex; gap: 1.5rem;">
          <label>
            Filter by
            <SelectRegion region={props.selectedRegion} />
          </label>
          <label>
            Sort by
            <SelectSort sortBy={props.sortBy} />
          </label>
        </div>
      </form>
      <section id="allCardsContainer">
        <CardsContainer
          hx-get={`/${props.selectedRegion === "" ? "all" : props.selectedRegion}/2?sortBy=${props.sortBy}`}
          hx-swap="afterend"
          hx-trigger="revealed"
          countries={props.countries}
        />
      </section>
    </>
  );
};
