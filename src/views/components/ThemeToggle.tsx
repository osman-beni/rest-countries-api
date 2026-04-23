import type { FC } from "hono/jsx";
import { css } from "hono/css";

const ThemeToggle: FC = () => {
  const button = css`
    border: none;
    display: flex;
    cursor: pointer;
    background-color: transparent;
    font-size: var(--font-size-1);

    html.dark & {
      color: var(--gray-0);
    }
  `;
  return (
    <button x-on:click="toggle" class={button}>
      <img
        x-bind:src="light ? '/assets/images/light-mode-moon-icon.svg' : '/assets/images/dark-mode-moon-icon.svg'"
        alt=""
      />
      <span x-text="light ? 'Dark Mode' : 'Light Mode'"></span>
    </button>
  );
};

export default ThemeToggle;
