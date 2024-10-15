function AnswerBox({ array }: { array: string[] }) {
  // Convert array to a single word and capitalize each letter
  const word = array.join("").toUpperCase();

  return (
    <div className="bg-slate-600 py-2 px-4 text-xl font-black text-white">
      {word}
    </div>
  );
}

export default AnswerBox;
