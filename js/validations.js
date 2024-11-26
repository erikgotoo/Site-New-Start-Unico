import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../perfil.html";
    }
});

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

function toggleAlertsEmail() {
    const emailValid = isEmailValid();

    document.getElementById('email-invalid-error').style.display = emailValid ? 'none' : 'block';
}

function toggleAlertsPassword() {
    const passwordValid = isPasswordValid();

    document.getElementById('password-invalid-error').style.display = passwordValid ? 'none' : 'block';
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    document.getElementById("recover-password-button").disabled = !emailValid;
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password')
}

// Login

function login() {
    showLoading();

    signInWithEmailAndPassword(auth, form.email().value, form.password().value)
        .then(response => {
            hideLoading();
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}

// Senha

function recoverPassword() {
    showLoading();
    sendPasswordResetEmail(auth, form.email().value)
        .then(() => {
            hideLoading();
            alert('Email enviado com sucesso');
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}

// Logs de erros

function getErrorMessage(error) {
    if (error.code === "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    return error.message;
}

window.onChangeEmail = onChangeEmail;
window.onChangePassword = onChangePassword;
window.login = login;
window.recoverPassword = recoverPassword;
