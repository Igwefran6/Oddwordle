import { Key, SetStateAction, Dispatch } from "react";
import { isArrayFilled } from "../utils/isArrayFilled";

interface WordBoardProps {
  array: string[];
  userSetWord: string[];
  clickedIndices: number[];
  setClickedIndices: Dispatch<SetStateAction<number[]>>;
  setUserSetWord: Dispatch<SetStateAction<string[]>>;
}

function WordBoard({
  array,
  userSetWord,
  clickedIndices,
  setClickedIndices,
  setUserSetWord,
}: WordBoardProps) {
  const handleClick = (element: string, index: number) => {
    if (isArrayFilled(userSetWord)) {
      return;
    }
    setClickedIndices((prev) => [...prev, index]); // Add the index of the clicked button to the array

    setUserSetWord((prev) => {
      const nextEmptyIndex = prev.findIndex((el) => el === ""); // Find the next empty slot in userSetWord
      if (nextEmptyIndex !== -1) {
        const newArray = [...prev]; // Create a copy of the current state
        newArray[nextEmptyIndex] = element; // Set the clicked element in the first empty slot
        return newArray; // Return the updated array
      }
      return prev; // If no empty slots, return the current state unchanged
    });

    console.log(element);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 p-4 w-fit">
        {array.map((element: string, index: Key) => (
          <button
            key={index}
            disabled={
              clickedIndices.includes(index as number) || element === ""
            } // Disable if clicked or element is empty
            onClick={() => handleClick(element, index as number)} // Ensure index is treated as a number
            className={`${
              element
                ? clickedIndices.includes(index as number)
                  ? "bg-slate-800 border border-red-500 cursor-not-allowed "
                  : "bg-slate-800 border border-slate-400 hover:scale-105 cursor-pointer active:scale-95"
                : "bg-slate-900 opacity-50 cursor-not-allowed"
            } h-12 w-12 flex items-center justify-center font-black capitalize text-2xl text-white transition-all `}
          >
            {element ? element : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WordBoard;
