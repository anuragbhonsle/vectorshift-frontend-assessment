// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />

        {/* New nodes */}
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="boolean" label="Boolean" />
        <DraggableNode type="dropdown" label="Dropdown" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="stringJoin" label="String Join" />
      </div>
    </div>
  );
};
