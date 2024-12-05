const finalScore = document.getElementById("finalScore");
const correctCount = document.getElementById("correctCount");
const incorrectCount = document.getElementById("incorrectCount");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const correctAnswers = localStorage.getItem("correctAnswers");
const incorrectAnswers = localStorage.getItem("incorrectAnswers");


finalScore.innerText = `Skor Akhir: ${mostRecentScore}`;
correctCount.innerText = `Jawaban Benar: ${correctAnswers}`;
incorrectCount.innerText = `Jawaban Salah: ${incorrectAnswers}`;