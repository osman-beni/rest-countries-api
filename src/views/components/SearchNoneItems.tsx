import { css } from "hono/css";

const SearchNoneItems = () => {
  const listItem = css`
    color: var(--gray-12);
    padding-block: var(--size-3);
    display: block;
    padding-inline: var(--size-4);

    .dark & {
      color: var(--gray-0);
    }
  `;
  return <li class={listItem}>No countries found</li>;
};

export default SearchNoneItems;
