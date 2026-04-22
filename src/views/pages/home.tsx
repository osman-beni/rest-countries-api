import type { FC } from "hono/jsx";
import { Header } from "../layout/header";

export const Home: FC<{ children: any }> = (props) => {
  return (
    <>
      <Header />
      <div>
        <section class="home-grid" id="countries-container">
          {props.children}
        </section>
        <div class="btn-container" id="button-container">
          <button>Load More</button>
        </div>
      </div>
    </>
  );
};
