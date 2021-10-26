// #1 Créer le tableau ============================================

// créer une variable grid à 2 dimensions représentant un plateau de 8 lignes et 8 colonnes

// Pour déclarer une variable en JS, on a 3 mot-clés :
// let
// var
// const : la valeur stockée dans une variable déclarée avec "const" sera vérrouillée, on ne pourra plus modifier la valeur stockée dans cette variable

// Pas besoin de mettre un $ en début de nom de variable, comme en PHP


// #2 Envoyer un missile =====================================
// Créer/définir une fonction
// En JS, tout comme en PHP, pour créer une fonction, on utilise le mot-clé function

/**
 * renvoie un message compréhensible par l'humain
 * @param {Number} r : index de la ligne
 * @param {Number} c : index de la colonne
 * @param {boolean} hit : est-ce que un bateau est touché
 */
function message(r, c, hit = false)
{
    // Je teste si hit contient la valeur FALSE
    if (!hit) {
        // ou
        // if (hit === false) {
        return "Plouf en (" +  r + ',' + c + ')';
        // ça retourne par ex : "Plouf en (2,5)"
    }
    else {
        return "Touché en (" +  r + ',' + c + ')';
    }
}

// On prévoit deux paramètres à cette fonction
// rowIndex : le numéro de ligne
// columnIndex : le numéro de colonne
function sendMissileAt(rowIndex, columIndex)
{
    // Lancement d'un missile
    // tant pis, si la case avait déjà été ciblée auparavant
    nbRound ++ ;
    let displayNbRound = document.querySelector('h3');
    displayNbRound.innerText = 'Tour ' + nbRound;

    // On souhaite savoir si oui ou non, on a touché un bateau
    // est-ce que la case visée contient un 'b'
    // ex : si on exécute sendMissileAt(1, 6)
    // targetCell contiendra : ''
    // ex : si on exécute sendMissileAt(0, 2)
    // targetCell contiendra : 'b'
    const targetCell = grid[rowIndex][columIndex];

    // si la variable targetCell contient "b"
    if (targetCell === 'b' ) {

        addToActionsHistory(rowIndex, columIndex, true);
        //console.log(message(rowIndex, columIndex, true));
        // le bout de bateau est touché, donc on change le "b" en "t"
        grid[rowIndex][columIndex] = "t";
        // Pour voir la modification, on redemande à la fonction displatGrid() d'afficher ce qu'il y a dans notre grid
        displayGrid();
        return true; // si la case visée contient un 'b', on renvoie true pour signifier qu'un bout de bateau a été touché

    }
    else if (targetCell === 't' || targetCell === 'p'){
        addToActionsHistory(rowIndex, columIndex, false);
        const messageDoublon = [
            'Un missile a déjà été envoyé sur cette case, Général',
            'Un missile a déjà été envoyé sur cette case, Commandant',
            'Déjà attaqué !',
            'Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane',
            'Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !'
        ];
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
        // utilisation de la fonction getRandomInt()
        window.alert(messageDoublon[getRandomInt(4)]);
    }
    // sinon
    else {
        addToActionsHistory(rowIndex, columIndex, false);
        //console.log(message(rowIndex, columIndex));
        // Le missile tombe à l'eau, on change la valeur de la case en "p"
        grid[rowIndex][columIndex] = "p";
        // Pour voir la modification, on redemande à la fonction displatGrid() d'afficher ce qu'il y a dans notre grid
        displayGrid();
        return false;

    }
    // On aurait pu écrire seulement cette ligne :
    // return targetCell === 'b';
    // ou :
    // return grid[rowIndex][columIndex] === 'b';
}

// fonction récupérée sur MDN pour générer un nombre aléatoire entre 0 et max
function getRandomInt(max) {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor
    return Math.floor(Math.random() * Math.floor(max));
}


// Créer une fonction sendMissile(cellName) qui retourne vrai ou faux si on a touché un vaisseau ou pas
// mais à partir du nom de la cellule/case
function sendMissile(cellName) {
    // On commence par décoder le nom de la cellule/case en index de ligne/colonne
    // Par exemple, pour un String "touché !"
    //                      index   01234567
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/substring
    // Si cellName contient "B5", alors :
    const letter = cellName.substring(0, 1); // "B"
    let rowIndex = cellName.substring(1, 2); // "5"



    //debugger;
    // Console.log pour debuger
    console.log(letter);
    console.log(rowIndex);
    // On a bien réussi à décomposer la lettre (ligne) et la colonne

    // Attention, le tableau commence à l'index 0 pour '1', donc on doit soustraire 1
    // Mais quel est le type de rowIndex ? => string
    // On commence par convertir en int
    rowIndex = parseInt(rowIndex);
    // Puis on soustrait 1
    rowIndex = rowIndex - 1;
    // rowIndex -= 1;
    // rowIndex--;

    // On peut se baser sur le tableau gridHeaders pour récupérer l'index de la lettre demandée
    // Pour cela :
    // 1 - on initialise la variable contenant l'index de la colonne
    let columnIndex;
    // 2 - on parcourt le tableau
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...in
    for (let currentIndex in gridHeaders) {
        // On récupère la lettre courante du tableau
        const currentLetter = gridHeaders[currentIndex];
        // 3 - si la lettre est la lettre courante du tableau
        if (currentLetter === letter) {
            // on récupère l'index
            columnIndex = currentIndex;
            // en bonus, parler/utiliser break;
        }
    }

    // Puis on appelle la fonction sendMissileAt
    // on prend soin de retourner la valeur de retour de sendMissileAt
    // (VRAI si touché, FALSE sinon)
    return sendMissileAt(rowIndex, columnIndex);
}


// #4 Afficher le plateau ========================
// écrit directement dans la grille HTML la lettre b ou p ou t ou ~

function displayGrid()
{

    // Boucle comme en PHP => for car on sait qu'on va de 0 à 8
    for (let r = 0 ; r < 8 ; r++) {

        console.log(grid[r]);
        // lors de la première boucle : cell0x
        // lors de la deuxième boucle : cell1x

        // 2- on parcourt ce sous-tableau grid[r] => boucle !
        for (let c = 0; c < 8; c++) {
            let caract = '~';
            if (grid[r][c] !== '' && grid[r][c] !== 'b') {
                // if (grid[r][c] === 'p' || grid[r][c] === 't') {
                caract = grid[r][c];
            }
            let currentCell = document.getElementById('cell' + r + c);
            //console.log('grid[' + r + '][' + c + '] contient la chaine de caractère : ' +  caract );
            //console.log(currentCell);
            currentCell.innerText = caract;
            if (caract === 't') {
                currentCell.classList.add('hit'); // cas où carac contient 't'
            }
            else if (caract === 'p') {
                currentCell.classList.add('splash'); // cas où carac contient 'p'
            }

        }

        // Pour mieux comprendre l'exécution du code par l'interpréteur JS
        //debugger;
    }

}

// Ajout de données supplémentaires sur les différentes cases de la grille de la BN
const addCellNames = function () {
    // On récupère toutes les lignes d'abord
    const rowElements = document.querySelectorAll('.row');
    // rowElements contient une NodeList de <section class="row"></section>
    //console.log(rowElements);

    // On parcourt toutes les lignes
    for (let rowIndex = 0; rowIndex < rowElements.length; rowIndex++) {
        //console.log('index de ligne : ' + rowIndex);
        const rowElement = rowElements[rowIndex];
        // On récupère toutes les cellules de la ligne
        // mais attention, pas les balises <header> !
        // seulement les balises div, qui ont comme classe "cell"
        const cellElements = rowElement.querySelectorAll('div.cell');
        // nous récupérons encore une NODELIST
        // nous allons à nouveau boucler sur cette liste de cases
        // On parcourt tous les éléments trouvés
        for (let columnIndex = 0; columnIndex < cellElements.length; columnIndex++) {

            // La lettre de la colonne est stockée dans gridHeaders
            const letter = gridHeaders[columnIndex];
            //console.log(columnIndex + ' : ' + letter);

            // On récupère la cellule courante
            let cellElement = cellElements[columnIndex];

            // On peut désormais ajouter le dataset sur la cellule
            // JS transforme le camelCase en kebab-case
            // => cellName -> data-cell-name
            cellElement.dataset.cellName = letter + rowIndex;
            cellElement.title = letter + rowIndex;

        }
    }
};

// teste si la partie est terminée
function isOver() {
    // Si il n'y a plus de 'b' dans le tableau, alors on retourne vrai

    let over = true;
    for (let r = 0 ; r < 8 ; r++) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
        if (grid[r].includes('b') === true) {
            // ou
            // if (!grid[r].includes('b')){
            over = false ;
        }
    }
    return over;
}


function isValid(targetCell) {
    //debugger;
    if (targetCell === null) {
        return false;
    }
    else {
        // on vérifie si il y a déjà 2 charactères dans la chaine passée dans targetCell
        if (targetCell.length != 2) {
            return false;
        }
        else {
            // quand JS réussit à entrer dans ce bloc, c'est que targetCell contient bien 2 caractères
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
            const column = targetCell.charAt(0);
            //et le chiffre
            const row = Number(targetCell.charAt(1));

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
            // indexOf retourne -1 quand il ne trouve pas la chaine passée en argument dans le tableau
            if (gridHeaders.indexOf(column) === -1) {
                return false;
            }
                // si la conversion du second caractère s'est mal passée, row contiendra NaN (not a number)
            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/isNaN
            else if (isNaN(row)) {
                return false;
            }
            else if (row >  (gridHeaders.length + 1) ) {
                return false;
            }
            else {
                return true;
            }
        }
    }

}

// Gestionnaire d'événement
// fonction exécutée à chaque soumission du formulaire d'attaque
const handleAttack = function(tupperware){
    // on bloque la soumission du formulaire
    tupperware.preventDefault();
    // je récupère l'élément input dans lequel est normalement saisi les corrdonnées de la case ciblée
    let inputTarget = document.getElementById('cellToHit');
    // je récupère la valeur saisie dans le champ text
    let targetValue = inputTarget.value;

    // Je vérifie si targetValue contient des coordonnées valides grace à la fonction isValid()
    if (isValid(targetValue) === true) {
        // La variable targetValue contient une chaine de caractère qui est composée par une lettre et un chiffre
        // ce qui correspond à la lettre de la colonne et au chiffre de la ligne
        // heureusement, j'ai une fonction qui comprend et traduit ça pour que je puisse vérifier où ça va dans mon tableau grid
        // cette fonction c'est sendMissile()
        sendMissile(targetValue);
        // sendMissile() appelle aussi senMissileAt() qui modifie le continu de notre variable grid

    }
    else {
        // envoi d'un message d'erreur
        window.alert('ceci n\'est pas une coordonnée valide');
    }
    inputTarget.value = '';
    inputTarget.focus();
};

// Gestionnaire d'événement
// fonction exécutée quand on clique sur le bouton #stats
const handleStatsClick = function(evt) {
    // On n'affiche les stats que s'il y a eu au moins 1 tir !
    if (nbRound > 1) {
        // On récupère le nombre de cases touchées
        console.log(document.querySelectorAll('.cell.hit'));
        const hits = document.querySelectorAll('.cell.hit').length;
        // querySelectorAll permet de récupérer TOUS les éléments qui correspondent au patron de recherche
        // Dans ce cas, nous recherchons dans le DOM, tous les éléments qui ont à la fois la classe cell et la classe hit appliquée
        // Cela nous retourne une LISTE d'élément HTML
        // comprendre : un tableau
        // on peut donc utiliser length pour obtenir le nombre d'éléments que contient cette liste
        // On récupère le nombre de cases "plouf""
        console.log(document.querySelectorAll('.cell.splash'));
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
};

const addToActionsHistory  = function(row, column, success) {

    const target = document.getElementById('cell'+row+column).dataset.cellName;
    //si c'est la div #cell00 alors, je vais stocker dans target A1

    // On récupère la div actions
    const actionsHistoryElement = document.getElementById('actions');

    // On génère la phrase
    let textToAdd = 'Tour#' + nbRound; // Le numéro du tour
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
};

const handleActionsToggle = function(evt) {
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
};


const handleInitGame = function () {

    // Je place maintenant 3 bateaux
    // Mes bateaux sont représentés par des petits 'b'
    grid = [
        ['b', 'b', 'b', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', 'b', 'b', 'b', 'b', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', 'b'],
        ['', '', '', '', '', '', '', 'b']
    ];
    displayGrid();
    addCellNames();

    // Il n'y a qu'un seul formulaire dans notre index.html
    // On peut donc sélectionner directement la balise "form"
    let formAttack = document.querySelector('form');
    formAttack.addEventListener('submit', handleAttack);

    // On écoute l'event "click" sur le bouton des stats
    document.getElementById('stats').addEventListener('click', handleStatsClick);

    // On écoute l'event "click" sur le bouton des actions à afficher/cacher
    document.getElementById('toggle-actions').addEventListener('click', handleActionsToggle);
}

// Le plus petit tableau
let grid = [];
let gridHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let nbRound = 1;

document.addEventListener('DOMContentLoaded', handleInitGame);




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
let value = document.getElementById('cell00').dataset.cellName;
// Je veux changer la valeur :
document.getElementById('cell00').dataset.cellName = "A2";
//
document.getElementById('cell00').dataset.seaName = "La Manche";








