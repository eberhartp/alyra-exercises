class Noeud {
    constructor(val) {
        this.valeur = val;
        this.gauche = undefined;
        this.droite = undefined;
        this.parent = undefined;
    }

    // Méthode pour trouver une valeur dans un sous-arbre
    // Renvoie le noeud si valeur est trouvée
    // Renvoie undefined si valeur non trouvée
    trouver(valeur) {
        if (this.valeur == valeur)
            return this;
        if (valeur < this.valeur && this.gauche !== undefined)
            return this.gauche.trouver(valeur);
        else if (this.droite !== undefined)
            return this.droite.trouver(valeur);
    }

    // Méthode pour ajouter une valeur dans un sous-arbre
    ajouter(valeur) {
        if (valeur < this.valeur) {
            if (this.gauche === undefined) {
                this.gauche = new Noeud(valeur);
                this.gauche.parent = this;
            } else {
                this.gauche.ajouter(valeur);
            }
        } else {
            if (this.droite === undefined) {
                this.droite = new Noeud(valeur);
                this.droite.parent = this;
            } else {
                this.droite.ajouter(valeur);
            }
        }
    }

    // Méthode pour supprimer un noeud d'un sous-arbre
    supprimer(valeur) {
        if (this.valeur != valeur) {
            // Parcours de l'arbre pour arriver jusqu'au noeud à supprimer
            if (valeur < this.valeur && this.gauche !== undefined)
                this.gauche.supprimer(valeur);
            else if (this.droite !== undefined)
                this.droite.supprimer(valeur);
        } else {
            // Suppression du noeud courant
            if (this.gauche === undefined && this.droite === undefined) {
                //Noeud feuille
                if (this.parent.gauche == this)
                    this.parent.gauche = undefined;
                else
                    this.parent.droite = undefined; 
            } else if (this.droite === undefined) {
                //Noeud avec un seul sous-arbre à gauche
                if (this.parent.gauche == this)
                    this.parent.gauche = this.gauche;
                else
                    this.parent.droite = this.gauche;
            } else if (this.gauche === undefined) {
                //Noeud avec un seul sous-arbre à droite
                if (this.parent.gauche == this)
                    this.parent.gauche = this.droite;
                else
                    this.parent.droite = this.droite;
            } else {
                // Noeud avec deux sous-arbres

                // Recherche du prochain noeud dans l'ordre
                let nextNode = this.droite;
                while (nextNode.gauche !== undefined) {
                    nextNode = nextNode.gauche;
                }

                // Recherche du noeud précédant dans l'ordre
                let prevNode = this.gauche;
                while (prevNode.droite !== undefined) {
                    prevNode = prevNode.droite;
                }

                if (this.valeur - prevNode.valeur <
                    nextNode.valeur - this.valeur) {
                    prevNode.parent.gauche = prevNode.gauche;
                    this.valeur = prevNode.valeur;
                } else {
                    nextNode.parent.droite = nextNode.droite;
                    this.valeur = nextNode.valeur;
                }
            }
        }
    }

    //Récupère le tableau des valeurs en infixe
    infixe() {
        let values = [];
        if (this.gauche !== undefined)
            values = values.concat(this.gauche.infixe());
        values.push(this.valeur);
        if (this.droite !== undefined)
            values = values.concat(this.droite.infixe());
        return values;
    }

    // Affiche la valeur du noeud et la valeur de ses deux enfants et de son parent
    toString() {
        var out = "Noeud " + this.valeur + ":  L";
        
        this.gauche === undefined ? out += "-" : out += this.gauche.valeur;
        out += " R";
        
        this.droite === undefined ? out += "-" : out += this.droite.valeur;
        out += " P";
        
        this.parent === undefined ? out += "-" : out += this.parent.valeur;
        console.log(out);
    }
}

class Arbre {
    constructor() {
        this.racine = undefined;
    }
    
    //Méthode pour trouver une valeur donnée dans un arbre binaire de recherche
    trouverNoeud(valeur) {
        if (this.racine  !== undefined)
            return this.racine.trouver(valeur);
    }
    
    //Méthode pour ajouter un noeud
    ajouterNoeud(valeur) {
        if (this.racine === undefined)
            this.racine = new Noeud(valeur);
        else {
            this.racine.ajouter(valeur);
        }
    }
    
    //Méthode pour supprimer un noeud
    supprimerNoeud(valeur) {
        if (this.racine !== undefined)
            this.racine.supprimer(valeur);
    }
    
    //Méthode pour afficher l’arbre selon un parcours infixe
    //Cette méthode doit retourner un tableau contenant la valeur des noeuds
    infixe() {
        let values = [];
        if (this.racine !== undefined)
            values = this.racine.infixe();
        return values;
    }
    
    //Méthode pour afficher la valeur d'un noeud à partir de sa valeur
    printNoeud (valeur) {
        let noeud = this.trouverNoeud(valeur);
        if (noeud !== undefined) noeud.toString();
    }
}
