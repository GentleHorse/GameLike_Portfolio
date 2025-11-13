import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gameStates, useGameStore } from "../../store/store.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Modal from "../UI/Modal.jsx";

import wasdKeysIcon from "../../../public/images/icons/menu-icon-wasd-keys.svg";
import mouseTouchpadIcon from "../../../public/images/icons/menu-icon-mouse-touchpad.svg";
import escKeyIcon from "../../../public/images/icons/menu-icon-escape.svg";

export default function Menu() {
  /**
   * MODAL STATE
   */
  const [isModalOpen, setIsModalOpen] = useState(true);

  /**
   * GAME STORE
   */
  const { gameState, setGameState } = useGameStore((state) => ({
    gameState: state.gameState,
    setGameState: state.setGameState,
  }));

  /**
   * HANDLER
   *  - CLOSED THE MENU MODAL
   *  - BY PRESSING THE "PLAY" BUTTON
   */
  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  /**
   * HANDLER
   *  - IT'S CALLED WHEN THE MENU GETS CLOSED
   *  - BY PRESSING THE "PLAY" BUTTON
   *  - OR
   *  - BY PRESSING THE "ESCAPE" KEY
   */
  const gameStartHandler = () => {
    setIsModalOpen(false);
    setGameState(gameStates.PLAY);

    console.log("game state handler called");

    // Wait 0.5sec for avoiding an error
    setTimeout(() => {
      document.body.requestPointerLock();
    }, 500);
  };

  /**
   * HANDLER - POPULATE THE MENU WHEN THE "ESCAPE" KEY PRESSED
   */
  const pointerLockStateChangeHandler = () => {
    if (
      document.pointerLockElement === document.body ||
      document.mozPointerLockElement === document.body
    ) {
      console.log("The pointer is locked");
    } else {
      console.log("The pointer is not locked");

      setIsModalOpen(true);
      setGameState(gameStates.MENU);
    }
  };

  /**
   * USEEFFECT - FOR POINTER LOCK STATE CHANGES
   */
  useEffect(() => {
    document.addEventListener(
      "pointerlockchange",
      pointerLockStateChangeHandler
    );

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        pointerLockStateChangeHandler
      );
    };
  }, []);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={gameStartHandler} // Called when the menu modal gets closed
        className="w-screen h-screen bg-black/50 backdrop-blur-md border-0 p-0 m-0 max-w-full max-h-full"
      >
        {/* Main Container */}
        <div className="relative w-full h-full flex flex-col">
          {/* Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center px-20">
            {/* Title */}
            <h1 className="text-white text-7xl font-normal font-josefin-sans text-center mb-32">
              How To Walk
            </h1>

            {/* How to Walk Items */}
            <div className="flex gap-[80px] items-start justify-center mb-24">
              {/* Move Item */}
              <div className="flex flex-col items-center gap-2 w-[250px]">
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                  <img
                    src={wasdKeysIcon}
                    alt="WASD Keys"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-[24px] font-normal font-inter text-center">
                  Move
                </p>
              </div>

              {/* Camera Item */}
              <div className="flex flex-col items-center gap-2 w-[250px]">
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                  <img
                    src={mouseTouchpadIcon}
                    alt="Mouse/Touchpad"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-[24px] font-normal font-inter text-center">
                  Camera
                </p>
              </div>

              {/* Menu Item */}
              <div className="flex flex-col items-center gap-2 w-[250px]">
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                  <img
                    src={escKeyIcon}
                    alt="Escape Key"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-[24px] font-normal font-inter text-center">
                  Menu
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={gameStartHandler}
              className="bg-white text-black font-josefin-sans px-8 py-4 rounded-full text-[20px] font-normal 
                         hover:bg-gray-100 hover:scale-105 hover:shadow-lg 
                         active:scale-95 
                         focus:outline-none focus:ring-0
                         transition-all duration-200 ease-in-out
                         cursor-pointer select-none"
            >
              Let's Walk
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-10 left-20 right-20 flex items-center justify-between">
            {/* Navigation Links */}
            <nav className="flex gap-10 items-center">
              <a
                href="https://toshihito-endo.com/work"
                target="_blank"
                className="text-[#b7b7b7] text-base font-normal font-inter hover:text-white transition-colors"
              >
                [WORK]
              </a>
              <a
                href="https://toshihito-endo.com/about"
                target="_blank"
                className="text-[#b7b7b7] text-base font-normal font-inter hover:text-white transition-colors"
              >
                [ABOUT]
              </a>
              <a
                href="https://toshihito-endo.com/contact"
                target="_blank"
                className="text-[#b7b7b7] text-base font-normal font-inter hover:text-white transition-colors"
              >
                [CONTACT]
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-10 items-center">
              <a
                href="https://www.instagram.com/studiotoshihitoendo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b7b7] hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/GentleHorse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b7b7] hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/toshihito-endo-a68a82172/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b7b7] hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/toshihito_endo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b7b7b7] hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
