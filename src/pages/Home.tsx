import type { FC } from "hono/jsx";

export const Home: FC = (props) => {
  const delegated = props.regionSelected
    ? {}
    : { "hx-trigger": "revealed", "hx-get": "/countries?page=1" };
  return (
    <div>
      <section
        class="home-grid"
        hx-swap="beforeend"
        id="countries-container"
        {...delegated}
      >
        {/* FIX: Put the children INSIDE the container so they show up on refresh */}
        {props.children}
      </section>

      <div class="btn-container" id="button-container"></div>
    </div>
  );
};
