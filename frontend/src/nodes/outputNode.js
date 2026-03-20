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

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );

  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode title="Output" inputs={[{ id: `${id}-value` }]}>
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={selectStyle}
        >
          <option
            value="Text"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Text
          </option>
          <option
            value="File"
            style={{ color: "#000", background: "rgba(0,0,0,0.2)" }}
          >
            Image
          </option>
        </select>
      </label>
    </BaseNode>
  );
};
