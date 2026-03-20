import { useState, useRef, useMemo } from "react";
import { BaseNode } from "../BaseNode";

const inputStyle = {
  width: "100%",
  fontSize: "10px",
  color: "#fff",
  background: "rgba(0,0,0,0)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "4px",
  padding: "2px 4px",
  outline: "none",
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  // Auto-resize
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const inputHandles = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...(text.matchAll(regex) || [])];
    const uniqueVars = [...new Set(matches.map((m) => m[1]))];
    return uniqueVars.map((v, i) => ({
      id: `${id}-${v}`,
      top: `${((i + 0.5) / uniqueVars.length) * 100}%`,
    }));
  }, [text, id]);

  return (
    <BaseNode
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustHeight();
        }}
        placeholder="Enter text with {{variables}}"
        style={{ ...inputStyle, resize: "none", overflow: "hidden" }}
      />
    </BaseNode>
  );
};
