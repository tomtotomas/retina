"use srict";

//Generador de captcha

let captcha, chars;

function genNewCaptcha() {
  chars = "1234567890ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstvwxyz";
  captcha = chars[Math.floor(Math.random() * chars.length)];

  for (var i = 0; i < 8; i++) {
    captcha = captcha + chars[Math.floor(Math.random() * chars.length)];
  }

  form.text.value = captcha;
}

document.querySelector("#refreshbtn").addEventListener("click", genNewCaptcha);


//Verificador del captcha

function checkCaptcha() {
  let check = document.getElementById("CaptchaEnter").value;
  let parrafoTwo = document.getElementById("warnings_two");
  let warningsTwo = " ";
  let enviar = false;
  parrafoTwo.innerHTML = " ";

  if (captcha == check) {
    warningsTwo += `Verificado maquina, sos un humano`;
    enviar = true;     
    document.getElementById("CaptchaEnter").value;

  } else {
    warningsTwo += `¡ALTO AHI! Los robot no cocinan`;
    enviar = true;     
    document.getElementById("CaptchaEnter").value;
  }
  if (enviar) {
    parrafoTwo.innerHTML = warningsTwo;
  }
    genNewCaptcha();
}

document.querySelector("#checkbtn").addEventListener("click", checkCaptcha);

//formulario

let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let comentario = document.getElementById("comentario");
let form = document.getElementById("form");
let parrafo = document.getElementById("warnings");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  let enviar = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  parrafo.innerHTML = "";

  if (nombre.value.length < 4) {
    warnings += `El nombre no es valido <br> `;
    enviar = true;
  }
  if (!regexEmail.test(email.value)) {
    warnings += `El email no es valido `;
    enviar = true;
  }

  if (enviar) {
    parrafo.innerHTML = warnings;

  } else {
    parrafo.innerHTML = "Enviado";
  }
});
