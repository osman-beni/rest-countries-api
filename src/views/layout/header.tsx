import type { FC } from "hono/jsx";
import { css } from "hono/css";

export const Header: FC<{ selectedRegion?: string | null; show?: boolean }> = (
  props,
) => {
  const link = css`
    text-decoration: none;
    display: inline-block;
  `;
  return (
    <>
      <a class={link} href="/">
        <h1>Where in the World</h1>
      </a>
    </>
  );
};
