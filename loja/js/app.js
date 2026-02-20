const carrinhotela = document.getElementById('carrinhojs');
const carrinhoicone = document.getElementById('carrinho');
let botaoComprar = document.querySelectorAll('.btcarrinho');
    let h1= document.createElement('h1');
    h1.classList.add('escondido');
    h1.textContent = "Carrinho de Compras";
        carrinhotela.appendChild(h1);


carrinhoicone.addEventListener('click', () => {

    carrinhotela.classList.toggle('carrinhojs');
    h1.classList.toggle('escondido');
    const produtosCarrinho = document.querySelectorAll('.produtocarrinho');

        produtosCarrinho.forEach((prod) => {
            prod.classList.toggle('escondido');
        });
    
});

function render(item) {
    let divproduto = document.createElement('div');
    divproduto.classList.add('escondido', 'produtocarrinho');

    let span = document.createElement('span');
    span.textContent = item.nomeproduto;

    let p = document.createElement('p');
    p.textContent = "a vista ou no pix ";

    let img = document.createElement('img');
    img.src = item.img;

    let spanpreço = document.createElement('span');
    spanpreço.textContent = item.preço;
    
    
    divproduto.appendChild(img);
    divproduto.appendChild(span);
    divproduto.appendChild(p);
    divproduto.appendChild(spanpreço);

    carrinhotela.appendChild(divproduto);
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