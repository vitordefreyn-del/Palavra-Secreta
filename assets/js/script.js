const palavras = [
"banana","morango","abacaxi","laranja","uva",
"flamengo","palmeiras","barcelona","chelsea"
];

const dicas = [
  "Fruta amarela e doce",        // banana
  "Fruta vermelha muito doce",   // morango
  "Fruta tropical com casca dura", // abacaxi
  "Fruta cítrica laranja",       // laranja
  "Fruta pequena e roxa",        // uva
  "Time de futebol carioca",    // flamengo
  "Time paulista famoso",        // palmeiras
  "Time espanhol famoso",        // barcelona
  "Time inglês da Premier League" // chelsea
];

// Sorteia palavra e dica
let indice = Math.floor(Math.random() * palavras.length);
let palavra = palavras[indice];
let dica = dicas[indice];

// Inicializa o jogo
let palavraOculta = [];
let letrasErradas = [];
let erros = 0;

for(let i=0;i<palavra.length;i++){
    palavraOculta.push("_");
}

document.getElementById("palavra").innerText = palavraOculta.join(" ");
document.getElementById("dica").style.display = "none"; // dica escondida no início

function mostrarDica() {
    document.getElementById("dica").innerText = dica;
    document.getElementById("dica").style.display = "inline";
}

const estagios = [
` ( ˶ˆᗜˆ˵ ) `,
` (˶º⤙º˶) `,
` ( ¬_¬ ) `,
` ˚‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·˚ `,
` (ﾉ｀□´)ﾉ⌒┻━┻ `,
` (╥﹏╥) `,
` ̿̿ ̿̿ ̿̿ ̿’̿’\\̵͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ `
];

function tentarLetra(){
    let input = document.getElementById("letra");
    let letra = input.value.toLowerCase();
    input.value="";

    if(!letra) return;
if (palavraOculta.includes(letra) || letrasErradas.includes(letra)) {
    return; // ignora letra repetida
    }
    if(palavra.includes(letra)){
        for(let i=0;i<palavra.length;i++){
            if(palavra[i]===letra){
                palavraOculta[i]=letra;
            }
        }
    } else {
        if(!letrasErradas.includes(letra)){
            letrasErradas.push(letra);
            erros++;
        }
    }
    

    document.getElementById("palavra").innerText = palavraOculta.join(" ");
    document.getElementById("letrasErradas").innerText = letrasErradas.join(", ");
    document.getElementById("boneco").innerText = estagios[erros];




    if(!palavraOculta.includes("_")){
        alert("🎉 Você venceu!");
        location.reload();
    }

    if (erros >= estagios.length - 1) {
    alert("💀 Você perdeu! Palavra: " + palavra);
    location.reload();
    }
}

function reiniciarJogo(){
    // sorteia nova palavra
    indice = Math.floor(Math.random() * palavras.length);
    palavra = palavras[indice];
    dica = dicas[indice];

    // reseta variáveis
    palavraOculta = [];
    letrasErradas = [];
    erros = 0;

    for(let i=0;i<palavra.length;i++){
        palavraOculta.push("_");
    }

    // atualiza tela
    document.getElementById("palavra").innerText = palavraOculta.join(" ");
    document.getElementById("letrasErradas").innerText = "";
    document.getElementById("boneco").innerText = estagios[0];

    // esconde dica novamente
    document.getElementById("dica").innerText = "";
    document.getElementById("dica").style.display = "none";
}function normalizar(texto){
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
document.getElementById("letra").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        tentarLetra();
    }
});
