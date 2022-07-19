//PAGE CONFIRMATION = Afficher l'id de la commande.
const params = window.location.href;

const orderUrl = new URL(params);
//Récupération de l'url de la page commande.

const orderId = orderUrl.searchParams.get("id");
//Récupération orderId dans l'url.

document.querySelector("#orderId").innerHTML = orderId;
console.log(orderId);
localStorage.clear();
