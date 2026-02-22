const carrinhotela = document.getElementById("carrinhojs");
const carrinhoicone = document.getElementById("carrinho");

let carrinho = [];

function adicionarproduto(id) {
  let produtocatalogo = { ...produtos.find((p) => p.id === id) };

  let produtoatual = { ...produtocatalogo, quantidade: 1 };
  let existe = carrinho.find((p) => p.id === id);
  if (existe) {
    aumentarquantidade(existe);
    return;
  }
  
  carrinho.push(produtoatual);
  console.log(carrinho);
  atualizar();
}
function removerproduto(id) {
    
    carrinho = carrinho.filter(p => p.id !== id)
    
    
    atualizar()


}
function aumentarquantidade(prod) {
  prod.quantidade++;
  console.log(carrinho);
  atualizar();
}
function diminuirquantidade(p) {
p.quantidade = p.quantidade -1;
if(p.quantidade == 0){
    removerproduto(p.id)
    return
}
atualizar()
}
function renderizarcarrinho() {
  carrinhotela.innerHTML = "";
  let totalgeral = 0;

  carrinho.forEach((p) => {
    let div = document.createElement("div");
    let divpai = document.createElement("div")
    let qnt = document.createElement ("button")
    qnt.classList.add("btremover")
    qnt.textContent = '-'
    div.classList.add("produtocarrinho")
    div.innerHTML = `
        <img src="${p.img}" alt="" srcset="">
        <p> ${p.nomeproduto}</p>
        <p> ${p.quantidade}</p>
        <p> ${p.preço}</p>
        <p> Total :R$ ${(p.preço * p.quantidade).toFixed(2) }</p>`;
        totalgeral = totalgeral + (p.preço * p.quantidade)
        div.appendChild(qnt)
            divpai.appendChild(div)
         carrinhotela.appendChild(divpai);
         qnt.addEventListener("click", () => {
        diminuirquantidade(p)

         })
  });
  let totaltela = document.createElement('span')
  totaltela.textContent = 'Total :'+totalgeral.toFixed(2)
  carrinhotela.appendChild( totaltela)
}
function atualizar() {
   if (carrinho.length === 0) {
    carrinhotela.innerHTML = "";
    let aviso = document.createElement("div");
    aviso.textContent = "sem items no momento";
    carrinhotela.appendChild(aviso);
    return
  }

  renderizarcarrinho();
}
let botaoComprar = document.querySelectorAll(".btcarrinho");
for (let botao of botaoComprar) {
  botao.addEventListener("click", () => {
    adicionarproduto(Number(botao.id));
  });
}
carrinhoicone.addEventListener("click", () => {
  carrinhotela.classList.toggle("carrinhojs");
  carrinhotela.classList.toggle("ativo")
  atualizar()

  
 

  // h1.classList.toggle("escondido");

});
