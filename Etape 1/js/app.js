// #1 Créer le tableau ============================================

// créer une variable grid à 2 dimensions représentant un plateau de 8 lignes et 8 colonnes

// Pour déclarer une variable en JS, on a 3 mot-clés :
// let
// var
// const : la valeur stockée dans une variable déclarée avec "const" sera vérrouillée, on ne pourra plus modifier la valeur stockée dans cette variable

// Pas besoin de mettre un $ en début de nom de variable, comme en PHP

// Le plus petit tableau
let grid = [];

// Je crée les 8 lignes de la grille de jeu
// c'est à dire les 8 éléments du tableau, qui seront eux-mêmes des tableaux
grid = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

// Je crée dans chacune des 8 lignes, les 8 cases qu'elles contiennent
grid = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
];

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

    // On souhaite savoir si oui ou non, on a touché un bateau
    // est-ce que la case visée contient un 'b'
    // ex : si on exécute sendMissileAt(1, 6)
    // targetCell contiendra : ''
    // ex : si on exécute sendMissileAt(0, 2)
    // targetCell contiendra : 'b'
    const targetCell = grid[rowIndex][columIndex];

    // si la variable targetCell contient "b"
    if (targetCell === 'b' ) {
        console.log(message(rowIndex, columIndex, true));
        // le bout de bateau est touché, donc on change le "b" en "t"
        grid[rowIndex][columIndex] = "t";
        return true; // si la case visée contient un 'b', on renvoie true pour signifier qu'un bout de bateau a été touché

    }
    else if (targetCell === 't' || targetCell === 'p'){
        const messageDoublon = [
            'Un missile a déjà été envoyé sur cette case, Général',
            'Un missile a déjà été envoyé sur cette case, Commandant',
            'Déjà attaqué !',
            'Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane',
            'Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !'
        ];
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
        // utilisation de la fonction getRandomInt()
        console.log(messageDoublon[getRandomInt(4)]);
    }
    // sinon
    else {

        console.log(message(rowIndex, columIndex));
        // Le missile tombe à l'eau, on change la valeur de la case en "p"
        grid[rowIndex][columIndex] = "p";
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


/*
console.log(sendMissileAt(2,6));
console.log(sendMissileAt(1,4));
console.log(sendMissileAt(0,4));
console.log(sendMissileAt(5,6));
console.log(sendMissileAt(0,2));
*/

// KISS
// Keep It Simple and Stupid
// ça va vous guider quand vous vous poserez la question : que va donc faire ma fonction ? vais-je construire une fonction pour faire ça ?

// ! signifie "contient false"

// != signifie "différent de"

// #4 Afficher le plateau ========================
// une sorte de ASCII Art

function displayGrid()
{
    // On commence par afficher les 8 colonnes, plus 2 espaces au début
    console.log('  A B C D E F G H'); // pas top si demain on a + ou - de 8 colonnes...

    // Boucle comme en PHP => for car on sait qu'on va de 0 à 8
    for (let r = 0 ; r < 8 ; r++) {
        // la variable line n'a d'existance que le temps de la boucle, à chaque boucle on la déclare à nouveau sans que cela fasse d'erreur, car elle disparait à la fin de chaque boucle
        // elle n'a de portée que à l'intérieur des accolades
        let line = (r + 1) + ' ';

        //console.log(grid[r]);

        // 2- on parcourt ce sous-tableau grid[r] => boucle !
        for (let c = 0; c < 8; c++) {
            let caract = '~';
            if (grid[r][c] !== '') {
                caract = grid[r][c];
            }
            line = line + caract + ' ';
        }

        console.log(line);
        // Pour mieux comprendre l'exécution du code par l'interpréteur JS
        //debugger;
    }

}

displayGrid();


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

    // Si cellName contient "C7", alors :
    // letter contient "C"
    // rowIndex contient "7"

    // Nous aurions pu utiliser aussi charAt()
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charAt

    // Ou encore substr(), bien que ce ne soit plus recommandé
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/substr

    // Ou encore slice()
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/slice


    debugger;
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

    let gridHeaders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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

console.log(sendMissile('A1'));
console.log(sendMissile('C7'));
console.log(sendMissile('A3'));
console.log(sendMissile('E1'));
console.log(sendMissile('F4'));