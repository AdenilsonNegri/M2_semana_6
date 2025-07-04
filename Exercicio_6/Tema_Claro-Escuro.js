document.addEventListener('DOMContentLoaded', function () {
  const botaoTema = document.getElementById('toggleTema');
  const temaSalvo = localStorage.getItem('tema') || 'claro';

  aplicarTema(temaSalvo);

  if (botaoTema) {
    botaoTema.textContent = temaSalvo === 'escuro' ? 'Tema Claro' : 'Tema Escuro';

    botaoTema.addEventListener('click', function () {
      const temaAtual = document.body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
      const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
      aplicarTema(novoTema);
      localStorage.setItem('tema', novoTema);
      botaoTema.textContent = novoTema === 'escuro' ? 'Tema Claro' : 'Tema Escuro';
    });
  }

  function aplicarTema(tema) {
    if (tema === 'escuro') {
      document.body.classList.add('tema-escuro');
    } else {
      document.body.classList.remove('tema-escuro');
    }
  }
});
