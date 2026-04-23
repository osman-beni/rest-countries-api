import type { FC } from "hono/jsx";
import { css } from "hono/css";

const SearchListItem: FC<{ alpha3Code: string; name: string }> = ({
  alpha3Code,
  name,
}) => {
  const link = css`
    text-decoration: none;
    color: var(--gray-12);
    padding-block: var(--size-3);
    display: block;
    padding-inline: var(--size-4);

    .dark & {
      color: var(--gray-0);
    }
  `;

  return (
    <li>
      <a class={link} href={"/countries/" + alpha3Code}>
        <span>{name}</span>
      </a>
    </li>
  );
};

export default SearchListItem;
