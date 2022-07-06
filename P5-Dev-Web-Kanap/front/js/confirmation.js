//PAGE CONFIRMATION = afficher l'id de la commande.
//Récupération de l'url de la page commande.
const params = window.location.href;
const orderUrl = new URL(params);
//Récupération orderId dans l'url
const orderId = orderUrl.searchParams.get("id");

document.querySelector("#orderId").innerHTML = orderId;
console.log(orderId)
localStorage.clear();
