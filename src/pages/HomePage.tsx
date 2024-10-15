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
  const [choosenWord, setChoosenWord] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(6);
  const [userWord, setUserWord] = useState<string[]>([]);

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

    getWord();
  }, []);

  useEffect(() => {
    if (word) {
      console.log("if", word, word === "");
    } else {
      return console.log("else", word, word === "");
    }
    const newWord = word;
    // Scramble the new word and update the arrays once the word is set
    const scrambledArray = shuffleAndScramble({ word: newWord });
    setArray(scrambledArray);
    setChoosenWord(newWord.split(""));
  }, [word]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // A message prompt will be displayed in most browsers
  //   };

  //   // Add the event listener
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      <MainLayout>
        <div className="flex flex-col h-full flex-1 justify-center items-center">
          <AnswerBox array={choosenWord} />
          <WordBoard array={array} />
          <Button onClick={() => {}} label="Check" />
        </div>
        <SettingsButton onClick={() => setSettingsVisible((prev) => !prev)} />
        <Settings settingsVisible={settingsVisible} />
        <HUD />
      </MainLayout>
    </>
  );
}

export default HomePage;
