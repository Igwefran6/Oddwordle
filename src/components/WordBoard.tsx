import { Key, useState } from "react";

// Function to shuffle an array

function WordBoard({ array }: { array: string[] }) {
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);

  // Define the type of element as a string
  const handleClick = (element: string, index: number) => {
    setClickedIndices((prev) => [...prev, index]); // Add the index of the clicked button to the array
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
                  ? "bg-slate-800 border border-red-500 cursor-not-allowed"
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
