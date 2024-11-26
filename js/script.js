import { db } from './firebaseConfig.js';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

let timelineData = {};

fetch('./data/timelineData.json')
    .then(response => response.json())
    .then(data => {
        timelineData = data; 
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

function submitAnswers(id) {
    const answers = [
        ['d', 'b', 'b'],
        ['b', 'b', 'b'],
        ['b', 'b', 'b'],
        ['b', 'a', 'b'],
        ['a', 'b', 'b']
    ];

    const correctAnswersArray = answers[id];

    const correctAnswers = correctAnswersArray.reduce((acc, answer, index) => {
        acc[`q${index + 1}`] = answer;
        return acc;
    }, {});

    let correctCount = 0;

    for (let question in correctAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
            correctCount++;
        }
    }

    document.getElementById('resultado').innerHTML = `<strong>${correctCount}/3 acertos</strong>`;

    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
    });

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        updateSoftScore(user, correctCount, id);
    } else {
        console.log('Usuário não autenticado');
    }
}

function updateSoftScore(user, newScore, id) {
    const userRef = doc(db, "scores", user.uid);

    const updatedScores = {
        [`user.singleScores.${id}`]: newScore
    };

    updateDoc(userRef, updatedScores)
        .then(() => {
            console.log(`Índice ${id} de softScores atualizado com sucesso!`);
        })
        .catch((error) => {
            console.error("Erro ao atualizar softScores:", error);
        });
}

window.updateContent = updateContent;
window.submitAnswers = submitAnswers;
