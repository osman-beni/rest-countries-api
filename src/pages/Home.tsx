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
        class="home-grid"
        hx-get="/countries?page=1"
        hx-trigger="revealed"
        hx-swap="beforeend"
        id="countries-container"
      ></section>
      {props.childen} <div class="btn-container" id="button-container"></div>
    </div>
  );
};
