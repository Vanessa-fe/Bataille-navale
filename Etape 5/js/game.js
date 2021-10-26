// Le but de game est de regrouper les variable et les fonctions nécessaires au fonctionnement du tir de missiles

let game = {

    // mémorise le nombre de tours de jeu
    // initialisée à 1
    nbRound : 1,

    // On prévoit deux paramètres à cette fonction
    // rowIndex : le numéro de ligne
    // columnIndex : le numéro de colonne
    sendMissileAt : function (rowIndex, columIndex)
    {

        let displayNbRound = document.querySelector('h3');
        displayNbRound.innerText = 'Tour ' + game.nbRound;

        // On souhaite savoir si oui ou non, on a touché un bateau
        // est-ce que la case visée contient un 'b'
        // ex : si on exécute sendMissileAt(1, 6)
        // targetCell contiendra : ''
        // ex : si on exécute sendMissileAt(0, 2)
        // targetCell contiendra : 'b'
        const targetCell = grid.cells[rowIndex][columIndex];

        // si la variable targetCell contient "b"
        if (targetCell === 'b' ) {

            history.addToActionsHistory(rowIndex, columIndex, true);
            // le bout de bateau est touché, donc on change le "b" en "t"
            grid.cells[rowIndex][columIndex] = "t";
            // Pour voir la modification, on redemande à la fonction displatGrid() d'afficher ce qu'il y a dans notre grid
            grid.displayGrid();
            // Lancement d'un missile
            // tant pis, si la case avait déjà été ciblée auparavant
            game.nbRound ++ ;
            return true; // si la case visée contient un 'b', on renvoie true pour signifier qu'un bout de bateau a été touché

        }
        else if (targetCell === 't' || targetCell === 'p'){
            history.addToActionsHistory(rowIndex, columIndex, false);
            const messageDoublon = [
                'Un missile a déjà été envoyé sur cette case, Général',
                'Un missile a déjà été envoyé sur cette case, Commandant',
                'Déjà attaqué !',
                'Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane',
                'Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !'
            ];
            //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
            // utilisation de la fonction getRandomInt()
            window.alert(messageDoublon[game.getRandomInt(4)]);
            // Lancement d'un missile
            // tant pis, si la case avait déjà été ciblée auparavant
            game.nbRound ++ ;
        }
        // sinon
        else {
            history.addToActionsHistory(rowIndex, columIndex, false);
            // Le missile tombe à l'eau, on change la valeur de la case en "p"
            grid.cells[rowIndex][columIndex] = "p";
            // Pour voir la modification, on redemande à la fonction displatGrid() d'afficher ce qu'il y a dans notre grid
            grid.displayGrid();
            // Lancement d'un missile
            // tant pis, si la case avait déjà été ciblée auparavant
            game.nbRound ++ ;
            return false;

        }
        // On aurait pu écrire seulement cette ligne :
        // return targetCell === 'b';
        // ou :
        // return grid[rowIndex][columIndex] === 'b';


    },

    // fonction récupérée sur MDN pour générer un nombre aléatoire entre 0 et max
    getRandomInt : function (max) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor
        return Math.floor(Math.random() * Math.floor(max));
    },

    // Créer une fonction sendMissile(cellName) qui retourne vrai ou faux si on a touché un vaisseau ou pas
    // mais à partir du nom de la cellule/case
    sendMissile : function (cellName) {
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
        for (let currentIndex in grid.headers) {
            // On récupère la lettre courante du tableau
            const currentLetter = grid.headers[currentIndex];
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
        return game.sendMissileAt(rowIndex, columnIndex);
    },

    // teste si la partie est terminée
    isOver : function () {
        // Si il n'y a plus de 'b' dans le tableau, alors on retourne vrai

        let over = true;
        for (let r = 0 ; r < 8 ; r++) {
            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/includes
            if (grid.cells[r].includes('b') === true) {
                // ou
                // if (!grid.cells[r].includes('b')){
                over = false ;
            }
        }
        return over;
    },

    isValid : function (targetCell) {
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
                if (grid.headers.indexOf(column) === -1) {
                    return false;
                }
                    // si la conversion du second caractère s'est mal passée, row contiendra NaN (not a number)
                // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/isNaN
                else if (isNaN(row)) {
                    return false;
                }
                else if (row >  (grid.headers.length + 1) ) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

    }
};