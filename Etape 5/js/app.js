
let app = {
    // Gestionnaire d'événement
    // fonction exécutée à chaque soumission du formulaire d'attaque
    handleAttack : function(tupperware){
        // on bloque la soumission du formulaire
        tupperware.preventDefault();
        // je récupère l'élément input dans lequel est normalement saisi les corrdonnées de la case ciblée
        let inputTarget = document.getElementById('cellToHit');
        // je récupère la valeur saisie dans le champ text
        let targetValue = inputTarget.value;

        // Je vérifie si targetValue contient des coordonnées valides grace à la fonction isValid()
        if (game.isValid(targetValue) === true) {
            // La variable targetValue contient une chaine de caractère qui est composée par une lettre et un chiffre
            // ce qui correspond à la lettre de la colonne et au chiffre de la ligne
            // heureusement, j'ai une fonction qui comprend et traduit ça pour que je puisse vérifier où ça va dans mon tableau grid
            // cette fonction c'est sendMissile()
            game.sendMissile(targetValue);
            // sendMissile() appelle aussi senMissileAt() qui modifie le continu de notre variable grid

        }
        else {
            // envoi d'un message d'erreur
            window.alert('ceci n\'est pas une coordonnée valide');
        }
        inputTarget.value = '';
        inputTarget.focus();
    },


    // c'est le point d'entrée de notre application Bataille navale
    handleInitGame : function () {


        grid.displayGrid();
        grid.addCellNames();

        // Il n'y a qu'un seul formulaire dans notre index.html
        // On peut donc sélectionner directement la balise "form"
        let formAttack = document.querySelector('form');
        formAttack.addEventListener('submit', app.handleAttack);

        // On écoute l'event "click" sur le bouton des stats
        document.getElementById('stats').addEventListener('click', history.handleStatsClick);

        // On écoute l'event "click" sur le bouton des actions à afficher/cacher
        document.getElementById('toggle-actions').addEventListener('click', history.handleActionsToggle);
    }

};



// au moment où le DOM est complètement chargé...
document.addEventListener('DOMContentLoaded', app.handleInitGame);




// Qu'est-ce qu'une fonction Handler-------------------
// Une fonction handler est un regroupement d'instructions qui s'exécutent lors de la survenue d'un événement précis
// Cette fonction a pour spécificité d'accueillir en premier argument l'objet contenant toutes les caractéristiques de l'événement survenu
// On peut omettre de spécifier ce premier paramètre, mais on ne récupère dans ce cas aucun objet contenant les caractéristiques de l'événement survenu
// Une fonction handler ne retourne rien.
// par convention (et pour s'y retrouver dans cette forêt vierge de fonctions), on va préfixer le nom de la fonction handler par "handle-"
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions
//----------------------------------------------------------------


// Les dataset ou attributs de données :
// https://developer.mozilla.org/fr/docs/Apprendre/HTML/Comment/Utiliser_attributs_donnes
// Pour accéder en js à la valeur A1
//<div class="cell" id="cell00"  data-cell-name="A1" data-sea-name="Méditerranée" ></div>

// Je devrais faire :
//let value = document.getElementById('cell00').dataset.cellName;
// Je veux changer la valeur :
//document.getElementById('cell00').dataset.cellName = "A2";
//
document.getElementById('cell00').dataset.seaName = "La Manche";








