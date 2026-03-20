import { Handle, Position } from "reactflow";

export const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div
      className="
    max-w-[200px] min-w-[120px]   
    min-h-[50px]
    rounded-sm
    bg-black/10
    border border-white/20
    flex flex-col items-center
    text-center
    p-2
    gap-1"
      style={{ color: "rgba(255,255,255,0.95)", position: "relative" }}
    >
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: input.top || `${((index + 0.5) / inputs.length) * 100}%`,
            position: "absolute",
            left: -5,
            width: 12,
            height: 12,
            background: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Title */}
      <div className="text-sm font-semibold truncate">{title}</div>

      {/* Children / Body */}
      {children && (
        <div className="text-[10px] text-white/90 w-full flex flex-col gap-1">
          {children}
        </div>
      )}

      {/* Outputs */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: output.top || `${((index + 0.5) / outputs.length) * 100}%`,
            position: "absolute",
            right: -8,
            width: 10,
            height: 10,
            background: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};
