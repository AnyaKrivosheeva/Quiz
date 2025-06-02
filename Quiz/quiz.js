const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const questionsWrapper = document.querySelector(".questions-wrapper");
const questionText = document.querySelector(".question");
const answersWrapper = document.querySelector(".answers-wrapper");
const results = document.querySelector(".results");

let currentQuestionIndex = 0;

const questions = [
    {
        type: "multiple",
        question: "Как называется самая первая серия Смешариков?",
        options: ["Принц для Нюши", "Скамейка", "Железная Няня", "Ля"],
        answer: "Скамейка",
    },
    {
        type: "text",
        question: "Как зовут сына Пина?",
        answer: "биби",
    }
];

start.addEventListener("click", () => {
    start.style.display = "none";
    questionsWrapper.style.display = "flex";

    showQuestion();
});


function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];     // получаем текущий вопрос из массива по индексу
    questionText.textContent = currentQuestion.question;         // изменяем текст вопроса

    answersWrapper.innerHTML = "";                              // очищает поле от ответов

    if (currentQuestion.type === "multiple") {

        currentQuestion.options.forEach((item) => {
            const btn = document.createElement("button");
            btn.classList.add("answer-button");
            btn.textContent = item;
            answersWrapper.append(btn);

            btn.addEventListener("click", () => {
                if (btn.textContent === currentQuestion.answer) {
                    // пользователь ответил правильно
                } else {
                    // пользователь ошибся
                }
                // обработчик
            });
        });
    } else if (currentQuestion.type === "text") {

        const input = document.createElement("input");
        input.classList.add("answer-input");
        input.type = "text";
        input.placeholder = "введи свой ответ";
        input.required = true;
        answersWrapper.append(input);

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const userAnswer = input.value.trim().toLowerCase();     // записываем ответ юзера в отдельную переменную

                if (currentQuestion.answer.includes(userAnswer)) {
                    // ответ правильный
                } else {
                    // пользователь ошибся
                }
                // обработчик перехода
            }
        });
    }
}
