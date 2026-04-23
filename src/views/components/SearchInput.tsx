import type { FC } from "hono/jsx";
import { css } from "hono/css";

const SearchInput: FC = () => {
  const container = css`
    margin: var(--size-3);
  `;

  const label = css`
    background-color: var(--gray-0);
    box-shadow: var(--shadow-2);
    display: flex;
    padding-inline: var(--size-4);
    height: var(--size-8);
    gap: var(--size-3);
    border-radius: var(--radius-2);

    .dark & {
      background-color: var(--gray-8);
    }
  `;

  const searchIcon = css`
    width: var(--size-4);
  `;

  const input = css`
    width: 100%;
    background-color: var(--gray-0);
    border: none;

    .dark & {
      background-color: var(--gray-8);
      color: var(--gray-0);
    }
  `;

  const list = css`
    list-style-type: none;
    padding: 0;

    background-color: var(--gray-0);
    box-shadow: var(--shadow-2);
    overflow: auto;
    max-height: var(--size-15);
    border-radius: var(--radius-2);

    .dark & {
      background-color: var(--gray-8);
    }
  `;

  return (
    <div class={container}>
      <label class={label}>
        <img
          class={searchIcon}
          x-bind:src="light ? '/assets/images/light-mode-search-icon.svg' : '/assets/images/dark-mode-search-icon.svg'"
          alt=""
        />
        <input
          class={input}
          type="search"
          name="q"
          hx-get="/search"
          hx-trigger="input changed delay:1s"
          hx-target="#countries-list"
        />
      </label>
      <ul class={list} id="countries-list"></ul>
    </div>
  );
};

export default SearchInput;
