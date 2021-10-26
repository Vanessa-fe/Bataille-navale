
let app = {

    // un tableau qui contient tous les thèmes actuellement possibles
    theme: ['f0f', 'black-and-white', 'terminal'],

    // Identifiant de l'interval pour pouvoir l'annuler à la fin de la partie
    idInterval: null,

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
            if (game.sendMissile(targetValue) === true) {
                // sendMissile() appelle aussi senMissileAt() qui modifie le continu de notre variable grid
                if (game.isOver() === true) {
                    alert('Vous avez gagné ! Houra !' + '\n Vous avez : ' + game.score + ' points !');
                    clearInterval(app.idInterval);
                }
            }


        }
        else {
            // envoi d'un message d'erreur
            window.alert('ceci n\'est pas une coordonnée valide');
        }
        // vide le contenu du champ text
        inputTarget.value = '';
        // place le curseur de la souris dans le champ text pour saisir sa prochaine attaque
        inputTarget.focus();
        // affiche le score en console
        console.log(game.score);
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

        //On récupère l'élément select des thèmes
        document.getElementById('select_theme').addEventListener('change', app.handleChangeTheme);

        app.loadTheme();

        // Toutes les secondes, le score perd 1000 pts
        app.idInterval = setInterval(app.scoreTimer, 1000);
    },

    handleChangeTheme : function(event) {

        // On commence par fouiller dans l'objet Event passé en argument du handler
        console.log(event);

        const selectTheme = event.target;
        console.log(selectTheme);

        // On récupère le thème choisi
        // Qui est en fait le nom d'une des classes
        const theme = selectTheme.value;
        console.log(theme);
        // ou bien :
        // const theme = event.target.value;
        // ou bien :
        // let theme = document.getElementById('theme-select').value;

        app.changeTheme(theme);
    },

    loadTheme: function() {
        // Source https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Example_2_Get_a_sample_cookie_named_test2
        // On récupère une chaîne de caractères contenant le nom du cookie et sa valeur
        // ex : document.cookie renvoie "themeBN=terminal; PHPSESSID=hp0rkhnq9piquoc2j66pbj8rri"
        const themeCookieValue = document.cookie.split('; ');
        // themeCookieValue contient un tableau
        /* ex :
            0: "themeBN=terminal"
            1: "PHPSESSID=hp0rkhnq9piquoc2j66pbj8rri"
        */
        // On utilise find() pour trouver notre cookie qui stocke le thème choisi par le joueur et stocké sur son navigateur
        let theme = themeCookieValue.find(function(elt) {
            return elt.startsWith('themeBN=');
        });
        /*
        let theme = themeCookieValue.find(elt =>
            elt.startsWith('themeBN=')
        );
        */
        if (theme != undefined) {
            theme = theme.split('=')[1];
            app.changeTheme(theme);
        }

    },

    // fonction(méthode) qui permet d'appliquer le theme passé en argument sur la balise body
    changeTheme: function (themeName){

        // On récupère l'élément "body"
        const bodyElement = document.querySelector('body');
        // Si c'est O'clock, on n'ajoute rien
        // => la négation = si différent d'O'clock => on ajoute
        if (themeName !== 'oclock') {
            // on ajoute la classe
            bodyElement.className = themeName;
            // age maximum : 1 an
            document.cookie = 'themeBN=' + themeName + ';max-age=' + (365 * 86400);
            // themeBN=f0f;
        }
        else {
            // on supprime la classe et donc le body reprend son style par défaut
            bodyElement.className = '';
            // age maximum : 1 an
            document.cookie = 'themeBN=;max-age=' + (365 * 24 * 60 * 60);
            // themeBN=;
        }
    },

    scoreTimer: function () {
        game.score -= 1000;
        console.log(game.score);
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








