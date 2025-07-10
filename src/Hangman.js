import { useState, useEffect } from "react";
import { words } from "./words";

export default function Hangman({ duration = 120000 }) {
  const [word] = useState(
    () => words[Math.floor(Math.random() * words.length)]
  );

  console.log(word);
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  const maskedWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div>
      <p>{maskedWord}</p>
      {alphabets.map((alphabet, index) => (
        <button
          key={index}
          onClick={() => {
            if (word.includes(alphabet)) {
              setCorrectGuesses([...correctGuesses, alphabet]);
            } else {
              setIncorrectGuesses([...incorrectGuesses, alphabet]);
            }
          }}
        >
          {alphabet}
        </button>
      ))}
      {incorrectGuesses.length > 0 ? (
        <p>Incorrect guesses: {incorrectGuesses.join(", ")}</p>
      ) : null}
      {timeUp ? <p>You lost!</p> : !maskedWord.includes("_") && <p>You won!</p>}
    </div>
  );
}
