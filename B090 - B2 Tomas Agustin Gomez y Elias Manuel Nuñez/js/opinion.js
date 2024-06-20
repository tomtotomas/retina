document.addEventListener("DOMContentLoaded", function() {

function opinion() {
    let value = "si";
    console.log(value);
    updateThanks(value);
}

function negativeOpinion() {
    let value = "no";
    console.log(value);
    updateThanks(value);
}

function updateThanks() {
    document.getElementById("thanks_top").innerHTML = "¡Gracias por su opinión!";
    document.getElementById("thanks_bot").innerHTML = "Será enviada a nuestras oficinas, donde tu opinión importa una banda, te lo juro.";
}

document.querySelector("#btn_yes").addEventListener("click", opinion);
document.querySelector("#btn_no").addEventListener("click", negativeOpinion);

});
