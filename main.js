import Game from "./js/Game.js";


//On commence par caché toutes les éléments qui ne sont pas visible a l'ouverture de la page
$("#ready").hide();
$("#btn-action").hide();
$("#suite").hide();
$("#creationPerso").hide();
$("#CreerPerso").hide();
$("#buttonModalEnnemi").hide();
$("#barreEn").hide();


getFigure();

//Lors de l'ouverture d'une partie déja enregistré, les données de celle ci sont chargées dans le dom
function getFigure(){
    let i = 0;
    $.ajax({
        url:"getFigure.php",
        dataType:"json",
        success:function(response){
          
            $("#load").html("");
            response.forEach(task => {

                $("#load").append(`

                
                <span id="LoadNomPerso">${task[0]}</span>
                <span id="LoadClassePerso">${task[1]}</span>
                <span id="LoadOrPerso">${task[2]}</span>
                <span id="LoadAttaquePerso">${task[3]}</span>
                <span id="LoadAttaqueMagPerso">${task[4]}</span>
                <span id="LoadDefMagPerso">${task[5]}</span>
                <span id="LoadDefensePerso">${task[6]}</span>
                <span id="LoadVitessePerso">${task[7]}</span>
                <span id="LoadPvPerso">${task[8]}</span>
                <span id="LoadPvMaxPerso">${task[9]}</span>
                <span id="LoadMaxMpPerso">${task[10]}</span>
                <span id="LoadMpPerso">${task[11]}</span>
      
                `)
               
                i++;
            });

        }
    })
}

//Vérifie si l'utilisateur choisi de chargé une partie ou d'en commencer une nouvelle
//Et, en fonction de son choix, affiche les éléments corespondant.
$("#ButtonChoixPartie").click(function(event){
    event.preventDefault();
    const value = $("#SelectPartie").val();
    if(value == 1){
        $("#creationPerso").show();
        $("#CreerPerso").show();
        $("#ChoixPartie").hide();
    }
    if(value == 2){
        $("#CreerPerso").show();
    }
        
})


//Si l'utilisateur click sur créer un personnage alors le jeu est lancé
//toutes les fonctions lié à un évènemments sont ci-dessous:
$("#CreerPerso").click(function(event){
    event.preventDefault();
    
    
    
    // if($('#ChoixNomPerso').val() != "")
    // {
    //     $("#modal_debut").css("top", "-700px");
    // }
    // else{
    //     alert('Vous devez choisir un nom pour votre personnage!');
    // }
    

    let value;
    let nomPersonnage;


    //Si l'utilisateur cré un nouveu perso, les données renseignées 
    // (nom + classe), sont récupérer pour créer le perso
    if($("#SelectPartie").val()== 1){
        //on vérifie que l'utilisateur a bien choisi un nom 
        if($('#ChoixNomPerso').val() != "")
        {
            $("#modal_debut").css("top", "-700px");
        }
        else{
            alert('Vous devez choisir un nom pour votre personnage!');
        }

        value = $("#choixClasse").val(); 
        nomPersonnage = $("#ChoixNomPerso").val();

    }

    //Si l'utilisateur continu une partie, on récupère le nomet la classe 
    //du personnage enregistré
    if($("#SelectPartie").val()==2)
    {
        $("#modal_debut").css("top", "-700px");
        value = $("#LoadClassePerso").text();
        nomPersonnage = $("#LoadNomPerso").text();     
        
    }

    //On cré le perso
    let game = new Game(nomPersonnage, value);

    //Si c'est une partie déjà enregistré, on modifie les attributs du personnage
    //avec ceux enregistré.
    if($("#SelectPartie").val()==2)
    {
        game.heros.pv = $("#LoadPvPerso").text();
        game.heros.or = $("#LoadOrPerso").text();
        game.heros.attaque = $("#LoadAttaquePerso").text();
        game.heros.attaqueMagic = $("#LoadAttaqueMagPerso").text();
        game.heros.defense = $("#LoadDefensePerso").text();
        game.heros.defenseMagic = $("#LoadDefMagPerso").text();
        game.heros.pvMax = $("#LoadPvMaxPerso").text();
        game.heros.vitesse = $("#LoadPvPerso").text();
        game.heros.MaxMp = $("#LoadMaxMpPerso").text();
        game.heros.Mp = $("#LoadMpPerso").text();

    }

    //On affiche les caractéristiques du personnage 
    game.AfficherCaracteristiques();
    

    //Récupère les caractéristiques du personnage et les envoie dans le formulaire
    // prévu pour la sauvegarde, afin de les récupérer avec POST dans la fonction sauvegarde
    //puis lance la fonction sauvegarde (cf. class game)
    $("#sendData").click(function(e){
        e.preventDefault();

        $("#saveNom").val(game.heros.nom);
        $("#saveClasse").val(game.heros.classe);
        $("#saveOr").val(game.heros.or);
        $("#saveAttaque").val(game.heros.attaque);
        $("#saveAttaqueMag").val(game.heros.attaqueMagic);
        $("#saveDefMag").val(game.heros.defenseMagic);
        $("#saveDef").val(game.heros.defense);
        $("#saveVitesse").val(game.heros.vitesse);
        $("#savePV").val(game.heros.pv);
        $("#savePvMax").val(game.heros.pvMax);
        $("#saveMaxMp").val(game.heros.MaxMp);
        $("#saveMp").val(game.heros.Mp);

    
        game.Sauvegarde();
        
    })


    //Ci-dessous tous les bouttons qui font référence au magasin
    //appelle la fonction qui permet d'augmenter ses pv.
    $("#PVMaga").click(function(event){
        event.preventDefault();
 
        game.heros.RestaurerPv();
        document.querySelector("#pv").textContent = game.heros.pv;
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;

    
    })
    
    //appelle la fonction qui permet de restaurer ses mp.
    $("#MPMaga").click(function(event){
        event.preventDefault();
    
        game.heros.RestaurerMp();
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#mp").textContent = game.heros.Mp;
        document.querySelector("#prix").textContent = game.heros.price;
        
        
    
    })

    //appelle la fonction qui permet d'augmenter son attaque
    $("#armeMaga").click(function(event){
        event.preventDefault();
    
        game.heros.AugmenterAttaque();
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;
        
        
    
    })


    //appelle la fonction qui permet d'augmenter son attaque-magique
    $("#sortMaga").click(function(event){
        event.preventDefault();
    
        game.heros.AugmenterAttaqueMagique();
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;  
    
    })


    //appelle la fonction qui permet d'augmenter sa defense
    $("#protectMaga").click(function(){
    
        
        game.heros.AmeliorerDefense();
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;
 
    })

    //appelle la fonction qui permet d'augmenter sa defense magique
    $("#protectMagMaga").click(function(){
      
        game.heros.AmeliorerDefenseMagique();
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;

    })


    //appelle la fonction qui permet d'augmenter son maximum de mp possible
    $("#magieMaga").click(function(){
    
        game.heros.AugmenterMpMax();
        document.querySelector("#mpMax").textContent = game.heros.MaxMp;
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;
       
    })

    //appelle la fonction qui permet d'augmenter son maximum de pv possible
    $("#MaxPvMaga").click(function(){
    
        
        game.heros.AugmenterMaxPv();
        document.querySelector("#pvMax").textContent = game.heros.pvMax;
        document.querySelector("#or").textContent = game.heros.or;
        document.querySelector("#prix").textContent = game.heros.price;
        
    
    })
    
    
    //L'utilisateur choisi de débuter un combat (appelle la fonction DebutCombat de la class Game) :
    $("#commencer").click(function(){
    
        game.DebutCombat();
                      
    })
    
    //L'utilisateur choisi d'attaquer:
    $("#attaqueChoix").click(function(){  
        game.combat[game.currentLevel].Attaque(game.heros);
        $("#btn-action").hide();
    })
    
    

    //L'utilisateur choisi de lancer un sort
    $("#sortChoix").click(function(){
        game.combat[game.currentLevel].Sort(game.heros);
        $("#btn-action").hide();
    })
    
    $("#pret").click(function(){
        $("#btn-action").show();
        $("#ready").hide();
        game.combat[game.currentLevel].ChoixAttaqueEnnemi(game.heros);   
    })
    
    $("#suiteDuJeu").click(function(){

        $("#commencerCombat").show();
        $("#suite").hide();
        document.querySelector("#choix").innerHTML = "";
        game.currentLevel += 1;
        game.RencontreEnnemi();

    })
    
    //permet d'ouvrir la fenetre avec les caractéristiques du perso
    $("#button_modal").click(function(){
    
        game.AfficherCaracteristiques();
        $("#modal_perso").css("top", "10px");
    

    })
    
    //Permet de fermer la fenetre avec les caractéristiques du perso
    $("#close").click(function(){
        
        $("#modal_perso").css("top", "-700px");
        
    })

    //Permet d'ouvrir la fenêtre avec les caractéristique de l'ennemi
    $("#buttonModalEnnemi").click(function(){
        
            game.combat[game.currentLevel].CaracteristiqueEnnemi();
            $("#modal_ennemi").css("top", "10px");
        
         
    })

    //permet de fermer fenêtre avec caractéristiques de l'ennemi
    $("#closeME").click(function(){
        
        $("#modal_ennemi").css("top", "-700px");
        
    })

    
})

