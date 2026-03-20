import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { MeteorShower } from "./MeteorShower";

function App() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <MeteorShower />

      <div className="relative z-10 flex flex-col min-h-screen">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
