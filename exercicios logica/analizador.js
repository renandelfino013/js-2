let n = []

class Analizador {
  constructor(  quantidade, maior, menor, media , pares , somapares) {
    this.quantidade = quantidade;
    this.maior = maior;
    this.menor = menor;
    this.media = media;
    this.pares = pares;
    this.somapares = somapares;
  }}

 function analizar( n =[1,12,3034,4,5,6,7,8]) {
    
let pares = []
 const quantidade = n.length
 const maior = Math.max(...n)
 const menor  = Math.min(...n)
 let somapares =0;
 let somatotal = 0;
 let media = 0; 
 if (n.length == 0 || n.length== 1 ){
    return null

 }
 
 for (const numero of n ){
        somatotal =somatotal + numero
    
    if(numero % 2 == 0){
        pares.push(numero)
        somapares = somapares + numero
    } 
    

 
 media = somatotal / quantidade 
 

 

}
return  new Analizador(quantidade, maior ,menor , media , pares , somapares)

}

const resultado =  analizar()
console.log(resultado) 
