const carrinhotela = document.getElementById('carrinhojs');
const carrinhoicone = document.getElementById('carrinho');
 let botaoComprar = document.querySelectorAll('.btcarrinho');
carrinhoicone.addEventListener
('click', () => {
    carrinhotela.classList.toggle('carrinhojs');});
    
   
   
function render(item) {
   let divproduto = document.createElement('div');
   divproduto.classList.add('produtocarrinho');
   let span = document.createElement('span');
     span.textContent = item.nomeproduto;
     let p = document.createElement('p');
     let img = document.createElement('img');
     img.src = item.img;
                    p.textContent = "a vista ou no pix ";
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
            for (item of produtos) {
                if (item.id == botao.id) {
                   
                    
                  
                    
                     render(item);

                   
                }
            }
        });

   
  }