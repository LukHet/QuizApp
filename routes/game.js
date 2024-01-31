const gameRoutes = (app) => {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowd = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: "Treść pytania pierwszego",
      answers: [
        "odpowiedź 1.1",
        "odpowiedź 1.2",
        "odpowiedź 1.3",
        "odpowiedź 1.4",
      ],
      correctAnswer: 1,
    },
    {
      question: "Treść pytania drugiego",
      answers: [
        "odpowiedź 2.1",
        "odpowiedź 2.2",
        "odpowiedź 2.3",
        "odpowiedź 2.4",
      ],
      correctAnswer: 2,
    },
    {
      question: "Treść pytania trzeciego",
      answers: [
        "odpowiedź 3.1",
        "odpowiedź 3.2",
        "odpowiedź 3.3",
        "odpowiedź 3.4",
      ],
      correctAnswer: 3,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({ winner: true });
      return;
    }
    if (isGameOver) {
      res.json({
        loser: true,
      });
      return;
    }
    const nextQuestion = questions[goodAnswers];

    const { question, answers } = nextQuestion;

    res.json({
      question,
      answers,
    });
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        loser: true,
      });
      return;
    }
    const index = req.params.index;

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer - 1 === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło zostało już wykorzystane",
      });
    }

    callToAFriendUsed = true;

    const question = questions[goodAnswers];

    const doesFriendKnowAnswer = Math.random() < 0.5;

    console.log(question);

    res.json({
      text: doesFriendKnowAnswer
        ? `Odpowiedź to ${question.answers[question.correctAnswer - 1]}`
        : "Nie wiem",
    });
  });

  app.get("/help/halfonhalf", (req, res) => {
    if (halfOnHalfUsed) {
      return res.json({
        text: "To koło zostało już wykorzystane",
      });
    }

    halfOnHalfUsed = true;

    const question = questions[goodAnswers];

    console.log(question);

    const answersCopy = question.answers.filter(
      (el) => question.answers.indexOf(el) !== question.correctAnswer - 1
    );

    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy,
      text: "Wykorzystano koło 50/50",
    });
  });

  app.get("/help/crowd", (req, res) => {
    if (questionToTheCrowd) {
      return res.json({
        text: "To koło zostało już wykorzystane",
      });
    }

    questionToTheCrowd = true;

    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);

      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({ chart });
  });
};

module.exports = gameRoutes;
