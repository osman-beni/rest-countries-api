import type { FC } from "hono/jsx";
import { Layout } from "../layout/Main";
import { Header } from "../layout/Header";

export const Home: FC<{ children: any }> = (props) => {
  return (
    <Layout>
      <Header />
      <div>
        <section class="home-grid" id="countries-container">
          {props.children}
        </section>
        <div class="btn-container" id="button-container">
          <button>Load More</button>
        </div>
      </div>
    </Layout>
  );
};
