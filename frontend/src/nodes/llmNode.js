import { BaseNode } from "../BaseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system`, top: "33%" },
        { id: `${id}-prompt`, top: "66%" },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
