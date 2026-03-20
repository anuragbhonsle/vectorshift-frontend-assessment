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

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );

  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode title="Input" outputs={[{ id: `${id}-value` }]}>
      <label>
        Name:
        <input
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={selectStyle}
        />
      </label>

      <br />

      <label>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={selectStyle}
        >
          <option
            value="Text"
            style={{ color: "#000", background: "rgba(0,0,0,0.1)" }}
          >
            Text
          </option>
          <option
            value="File"
            style={{ color: "#000", background: "rgba(0,0,0,0.1)" }}
          >
            Image
          </option>
        </select>
      </label>
    </BaseNode>
  );
};
