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

            const singleScores = userDocument.user.singleScores;

            const didIt = userDocument.user.didIt;

            let totalSingleScores = 0;

            let totalDidIt = 0;

            // Calculando a soma dos singleScores
            for (let i = 0; i < 5; i++) {
                totalSingleScores += singleScores[i];
                totalDidIt += didIt[i];
                
                console.log('Score ' + i + ':', singleScores[i]);
            }

            console.log("Total dos singleScores:", totalSingleScores);
            console.log("Total de cursos feitos:", totalDidIt);

            // Aqui você passa a soma total dos singleScores para a função de progresso
            atualizarBarraDeProgresso(totalDidIt, 0);  // Passando o progresso calculado

            userDocument.user.totalSscore.soft = obterNota(totalSingleScores);

            const hardScore = userDocument.user.totalSscore.hard;
            const softScore = userDocument.user.totalSscore.soft;

            console.log("Hard Score:", hardScore);
            console.log("Soft Score:", softScore);

            document.getElementById('notaSoft').textContent = softScore;

        })
        .catch((error) => {
            console.error("Erro ao obter os dados: ", error);
        });
};

function obterNota(pontos) {
    if (pontos >= 0 && pontos <= 15) {
      if (pontos <= 2) return 'E';
      if (pontos <= 5) return 'D';
      if (pontos <= 8) return 'C';
      if (pontos <= 11) return 'B';
      return 'A';
    } else {
      return 'Valor inválido. Informe um número entre 0 e 15.';
    }
  }

function atualizarBarraDeProgresso(progresso1, progresso2) {
    // A linha abaixo garante que o progresso1 esteja entre 0 e 5
    let porcentagem1 = Math.max(0, Math.min(progresso1, 5)); // Garante que progresso1 esteja entre 0 e 5
    let porcentagem = (porcentagem1 / 5) * 100; // Converte para 0 a 100%

    document.getElementById('barraProgresso1').style.width = porcentagem + '%';
    document.getElementById('porcentagem1').textContent = Math.round(porcentagem) + '%';

    document.getElementById('barraProgresso2').style.width = progresso2 + '%';
    document.getElementById('porcentagem2').textContent = progresso2 + '%';
}
