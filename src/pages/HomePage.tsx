import { useEffect, useState } from "react";
import WordBoard from "../components/WordBoard";
import MainLayout from "../layouts/MainLayout";
import AnswerBox from "../components/AnswerBox";
import Button from "../components/Button";
import SettingsButton from "../components/SettingsButton";
import HUD from "../components/HUD";
import Settings from "../components/Settings";
import shuffleAndScramble from "../utils/shuffleAndScramble";
import AlertBox from "../components/AlertBox";
import { isArrayFilled } from "../utils/isArrayFilled";
import SecureLocalStorage from "../utils/SecureLocalStorage";

function HomePage() {
  const [word, setWord] = useState("");
  const [array, setArray] = useState<string[]>([]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [alertboxVisible, setAlertboxVisible] = useState(false);
  const [difficulty, setDifficulty] = useState(6);
  const [attempts, setAttempts] = useState(0);
  const [userSetWord, setUserSetWord] = useState<string[]>([]);
  const [initialUserSetWord, setInitialUserSetWord] = useState<string[]>([]); // To track the initial hints
  const [hintCount, setHintCount] = useState(3);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);

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
    const url = `http://localhost:3000/api/words/length/${difficulty}`;
    async function getWord() {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error: 404 cannot get");
      }
      response.json().then((word) => {
        setWord(word.word);
      });
    }
    setUserSetWord(Array(difficulty).fill("")); // Initialize with empty strings
    getWord();
  }, [difficulty, attempts]);

  useEffect(() => {
    if (!word) {
      return;
    }

    const newWord = word;
    // Scramble the new word and update the arrays once the word is set
    const scrambledArray = shuffleAndScramble({ word: newWord });
    setArray(scrambledArray);

    // Randomly add hintCount characters to userSetWord array
    const newUserSetWord = Array(difficulty).fill("");
    const randomIndices = getRandomIndices(hintCount, difficulty);

    randomIndices.forEach((index) => {
      newUserSetWord[index] = newWord[index];
    });

    setUserSetWord(newUserSetWord);
    setInitialUserSetWord(newUserSetWord); // Track the initial state of hints
  }, [word, hintCount, difficulty, attempts]);

  function handleCheck() {
    if (isArrayFilled(userSetWord)) {
      setAlertboxVisible(true);
    } else {
      alert("Please complete the answer box!");
    }
  }
  function handleClear() {
    // Reset userSetWord to the initial hints, keeping the initial hints intact
    setUserSetWord([...initialUserSetWord]);
    setClickedIndices([]);
  }
  function handleContinue() {
    setAttempts((prev) => prev + 1);
    setAlertboxVisible(false);
    setClickedIndices([]);
  }
  function handleRestart() {}

  return (
    <>
      <MainLayout>
        <div className="flex flex-col h-full flex-1 justify-center items-center">
          <AnswerBox array={userSetWord} />
          <WordBoard
            array={array}
            userSetWord={userSetWord}
            setUserSetWord={setUserSetWord}
            clickedIndices={clickedIndices}
            setClickedIndices={setClickedIndices}
          />
          <div className="flex gap-4">
            <Button onClick={handleCheck} label="Check" />
            <Button onClick={handleClear} label="Clear" />
          </div>
        </div>
        <SettingsButton onClick={() => setSettingsVisible((prev) => !prev)} />
        <Settings settingsVisible={settingsVisible} />
        <HUD />
        <AlertBox
          word={word}
          userSetWord={userSetWord}
          alertboxVisible={alertboxVisible}
          handleContinue={handleContinue}
          handleRestart={handleRestart}
        />
      </MainLayout>
    </>
  );
}

export default HomePage;
