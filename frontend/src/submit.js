import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [result, setResult] = useState(null); // store backend data
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodes, edges }),
        },
      );

      const data = await response.json();
      setResult(data);
      setShowModal(true); // show modal
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Something went wrong!" });
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-2.5">
        <button
          onClick={handleSubmit}
          className="
            px-8 py-3 rounded-full 
            bg-white/10 backdrop-blur-sm 
            border border-black/20 
            text-white font-medium tracking-wide
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            hover:bg-white/20 
            hover:border-white/30
            transition-all duration-300 
            active:scale-95
          "
        >
          Submit
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="
            fixed inset-0 flex items-center justify-center
            bg-black/20  z-50
          "
          onClick={() => setShowModal(false)} // close on background click
        >
          <div
            className="
              bg-black/10 rounded-xl p-6 max-w-sm w-full
              text-white border border-white/20
              flex flex-col gap-4
            "
            onClick={(e) => e.stopPropagation()} // prevent closing on modal click
          >
            <h2 className="text-2xl font-semibold text-center">Results</h2>
            {result?.error ? (
              <p className="text-red-400">{result.error}</p>
            ) : (
              <div className="text-center font-semibold">
                <p>Nodes: {result.num_nodes}</p>
                <p>Edges: {result.num_edges}</p>
                <p>Is DAG: {result.is_dag ? "Yes" : "No"}</p>
              </div>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="
            px-8 py-3 rounded-full 
            bg-white/10 backdrop-blur-sm 
            border border-black/20 
            text-white font-medium tracking-wide
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            hover:bg-white/20 
            hover:border-white/30
            transition-all duration-300 
            active:scale-95
          "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
