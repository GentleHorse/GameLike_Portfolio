import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { isBrowser, isMobile } from "react-device-detect";
import Menu from "../components/menu/MenuV2.jsx";
import Experience from "../components/Experience.jsx";
import MobileExperience from "../components/mobileExperience/MobileExperience.jsx";
import HowToControl from "../components/UI/HowToControl.jsx";
import { gameStates, useGameStore } from "../store/store.js";
import { Suspense } from "react";
import { Preload, KeyboardControls } from "@react-three/drei";
import LoadingScreen from "../components/loadingScreen/LoadingScreen.jsx";

export default function HomePage() {
  /**
   * GAME STORE
   */
  const { gameState } = useGameStore((state) => ({
    gameState: state.gameState,
  }));

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "enter", keys: ["Enter"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      {isMobile && <MobileExperience />}

      {isBrowser && (
        <>
          {/* The menu for the player control */}
          {gameState !== gameStates.LOADING && <Menu />}

          <div
            style={{
              width: 350,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 100,
              opacity: 0.75,
              fontSize: 10
            }}
          >
            <Leva collapsed={false} fill />
          </div>

          <KeyboardControls map={keyboardMap}>
            <Canvas
              camera={{
                fov: 60,
                near: 0.1,
                far: 200,
                position: [0, 1.5, 8],
              }}
            >
              <Suspense
                fallback={
                  <group scale={1.75}>
                    <LoadingScreen />
                  </group>
                }
              >
                <Experience />
                <Preload all />
              </Suspense>
            </Canvas>
          </KeyboardControls>
        </>
      )}
    </>
  );
}
