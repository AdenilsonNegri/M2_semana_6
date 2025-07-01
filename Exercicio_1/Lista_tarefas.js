const inputTarefa = document.getElementById('tarefa');
const botaoAdicionar = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

// Recupera tarefas salvas e renderiza
function carregarTarefas() {
  lista.innerHTML = '';
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.forEach((texto, index) => {
    criarTarefa(texto, index);
  });
}

// Cria elemento <li> com botão excluir
function criarTarefa(texto, index) {
  const item = document.createElement('li');
  item.textContent = texto;

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.classList.add("excluir");
  botaoExcluir.onclick = () => excluirTarefa(index);

  item.appendChild(botaoExcluir);
  lista.appendChild(item);
}

// Adiciona nova tarefa
botaoAdicionar.addEventListener('click', () => {
  const texto = inputTarefa.value.trim();

  if (texto !== "") {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(texto);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    inputTarefa.value = "";
    inputTarefa.focus();
    carregarTarefas();
  } else {
    alert("Digite uma tarefa antes de adicionar.");
  }
});

// Remove tarefa
function excluirTarefa(index) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  carregarTarefas();
}

// Carrega ao abrir
window.addEventListener('load', carregarTarefas);
