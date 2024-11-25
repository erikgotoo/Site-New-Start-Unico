import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db } from './firebaseConfig.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

            const hardScore = userDocument.user.score.hard;
            const softScore = userDocument.user.score.soft;

            console.log("Hard Score:", hardScore);
            console.log("Soft Score:", softScore);
        })
        .catch((error) => {
            console.error("Erro ao obter os dados: ", error);
        });
};
