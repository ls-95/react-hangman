import { useState, useEffect } from "react";
import { words } from "./words";
import "./Hangman.css";

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export default function Hangman({ duration = 120000 }) {
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timeUp, setTimeUp] = useState(false);
  const [word, setWord] = useState(() => getRandomWord());

  function resetGame() {
    setWord(getRandomWord());
    setCorrectGuesses([]);
    setIncorrectGuesses([]);
    setTimeLeft(duration);
    setTimeUp(false);
  }

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

  const hasWon = !maskedWord.includes("_");
  const hasLost = timeUp || incorrectGuesses.length >= 6;
  const gameOver = hasWon || hasLost;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

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

    if (
      !timeUp &&
      (!maskedWord.includes("_") || incorrectGuesses.length >= 6)
    ) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [duration, timeUp, maskedWord, incorrectGuesses]);

  return (
    <div className="game-wrapper">
      <div className="container">
        <p className="masked-word">{maskedWord}</p>
        <p>
          <span className="incorrect-guesses-text">Incorrect guesses:</span>{" "}
          <span className="incorrect-guesses-letters">
            {incorrectGuesses.length > 0
              ? incorrectGuesses.join(", ")
              : "\u00A0"}
          </span>
        </p>

        {alphabets.map((alphabet, index) => (
          <button
            key={index}
            className="btn-letters"
            onClick={() => {
              if (hasLost || hasWon) return;
              if (
                correctGuesses.includes(alphabet) ||
                incorrectGuesses.includes(alphabet)
              )
                return;
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
        <div className="time-left-container">
          <span className="time-left-text">Time left:</span>{" "}
          <span className="time-left-number">{formattedTime}s</span>
        </div>
        <div className="game-result">
          {hasLost ? (
            <>
              <p className="game-result-lost">You lost!</p>
              <p className="game-result-word">
                <span className="game-result-lost-text">The word was:</span>{" "}
                <span className="game-result-lost-word">{word}</span>
              </p>
            </>
          ) : hasWon ? (
            <p className="game-result-won">You won!</p>
          ) : (
            <div style={{ minHeight: "3em" }}></div>
          )}
        </div>

        <div className="new-word-button">
          {gameOver ? (
            <button className="btn-new-word" onClick={resetGame}>
              New word
            </button>
          ) : (
            <div style={{ height: "2.5em" }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
