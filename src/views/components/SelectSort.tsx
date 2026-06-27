import { type FC } from "hono/jsx";
const SelectSort: FC<{ sortBy: string }> = ({ sortBy }) => {
  return (
    <select name="sortBy">
      <option value="" selected={sortBy === ""}>
        Name A-Z
      </option>

      <option
        value="population-low-high"
        selected={sortBy === "population-low-high"}
      >
        Population Low - High
      </option>
      <option
        value="population-high-low"
        selected={sortBy === "population-high-low"}
      >
        Population High - Low
      </option>
    </select>
  );
};

export default SelectSort;
