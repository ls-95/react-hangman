import { useState, useEffect } from "react";
import { words } from "./words";

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default function Hangman({ duration = 120000 }) {
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timeUp, setTimeUp] = useState(false);
  const [word, setWord] = useState(() => getRandomWord());

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

  const maskedWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          setTimeUp(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    if (!timeUp && !maskedWord.includes("_")) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [duration, timeUp, maskedWord]);

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
      <p>Time left: {Math.ceil(timeLeft / 1000)}s</p>
      {timeUp ? <p>You lost!</p> : !maskedWord.includes("_") && <p>You won!</p>}
    </div>
  );
}
