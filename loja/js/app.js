const carrinhotela = document.getElementById("carrinhojs");
const carrinhoicone = document.getElementById("carrinho");
let botaoComprar = document.querySelectorAll(".btcarrinho");
let carrinho = [];
let h1 = document.createElement("h1");
h1.classList.add("escondido");
h1.textContent = "Carrinho de Compras";
carrinhotela.appendChild(h1);
  let totalgeral = document.createElement("span");
  totalgeral.id = "totalgeral";
  totalgeral.classList.add("escondido");
    carrinhotela.appendChild(totalgeral);

 
  function calcularTotal() {
    let total = 0;
    for (let item of carrinho) {
      total += item.preço * item.quantidade;

    }
    totalgeral.textContent = `Valor total da compra: R$ ${total.toFixed(2)}`;


  }
carrinhoicone.addEventListener("click", () => {
  carrinhotela.classList.toggle("carrinhojs");
  h1.classList.toggle("escondido");
     totalgeral.classList.toggle("escondido");



  

  const produtosCarrinho = document.querySelectorAll(".produtocarrinho");
  let valortotal = document.querySelectorAll(".valortotal");
    valortotal.forEach((valor) => {
    valor.classList.toggle("escondido");
    });;

  produtosCarrinho.forEach((prod) => {
    prod.classList.toggle("escondido");
  });

});

function render(item) {
  let divproduto = document.createElement("div");
  let spanquantidade = document.createElement("span");
  spanquantidade.textContent = item.quantidade;
  spanquantidade.id = `quantidade${item.id}`;

  let spancertoqnt = document.querySelector(`#quantidade${item.id}`);
  let produtoexistente = carrinho.find((prod) => prod.id === item.id);
  let valortotalct = document.querySelector(`#valortotal${item.id}`);
  if (produtoexistente) {
    produtoexistente.quantidade += 1;
    spancertoqnt.textContent = produtoexistente.quantidade;
   
    calcularTotal();

    return;
  }

  divproduto.classList.add("escondido", "produtocarrinho");

  let span = document.createElement("span");
  span.textContent = item.nomeproduto;

  let p = document.createElement("p");
  p.textContent = "a vista ou no pix ";

  let img = document.createElement("img");
  img.src = item.img;

  let spanpreço = document.createElement("span");
  spanpreço.textContent = item.preço;
  let valortotal = document.createElement("span");
  valortotal.id = `valortotal${item.id}`;
    valortotal.textContent = `Valor total: R$ ${item.preço * item.quantidade}`;
    valortotal.classList.add("escondido", "valortotal");
  divproduto.appendChild(img);
  divproduto.appendChild(span);
  divproduto.appendChild(p);
  divproduto.appendChild(spanpreço);
  divproduto.appendChild(spanquantidade);

  carrinhotela.appendChild(divproduto);
  
  carrinho.push(item);
  calcularTotal();
}



for (let botao of botaoComprar) {
  botao.addEventListener("click", () => {
    for (let item of produtos) {
      if (item.id == botao.id) {
        render(item);
      }
    }
  });
}
