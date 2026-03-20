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

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.operation || "Add");

  return (
    <BaseNode
      title="Math"
      inputs={[{ id: `${id}-a` }, { id: `${id}-b` }]}
      outputs={[{ id: `${id}-result` }]}
    >
      <label>
        Operation:
        <select
          value={op}
          onChange={(e) => setOp(e.target.value)}
          style={selectStyle}
        >
          <option
            value="Add"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Add
          </option>
          <option
            value="Subtract"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Subtract
          </option>
          <option
            value="Multiply"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Multiply
          </option>
          <option
            value="Divide"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Divide
          </option>
        </select>
      </label>
    </BaseNode>
  );
};
