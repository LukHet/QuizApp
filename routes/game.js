const gameRoutes = (app) => {
  let goodAnswers = 0;
  let callToAFriendUsed = false;
  let questionToTheCrowd = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: "Treść pytania pierwszego",
      answers: [
        "pierwsza odpowiedź",
        "druga odpowiedź",
        "trzecia odpowiedź",
        "czwarta odpowiedź",
      ],
      correctAnswer: 1,
    },
    {
      question: "Treść pytania drugiego",
      answers: [
        "pierwsza odpowiedź",
        "druga odpowiedź",
        "trzecia odpowiedź",
        "czwarta odpowiedź",
      ],
      correctAnswer: 2,
    },
    {
      question: "Treść pytania trzeciego",
      answers: [
        "pierwsza odpowiedź",
        "druga odpowiedź",
        "trzecia odpowiedź",
        "czwarta odpowiedź",
      ],
      correctAnswer: 3,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({ winner: true });
      return;
    }

    const nextQuestion = questions[goodAnswers];

    const { question, answers } = nextQuestion;

    res.json({
      question,
      answers,
    });
  });
};

module.exports = gameRoutes;
