const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const progressBar = document.querySelector(".progress-bar");
const completedPart = document.querySelector(".completed-part");
const questionsWrapper = document.querySelector(".questions-wrapper");
const questionText = document.querySelector(".question");
const answersWrapper = document.querySelector(".answers-wrapper");
const results = document.querySelector(".results");
const total = document.querySelector(".total");
const right = document.querySelector(".right");
const percent = document.querySelector(".percent");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        type: "multiple",
        question: "Какая студия выпускает мультсериал Смешарики?",
        options: ["Союзмультфильм", "Петербург", "Мельница", "Мос Мульт"],
        answer: "Петербург",
    },
    {
        type: "multiple",
        question: "Как называется самая первая серия Смешариков?",
        options: ["Принц для Нюши", "Железная Няня", "Скамейка", "Фанерное солнце"],
        answer: "Скамейка",
    },
    {
        type: "text",
        question: "Как зовут сына Пина?",
        answer: ["Биби", "биби", "БИБИ", "Би-Би", "би-би", "БИ-БИ"],
    },
    {
        type: "multiple",
        question: "Что случилось с коллекцией фантиков Ёжика в серии 'Коллекция'?",
        options: ["Утонула в море", "Бесследно пропала", "Сгорела на костре", "Унесло ветром"],
        answer: "Унесло ветром",
    },
    {
        type: "text",
        question: "Из-за какой ноты Бараш сорвал голос и упал в колодец?",
        answer: ["Ля", "ля"],
    },
    {
        type: "multiple",
        question: "В какой серии звучит знаменитая песня 'От винта'?",
        options: ["Балласт", "Думают ли о вас на звездах?", "Полеты во сне и наяву", "Вестибулярный аппарат"],
        answer: "Полеты во сне и наяву",
    },
    {
        type: "multiple",
        question: "В каком году вышла первая серия мультсериала?",
        options: ["2002", "2003", "2005", "2007"],
        answer: "2003",
    },
    {
        type: "text",
        question: "Сколько основных персонажей в мультфильме? (Биби не считаем за основного персонажа)",
        answer: ["9",],
    },
    {
        type: "multiple",
        question: "Какая цифра висит перевернутой на домике Кар-Карыча?",
        options: ["12", "13", "16", "69"],
        answer: "13",
    },
    {
        type: "multiple",
        question: "Вопрос для шарящих ценителей. Во 'Вкусно - и точка' недавно вышла коллекция игрушек с героями мультсериала, но в нее вошли не все персонажи. Кого в ней не оказалось?",
        options: ["Биби", "Совуньи", "Копатыча", "Лосяша"],
        answer: "Копатыча",
    },
];

total.textContent = questions.length;

start.addEventListener("click", () => {
    start.style.display = "none";
    questionsWrapper.style.display = "flex";

    showQuestion();
});


function showQuestion() {
    progressBar.style.display = "block";
    let barWidth = ((currentQuestionIndex + 1) * 100 / questions.length) + "%";
    const currentQuestion = questions[currentQuestionIndex];        // получаем текущий вопрос из массива по индексу
    questionText.textContent = currentQuestion.question;            // изменяем текст вопроса

    answersWrapper.innerHTML = "";                                  // очищает поле от предыдущих ответов

    if (currentQuestion.type === "multiple") {                      // проверка на тип вопроса

        currentQuestion.options.forEach((item) => {                 // с помощью метода массивоы forEach создаем для каждого варианта ответа:
            const btn = document.createElement("button");           // кнопку
            btn.classList.add("answer-button");                     // добавляем ей класс
            btn.textContent = item;                                 // и текст(собственно текстом и будет являться каждый элемент массива)
            answersWrapper.append(btn);                            // и добавялем кнопку в нашу "обертку для ответов"

            btn.addEventListener("click", () => {                       // навешиваем на кнопку-ответ событие по клику
                completedPart.style.width = barWidth;
                if (btn.textContent === currentQuestion.answer) {       // тут проверка на правильность ответа( те текст в кнопке совпадает с тем что у нас находится в answer)
                    score++;                                            // при правильном ответе увеличиваем счетчик правильных ответов
                    btn.classList.add("correct");                       // и добавляем зеленую подсветку
                } else {
                    btn.classList.add("incorrect");                     // при неправильном ответет добавляем красную подсветку

                    [...answersWrapper.children].forEach(b => {             // превращаем html коллекцию(кнопок) в настоящий массив и применяем к нему метод forEach
                        if (b.textContent === currentQuestion.answer) {     // для каждой кнопки проверяем соответствует ли текст в кнопке правильному ответу
                            b.classList.add("correct");                     // если да то добавляем класс correct чтобы подсветить юзеру правильный ответ
                        }
                    });
                }
                setTimeout(() => {                                     // устанавливаем таймер при переходе на след вопрос чтобы пользователь увидел правильно или нет он ответил
                    nextQuestion();
                }, 1000);
            });
        });
    } else if (currentQuestion.type === "text") {                  // для следующего типа вопросов - текстовые

        const input = document.createElement("input");             // создаем элемент инпут
        input.classList.add("answer-input");                       // добавляем ему класс,
        input.type = "text";                                       // тип,
        input.placeholder = "введи свой ответ";                    // подсказку для ввода
        input.required = true;                                     // и делаем так чтобы нельзя было оставить его пустым
        answersWrapper.append(input);                              // добавляем в "обертку"

        input.addEventListener("keydown", function (event) {            // добавляем событие на инпут по нажатию на клавишу enter (я решила не делать отдельную кнопку)
            if (event.key === "Enter") {
                const userAnswer = input.value.trim();     // записываем ответ юзера в отдельную переменную и убираем лишние пробелы
                completedPart.style.width = barWidth;

                if (currentQuestion.answer.includes(userAnswer)) {       // делаем проверку что ответ юзера совпадает с тем что у нас записано в  правильном ответе
                    score++;
                    input.classList.add("correct");
                } else {
                    input.classList.add("incorrect");

                    const correctAnswerHint = document.createElement("div");
                    correctAnswerHint.classList.add("correct-hint");
                    correctAnswerHint.textContent = `Правильный ответ: ${currentQuestion.answer[0]}`;
                    answersWrapper.append(correctAnswerHint);
                }
                setTimeout(() => {
                    nextQuestion();
                }, 2000);
            }
        });
    }
}

function nextQuestion() {                            // вспомогательная функция для вызова следующего вопроса
    currentQuestionIndex++;                          // увеличиваем индекс вопроса чтобы вывелся новый вопрос

    if (currentQuestionIndex < questions.length) {
        showQuestion();                              // если вопросы в массиве еще остались то выводим новый вопрос
    } else {
        showResults();                               // иначе - показываем результат
    }
};

function showResults() {
    results.style.display = "block";
    restart.style.display = "block";
    progressBar.style.display = "none";
    questionsWrapper.style.display = "none";

    right.textContent = score;
    percent.textContent = score / questions.length * 100;
};

restart.addEventListener("click", () => {
    restartQuiz();
});

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    answersWrapper.innerHTML = "";
    questionText.textContent = "";
    right.textContent = "";
    percent.textContent = "";

    results.style.display = "none";
    restart.style.display = "none";
    start.style.display = "block";
    completedPart.style.width = "0%";
};

