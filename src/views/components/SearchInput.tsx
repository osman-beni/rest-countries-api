import type { FC } from "hono/jsx";
import { css } from "hono/css";

const SearchInput: FC = () => {
  return (
    <form
      role="search"
      hx-get="/search"
      hx-target="#allCardsContainer"
      hx-swap="innerHTML"
      hx-indicator="#spinner"
      {...{
        "hx-on::after-request": "this.reset()",
        "hx-on::config-request":
          "if(!event.detail.parameters.q.trim()) event.preventDefault()",
      }}
      hx-on:submit=""
    >
      <input type="search" name="q" hx-get="/search" required />
    </form>
  );
};

export default SearchInput;
