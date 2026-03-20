// PipelineUI.js
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
// Nodes
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { MathNode } from "./nodes/mathNode";
import { BooleanNode } from "./nodes/booleanNode";
import { DropdownNode } from "./nodes/dropdownNode";
import { ConditionNode } from "./nodes/conditionNode";
import { StringJoinNode } from "./nodes/stringJoinNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types here
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  boolean: BooleanNode,
  dropdown: DropdownNode,
  condition: ConditionNode,
  stringJoin: StringJoinNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const appData = JSON.parse(data);
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100%",
        height: "78vh",
        overflow: "hidden",
        background: "rgba(255,255,255,0)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background gap={gridSize} size={1} color="rgba(255,255,255,0)" />
        <Controls
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            borderRadius: "8px",
            padding: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "customInput":
                return "#22c55e"; // bright green
              case "llm":
                return "#eab308"; // strong yellow
              case "customOutput":
                return "#ef4444"; // vivid red
              case "text":
                return "#3b82f6"; // bold blue
              case "math":
                return "#8b5cf6"; // deep purple
              case "boolean":
                return "#ec4899"; // hot pink
              case "dropdown":
                return "#10b981"; // teal/emerald
              case "condition":
                return "#facc15"; // bright amber
              case "stringJoin":
                return "#f97316"; // orange
              default:
                return "#9ca3af"; // neutral gray
            }
          }}
          nodeStrokeWidth={2}
          maskColor="rgba(0,0,0,0.5)"
        />
      </ReactFlow>
    </div>
  );
};
