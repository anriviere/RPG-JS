class Personnage{
    constructor(nom){
       this.nom = nom;
       this.price = 5;
    }

    //met l'image du personnage (en fonction de la classe choisi) sur la div prévue.
    Image(){
        
        document.querySelector("#imaPer").src = this.image;
    }

    //Permet d'améliorer la defense en echange d'or
    AmeliorerDefense(){

        if(this.or >= this.price){
            this.defense += 5;
            console.log(this.pv);
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter votre defense!");
        }

    }

     //Permet d'améliorer la defense magique en echange d'or
     AmeliorerDefenseMagique(){

        if(this.or >= this.price){
            this.defenseMagic += 5;
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter votre defense Magique!");
        }

    }

    //Permet d'améliorer l'attaque en echange d'or
    AugmenterAttaque(){

        if(this.or >= this.price){
            this.attaque += 5;
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter votre attaque!");
        }

    }

    //Permet d'améliorer le sort en echange d'or
    AugmenterAttaqueMagique(){

        if(this.or >= this.price){
            this.attaqueMagic += 5;
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter votre attaque Magique!");
        }

    }

    //Permet d'améliorer le maximum de pv possible en echange d'or
    AugmenterMpMax(){

        if(this.or >= this.price){
            this.MaxMp += 5;
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter vos MP!");
        }

    }

    //Permet de restaurer les pv (contre or)
    RestaurerPv(){
        if(this.or >= this.price){
            this.pv = this.pvMax;
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;

           
        }
        else{
            alert("Vous n'avez plus assez d'or pour restaurer vos PV!");
        }

        this.CalculBarreDeVie();
        

    }

    //permet de restaurer les mp (contre or)
    RestaurerMp(){
        if(this.or >= this.price){
            this.Mp = this.MaxMp;
            console.log(this.MaxMp);
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour restaurer vos MP!");
        }
        
    }

    //Permer d'augmenter le max de pv possible (contre or)
    AugmenterMaxPv(){

        if(this.or >= this.price){
            this.pvMax += 5;
            console.log(this.pvMax);
            this.or -= this.price;
            console.log("or :" + this.or);
            this.price += 2;
            
        }
        else{
            alert("Vous n'avez plus assez d'or pour augmenter vos PV!");
        }
        this.CalculBarreDeVie();
        
        //$("#pv").textContent = heros.pv;
        // document.querySelector("#pv").textContent = this.pv;

    }

    //Permet d'afficher la barre de vie en fonction du nombre de pv.
    CalculBarreDeVie(){
        let diviseur = this.pvMax/90; //calcule du diviseur pour que la barre max soit de 90 px.
        let taillePV = this.pv/diviseur;
        $("#barre2").css("width", taillePV);
    }
}

export default Personnage;
