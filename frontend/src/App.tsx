// import { CSSProperties } from "react";
import "./App.css";
import ResizableCard from "./components/ResizableCard";
// type BoxDataType = {
//   styles: CSSProperties;
// };

function App() {
  return (
    <>
      <main>
        <ResizableCard text="HEY" initialSize={{ height: 100, width: 100 }} />
        <ResizableCard text="HEY" initialSize={{ height: 100, width: 100 }} />
        <ResizableCard text="HEY" initialSize={{ height: 100, width: 100 }} />
      </main>
    </>
  );
}

export default App;
