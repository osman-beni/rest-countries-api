import type { FC } from "hono/jsx";
import { css } from "hono/css";

const ThemeToggle: FC = () => {
  const button = css`
    display: flex;
    cursor: pointer;
  `;
  return (
    <button x-on:click="toggle" class={button} x-bind:class="true && 'contrast'">
      <img
        x-bind:src="!light ? '/assets/images/light-mode-moon-icon.svg' : '/assets/images/dark-mode-moon-icon.svg'"
        alt=""
      />
      {/*<span x-text="light ? 'Dark Mode' : 'Light Mode'"></span>*/}
    </button>
  );
};

export default ThemeToggle;
