import { useState } from "react";
import { BaseNode } from "../BaseNode";

const inputStyle = {
  width: "100%",
  fontSize: "10px",
  color: "#fff",
  background: "rgba(0,0,0,0)", // transparent
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "4px",
  padding: "2px 4px",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
};

export const StringJoinNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ", ");

  // Example: dynamic inputs could be handled too
  const numInputs = data?.numInputs || 2;
  const inputs = Array.from({ length: numInputs }, (_, i) => ({
    id: `${id}-in${i + 1}`,
  }));

  return (
    <BaseNode
      title="String Join"
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
    >
      <label style={{ fontSize: 10 }}>
        Separator:
        <input
          type="text"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          style={selectStyle}
        />
      </label>
    </BaseNode>
  );
};
