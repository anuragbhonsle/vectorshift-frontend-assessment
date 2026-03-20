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

const optStyle = {
  color: "#000",
  background: "rgba(0,0,0,0.2)",
};

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "==");

  return (
    <BaseNode
      title="Condition"
      inputs={[{ id: `${id}-a` }, { id: `${id}-b` }]}
      outputs={[{ id: `${id}-true` }, { id: `${id}-false` }]}
    >
      <label style={{ fontSize: 10 }}>
        Operator:
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={selectStyle}
        >
          <option value="==" style={optStyle}>
            ==
          </option>
          <option value="!=" style={optStyle}>
            !=
          </option>
          <option value=">" style={optStyle}>
            {">"}
          </option>
          <option value="<" style={optStyle}>
            {"<"}
          </option>
          <option value=">=" style={optStyle}>
            {">="}
          </option>
          <option value="<=" style={optStyle}>
            {"<="}
          </option>
        </select>
      </label>
    </BaseNode>
  );
};
