import Personnage from "./personnage.js";

class Mage extends Personnage{
    constructor(nom){
        super(nom);
        this.classe = "mage";
        this.or = 19;
        this.attaque = 12;
        this.attaqueMagic = 15;
        this.defenseMagic = 7;
        this.defense = 7;
        this.vitesse = 3;
        this.pvMax = 20;
        this.pv = 20;
        this.MaxMp = 20;
        this.Mp = 20;
        this.image = 'img/wizard.png';

        this.Image();
        this.CalculBarreDeVie();

    };
    

}

export default Mage;