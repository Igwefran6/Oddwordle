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
import useAppContext from "../hooks/useAppContext";

function HomePage() {
  const { state, dispatch } = useAppContext();
  const { word, difficulty, attempts, userSetWord, initialUserSetWord } = state;

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [alertboxVisible, setAlertboxVisible] = useState(false);

  const hintCount = 1;

  // Helper function to get random unique indices
  const getRandomIndices = (count: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  };
  async function GetNewWord() {
    console.log(word);
    const url = `http://localhost:3000/api/words/length/${difficulty}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error: 404 cannot get");
    }
    const newWordData = await response.json();
    dispatch({ type: "SET_WORD", payload: newWordData.word });

    // Scramble the new word after it has been set
    const scrambledArray = shuffleAndScramble({ word: newWordData.word });
    dispatch({
      type: "UPDATE_ARRAY",
      payload: scrambledArray,
    });

    dispatch({
      type: "SET_USER_SET_WORD",
      payload: Array(difficulty).fill(""),
    });
  }

  useEffect(() => {
    dispatch({
      type: "SET_USER_SET_WORD",
      payload: Array(difficulty).fill(""),
    });

    if (word) {
      return;
    }
    GetNewWord();
  }, [attempts, difficulty]);

  useEffect(() => {
    if (!word) {
      return;
    }
    const newWord = word;

    // Randomly add hintCount characters to userSetWord array
    const newUserSetWord = Array(difficulty).fill("");
    const randomIndices = getRandomIndices(hintCount, difficulty);

    randomIndices.forEach((index) => {
      newUserSetWord[index] = newWord[index];
    });
    dispatch({
      type: "SET_USER_SET_WORD",
      payload: newUserSetWord,
    });
    dispatch({
      type: "SET_INITIAL_USER_SET_WORD",
      payload: newUserSetWord,
    });
    // Track the initial state of hints
  }, [word, hintCount, difficulty, attempts]);

  function handleCheck() {
    if (isArrayFilled(userSetWord)) {
      setAlertboxVisible(true);
    } else {
      alert("Please complete the answer box!");
    }
  }
  function handleClear() {
    console.log(state);
    // Reset userSetWord to the initial hints, keeping the initial hints intact
    dispatch({
      type: "SET_USER_SET_WORD",
      payload: [...initialUserSetWord],
    });
    dispatch({
      type: "CLICKED_INDICES",
      payload: [],
    });
  }
  function handleContinue() {
    dispatch({ type: "SET_ATTEMPTS", payload: attempts + 1 });
    setAlertboxVisible(false);
    dispatch({
      type: "CLICKED_INDICES",
      payload: [],
    });
    GetNewWord();
  }
  function handleRestart() {}
  useEffect(() => {}, []);

  return (
    <>
      <MainLayout>
        <div className="flex flex-col h-full flex-1 justify-center items-center">
          <AnswerBox array={userSetWord} />
          <WordBoard />
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
