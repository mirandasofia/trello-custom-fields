// Inicializa a conexão com o Trello Power-Up
var t = TrelloPowerUp.iframe();

// Quando o botão "Salvar" for clicado, salvar o valor no cartão
document.getElementById("salvar").addEventListener("click", function() {
    let valorCampo = document.getElementById("campoPersonalizado").value;
    
    // Salva o dado no cartão do Trello
    t.set("card", "shared", "campoPersonalizado", valorCampo)
     .then(() => alert("Valor salvo com sucesso!"))
     .catch((err) => console.error("Erro ao salvar:", err));
});

// Quando o Power-Up abrir, recuperar o valor salvo (se existir)
t.get("card", "shared", "campoPersonalizado")
 .then((data) => {
     if (data) {
         document.getElementById("campoPersonalizado").value = data;
     }
 });
