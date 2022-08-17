import { Scene, SceneModel } from "./components";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("escena 3d");
  return (
    <>
    <div className="bg-black text-white font-semibold"><button
        className="m-2 rounded-lg border p-2 border-indigo-600"
        onClick={() => setPage("cubo")}
      >
        Cubo
      </button>
      <button
        onClick={() => setPage("escena 3d")}
        className="m-2 rounded-lg border p-2 border-indigo-600"
      >
        Escena 3d
      </button></div>
      
      {page === "escena 3d" ? <SceneModel /> : null}
      {page === "cubo" ? <Scene /> : null}
    </>
  );
}

export default App;
