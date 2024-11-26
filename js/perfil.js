import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db } from './firebaseConfig.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        findScores(user);
    } else {
        console.log("Nenhum usuário autenticado");
    }
});

window.findScores = function findScores(user) {
    const scoresQuery = query(
        collection(db, "scores"),
        where("user.uid", "==", user.uid)
    );

    getDocs(scoresQuery)
        .then((snapshot) => {
            const scoresMap = new Map();

            snapshot.forEach((doc) => {
                scoresMap.set(doc.id, doc.data());
            });

            const userDocument = scoresMap.get(scoresMap.keys().next().value);

            const hardScore = userDocument.user.totalSscore.hard;
            const softScore = userDocument.user.totalSscore.soft;

            console.log("Hard Score:", hardScore);
            console.log("Soft Score:", softScore);

            const singleScores = userDocument.user.singleScores;

            let totalSingleScores = 0;

            // Calculando a soma dos singleScores
            for (let i = 0; i < 5; i++) {
                totalSingleScores += singleScores[i];
                console.log('Score ' + i + ':', singleScores[i]);
            }

            console.log("Total dos singleScores:", totalSingleScores);

            // Aqui você passa a soma total dos singleScores para a função de progresso
            atualizarBarraDeProgresso(totalSingleScores, softScore);  // Passando o progresso calculado
        })
        .catch((error) => {
            console.error("Erro ao obter os dados: ", error);
        });
};

function atualizarBarraDeProgresso(progresso1, progresso2) {
    // A linha abaixo garante que o progresso1 esteja entre 0 e 15
    let porcentagem1 = Math.max(0, Math.min(progresso1, 15)); // Garante que progresso1 esteja entre 0 e 15
    let porcentagem = (porcentagem1 / 15) * 100; // Converte para 0 a 100%

    document.getElementById('barraProgresso1').style.width = porcentagem + '%';
    document.getElementById('porcentagem1').textContent = Math.round(porcentagem) + '%';

    document.getElementById('barraProgresso2').style.width = progresso2 + '%';
    document.getElementById('porcentagem2').textContent = progresso2 + '%';
}

window.onload = function() {
    var progresso1 = 1;  // Valor inicial, mas será substituído depois
    var progresso2 = 0;
    atualizarBarraDeProgresso(progresso1, progresso2);
};
