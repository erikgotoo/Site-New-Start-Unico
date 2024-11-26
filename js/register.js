import { auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db } from './firebaseConfig.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

function register() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            hideLoading();
            alert('Cadastro realizado com sucesso!');
            console.log("Usuário criado:", userCredential.user);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("Usuário autenticado:", user);
                    createUserDocument(user);
                } else {
                    console.error("Erro: usuário não autenticado após criação");
                }
            });
        })
        .catch((error) => {
            hideLoading();
            console.error("Erro ao criar usuário:", error);
            alert(getErrorMessage(error));
        });
}

function createUserDocument(user) {
    console.log("Tentando criar documento para o usuário:", user.uid);
    
    const userDocument = {
        user: {
            singleScores: {
                0: 0, 
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            totalSscore: {
                soft: "-",
                hard: "-"
            },
            uid: user.uid
        }
    };

    const userRef = doc(db, "scores", user.uid);

    setDoc(userRef, userDocument)
        .then(() => {
            console.log("Documento criado com sucesso para o usuário", user.uid);
            window.location.href = "../perfil.html";
        })
        .catch((error) => {
            console.error("Falha ao criar documento para o usuário: ", error);
        });
}

function getErrorMessage(error) {
    if (error.code === "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

function onChangeEmail() {
    toggleButtonsDisable();
    toggleAlertsEmail();
}

function onChangePassword() {
    toggleButtonsDisable();
    toggleAlertsPassword();
}

function isEmailValid() {
    const email = form.email().value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isPasswordValid() {
    const password = form.password().value
    const passwordLength = password.length;
    return passwordLength >= 6 && passwordLength <= 20;
}

function doesPasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    return password === confirmPassword;
}

function toggleAlertsEmail() {
    const emailValid = isEmailValid();
    document.getElementById('email-invalid-error').style.display = emailValid ? 'none' : 'block';
}

function toggleAlertsPassword() {
    const passwordValid = isPasswordValid();
    const passwordsMatch = doesPasswordsMatch();
    document.getElementById('password-invalid-error').style.display = passwordValid ? 'none' : 'block';
    document.getElementById('password-doesnt-match-error').style.display =
        passwordsMatch ? "none" : "block";
}

function toggleButtonsDisable() {
    document.getElementById('register-button').disabled = !isFormValid();
}

function isFormValid() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    const passwordsMatch = doesPasswordsMatch();
    return emailValid && passwordValid && passwordsMatch;
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: () => document.getElementById('confirm-password')
};

window.onChangeEmail = onChangeEmail;
window.onChangePassword = onChangePassword;
window.register = register;
