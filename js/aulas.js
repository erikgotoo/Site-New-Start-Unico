// Dados do conteúdo das aulas
const aulas = {
    aula1: {
        video: "https://www.youtube.com/embed/LlGmp0a3t9k?si=ayVU-67JBIF1hvUY&controls=1&autoplay=1&loop=1&mute=0&start=1",
        documentacao: {
            titulo: "Objetivo do Curso",
            descricao: `
          Este curso tem como objetivo fornecer uma compreensão básica e prática do HTML, capacitando o aluno a criar páginas web simples, com textos, links, imagens, listas e outros elementos fundamentais.
        `,
        },
        questoes: [
            {
                pergunta: "Qual atributo é usado para especificar o URL de um link?",
                respostas: [
                    { letra: "a", texto: "href" },
                    { letra: "b", texto: "src" },
                    { letra: "c", texto: "link" },
                    { letra: "d", texto: "url" }
                ]
            },
            {
                pergunta: "Qual propriedade CSS é usada para mudar a cor do texto?",
                respostas: [
                    { letra: "a", texto: "color" },
                    { letra: "b", texto: "font-color" },
                    { letra: "c", texto: "text-color" },
                    { letra: "d", texto: "bgcolor" }
                ]
            }
        ]
    },
    aula2: {
        video: "https://www.youtube.com/embed/M8k5E8j-9sE?controls=1&autoplay=1&loop=1&mute=0&start=1",
        documentacao: {
            titulo: "Aprofundando no CSS",
            descricao: `
          Neste módulo, vamos aprender sobre CSS, que é a linguagem usada para estilizar o HTML e criar layouts bonitos para as páginas web.
        `,
        },
        questoes: [
            {
                pergunta: "Qual propriedade CSS é usada para definir o fundo de uma página?",
                respostas: [
                    { letra: "a", texto: "background-color" },
                    { letra: "b", texto: "color" },
                    { letra: "c", texto: "bg" },
                    { letra: "d", texto: "bgcolor" }
                ]
            },
            {
                pergunta: "O que significa 'em' em CSS?",
                respostas: [
                    { letra: "a", texto: "É uma unidade relativa ao tamanho da tela" },
                    { letra: "b", texto: "É uma unidade relativa ao tamanho da fonte do elemento pai" },
                    { letra: "c", texto: "É uma unidade de tempo" },
                    { letra: "d", texto: "Nenhuma das anteriores" }
                ]
            },
            {
                pergunta: "O que significa 'em' em CSS?",
                respostas: [
                    { letra: "a", texto: "É uma unidade relativa ao tamanho da tela" },
                    { letra: "b", texto: "É uma unidade relativa ao tamanho da fonte do elemento pai" },
                    { letra: "c", texto: "É uma unidade de tempo" },
                    { letra: "d", texto: "Nenhuma das anteriores" }
                ]
            },
            {
                pergunta: "O que significa 'em' em CSS?",
                respostas: [
                    { letra: "a", texto: "É uma unidade relativa ao tamanho da tela" },
                    { letra: "b", texto: "É uma unidade relativa ao tamanho da fonte do elemento pai" },
                    { letra: "c", texto: "É uma unidade de tempo" },
                    { letra: "d", texto: "Nenhuma das anteriores" }
                ]
            }
        ]
    },
    aula3: {
        video: "https://www.youtube.com/embed/SjojxCiWjBY?controls=1&autoplay=1&loop=1&mute=0&start=1",
        documentacao: {
            titulo: "Aprofundando no CSS",
            descricao: `
          Neste módulo, vamos aprender sobre CSS, que é a linguagem usada para estilizar o HTML e criar layouts bonitos para as páginas web.
        `,
        },
        questoes: [
            {
                pergunta: "Qual propriedade CSS é usada para definir o fundo de uma página?",
                respostas: [
                    { letra: "a", texto: "background-color" },
                    { letra: "b", texto: "color" },
                    { letra: "c", texto: "bg" },
                    { letra: "d", texto: "bgcolor" }
                ]
            },
            {
                pergunta: "O que significa 'em' em CSS?",
                respostas: [
                    { letra: "a", texto: "É uma unidade relativa ao tamanho da tela" },
                    { letra: "b", texto: "É uma unidade relativa ao tamanho da fonte do elemento pai" },
                    { letra: "c", texto: "É uma unidade de tempo" },
                    { letra: "d", texto: "Nenhuma das anteriores" }
                ]
            }
        ]
    }
};

function mudarConteudo(aula) {
    // Verifica se a aula existe
    if (!aulas[aula]) {
        console.error("Aula não encontrada!");
        return;
    }

    // Atualiza o vídeo
    const videoIframe = document.getElementById("video-aula");
    videoIframe.src = aulas[aula].video;

    // Atualiza a documentação
    const docTitulo = document.getElementById("documentacao-aula");
    docTitulo.querySelector('h2').textContent = aulas[aula].documentacao.titulo;
    docTitulo.querySelector('p').textContent = aulas[aula].documentacao.descricao;

    // Atualiza as questões
    const questoesContainer = document.getElementById("questoes-teste");
    questoesContainer.innerHTML = ""; // Limpa as questões atuais

    aulas[aula].questoes.forEach((questao, index) => {
        const divQuestao = document.createElement("div");
        divQuestao.classList.add("question");
        divQuestao.innerHTML = `
        <h5>${questao.pergunta}</h5>
        ${questao.respostas.map(resposta => `
          <input type="radio" name="q${index}" value="${resposta.letra}"> ${resposta.letra}) ${resposta.texto}<br>
        `).join('')}
      `;
        questoesContainer.appendChild(divQuestao);
    });
}

function submitAnswers() {
    const questoes = document.querySelectorAll('.question');
    let acertos = 0;

    // Verifica as respostas
    questoes.forEach((questao, index) => {
        const selected = questao.querySelector('input[type="radio"]:checked');
        if (selected && selected.value === "a") { // Aqui você define a resposta correta
            acertos++;
        }
    });

    // Exibe o resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<h3>Você acertou ${acertos} de ${questoes.length} questões.</h3>`;
}

