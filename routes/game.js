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

    console.log(typeof question.correctAnswer, typeof Number(index));

    const isGoodAnswer = question.correctAnswer === Number(index);

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
};

module.exports = gameRoutes;
