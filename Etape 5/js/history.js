// la variable history regroupe toutes les fonctions qui permettent de gérer l'affichage de l'historique et des statistiques

let history = {
    // Gestionnaire d'événement
    // fonction exécutée quand on clique sur le bouton #stats
    handleStatsClick : function(evt) {
        // On n'affiche les stats que s'il y a eu au moins 1 tir !
        if (game.nbRound > 1) {
            // On récupère le nombre de cases touchées
            //console.log(document.querySelectorAll('.cell.hit'));
            const hits = document.querySelectorAll('.cell.hit').length;
            // querySelectorAll permet de récupérer TOUS les éléments qui correspondent au patron de recherche
            // Dans ce cas, nous recherchons dans le DOM, tous les éléments qui ont à la fois la classe cell et la classe hit appliquée
            // Cela nous retourne une LISTE d'élément HTML
            // comprendre : un tableau
            // on peut donc utiliser length pour obtenir le nombre d'éléments que contient cette liste
            // On récupère le nombre de cases "plouf""
            //console.log(document.querySelectorAll('.cell.splash'));
            const splashes = document.querySelectorAll('.cell.splash').length;

            // On calcule les pourcentages
            const hitPercent = hits / (hits + splashes);
            const splashPercent = splashes / (hits + splashes);

            // On prépare le texte à afficher
            const hitLine = 'Pourcentage de tir réussis : ' + hitPercent.toFixed(2) * 100 + '%'; // .toFixed(2) permet d'arrondir à 2 chiffres après la ,
            const splashLine = 'Pourcentage de tir dans l\'eau : ' + splashPercent.toFixed(2) * 100 + '%'; // .toFixed(2) permet d'arrondir à 2 chiffres après la ,

            // On affiche dans une alerte
            alert(hitLine + '\n' + splashLine);

        }
        else {
            alert('Il faut d\'abord tirer ;)');
        }
    },

    // ajoute à chaque tir de missile, une ligne de html dans la div qui contient l'historique de la partie
    addToActionsHistory : function(row, column, success) {

        const target = document.getElementById('cell'+row+column).dataset.cellName;
        //si c'est la div #cell00 alors, je vais stocker dans target A1

        // On récupère la div actions
        const actionsHistoryElement = document.getElementById('actions');

        // On génère la phrase
        let textToAdd = 'Tour#' + game.nbRound; // Le numéro du tour
        textToAdd += ' tir en <strong>' + target + '</strong> : '; // la case dans laquelle on a tiré
        // Si c'est le tir est réussi
        if (success === true) {
            textToAdd += 'réussi';
            // textToAdd  = textToAdd + 'réussi';
        } else { // sinon
            textToAdd += 'manqué';
        }

        //https://developer.mozilla.org/fr/docs/Web/API/Node/textContent
        // Enfin, on ajoute ce texte dans la div actions (mais au début !)
        actionsHistoryElement.innerHTML = textToAdd + '<br>' + actionsHistoryElement.innerHTML;
    },

    // Gestionnaire d'événement (handler)
    // fonction exécutée lorsqu'on clique sur le bouton afficher/cacher l'historique
    handleActionsToggle : function(evt) {
        // On récupère la div actions
        const actionsHistoryElement = document.getElementById('actions');

        // Si la div est cachée (none ou vide au départ, car uniquement en CSS)
        if (actionsHistoryElement.style.display === 'none' || actionsHistoryElement.style.display === '') {
            // alors, on affiche la div de l'historique
            actionsHistoryElement.style.display = 'block';
        } else {
            // sinon on cache la div de l'historique
            actionsHistoryElement.style.display = 'none';
        }
    }
};