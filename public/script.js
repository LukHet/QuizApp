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

  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Przegrana";
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

const buttons = document.querySelectorAll(".answer-button");

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}

const tipDiv = document.querySelector("#tip");

const handleFriendsAnswer = (data) => {
  tipDiv.innerText = data.text;
};

const callToAFriend = () => {
  fetch("/help/friend", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      handleFriendsAnswer(data);
    });
};

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFriend);

const handleHalfOnHalfAnswer = (data) => {
  if (data.text) {
    tipDiv.innerText = data.text;
  }
  console.log(data);

  for (const button of buttons) {
    console.log(button.innerText);
    if (data.answersToRemove.includes(button.innerText)) {
      button.disabled = true;
    }
  }
};

const halfOnHalf = () => {
  fetch("/help/halfonhalf", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      handleHalfOnHalfAnswer(data);
    });
};

document.querySelector("#halfOnHalf").addEventListener("click", halfOnHalf);

const handleCrowdAnswer = (data) => {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
    return;
  }
  data.chart.forEach((percent, index) => {
    buttons[index].innerText += ` - ${percent}%`;
  });
};

const questionToTheCrowd = () => {
  fetch("/help/crowd", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      handleCrowdAnswer(data);
    });
};

document
  .querySelector("#questionToTheCrowd")
  .addEventListener("click", questionToTheCrowd);
