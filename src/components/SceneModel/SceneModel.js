import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene } from "./Script";

const SceneModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);

    return () => {
      cleanUpScene();
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="bg-black text-white font-semibold">Escena 3d</h1>
      </div>
      <div>
        <ContainerScene
          className="SceneContainer"
          ref={mountRef}
        ></ContainerScene>
      </div>
    </>
  );
};

export default SceneModel;
