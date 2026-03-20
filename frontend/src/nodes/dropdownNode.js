import { useState } from "react";
import { BaseNode } from "../BaseNode";

const inputStyle = {
  width: "100%",
  fontSize: "10px",
  color: "#fff",
  background: "rgba(0,0,0,0)", //  transparent
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "4px",
  padding: "2px 4px",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
};

const optStyle = {
  color: "#000",
  background: "rgba(0,0,0,0.2)",
};

export const DropdownNode = ({ id, data }) => {
  const [selected, setSelected] = useState(data?.selected || "Option 1");
  const options = data?.options || ["Option 1", "Option 2", "Option 3"];

  return (
    <BaseNode title="Dropdown" outputs={[{ id: `${id}-value` }]}>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={selectStyle}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt} style={optStyle}>
            {opt}
          </option>
        ))}
      </select>
    </BaseNode>
  );
};
