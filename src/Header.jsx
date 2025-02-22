import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  return (
    <>
      <header className="bg-headerBlack text-bodyWhite px-20 py-5">
        <nav>
          <ul className=" flex flex-col items-center  md:flex-row justify-between gap-1 md:gap-0  text-sm sm:text-lg md:text-xl lg:text-2xl">
            <li className="flex gap-2 font-medium">
              Enterprise data{" "}
              <div className="w-[.5px] bg-headerGray" ></div>
              <span className="font-light text-bodyWhite">Search</span>
            </li>
            <li className="font-medium tracking-wide ">
              Chat{" "}
              <span className="text-headerGray font-normal">
                Ask a question
              </span>
            </li>
            <li className="flex items-center justify-center gap-2 cursor-pointer">
              {" "}
              <FaRegUserCircle className="text-lg md:text-xl lg:text-2xl mt-[1px]" />{" "}
              <span className="font-normal">Profile</span>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
