const question = document.querySelector("#question");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

const fillQuestionElements = (data) => {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Wygrana!";
    return;
  }

  question.innerText = data.question;

  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
  }
};

const showNextQuestion = () => {
  fetch("/question", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      fillQuestionElements(data);
    });
};

showNextQuestion();

const goodAnswersSpan = document.querySelector("#good-answers");

const handleAnswerFeedback = (data) => {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
};

const sendAnswer = (answerIndex) => {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((data) => data.json())
    .then((data) => {
      handleAnswerFeedback(data);
    });
};

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
