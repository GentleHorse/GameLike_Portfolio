import { useState } from "react";
import { Link } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { isBrowser, isMobile } from "react-device-detect";

import whiteLogoicon from "../../../public/images/icons/logo-white.svg";

export default function Header({ home, about, works, contact }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed right-0 w-[100vw] text-right pt-5 pr-5 xl:pt-12 xl:pr-12 z-50  ${
        isMenuOpen &&
        !isBrowser &&
        "overflow-hidden rounded-2xl backdrop-blur-md bg-[#C1C1C1]/15"
      }`}
    >
      <section>
        {!!isBrowser && (
          <div className="w-full flex justify-between">
            <Link
              to="/"
              reloadDocument={true}
              className="pl-12 hover:cursor-pointer"
            >
              <img src={whiteLogoicon} className="w-[50px] h-[50px]" />
            </Link>

            <Hamburger
              className="mr-0"
              size={40}
              direction="right"
              color="#fcfaf2"
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
            />
          </div>
        )}

        {!!isMobile && (
          <div className="w-full flex justify-end">
            <Hamburger
              className="mr-0"
              size={28}
              direction="right"
              color="#fcfaf2"
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
            />
          </div>
        )}

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${!!isBrowser ? "" : "w-[100vw] h-[100vh]"}`}
            >
              {home && (
                <Link to="/" reloadDocument={true}>
                  <h1
                    className={`font-serif ${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[25px]"
                        : "text-center my-[35px] text-[25px]"
                    } text-[#FFFFFF]`}
                  >
                    {isBrowser ? "Atelier" : "Explore"}
                  </h1>
                </Link>
              )}

              {about && (
                <Link to="/about" reloadDocument={true}>
                  <h1
                    className={`font-serif ${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[25px]"
                        : "text-center my-[35px] text-[25px]"
                    } text-[#FFFFFF]`}
                  >
                    {" "}
                    About
                  </h1>
                </Link>
              )}

              {works && (
                <Link to="/works" reloadDocument={true}>
                  <h1
                    className={`font-serif ${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[25px]"
                        : "text-center my-[35px] text-[25px]"
                    } text-[#FFFFFF]`}
                  >
                    {" "}
                    Works
                  </h1>
                </Link>
              )}

              {contact && (
                <Link to="/contact">
                  <h1
                    className={`font-serif ${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[25px]"
                        : "text-center my-[35px] text-[25px]"
                    } text-[#FFFFFF]`}
                  >
                    {" "}
                    Contact
                  </h1>
                </Link>
              )}

              <div
                className={`flex ${
                  isBrowser ? "flex-col" : "mt-20 flex-row justify-center"
                }`}
              >
                <a
                  href="https://www.instagram.com/studiotoshihitoendo/"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className={`${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[30px]"
                        : "mx-2 text-[40px]"
                    } text-[#FFFFFF]`}
                  />
                </a>

                <a href="https://github.com/GentleHorse" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className={`${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[30px]"
                        : "mx-2 text-[40px]"
                    } text-[#FFFFFF]`}
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/toshihito-endo-a68a82172/"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={`${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[30px]"
                        : "mx-2 text-[40px]"
                    } text-[#FFFFFF]`}
                  />
                </a>

                <a href="https://x.com/toshihito_endo" target="_blank">
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className={`${
                      isBrowser
                        ? "mt-[20px] mr-[10px] mb-[5px] text-[30px]"
                        : "mx-2 text-[40px]"
                    } text-[#FFFFFF]`}
                  />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </header>
  );
}
