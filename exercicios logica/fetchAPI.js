const URL = "https://fakestoreapi.com/products?sort=desc"
async function chamarapi(){
    const resp = await fetch(URL)
    console.log(resp)
    if(resp.status ==200){
    const obj = await resp.json()
        console.log(obj)
        obj.map(produto => console.log("        "+produto.title  ))
        obj.map(produtos => console.log(produtos.description))
    }   

    
    
}
chamarapi()