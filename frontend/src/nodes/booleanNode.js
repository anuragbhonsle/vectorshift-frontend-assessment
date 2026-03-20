import { useState } from "react";
import { BaseNode } from "../BaseNode";

export const BooleanNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value ?? true);

  return (
    <BaseNode title="Boolean" outputs={[{ id: `${id}-value` }]}>
      <label style={{ fontSize: 10 }}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />{" "}
        {value ? "True" : "False"}
      </label>
    </BaseNode>
  );
};
