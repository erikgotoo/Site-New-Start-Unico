function showLoading() {
    const div = document.createElement("div");
    const label = document.createElement("label");

    div.classList.add("loading");
    label.innerText = "Carregando...";

    div.appendChild(label);
    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}

window.showLoading = showLoading;
window.hideLoading = hideLoading;
