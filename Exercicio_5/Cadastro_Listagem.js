// listagem3.js

document.addEventListener('DOMContentLoaded', function () {
  const tabela = document.getElementById('tabela-corpo');

  function carregarCelulares() {
    tabela.innerHTML = '';
    const celulares = JSON.parse(localStorage.getItem('celulares')) || [];

    celulares.forEach((celular, index) => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${celular.marca}</td>
        <td>${celular.modelo}</td>
        <td>${celular.cor}</td>
        <td>${celular.valor}</td>
        <td>${celular.estado}</td>
        <td>${celular.info}</td>
        <td>
          <button class="btn-alterar" onclick="alterarCelular(${index})">Alterar</button>
          <button class="btn-excluir" onclick="excluirCelular(${index})">Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  }

  window.excluirCelular = function (index) {
    const celulares = JSON.parse(localStorage.getItem('celulares')) || [];
    celulares.splice(index, 1);
    localStorage.setItem('celulares', JSON.stringify(celulares));
    carregarCelulares();
  };

  window.alterarCelular = function (index) {
    localStorage.setItem('celularParaEditar', index);
    window.location.href = '../Exercicio_3/cadastro.html';
  };

  carregarCelulares();
});
