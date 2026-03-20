export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
      style={{
        cursor: "grab",
        width: "100px",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "4px",
        padding: "8px 12px",
        background: "rgba(0,0,0,0.5)", // dark glass, readable
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        color: "rgba(255,255,255,0.95)", // bright text
        fontWeight: 600,
        textAlign: "center",
        fontSize: "12px",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};
