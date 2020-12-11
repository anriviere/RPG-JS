import Mage from "./Mage.js";
import Guerrier from "./Guerrier.js"
import Combat1 from "./combat.js";

class Game{

  
    constructor(nom, classe){
        if (classe == "guerrier"){
            this.heros = new Guerrier(nom, classe);
        }
        if (classe == "mage"){
            this.heros = new Mage(nom, classe);
        }
        
        this.combat = [];
        this.currentLevel = 0;


        this.RencontreEnnemi();
        
        

    }

    //Cette fonction permet de récupérer et d'afficher chaque caractéristiques du personnage
    AfficherCaracteristiques(){
        
        document.querySelector("#nom").textContent = this.heros.nom;
        document.querySelector("#classe").textContent = this.heros.classe;
        document.querySelector("#pv").textContent = this.heros.pv;
        document.querySelector("#pvMax").textContent = this.heros.pvMax;
        document.querySelector("#mp").textContent = this.heros.Mp;
        document.querySelector("#mpMax").textContent = this.heros.MaxMp;  
        document.querySelector("#or").textContent = this.heros.or;
        document.querySelector("#prix").textContent = this.heros.price;
        document.querySelector("#ModaleNomPerso").textContent = this.heros.nom;
        document.querySelector("#classeM").textContent = this.heros.classe;
        document.querySelector("#pvM").textContent = this.heros.pv;
        document.querySelector("#pvMaxM").textContent = this.heros.pvMax;
        document.querySelector("#mpM").textContent = this.heros.Mp;
        document.querySelector("#mpMaxM").textContent = this.heros.MaxMp;   
        document.querySelector("#orM").textContent = this.heros.or;
        document.querySelector("#attaque").textContent = this.heros.attaque;
        document.querySelector("#attaqueMag").textContent = this.heros.attaqueMagic;
        document.querySelector("#defense").textContent = this.heros.defense;
        document.querySelector("#defenseMagic").textContent = this.heros.defenseMagic;
        document.querySelector("#ModaleVitessePerso").textContent = this.heros.vitesse;
            
    }

    

    
    RencontreEnnemi(){
        
        
        document.querySelector("#Textennem").innerHTML = "Un nouvel ennemi vient d'apparaître. <br> Que voulez vous faire?";
        
    }


    //Lorsque l'utilisateur lance un combat,
    //celui ci est créé grâce à la classe combat
    //Tous les éléments relatif au combat sont gérés dans cette classe (attaque, perte de pv, victoire, etc)
    //A chaque fois que l'utilisateur lance un combat le currentLevel de Game est incrémenter (cf main.js)
    DebutCombat(){
        $("#commencerCombat").hide(); 
        document.querySelector("#Textennem").innerHTML = "";
        this.combat[this.currentLevel] = new Combat1(this.heros);
    
    }

    //Fonction de sauvegarde
    Sauvegarde(){
        
        let task = $("#addTask").serializeArray();

        $.ajax({
            url:"saveFigure.php",
            method:"POST",
            data:task,
            success:function(response){
           
            }
        })
    }


}

export default Game;
