import type { FC } from "hono/jsx";

export const Home: FC = (props) => {
  return (
    <div>
      {/* <section
        class="countries"
        hx-get="/countries"
        hx-trigger="revealed"
      ></section> */}

      <section
        class="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-8"
        hx-get="/countries?page=1"
        hx-trigger="revealed"
        hx-swap="beforeend"
        id="countries-container"
      ></section>
      <div class="btn-container" id="button-container"></div>
    </div>
  );
};
