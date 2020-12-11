import Ennemis from "./ennemis.js";

class EnnemiGuerrier extends Ennemis{
    constructor(heros){

        super(heros);
        //les statistiques des ennemi sont calculés en fonction de celle du héros
        this.classe = "Guerrier";
        this.attaque = Math.trunc(heros.attaque + (heros.attaque / 100 * 10));
        this.defense = Math.trunc(heros.defense + (heros.defense / 100 * 10));

        this.defenseMagic = Math.trunc(heros.defenseMagic - (heros.defenseMagic / 100 * 10));
        this.attaqueMagic = Math.trunc(heros.attaqueMagic - (heros.attaqueMagic / 100 * 10));

        this.image = "img/cyclops.png";

        this.Image();
        this.CalculBarreDeVie();
        
    }
}

export default EnnemiGuerrier;