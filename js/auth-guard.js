import { auth } from "./firebaseConfig.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../login.html";
    }
});

function logout() {
    signOut(auth).then(() => {
        window.location.href = "../login.html";
    }).catch((error) => {
        console.error("Erro ao fazer logout:", error);
        alert('Erro ao fazer logout');
    });
}

window.logout = logout;