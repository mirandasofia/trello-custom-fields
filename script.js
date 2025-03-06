window.TrelloPowerUp.initialize({
  'board-buttons': function (t, options) {
    return [{
      icon: 'https://mirandasofia.github.io/icon.png', // Ícone do botão (opcional)
      text: 'Meu Power-Up',
      callback: function (t) {
        return t.popup({
          title: "Meu Power-Up",
          url: t.signUrl('https://mirandasofia.github.io/index.html')
        });
      }
    }];
  }
});
