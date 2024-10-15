import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

const Header = () => {
  return (
    <header className="bg-slate-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-2 lg:px-0">
        <div className="text-white text-2xl font-bold">
          <a href="#">OddWordle.</a>
        </div>
        <nav className="text-white lg:hidden">
          <Icon path={mdiMenu} size={1} />
        </nav>
        <nav className="hidden lg:block">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:bg-slate-700 p-2 active:scale-95 inline-block"
              >
                How to play
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:bg-slate-700 p-2 active:scale-95 inline-block"
              >
                Share
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:bg-slate-700 p-2 active:scale-95 inline-block"
              >
                Global leaderboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:bg-slate-700 p-2 active:scale-95 inline-block"
              >
                Developer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 hover:bg-slate-700 p-2 active:scale-95 inline-block"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
