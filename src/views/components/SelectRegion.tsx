import { type FC } from "hono/jsx";
import { css } from "hono/css";
const SelectRegion: FC<{ region: string | undefined }> = ({ region }) => {
  return (
    <select name="region">
      <option value="">All region</option>
      <option value="africa" selected={region === "africa"}>
        Africa
      </option>
      <option value="americas" selected={region === "americas"}>
        America
      </option>
      <option value="oceania" selected={region === "oceania"}>
        Oceania
      </option>
      <option value="europe" selected={region === "europe"}>
        Europe
      </option>
      <option value="asia" selected={region === "asia"}>
        Asia
      </option>
    </select>
  );
};

export default SelectRegion;
