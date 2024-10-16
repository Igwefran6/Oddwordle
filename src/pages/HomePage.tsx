import { useEffect, useState } from "react";
import WordBoard from "../components/WordBoard";
import MainLayout from "../layouts/MainLayout";
import AnswerBox from "../components/AnswerBox";
import Button from "../components/Button";
import SettingsButton from "../components/SettingsButton";
import HUD from "../components/HUD";
import Settings from "../components/Settings";
import shuffleAndScramble from "../utils/shuffleAndScramble";

function HomePage() {
  const [word, setWord] = useState("");
  const [array, setArray] = useState<string[]>([]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [wordCount, setWordCount] = useState(4);
  const [userSetWord, setUserSetWord] = useState<string[]>([]);
  const [hintCount, setHintCount] = useState(2);

  // Helper function to get random unique indices
  const getRandomIndices = (count: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  };

  useEffect(() => {
    const url = `http://localhost:3000/api/words/length/${wordCount}`;
    async function getWord() {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error:");
      }
      response.json().then((word) => {
        setWord(word.word);
      });
    }
    setUserSetWord(Array(wordCount).fill("")); // Initialize with empty strings
    getWord();
  }, [wordCount]);

  useEffect(() => {
    if (!word) {
      return;
    }

    const newWord = word;
    // Scramble the new word and update the arrays once the word is set
    const scrambledArray = shuffleAndScramble({ word: newWord });
    setArray(scrambledArray);

    // Randomly add hintCount characters to userSetWord array
    const newUserSetWord = Array(wordCount).fill("");
    const randomIndices = getRandomIndices(hintCount, wordCount);

    randomIndices.forEach((index) => {
      newUserSetWord[index] = newWord[index];
    });

    setUserSetWord(newUserSetWord);
  }, [word, hintCount, wordCount]);

  return (
    <>
      <MainLayout>
        <div className="flex flex-col h-full flex-1 justify-center items-center">
          <AnswerBox array={userSetWord} />
          <WordBoard
            array={array}
            wordCount={wordCount}
            userSetWord={userSetWord}
            setUserSetWord={setUserSetWord}
          />
          <div className="flex gap-4">
            <Button onClick={() => {}} label="Check" />
            <Button onClick={() => {}} label="Delete" />
          </div>
        </div>
        <SettingsButton onClick={() => setSettingsVisible((prev) => !prev)} />
        <Settings settingsVisible={settingsVisible} />
        <HUD />
      </MainLayout>
    </>
  );
}

export default HomePage;
