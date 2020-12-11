import Personnage from "./personnage.js";

class Guerrier extends Personnage{
    constructor(nom){
        super(nom);
        this.classe = "guerrier";
        this.or = 3;
        this.attaque = 20;
        this.attaqueMagic = 6;
        this.defenseMagic = 0;
        this.defense = 10;
        this.vitesse = 5;
        this.pvMax = 20;
        this.pv = 20;
        this.MaxMp = 2;
        this.Mp = 2;
        this.image = 'img/warrior.png';

        this.Image();
        this.CalculBarreDeVie();

    };
    

}

export default Guerrier;