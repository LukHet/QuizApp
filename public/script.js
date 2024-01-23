const question = document.querySelector("#question");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

const fillQuestionElements = (data) => {
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
