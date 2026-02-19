import type { FC } from "hono/jsx";

export const Header: FC<{ selectedRegion?: string | null; show?: boolean }> = (
  props,
) => {
  const regions = ["", "africa", "asia", "europe", "oceania", "americas"];
  return (
    <div class="filter-wrapper">
      <div class="search-container">
        <h3>Search Countries</h3>

        <div style="position: relative; display: inline-block;">
          <input
            type="search"
            name="q"
            placeholder="Begin typing a country..."
            hx-get="/search"
            hx-trigger="input changed delay:500ms, search"
            hx-target="#search-results"
            hx-indicator="#loading-spinner"
          />

          <img
            id="loading-spinner"
            class="htmx-indicator"
            src="/assets/images/oval.svg"
            width="20"
            style="position: absolute; right: 10px; top: 10px; background-color: black;"
          />
        </div>

        <ul id="search-results"></ul>
      </div>

      {props.show && (
        <select
          hx-get="/countries?page=1"
          name="region"
          hx-target=".home-grid"
          hx-trigger="change"
          hx-push-url="true"
        >
          {regions.map((region) => (
            <option value={region} selected={region === props.selectedRegion}>
              {region === ""
                ? "All regions"
                : region[0].toUpperCase() + region.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
