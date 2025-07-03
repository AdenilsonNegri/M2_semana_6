const form = document.getElementById("formCelular");
const btnSalvar = document.getElementById("btnSalvar");

let indiceEdicao = localStorage.getItem("celularParaEditar");

function validarCampos() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value.trim();
  const cor = document.getElementById("cor").value.trim();
  const valor = document.getElementById("valor").value.trim();
  const estado = document.querySelector('input[name="estado"]:checked');
  const info = document.getElementById("info").value.trim();

  if (marca && modelo && cor && valor && estado && info) {
    btnSalvar.disabled = false;
  } else {
    btnSalvar.disabled = true;
  }
}

// Monitorar campos do formulário
form.addEventListener("input", validarCampos);
form.addEventListener("change", validarCampos);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const celular = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value.trim(),
    cor: document.getElementById("cor").value.trim(),
    valor: parseFloat(document.getElementById("valor").value),
    estado: document.querySelector('input[name="estado"]:checked').value,
    info: document.getElementById("info").value.trim()
  };

  // Salvar no localStorage
  const lista = JSON.parse(localStorage.getItem("celulares")) || [];

  if (indiceEdicao !== null) {
    // Atualizar
    lista[indiceEdicao] = celular;
    localStorage.removeItem("celularParaEditar");
  } else {
    // Novo Cadastro
    lista.push(celular);
  } 
 
  localStorage.setItem("celulares", JSON.stringify(lista));

  alert("Dados salvos com sucesso!");

  form.reset();
  btnSalvar.disabled = true;
  window.location.href = "Listagem_Celulares_3.html";
});
// Pré-preencher se estiver editando
if (indiceEdicao !== null) {
  const celulares = JSON.parse(localStorage.getItem("celulares")) || [];
  const celular = celulares[indiceEdicao];

  if (celular) {
    document.getElementById("marca").value = celular.marca;
    document.getElementById("modelo").value = celular.modelo;
    document.getElementById("cor").value = celular.cor;
    document.getElementById("valor").value = celular.valor;
    document.querySelector(`input[name="estado"][value="${celular.estado}"]`).checked = true;
    document.getElementById("info").value = celular.info;
    validarCampos();
  }
}