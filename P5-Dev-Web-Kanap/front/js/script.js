fetch("http://localhost:3000/api/products")
  //On fait un appel feetch à l'API pour récupérer les produits, qui nous renvoi une promesse.

  .then(function (reponse) {
    return reponse.json();
    //On formate la réponse en json pour pouvoir l'exploiter.
  })
  .then(function (products) {
    //On récupère le résultat de la promesse précédente (products).
    console.log(products);
    //On crée une boucle for pour parcourir les données du tableau et les insérer dans le HTML dynamiquement avec innerHTML.

    for (let product of products) {
      //À chaque tour de boucle on vient completer le HTML avec les informations avec l'index correspondant.
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${product._id}"> 
    <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
    </article>
    </a>`;
    }
  })

  .catch(function (err) {
    //Si la promesse n'est pas résolue on affiche ici un message d'erreur.
    alert("Impossible d'afficher les produits");
    console.log(err);
  });
