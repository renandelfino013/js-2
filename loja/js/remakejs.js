const carrinhotela = document.getElementById("carrinhojs");
const carrinhoicone = document.getElementById("carrinho");
const catalogo = document.getElementById("catalogo");

let carrinho = [];

async function iniciarr() {
  await chamarapi();
  atualizar()
  for (let p of produtos) {
    let divcontainer = document.createElement("div");
    divcontainer.classList.add("produto");
    let divimg = document.createElement("img");
    divimg.classList.add("img");
    divimg.src = p.image;
    let spantitle = document.createElement("span");
    spantitle.textContent = p.title;
    let spanvalor = document.createElement("span");
    spanvalor.classList.add("valor");
    spanvalor.textContent = Number(p.price);
    let pbaboseira = document.createElement("p");
    pbaboseira.textContent = "a vista no pix";
    let pParcelamento = document.createElement("p");
    pParcelamento.textContent = "ou 2X de " + (p.price / 2).toFixed(2);
    let paibt = document.createElement("div");
    paibt.classList.add("paibt");
    let bt = document.createElement("button");
    bt.addEventListener('click', () => {
      adicionarproduto(p.id)
    })
    bt.classList.add("btcarrinho");
    bt.textContent = "comprar";
    divcontainer.appendChild(divimg);
    divcontainer.appendChild(spantitle);
    divcontainer.appendChild(spanvalor);
    divcontainer.appendChild(pbaboseira);
    divcontainer.appendChild(pParcelamento);
    divcontainer.appendChild(paibt);
    paibt.appendChild(bt);

    catalogo.appendChild(divcontainer);
  }
}
iniciarr();
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
  carrinho = carrinho.filter((p) => p.id !== id);

  atualizar();
}
function aumentarquantidade(prod) {
  prod.quantidade++;
  console.log(carrinho);
  atualizar();
}
function diminuirquantidade(p) {
  p.quantidade = p.quantidade - 1;
  if (p.quantidade == 0) {
    removerproduto(p.id);
    return;
  }
  atualizar();
}
function renderizarcarrinho() {
  carrinhotela.innerHTML = "";
  let totalgeral = 0;

  carrinho.forEach((p) => {
    let div = document.createElement("div");
    let divpai = document.createElement("div");
    let qnt = document.createElement("button");
    qnt.classList.add("btremover");
    qnt.textContent = "-";
    div.classList.add("produtocarrinho");
    div.innerHTML = `
        <img src="${p.image}" alt="" srcset="">
        <p> ${p.title}</p>
        <p> ${p.quantidade}</p>
        <p> ${p.price}</p>
        <p> Total :R$ ${(p.price * p.quantidade).toFixed(2)}</p>`;
    totalgeral = totalgeral + p.price * p.quantidade;
    div.appendChild(qnt);
    divpai.appendChild(div);
    carrinhotela.appendChild(divpai);
    qnt.addEventListener("click", () => {
      diminuirquantidade(p);
    });
  });
  let totaltela = document.createElement("span");
  totaltela.textContent = "Total :" + totalgeral.toFixed(2);
  carrinhotela.appendChild(totaltela);
}
function atualizar() {
  localStorage.setItem( "produtos",JSON.stringify(carrinho))

  carrinho = JSON.parse(localStorage.getItem('produtos'))

  if (carrinho.length === 0) {
    carrinhotela.innerHTML = "";
    let aviso = document.createElement("div");
    aviso.textContent = "sem items no momento";
    carrinhotela.appendChild(aviso);
    return;

  }


  renderizarcarrinho();
}
let botaoComprar = document.querySelectorAll(".btcarrinho");

carrinhoicone.addEventListener("click", () => {
  carrinhotela.classList.toggle("carrinhojs");
  carrinhotela.classList.toggle("ativo");
  atualizar();

  // h1.classList.toggle("escondido");
});
