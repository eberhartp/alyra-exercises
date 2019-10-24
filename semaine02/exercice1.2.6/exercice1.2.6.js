class Arbre {
    constructor(valeur = null) {
      if (valeur === null) {
        this.arbre = [undefined];
      } else {
        this.arbre = [valeur];
      }
    }

    // Méthode pour trouver l'indice où ajouter un nouveau noeud
    // Si la valeur existe déjà, renvoie l'indice du tableau où se trouve la valeur
    _indexAjoutNoeud(valeur) {
        let currentIndex = 0;
        while(this.arbre[currentIndex] !== undefined) {
            // Soit la case du tableau contient undefined,
            // soit la case n'est pas allouée
            if (valeur < this.arbre[currentIndex]) {
                // Sous-arbre gauche
                currentIndex = 2 * currentIndex + 1;
            } else if (this.arbre[currentIndex] < valeur) {
                // Sous-arbre droit
                currentIndex = 2 * currentIndex + 2;
            } else
                return currentIndex;
        }
        return currentIndex;
    }

    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        let index = this._indexAjoutNoeud(valeur);

        while (this.arbre.length < index) {
            this.arbre.push(undefined);
        }

        this.arbre[index] = valeur;
    }
  
    // Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    // Renvoie undefined si la valeur n'est pas trouvée
    trouverNoeud(valeur) {
        let currentIndex = 0;
        while(this.arbre[currentIndex] !== undefined) {
            // Soit la case du tableau contient undefined,
            // soit la case n'est pas allouée
            if (valeur < this.arbre[currentIndex]) {
                // Sous-arbre gauche
                currentIndex = 2 * currentIndex + 1;
            } else if (this.arbre[currentIndex] < valeur) {
                // Sous-arbre droit
                currentIndex = 2 * currentIndex + 2;
            } else
                return currentIndex;
        }
        return undefined;
    }

    _deplacerSousArbre(indexNouvelleRacine, indexAncienneRacine) {
        let valeurRacine = this.arbre[indexAncienneRacine];
        if (this.arbre[2 * indexAncienneRacine + 1] !== undefined) {
            // Il existe un sous-arbre gauche
            this._deplacerSousArbre(2 * indexNouvelleRacine + 1, 2 * indexAncienneRacine + 1);
        }
        if (this.arbre[2 * indexAncienneRacine + 2] !== undefined) {
            // Il existe un sous-arbre droit
            this._deplacerSousArbre(2 * indexNouvelleRacine + 2, 2 * indexAncienneRacine + 2);
        }
        this.arbre[indexNouvelleRacine] = valeurRacine;
    }

    _supprimer(index) {
        if (this.arbre[2 * index + 1] === undefined &&
            this.arbre[2 * index + 2] === undefined) {
            // Noeud sans sous-arbre
            this.arbre[index] = undefined;
        }
        if (this.arbre[2 * index + 1] !== undefined &&
            this.arbre[2 * index + 2] === undefined) {
            // Noeud avec sous-arbre gauche
            this._deplacerSousArbre(index, 2 * index + 1);
        }
        if (this.arbre[2 * index + 1] === undefined &&
            this.arbre[2 * index + 2] !== undefined) {
            // Noeud avec sous-arbre droit
            this._deplacerSousArbre(index, 2 * index + 2);
        }
        if (this.arbre[2 * index + 1] !== undefined &&
            this.arbre[2 * index + 2] !== undefined) {
            // Noeud avec deux sous-arbre

            // Recherche de l'indice du noeud précédant
            let prevIndex = 2 * index + 1;
            while (this.arbre[prevIndex * 2 + 2] !== undefined) {
                prevIndex = prevIndex * 2 + 2;
            }

            // Recherche de l'indice du noeud suivant
            let nextIndex = 2 * index + 2;
            while (this.arbre[nextIndex * 2 + 1] !== undefined) {
                nextIndex = nextIndex * 2 + 1;
            }

            if (this.arbre[index] - this.arbre[prevIndex] < this.arbre[nextIndex] - this.arbre[index]) {
                this.arbre[index] = this.arbre[prevIndex];
                this._deplacerSousArbre(2 * index + 1, 2 * prevIndex + 1);
            } else {
                this.arbre[index] = this.arbre[nextIndex];
                this._deplacerSousArbre(2 * index + 2, 2 * nextIndex + 2);

            }
        }
    }

    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
      let indice = this.trouverNoeud(valeur);
      if (indice !== undefined && this.arbre[indice] !== undefined) {
        this._supprimer(indice);
        return true;
      } else {
        return false;
      }
    }

    // Méthode pour renvoyer le tableau des valeurs du sous arbre à l'indice donné
    _parcoursInfixe(index) {
        let infixeArray =[];
        if (this.arbre[index] !== undefined) {
            infixeArray = infixeArray.concat(this._parcoursInfixe(2 * index + 1));
            infixeArray.push(this.arbre[index]);
            infixeArray = infixeArray.concat(this._parcoursInfixe(2 * index + 2));
        }
        return infixeArray;
    }

    // Méthode pour afficher l’arbre selon un parcours infixe
    // Cette méthode doit retourner un tableau contenant la valeur des noeuds
    infixe(){
        return this._parcoursInfixe(0);
    }
    
    // Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    printNoeud(valeur){
      let N = this.trouverNoeud(valeur);
      
      var out = "Noeud " + this.arbre[N] + ":  L";
      this.arbre[2*N+1] === undefined ? out += "-" : out += this.arbre[2*N+1];
      out += " R";
      this.arbre[2*N+2] === undefined ? out += "-" : out += this.arbre[2*N+2];
      out += " P";
      this.arbre[Math.floor((N-1)/2)] === undefined ? out += "-" : out += this.arbre[Math.floor((N-1)/2)];
        
      console.log(out);
    }
}

let a = new Arbre();
a.ajouterNoeud(30);
a.ajouterNoeud(18);
a.ajouterNoeud(24);
a.ajouterNoeud(11);
a.ajouterNoeud(33);
a.ajouterNoeud(13);
a.ajouterNoeud(40);
a.ajouterNoeud(46);
a.ajouterNoeud(14);
a.ajouterNoeud(21);
a.ajouterNoeud(12);
a.ajouterNoeud(10);
a.ajouterNoeud(31);
a.ajouterNoeud(35);
a.ajouterNoeud(32);

a.supprimerNoeud(40);
a.printNoeud(33);
a.printNoeud(35);
a.printNoeud(46);
