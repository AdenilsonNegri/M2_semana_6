const inputTarefa = document.getElementById('tarefa');
const botaoAdicionar = document.getElementById('adicionarBtn');
const listaTarefas = document.getElementById('listaTarefas');
const listaConcluidas = document.getElementById('listaConcluidas');

function carregarListas() {
  listaTarefas.innerHTML = '';
  listaConcluidas.innerHTML = '';

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach((tarefa, index) => {
    criarElementoTarefa(tarefa.texto, tarefa.concluida, index);
  });
}

function criarElementoTarefa(texto, concluida, index) {
  const item = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = concluida;
  checkbox.addEventListener('change', () => alternarStatus(index));

  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;
  spanTexto.classList.add('tarefa-texto');

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.classList.add("excluir");
  botaoExcluir.onclick = () => excluirTarefa(index);

  item.appendChild(checkbox);
  item.appendChild(spanTexto);
  item.appendChild(botaoExcluir);

  if (concluida) {
    listaConcluidas.appendChild(item);
  } else {
    listaTarefas.appendChild(item);
  }
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") {
    alert("Digite uma tarefa.");
    return;
  }

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push({ texto, concluida: false });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  inputTarefa.value = "";
  inputTarefa.focus();
  carregarListas();
}

function excluirTarefa(index) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  carregarListas();
}

function alternarStatus(index) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas[index].concluida = !tarefas[index].concluida;
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  carregarListas();
}

botaoAdicionar.addEventListener('click', adicionarTarefa);
window.addEventListener('load', carregarListas);
