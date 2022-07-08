
var params = new URL(document.location).searchParams
//Ici on crée une variable dans laquelle est stocker notre URL selon le produit à afficher.

var id = params.get("id");
//On récupère seulement l'id de l'url que l'on stock dans une variable.

let product = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

console.log(id)
//Ici on affiche l'id du produit dans la console.

fetch(`http://localhost:3000/api/products/${id}`)
//On appelle l'API pour récupérer les infos du produit grace à son ID.

.then(function (reponse) {
  return reponse.json()
  //Formatage de la réponse en JSON.
})
.then(function (product) {
  //On stock les infos exploitables dans la variable "product".
  
  console.log(product)
  {//Insertion des éléments dans le HTML grace à la méthode getElementById et innerHTML et la              concatenation (Joindre 2 chaines et les lier).
    document.getElementById('title').innerHTML += `<h1 id="title">${product.name}</h1>`;
    //Nom du produit.
    document.getElementById('price').innerHTML += `<span id="price">${product.price}</span>`;
    //Prix du produit.
    document.getElementById('description').innerHTML += `<p id="description">${product.description}</p>`;
    //Description du produit.
    document.getElementById('colors').innerHTML +=
    `<option value="${product.colors[0]}">${product.colors[0]}</option> 
    <option value="${product.colors[1]}">${product.colors[1]}</option>
    <option value="${product.colors[2]}">${product.colors[2]}</option>`;
    //Option de couleurs avec l'index correspondant.
    
    
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    //Insertion de l'image du produit et de sa description grâce à la méthode querySelector(Selecteur CSS).
  }
  
  addToCart(product);
})
.catch(function (error) {
  //Si la promesse n'est pas résolut, on affiche une alerte.
  alert('Desolé nous ne sommes pas en mesure de vous presenter nos produit, reessayer ulterieurement.');
});

function addToCart(product){
  //Création de la fonction ajouter au panier.
  
  const btn_envoyerPanier = document.querySelector("#addToCart");
  //Stockage du bouton dans une constante pour pouvoir l'ecouter.
  
  
  btn_envoyerPanier.addEventListener("click", function (event) {
    //Écoute du clic avec 2 conditions: la couleur doit être choisie et la quantitée doit être comprise entre 1 et 100.
    
    if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {
      
      let choixCouleur = colorPicked.value;
      // Stockage du choix de la couleur dans une variable.
      let choixQuantite = quantityPicked.value;
      //Stockage de la quantitée choisiee dans une variable.
      let optionsProduit = {
        idProduit: id,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: product.name,
        prixProduit: product.price,
        descriptionProduit: product.description,
        imgProduit: product.imageUrl,
        altImgProduit: product.altTxt
      };
      
      var produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
      //Variable qui va nous servir à récuperer les données du localstorage.
      
      const confirmationPannier = function () {
        //Création d'une fonction qui va demander au l'utilisateur de confirmer son choix et le rediriger vers la page panier.
        
        if (window.confirm(`Votre commande de ${choixQuantite} ${product.name} ${choixCouleur} est ajoutée au panier`)) {
          window.location.href = "cart.html";
        }
      };
      
      if (produitLocalStorage) {
        //Importation de la commande dans le LocalStorage.
        
        const resultFind = produitLocalStorage.find(
          //Si le panier comporte déjà au moins 1 article
          
          (el) => el.idProduit === id && el.couleurProduit === choixCouleur);
          //Si l'id de élement et que la couleur selectionné est la même que la sélection actuelle, alors le produit est déjà dans le panier.
          
          if (resultFind) {
            //Si le produit commandé est déjà dans le panier.
            
            let newQuantite = parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            //On affecte alors une nouvelle quantité grace à la concatenation entre la quantitée déjà présente et la quantitée de la selection actuelle.
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            //Met à jour le local storage avec nos nouvelles données.
            
            console.table(produitLocalStorage);
            confirmationPannier();
            //Si le produit commandé n'est pas dans le panier.
            
          } else {
            // On ajoute notre commande dans le local storage a la fin du tableau avec la methode .push.
            
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            confirmationPannier();
          }
          
        } else {
          //Si le panier est vide.
          produitLocalStorage = [];
          //Alors le localStorage contient un tableau vide.
          produitLocalStorage.push(optionsProduit);
          //On y ajoute option produit dans le tableau produitLocalStorage.
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          //On met a jour le local storage avec notre produit.
          console.table(produitLocalStorage);
          //On l'affiche ici sous forme de tableau dans la console.
          confirmationPannier();
        }
      }
    });
  }
  
  console.log(localStorage);