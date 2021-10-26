// On crée un grand objet "grid", qui va contenir plusieurs variables(propriétés) et fonctions(méthodes) dans le but de réaliser un projet commun.
// BUT : faire fonctionner la grille de notre jeu Bataille Navale
// réunir tous nos outils pour afficher correctement la grille
//

let grid = {
    // Je place maintenant 3 bateaux
    // Mes bateaux sont représentés par des petits 'b'
    // les variables deviennent alors des propriétés de "grid"
    cells : [
        ['b', 'b', 'b', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', 'b', 'b', 'b', 'b', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', 'b'],
        ['', '', '', '', '', '', '', 'b']
    ],

    // headers devient une propriété de "grid"
    headers : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

    // displayGrid devient une fonction qui fait partie du module/objet grid
    // elle devient une méthode de l'objet "grid"
    displayGrid : function() {
        // Boucle comme en PHP => for car on sait qu'on va de 0 à 8
        for (let r = 0 ; r < 8 ; r++) {

            //console.log(grid.cells[r]);
            // lors de la première boucle : cell0x
            // lors de la deuxième boucle : cell1x

            // 2- on parcourt ce sous-tableau grid[r] => boucle !
            for (let c = 0; c < 8; c++) {
                let caract = '~';
                if (grid.cells[r][c] !== '' && grid.cells[r][c] !== 'b') {
                    // if (grid[r][c] === 'p' || grid[r][c] === 't') {
                    caract = grid.cells[r][c];
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
        }
        // Pour mieux comprendre l'exécution du code par l'interpréteur JS
        //debugger;
    },
    // Ajout de données supplémentaires sur les différentes cases de la grille de la BN
    // En utilisant les dataset
    addCellNames : function () {
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
                const letter = grid.headers[columnIndex];
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
    }

};




// Comment transformer en module des variables et des fonctions ?

/*
// état avec fonctions
let foo = "bar";
let foo2 = function(bar){};

-------------

// état avec module
let mod = {
    foo : "bar",
    foo2 : function(bar){}
};

mod.foo;
mod.foo2(bar);

*/