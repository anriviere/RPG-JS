class Ennemis{
    constructor(heros){


        let randvitesse = Math.floor(Math.random() * Math.floor(10));
        this.vitesse = randvitesse;

        let randOr = Math.floor(Math.random() * Math.floor(10));

        this.or = randOr + 3;

        let dixPV = Math.trunc(heros.pvMax / 100 * 10);
        let rand = Math.floor(Math.random() * Math.floor(Math.trunc(dixPV)));
        
        this.pv = heros.pvMax - dixPV + (rand * 2);
        this.pvMax = this.pv;


    }

    Image(){
       
        document.querySelector("#ima").src = this.image;
    }

    CalculBarreDeVie(){
        let diviseur = this.pvMax/90;
        let taillePV = this.pv/diviseur;
        $("#barreEn2").css("width", taillePV);
    }
}

export default Ennemis;