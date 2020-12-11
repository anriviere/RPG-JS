import EnnemiGuerrier from "./ennemi-guerrier.js";
import EnnemiMage from "./ennemi-mage.js";


class Combat1{
    constructor(heros){
        //la classe de l'ennemi est choisi aléatoirement,
        //puis l'ennemi est créer en fonction de sa classe.
        let randClasse = Math.floor(Math.random() * Math.floor(2));
        if(randClasse == 0){
            this.ennemis = new EnnemiMage(heros);
        }
        if(randClasse == 1){
            this.ennemis = new EnnemiGuerrier(heros);
        }
       
        
        this.DebutCombat(heros);
        
        
    }

    //Récupère et affiche les caractéristique de l'ennemi
    CaracteristiqueEnnemi(){
        document.querySelector("#classeEn").textContent = this.ennemis.classe;
        document.querySelector("#pvEn").textContent = this.ennemis.pv;
        document.querySelector("#attaqueEn").textContent = this.ennemis.attaque;
        document.querySelector("#attaqueMagEn").textContent = this.ennemis.attaqueMagic;
        document.querySelector("#defenseEn").textContent = this.ennemis.defense;
        document.querySelector("#defenseMagicEn").textContent = this.ennemis.defenseMagic;  
        
    }
    
    //Fonction de début de combat
    //En fonction de la vitesse de l'ennemi et du personnage
    //on determine qui commence
    //Si le héros commence, les bouttons pour choisir l'attaque apparaissent
    //si l'ennemi commence alors la fonction qui determine quelle attaque l'ennemi fait est lancé
    DebutCombat(heros){
        $("#buttonModalEnnemi").show();  //On fait apparaître les éléments relatif à l'ennemi (boutton pour afficher ses caractéristiques et barre de vie)
        $("#barreEn").show();
        if(this.ennemis.vitesse > heros.vitesse)
        {        
            document.querySelector("#choix").innerHTML = "Votre ennemi est plus rapide, il attaque en premier <br>";
            document.querySelector("#choix").innerHTML += "Es-tu pret? <br>";
            $("#ready").show();       
        }
        else{   
            document.querySelector("#choix").innerHTML = "Vous êtes plus rapide que votre ennemi, vous attaquez en premier";
            $("#btn-action").show();   
        }

    }


    // la fonction attaque: calcule les dégat infligé par l'attaque sur les ennemis,
    //En fonction des pv ennemis après l'attaque, la fonction appelle l'attaque de l'ennemi ou 
    //si l'ennemi n'a plus de pv = le combat prend fin.
    Attaque(heros){
        
        let degat = heros.attaque - this.ennemis.defense;
        if (degat > 0)
        {
            this.ennemis.pv -= degat;
            this.ennemis.CalculBarreDeVie();  //mise a jour barre de vie de l'ennemi
            this.CaracteristiqueEnnemi();  //mise a jour affichage caractéristique ennemi (si modale ouverte)
            document.querySelector("#choix").innerHTML = "Vous avez attaqué : Votre attaque a retiré " + degat +" PV à votre ennemi.";
    
            $("#historique").prepend(`<li>${document.querySelector("#choix").innerHTML}</li>`)
        }
        if(degat <= 0)
        {
            document.querySelector("#choix").innerHTML = "Vous avez attaqué :  La defense de votre ennemi est trop élevé, vous ne lui infligé aucun degat.";
            
            $("#historique").prepend(`<li>${document.querySelector("#choix").innerHTML}</li>`)
        }

        if(this.ennemis.pv > 0)
        {
            document.querySelector("#choix").innerHTML += "<br>C'est a ton ennemi d'attaquer, es-tu pret?"
            $("#ready").show();
            
        }
        if(this.ennemis.pv <=0)
        {
            heros.or += this.ennemis.or;  //le héros récupère l'or de son ennemi
            document.querySelector("#or").textContent = heros.or;
            document.querySelector("#choix").innerHTML = "Vous avez gagné!! Etes-vous pret pour continuer cette aventure?";
            $("#historique").prepend(`<li>Vous avez gagné ce combat!</li>`);
            $("#buttonModalEnnemi").hide();  //les elements relatifs a l'ennemi disparaissent (boutton modale, barre de vie)
            $("#barreEn").hide();
            $("#suite").show();
            document.querySelector("#ima").src = ' ';
           
        }
        
    }


    // la fonction sort: calcule les dégat infligé par l'attaqueMagique sur les ennemis,
    //En fonction des pv ennemis après l'attaque, la fonction appelle l'attaque de l'ennemi ou 
    //si l'ennemi n'a plus de pv = le combat prend fin.
    Sort(heros){
        console.log("on est bien la");
        let degat = heros.attaqueMagic - this.ennemis.defenseMagic;
        
        if (degat > 0 && heros.Mp >= 2)
        {
            this.ennemis.pv -= degat;
            this.ennemis.CalculBarreDeVie();  //met a jour la barre de vie
            this.CaracteristiqueEnnemi();     //met a jour les caractéristique ennemi (si modale ouverte)
            heros.Mp -= 2;
            document.querySelector("#choix").innerHTML = "Vous avez lancé un sort : Votre sort a retiré " + degat + " PV à votre ennemi.";
            
            $("#historique").prepend(`<li>${document.querySelector("#choix").innerHTML}</li>`);
            document.querySelector("#mp").textContent = heros.Mp; //met a jour l'affichage de mp du héros
            
        }
        if(degat <= 0)
        {
            document.querySelector("#choix").innerHTML = "Vous avez lancé un sort : La defense magique de votre ennemi est trop élevé, vous ne lui infligé aucun degat" ;
            
            $("#historique").prepend(`<li>${document.querySelector("#choix").innerHTML}</li>`);
        }
        if(heros.Mp < 2)
        {
            document.querySelector("#choix").innerHTML = "Vous n'avez plus assez de MP pour lancer un sort <br>";
           
        }

        if(this.ennemis.pv > 0)
        {
            document.querySelector("#choix").innerHTML += "<br>C'est a ton ennemi d'attaquer, es-tu pret?"
            $("#ready").show();
            
        }
        if(this.ennemis.pv <=0)
        {
            document.querySelector("#choix").innerHTML = "Vous avez gagné!! Etes-vous pret pour continuer cette aventure?";
            heros.or += this.ennemis.or;        //Lorsqu'il gagne le perso récupère l'or de l'ennemi
            $("#historique").prepend(`<li>Vous avez gagné ce combat!</li>`);
            $("#buttonModalEnnemi").hide();    //les elements relatifs a l'ennemi disparaissent (boutton modale, barre de vie)
            $("#barreEn").hide();
            $("#suite").show();
            document.querySelector("#ima").src = '';
            

        }

      
    }


    //fonction ChoixAttaqueEnnemi: Grâce a un random on détermine si l'ennemi attaque ou lance un sort,
    //En fonction de sa classe il peut lancer plus de sort ou plus d'attaque 
    //(le guerrier lance plus d'attaque, le mage lance plus de sort)
    ChoixAttaqueEnnemi(heros){
        let rand = Math.floor(Math.random() * Math.floor(3));
        console.log(rand);
        if(this.ennemis.classe == "Mage")
        {
            if(rand == 0 || rand == 1)
            {
                this.SortEnnemi(heros);
            }
            if(rand == 2)
            {
                this.AttaqueEnnemi(heros);
            }

        }
        if(this.ennemis.classe == "Guerrier")
        {
            if(rand == 0 || rand == 1)
            {
                this.AttaqueEnnemi(heros);
            }
            if(rand == 2)
            {
                this.SortEnnemi(heros);
            }
        }
    }

    //Attaque ennemi, calcul les dégats créés par l'attaque ennemi
    //si le perso n'a plus de pv => Game Over et retour au debut 
    AttaqueEnnemi(heros){
        
        let degat = this.ennemis.attaque - heros.defense;
        if (degat > 0)
        {
            heros.pv -= degat;
            heros.CalculBarreDeVie();  //mise a jour barre de vie du héros
            document.querySelector("#choix").innerHTML = "Votre ennemi a attaqué : ";
            document.querySelector("#choix").innerHTML += "Vous avez perdu " + degat +" PV.";

            $("#historique").prepend(`<li class="histoennemi">${document.querySelector("#choix").innerHTML}</li>`);

            
            
        }
        if(degat <= 0) //si les dégat sont négatifs, ils ne sont pas appliquer
        {
            document.querySelector("#choix").innerHTML = "Votre ennemi a attaqué! Votre defense élevé vous a protéger, vous ne subissez pas de dommage";
            $("#historique").prepend(`<li class="histoennemi">${document.querySelector("#choix").innerHTML}</li>`);
            
        }

       
        if(heros.pv > 0)
        {
            document.querySelector("#choix").innerHTML += " <br> C'est à toi d'attaquer!!";
            
        }
        if(heros.pv <=0)
        {
            document.querySelector("#choix").innerHTML = "Game Over!";
            document.querySelector("#ima").src = ' ';
            window.location.replace('gameOver.html');
            

        }
        
        document.querySelector("#pv").textContent = heros.pv; //mise a jour pv du héros
        

    }


     //Sort ennemi, calcul les dégats créés par le sort ennemi
    //si le perso n'a plus de pv => Game Over et retour au debut 
    SortEnnemi(heros){
        let degat = this.ennemis.attaqueMagic - heros.defenseMagic;
        if (degat > 0)
        {
            heros.pv -= degat;
            heros.CalculBarreDeVie();   //mise a jour barre de vie du héros
            document.querySelector("#choix").innerHTML = "Votre ennemi a lancé un sort : ";
            document.querySelector("#choix").innerHTML += "Vous avez perdu " + degat +" PV.";
            $("#historique").prepend(`<li class="histoennemi">${document.querySelector("#choix").innerHTML}</li>`);
                
        }
        if(degat <= 0)
        {
            document.querySelector("#choix").innerHTML = "Votre defense magique élevée vous a protégée, vous ne subissez pas de dommage";
            $("#historique").prepend(`<li class="histoennemi">${document.querySelector("#choix").innerHTML}</li>`);
            
        }

       
        if(heros.pv > 0)
        {
            document.querySelector("#choix").innerHTML += " <br> C'est à toi d'attaquer!!";
      
        }
        if(heros.pv <=0)
        {
            document.querySelector("#choix").innerHTML = "Game Over!";
            document.querySelector("#ima").src = ' ';
           window.location.replace('gameOver.html');
            

        }
        document.querySelector("#pv").textContent = heros.pv;  //mise a jour pv du héros  
    }

}

export default Combat1;