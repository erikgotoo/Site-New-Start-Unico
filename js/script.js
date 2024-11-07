// FUNCOES UTILIZADAS NO PORTFOLIO
let timelineData = {};
// Carrega os dados do JSON
fetch('./data/timelineData.json')
    .then(response => response.json())
    .then(data => {
        timelineData = data; // Armazena os dados no objeto
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));

function updateContent(day) {
    const selectedData = timelineData[day];
    if (selectedData) {
        document.getElementById("selected-date").innerText = selectedData.date;
        document.getElementById("selected-content").innerText = selectedData.content;
        document.getElementById("selected-image").src = selectedData.image;
    }
}

// FUNCOES UTILIZADAS DENTRO DAS AULAS

function submitAnswers() {
    const correctAnswers = {
        q1: 'a',
        q2: 'a',
        q3: 'a',
        q4: 'a',
        q5: 'd'
    };

    let correctCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    for (let question in correctAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            correctCount++;
        }
    }

    document.getElementById('resultado').innerText = `${correctCount}/${totalQuestions} acertos`;

    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false; 
        });
    });

    alert("Respostas enviadas e escolhas limpas!");
}