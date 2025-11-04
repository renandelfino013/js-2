const prompt = require("prompt-sync")();
let opçao;
let opçao2;
let nome = "";

let anos = 0;
let conta = [];
let l;

let contalogada = null;

class contas {
  static proximoid = 1;

  constructor(titular = "", idade, senha = "") {
    this.extrato = [];
    this.id = contas.proximoid++;
    this.titular = titular;
    this.idade = idade;
    this.saldo = 0;
    this.senha = senha;
  }

  trasferir() {
    console.clear();
    let chave = Number(prompt("qual o id da conta q vc deseja transferir? "));
    console.log(`transferencia para a conta de id ${chave}`);
    console.log(`saldo atual: ${this.saldo}`);
    let valor = Number(prompt("qual o valor da transferencia? "));
    let senha = prompt("qual a senha da sua conta? ");
    if (senha === this.senha) {
      let achado = conta.find((c) => c.id === chave);
      if (!achado) {
        console.log("conta n encontrada!");
      } else if (this.saldo >= valor) {
        this.saldo -= valor;
        achado.saldo += valor;
        this.extrato.push({
          tipo: "Transferencia",
          de: this.titular,
          para: achado.titular,
          valor: valor,
          data: new Date().toLocaleString(),
        });
        achado.extrato.push({
          tipo: "Transferencia",
          valor: valor,
          de: this.titular,
          para: achado.titular,
          data: new Date().toLocaleString(),
        });
        console.log(
          `transferencia realizada com sucesso! seu novo saldo é ${this.saldo}`
        );
      } else {
        console.log("saldo insuficiente!");
      }
    } else {
      console.log("senha incorreta!!");
    }
  }
  deposite() {
    let valor = Number(prompt("quanto vc quer depositar? "));

    console.clear();
    this.saldo += valor;
    this.extrato.push({
      tipo: "Deposito",
      valor: valor,
      data: new Date().toLocaleString(),
    });
    console.log(`ola! ${this.titular}`);
    console.log(
      `deposito realizado com sucesso! seu novo saldo é ${this.saldo}`
    );
  }
  sacar() {
    let valor = Number(prompt("quanto vc quer sacar? "));
    let confirsenha = prompt("qual a senha da conta? ");
    if (confirsenha !== this.senha) {
      console.log("senha incorreta!");
      return;
    }

    if (this.saldo >= valor) {
      this.saldo -= valor;
      this.extrato.push({
        tipo: "saque",
        valor: valor,
        data: new Date().toLocaleString(),
      });

      console.log(
        `saque realizado com sucesso!, seu novo saldo é ${this.saldo}`
      );
    } else {
      console.log("saldo insuficiente!");
    }
  }
  extratoo() {
    console.log(`extrato da conta de ${this.titular}`);
    console.log(`saldo atual: ${this.saldo}`);
    for (let movi of this.extrato) {
      if (movi.tipo == "Transferencia") {
        console.log(
          `${movi.data} | ${movi.tipo} de ${movi.valor} de ${movi.de} para ${movi.para}`
        );
      } else {
        console.log(`${movi.data} | ${movi.tipo} de ${movi.valor}`);
      }
    }
  }
}

function buscarid(idd, nome, senha) {
  let achado = conta.find(
    (c) => c.id === idd && c.titular === nome && c.senha === senha
  );
  if (!achado) {
    console.log("senha ou nome de usuatio incorretos!!");
    return false;
  } else {
    console.log(achado);
    contalogada = achado;
    return true;
  }
}

function criarconta() {
  nome = prompt(`qual seu nome? `);
  anos = Number(prompt(`quantos anos vc tem? `));
  senha = prompt(`crie uma senha para sua conta: `);
  c = conta.push(new contas(nome, anos, senha));
  l = conta.length - 1;

  contalogada = conta[l];
  console.log(`conta criada com sucesso!`);
  console.log(
    `bem vindo ${conta[l].titular} vc tem ${conta[l].idade} anos seu id é ${conta[l].id}`
  );
  return true;
}
function menuconta() {
  while (opçao2 != 0) {
    console.log("1-depositar");
    console.log("2-sacar");
    console.log("3-trasferir");
    console.log("4-extrato");
    console.log("0-sair");
    opçao2 = Number(prompt("escolha uma opçao: "));

    if (opçao2 == 0) {
      contalogada = null;
      console.log("volte sempre!");

      menuprincipal();
      break;
    } else if (opçao2 == 1) {
      contalogada.deposite();
    } else if (opçao2 == 2) {
      console.clear();
      contalogada.sacar();
    } else if (opçao2 == 3) {
      contalogada.trasferir();
    } else if (opçao2 == 4) {
      console.clear();
      contalogada.extratoo();
    }
  }
}

function menuprincipal() {
  opçao2 = -1;
  while (opçao != 0) {
    if (opçao == 0) {
      console.log("volte sempre!");
      console.log(conta);

      break;
      return false;
    }

    console.log(`bem vindo ao NU-no-banko`);
    console.log("---------------------------");
    console.log("1-criar conta");
    console.log("2-acessar conta");
    console.log("0-sair");
    opçao = Number(prompt("escolha uma opçao: "));
    if (opçao == 1) {
      if (criarconta()) {
        console.clear();
        console.log(`bem vindo ${contalogada.titular}`);
        menuconta();
      }
    } else if (opçao == 2) {
      let idbusca = Number(prompt("qual o id da sua conta? "));
      let nomebusca = prompt("qual o nome do titular da conta? ");
      let senhabusca = prompt("qual a senha da conta? ");
      if (buscarid(idbusca, nomebusca, senhabusca)) {
        console.clear();
        console.log(`bem vindo de volta ${contalogada.titular}`);
        menuconta();
      }
    }
  }
}

if (menuprincipal()) {
} else {
  console.log(conta);
}
