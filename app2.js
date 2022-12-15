// deuxième partie de l'application : 
// tout ce qui n'a pas besoin de loader pour rendre cliquable et fonctionnels les boutons de la page d'accueil
// donc l'affichage de la page d'info, 
// du déroulement des quiz, des messages, 
// de l'écran de fin, du dépilement des messages



// ce qui suit concerne le déroulement du jeu à partir où on lance un quiz

var svgPathFarFaceMeh			= `<path d="M144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208zM368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208zM328 328C341.3 328 352 338.7 352 352C352 365.3 341.3 376 328 376H184C170.7 376 160 365.3 160 352C160 338.7 170.7 328 184 328H328zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464z"/>`;
var svgPathFasFaceMeh			= `<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM176.4 240c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm192-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zM160 336H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>`;
var svgPathFasThumbsUp			= `<path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>`;
var svgPathFasChampagneGlasses	= `<path d="M320 128V49.1L186.6 .3c-11.4-4.2-24 .9-29.5 11.7L71.8 181.1c-30.8 61-8 133.8 48.1 167.4l-28 77.4L32.1 403.9C19.7 399.4 6 405.8 1.4 418.3s1.9 26.3 14.3 30.8l164.6 60.3c12.4 4.5 26.1-1.9 30.6-14.4s-1.9-26.3-14.3-30.8l-59.9-21.9 28-77.3c68.1 11.6 135.7-32.8 150.1-103.6l5.1-24.8 5.1 24.8c14.5 70.8 82 115.2 150.1 103.6l28 77.3-59.9 21.9c-12.4 4.5-18.8 18.3-14.3 30.8s18.2 18.9 30.6 14.4l164.6-60.3c12.4-4.5 18.8-18.3 14.3-30.8s-18.2-18.9-30.6-14.4l-59.9 21.9-28-77.4c56.1-33.6 78.8-106.4 48.1-167.4L482.9 12C477.4 1.1 464.7-3.9 453.4 .3L320 49.1V128h0zm-35.7 44.4L153.9 124.6l36.3-71.9L300.6 93.1l-16.2 79.3zm71.3 0L339.4 93.1 449.8 52.7l36.3 71.9L355.7 172.4z"/>`;


// COMPOSANTS:


/* - - - - - S T Y L E S - - - - - */
// style pour le composant 'question':
(()=>{
	const sourceCSS=`
		.question{
			flex-grow: 1;
			overflow: auto;
			scrollbar-width: none;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 1rem;
			padding-top: 2rem;
		}
		.bouton-conteneur input {
		  position: absolute;
		  opacity: 0;
		  cursor: pointer;
		}

		.bouton-conteneur input:checked ~ .bouton {
		  /*background-color: #2196F3;*/
		  border: 1px solid var(--c-accent);
		  box-shadow: 0 0 8px 0 var(--c-primaire), inset 0 0 5px 0 var(--c-primaire);

		  transition: box-shadow cubic-bezier(0,2,1,1) 200ms
		}
		.bouton-dark{
			border: 1px grey solid;
			margin-top:.5rem;
			margin-bottom:.5rem;
		}
		.question-corrigee{
			border-radius:2rem;
			padding : 1rem;
			margin:.5rem 1rem;
		}
		.question-corrigee-success{
			background-color: hsl(var(--hue-success) 80% 40% / 20%);
		}
		.question-corrigee-warning{
			background-color: hsl(var(--hue-warning) 80% 50% / 30%);
		}
		.question-corrigee-danger{
			background-color: hsl(var(--hue-danger) 80% 30% / 30%);
		}

	`;
	const style=document.createElement('style');
	style.textContent=sourceCSS;
	document.head.append(style);
})();

	/* - - - F I N   S T Y L E S - - - */



function htmlQuestion(n){
	// entrée : le numéro absolu de la question (pas l'objet 'question' lui-même!), 
	// sortie : un div display:none avec l'énoncé et les réponses possibles
	

	

	let s=`<div class="question full-height" id="question-${n}" style="display:none">
				<p class="question-enonce">${questions[n].texte}</p>
				<div class="question-choix"><form>`;
	for(let i=0;i<questions[n].reponses.length;i++){
		s+=			`<label  id='label-question-${n}-choix-${i}' class='bouton-conteneur'>
						<input type='radio' name='q' id='question-${n}-choix-${i}' autocomplete='off'>
						<div id='bouton-question-${n}-choix-${i}' class='bouton bouton-dark'>${questions[n].reponses[i].texte}</div>
					</label>`;
	}
	s+=				`<label id='label-question-${n}-choix--1' class='bouton-conteneur'>
						<input type='radio' name='q' id='question-${n}-choix--1' autocomplete='off'>
						<div id='bouton-question-${n}-choix--1' class='bouton bouton-dark'>
						Je ne sais pas</div>
					</label>
				</form></div>
			</div>`;
	return s;
}










// - - - - - -
// MESSAGES / "alertes", pas vraiment des composants : fonctions qui affectent le DOM
// en particulier, chaque fois que l'on gagne un trophée, on affiche un message de félicitation

function afficherChaine(html=""){
	let contenu=document.getElementById('message-contenu');
	contenu.replaceChildren(); // on vide le div de contenu
	contenu.innerHTML+=html;
	contenu.innerHTML+=`<div class='bouton bouton-conteneur bouton-coul-secondaire' onclick='cacherMessage()'>Fermer</div>`;
	// on rend visible :
	document.getElementById('message').style.display="block";
}

function afficherMessage(message){
	// un message a un titre, une icône, un texte, une date (non affichée)
	// on peut passer un trophée, par exemple
	let contenu=document.getElementById('message-contenu');
	contenu.replaceChildren(); // on vide le div de contenu
	let s=`	<h1>
				<svg class="svg-icone svg-strong-glow" viewBox="0 0 600 512">${globalThis['svgPath'+message.icone]}</svg>
			</h1>
			<h1>${message.titre}</h1>
			<p>${message.texte}</p>
		`;
	contenu.innerHTML+=s;
	contenu.innerHTML+=`<div class='bouton bouton-conteneur bouton-coul-secondaire' onclick='cacherMessage()'>Fermer</div>`;
	// on rend visible :
	document.getElementById('message').style.display="block";
}

function cacherMessage(){
	document.getElementById('message').style.display="none";
}



function depilerMessage(but="themes"){ // attention ceci affecte l'objet global messages
	let message=messages.pop();
	// un message a un titre, une icône, un texte, une date (non affichée)
	// on peut passer un trophée, par exemple
	let contenu=document.getElementById('message-contenu');
	contenu.replaceChildren(); // on vide le div de contenu
	let s=`	<h1>
				<svg class="svg-icone svg-strong-glow" viewBox="0 0 600 512">${globalThis['svgPath'+message.icone]}</svg>
			</h1>
					<h1>${message.titre}</h1>
					<p>${message.texte}</p>
		`;
	contenu.innerHTML+=s;
	contenu.innerHTML+=`<div class="bouton bouton-conteneur bouton-coul-secondaire" onclick="depiler('${but}')">Fermer</div>`;
	// on rend visible :
	document.getElementById('message').style.display="block";
}






const shuffleArray = (array) => {
	// attention ceci modifie directement le tableau "sur place"
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


const note = ([ratees,sautees,reussies]) => {
	// attention, telle quelle cette fonction peut donner un négatif
	let total=ratees+sautees+reussies;
	if(total==0){// pour éviter la division par zéro
		return 0; // les absents ont toujours tort
	}
	else{
		return Math.ceil(20*(reussies-ratees)/total) ; 
		// si on veut un positif, prendre ensuite le max avec 0
	}
}


const sommeTab = (a,b) => {
	if(a.length!=b.length) console.log("tableaux de longueurs inégales");
	let t=[];
	for (let i=0;i<a.length;i++)
		t[i]=a[i]+b[i];
	return t;
}

const incrementer = (t,i) => {
	t=sommeTab(t,i);
}









let demarrerQuiz = function(seuil=1){// seuil est le seuil pour selectionner les questions
	// par rapport au dernier score : <=-1 pour les questions ratées au dernier essai,
	// ou bien <=0 pour ratées ou sautées
	// valeur 1 par défaut, c'est-à-dire ttes les questions

	// démarrer un quiz aléatoire sur le thème préselectionné (variable globale "theme")

	// on duplique
	//  attention, le Json parse stringyfy transforme les dates en chaînes
	//  là, en théorie non ?
	quiz = structuredClone(theme); 


	// on ne garde que les questions dont le dernier score est <= seuil :
	quiz.questions = quiz.questions.filter( n => questions[n].dernierScore<=seuil);


	shuffleArray(quiz.questions); // on permute les questions
	// on vide la fin pour ne garder au plus que 'longueurQuiz' questions
	while(quiz.questions.length>longueurQuiz)
		quiz.questions.shift();



	// réinitialisation des variables globales du quiz (et non du thème)
	// qui seront ensuite utilisées pour la note de fin du quiz
	let nouvellesProps={
		"longueur":quiz.questions.length,
		"repNeutres":0,
		"repJustes":0,
		"repFausses":0,
		"points":0,
		"bonus":0,
		"total":0,
		"debut": new Date()
	};
	quiz = {...quiz,...nouvellesProps}; // les nouvelles props écrasent éventuellt les anciennes

	actualiserBarres(0,0,0);// remet les bares de progression du thème à zéro


	// CONSTRUCTION DU QUIZ

	document.querySelector(".zone-quiz").innerHTML=""; //on vide

	for(let j=0; j<quiz.longueur; j++){
		document.querySelector(".zone-quiz").insertAdjacentHTML("beforeend",htmlQuestion(quiz.questions[j]));
	}

	prochaineQuestion();
}



function prochaineQuestion(){
	// mettre cette variable en local et ne plus l'appeler ? utiliser seulemet question.num ?
	numQuestion=quiz.questions.splice(0,1)[0];//on enlève le premier numéro de la liste
	//duplication de la question:
	question=JSON.parse(JSON.stringify(questions[numQuestion])); // duplication
	// (on duplique car on va peut-être rajouter des choses à la question, genre les réponses données, le temps, le résultat etc)
	// ou pas ?

	question.debut=new Date();
	question.num=numQuestion;

	document.querySelectorAll(".zone-quiz > div").forEach((el)=>{el.style.display="none";});
	document.getElementById(`question-${numQuestion}`).style.display="";


	sauvegarder(); // ?? pour quoi faire ? sauvegarde des points précédents p-e ?
	goto("jeu");

}



// !! ATTENTION pas d'utilisation de fonction d'état pour ne pas recalculer le mathjax si on revient au quiz :
function demanderFermeture(){
	document.getElementById("vraimentquitter").style.display="block";
}
function quitterQuiz(){
	document.getElementById("vraimentquitter").style.display="none";
	afficherThemes();
}



function corrigerQuestion(){
	question.fin=new Date();
	question.temps=question.fin - question.debut;

	// calcul de 'question.resultat', qui vaut -1, 0 ou 1, en lisant la réponse donnée

	question.resultat=0;// le résultat à l auqestion, par défaut 0 si blanc ou abstention
	question.reponseDonnee=-1;

	for(let i=0;i<question.reponses.length;i++){
		
		if( document.getElementById(`question-${question.num}-choix-${i}`).matches(':checked')){
			question.reponseDonnee=i;
		}
		if( question.reponses[i].correct){
			question.bonneReponse=i;
		}
	}
	if(question.reponseDonnee>=0){
		question.resultat=(question.bonneReponse==question.reponseDonnee) ? 1 : -1;
	} else{
		// pas de réponse donnée, ou "je sais pas"
		document.getElementById(`question-${question.num}-choix--1`).click();
	}
	
	historique.questionsVues.unshift(question); // on met dans l'historique


	// actualiser les stats de la question en cours : nb de fois qu'elle est tombée, temps etc
	actualiserStatsQuestion();
	let incr=triplet(question.resultat);


	// barre de combo et record de combo
	if (question.resultat==1){
		user.combo++; // combo globale
		if(user.combo>user.comboRecord){// record de combo du joueur
			user.comboRecord=user.combo;
		}
	}
	else {
		user.combo=0;
	}

	// on update repFausses, Neutres et Justes sur le quiz (pour la note & stats), le thème, et l'utilisateur
	[quiz.repFausses,quiz.repNeutres,quiz.repJustes] = sommeTab([quiz.repFausses,quiz.repNeutres,quiz.repJustes],incr);
	[user.repFausses,user.repNeutres,user.repJustes] = sommeTab([user.repFausses,user.repNeutres,user.repJustes],incr);
	[theme.repFausses,theme.repNeutres,theme.repJustes] = sommeTab([theme.repFausses,theme.repNeutres,theme.repJustes],incr);


	quiz.points+= question.resultat;// points, c'est juste les points gagnés à la régulière
	quiz.bonus+=Math.max(user.combo-1,0); // bonus de combo, décalé de un et max pour éviter d'enlever un pt si la question est passée

	quiz.total=quiz.points+quiz.bonus; // pour l'affichage en haut à droite


	// TROPHEES qui doivent être octoyés *tt de suite*: 

	// trophée ttes les 100 questions justes (si on vient de réussir)
	if((user.repJustes/100) % 1 === 0 && question.resultat==1){ // passage de seuil linéaire tts les 100 questions
		let trophee={
			"date": new Date(),
			"icone":"FasMedal",
			"titre":`${user.repJustes} réussites!`,
			"texte":`Tu as réussi plus de ${user.repJustes} questions.`
		};
		user.trophees.push(trophee);
		messages.push(trophee);// message affiché à la fin du quiz, ça ne presse pas
		// par contre on ajoute le trophee maintenant car le quizz peut encore faire un game over
	}
	// trophée toutes les 10 combos
	if((user.combo/10) % 1 === 0 && user.combo>0){ 
		let trophee={
			"date": new Date(),
			"icone":"FasRocket",
			"titre":`${user.combo} d'affilée !`,
			"texte":`Cette série t'a fait gagner ${user.combo*(user.combo+1)/2} pts.`
		};
		user.trophees.push(trophee);
		afficherMessage(trophee);// message affiché tt de suite, car la combo peut être cassée
	}


	// changer ceci : soit barre monochrome de progression, soit correspondance entre couleur et question
	actualiserBarres(100*quiz.repFausses/quiz.longueur,100*quiz.repNeutres/quiz.longueur,100*quiz.repJustes/quiz.longueur); 
	// les barres sont toujours actualisées, l'affichage de la correction on verra


	sauvegarder();

	// - - - - - - - -
	// COLORIAGE des réponses, désactivation des boutons 

	// on masque la question :
	document.getElementById(`question-${numQuestion}`).style.display="none";
	// on désactive tout : 
	for(let i=-1;i<question.reponses.length;i++){
		document.getElementById(`question-${question.num}-choix-${i}`).disabled=true;
		document.getElementById(`label-question-${question.num}-choix-${i}`).style.cursor='not-allowed';
		document.getElementById(`bouton-question-${question.num}-choix-${i}`).style.cursor='not-allowed';
	
	}
	
	// on remet en forme pour la correction : fond et border-radius
	document.getElementById(`question-${numQuestion}`).classList.add("question-corrigee");
	document.getElementById(`label-question-${numQuestion}-choix--1`).remove();// on enlève le choix "je ne sais pas", il est inutile dans la correct°

	let commentaire="";
	if(question.resultat==-1){
		document.getElementById(`question-${numQuestion}`).classList.add(`question-corrigee-danger`);
		commentaire="Question ratée";
	}
	if(question.resultat==0){
		document.getElementById(`question-${numQuestion}`).classList.add(`question-corrigee-warning`);
		commentaire="Question sautée";
	}
	if(question.resultat==1){
		document.getElementById(`question-${numQuestion}`).classList.add(`question-corrigee-success`);
		commentaire="Question réussie";
	}

	let enTete =`<div class="margin-l-r" style="display:flex;justify-content:space-between">
								<div>${htmlIconeResultat(question.resultat)} ${commentaire}</div>
								<div>Q${numQuestion}</div>
							</div>`;

	document.getElementById(`question-${numQuestion}`).insertAdjacentHTML('afterbegin',enTete);
	


	// la suite : question suivante ou fin, s'il n'y a plus de question, ou game over
	suite();
}



function actualiserStatsQuestion(){
	
	let q=questions[question.num];
	q.nbVues++;
	q.derniereVue=new Date();
	q.dernierScore=question.resultat;
	q.points+= question.resultat;
	q.scoreMoyen = q.points/q.nbVues; // entre -1 et 1
	q.scoreRecent = (q.scoreRecent+question.resultat)/2; // donne un gros poids à la dernière réponse
	// permet de savoir si on a bcp répondu correctement de suite dernièrement

}

function suite(){
	// si game over, écran game over
	if(quiz.points+quiz.questions.length<quiz.longueur/4){
		// on ne peut plus avoir 5/20 au quiz :
		goto("gameover");
		// timer pour relancer le quiz :
		timeoutQuiz = window.setTimeout(demarrerQuiz,15000);
	}
	else if(quiz.questions.length!=0){
		prochaineQuestion();
	}
	else {
		fin();
		//fin();
	}
}



function fin(){ // Calcul des bonus de fin et affichage des stats de fin :
	quiz.fin=new Date();
	quiz.temps=Math.floor((quiz.fin - quiz.debut)/1000); // en secondes

	// note, qui ne prend pas en compte les bonus : 
	quiz.note=Math.max(Math.ceil(20*quiz.points/quiz.longueur),0);
	if(quiz.note==20) user.perfects+=1;

	// total après aplication du booster :
	quiz.total=getBooster(new Date())*( quiz.points+quiz.bonus );
	historique.quizFinis.unshift(quiz);

	// le quiz a été ajouté à l'historique
	
	// seuils de quiz finis, de perfects etc
	octroyerRecompenses();

	// avant d'ajouter les points aux stats (ceci modifie quiz.total)
	// mais après avoir calculé mutiplié par le booster :
	octroyerCadeau();


	 
	// avant d'ajouter, car ajouter utilise l'historique  pour l'activité récente
	ajouter(quiz.total);//permet de déclencher des actions/affichages, des trophées etc
	themes[quiz.id].points+=quiz.total; // pts gagnés sur ce thème, pour les stats du thème
	
	
	envoyerStatsServeur(); // ici suivant ce que répond le serveur (?) il faudrait rajouter des messages, genre record battu etc
	
	sauvegarder(); // on met tout dans le localStorage


	//document.getElementById("correction").innerHTML=document.querySelector(".zone-quiz").innerHTML;
	// on bouge les questions dans "#correction"
	let source = document.querySelector(".zone-quiz");
	let but = document.getElementById("correction");
	but.replaceChildren();// on vide le debrief, sinon ça s'accumule. 
	but.append(...source.children);
	// on affiche :
	document.querySelectorAll("#correction > div").forEach((el)=>{el.style.display="";});
	


	goto("fin"); // chgt d'état et affichage
	octroyerBooster();// après avoir ajouté les points
	// maintenant, lorsque l'utilisateur appuie sur les boutons,
	// ça lance depiler('info') ou depiler('themes') qui depilera les messages en attente
}

function octroyerRecompenses(){
	// trophée de seuil tous les 10 perfects :
	//attention, user.perfects doit déjà être updaté
	if(quiz.note==20 && user.perfects>0 &&  Math.floor((user.perfects-1)/10) < Math.floor(user.perfects/10)){
		//on passe un multiple de 10, et on exclut le cas =0
		let trophee={
			"date": new Date(),
			"icone":"FasTrophy",
			"titre":`${user.perfects} scores parfaits`,
			"texte":`C'est la ${user.perfects}ème fois que tu termines un quiz avec la note de 20/20 !`
		};
		user.trophees.push(trophee);
		messages.push(trophee);
	}
	// tous les 30 quiz finis : 
	if((historique.quizFinis.length/30)%1 === 0 && historique.quizFinis.length>0){ // tous les 30 quiz finis
		let trophee={
			"date" : new Date(),
			"icone":"FasDumbbell",
			"titre":`${historique.quizFinis.length}ème quiz`,
			"texte":`C'est ton ${historique.quizFinis.length}ème quiz validé ! Continue comme ça`
		};
		user.trophees.push(trophee);
		messages.push(trophee);
	}

}

function octroyerCadeau(){
	// octroi de cadeaux, en fonction de la combo actuelle
	
	if(Math.random()<probaCadeau && user.combo!=0){
		let cadeau=Math.ceil(user.combo*Math.random());
		let m={
				"date":new Date(),
				"titre":"Cadeau !",
				"icone":"FasGift",
				"texte":`Petite surprise, tu gagnes ${cadeau} points !`
			};
			messages.push(m);
			quiz.total+=cadeau; // évite de rappeler une deuxième fois la fonction ajouter, et de regénerer des messages de seuil
	}
}

function octroyerBooster(){
	// appelée lorsqu'un quiz est terminé,
	// juste après avoir octroyé les points (ce qui a déjà ajouté des récompenses)
	// et avant que l'utilisateur clique pour dépiler les messages et continuer

	let d=new Date();
	let heure=d.getHours();
	// octroi de boosters
	if(getBooster(new Date())==1){// boosters non cumulables
		if(6<=heure && heure<8){ // octroi automatique matin
			let b={
				"debut"	: d,
				"fin"		: new Date(d.getFullYear(),d.getMonth(),d.getDate(),8), 
				"multiplicateur":2
			};
			user.boosters.push(b);
			let m={
				"date":new Date(),
				"titre":"Booster du matin",
				"icone":"FasStopwatch",
				"texte":"Points doublés jusqu'à 8h !"
			};
			messages.push(m); // on affiche les boosters en dernier
			user.trophees.push(m);
		}
		else if(12<=heure && heure<14){ // octroi automatique  midi 
			let b={
				"debut"	: d,
				"fin"		: new Date(d.getFullYear(),d.getMonth(),d.getDate(),14), 
				"multiplicateur":2
			};
			user.boosters.push(b);
			let m={
				"date":new Date(),
				"titre":"Booster du midi",
				"icone":"FasStopwatch",
				"texte":"Points doublés jusqu'à 14h !"
			};
			messages.push(m); // on affiche les boosters en dernier
			user.trophees.push(m);
		}
		else if(18<=heure && heure<20){ // octroi automatique soir
			let b={
				"debut"	: d,
				"fin"		: new Date(d.getFullYear(),d.getMonth(),d.getDate(),20), 
				"multiplicateur":2
			};
			user.boosters.push(b);
			let m={
				"date":new Date(),
				"titre":"Booster du soir",
				"icone":"FasStopwatch",
				"texte":"Points doublés jusqu'à 20h !"
			};
			messages.push(m); // on affiche les boosters en dernier
			user.trophees.push(m);
		}
		else if(Math.random()<probaBooster){ // octroi aléatoire le reste du temps
			// on n'octroie des boosters que si celui-ci est à 1
			let b={
				"debut"	: new Date(),
				"fin"		: new Date(new Date().getTime()+dureeBooster), 
				"multiplicateur":2
			};
			user.boosters.push(b);
			let m={
				"date":new Date(),
				"titre":`Booster de ${dureeBooster/60000} min`,
				"icone":"FasStopwatch",
				"texte":`Points doublés pendant ${dureeBooster/60000} minutes !`
			};
			messages.push(m); // on affiche les boosters en dernier
			user.trophees.push(m);
		}
	}
}


function envoyerStatsServeur(){

	// envoi des stats au php qui se charge d'updater le record si applicable
	// afficher un message si record battu, aussi .
	// utiliser 'fetch', maintenant
	/*$.ajax({
		method: 'post',
		url: 'http://damienmegy.xyz/php/vf/vf_score.php',
		data: {
		  'theme' : t.nom,
		  'heritage' : heritage,
		  'record' : record,
		  'stats' : JSON.stringify(stats),
		  'bonus' : JSON.stringify(bonus)
		}
	});*/
}




function depiler(but="themes"){ // affiche les messages dans le tableau "message" jusqu'à le vider
	// display none sur le message pour le fade-in/out ?
	if(messages.length==0){
		cacherMessage();
		if(but=="info")
			afficherInfoTheme(theme.id);
		if(but=="themes")
			afficherThemes();
		if(but=="quiz")
			demarrerQuiz();
	}
	else{
		depilerMessage(but);
	}
	
}


function getBooster(date){
	date= new Date(date); // si date transformée en chaîne dans le storage
	let m=1;
	if(user.boosters.length>0){
		//console.log("il y a un booster actif");
		let b=user.boosters[user.boosters.length-1]; // les boosters sont pushés, et non unshiftés
		let d1=new Date(b.debut);
		let d2=new Date(b.fin);
		// on ne vérifie que le dernier booster,
		// vu qu'ils ne se superposent pas, en théorie (lors de l'attribution)
		if(d1 < date && date< d2)
			m=b.multiplicateur;
	}
	return m; 
}




function ajouter(total){
	// peut servir à activer des bonus, boosters, afficher des splashscreens etc
	//let total=n*getBooster(new Date()); // ici on peut tester les boosters
	// tester ceci avant l'appel à cette fonction, ceci permet d'afficher l'effet du booster

	historique.pointsGagnes.unshift({"date": new Date(), "points":total, "theme": quiz.id} );
	
	// update points aujourd'hui, 24h, cette semaine, 7j, ce mois-ci, 30j? 
	// calcul : ceci sert aux trophées, ainsi qu'à l'affichage des stats dans la page "user"
	let p=activiteRecente(); // nouveaux points récents : jour, mois etc

	/*if(p.quizAujourdhui==1) { // premiers points de la journée

		let m={
			"date": new Date(),
			"icone":"FasSnowman",
			"titre":"Félicitations!",
			"texte":"Ce sont les premiers points que tu sauvegardes aujourd'hui !"
		}
		messages.push(m);
	}*/


	if(Math.floor(user.pointsAujourdhui/200) < Math.floor(p.pointsAujourdhui/200) ){
		let trophee={
			"date": new Date(),
			"icone":"FasDumbbell", // c'est une quête journaliere
			"titre":`${200*Math.floor(p.pointsAujourdhui/200)} pts aujourd'hui !`,
			"texte":`Bravo, tu as gagné plus de ${200*Math.floor(p.pointsAujourdhui/200)} points aujourd'hui!`
		};
		user.trophees.push(trophee);
		messages.push(trophee);
	}

	// - - - trophées - - -

	// seuil de niveau pour les points globaux
	if(user.niveau!=niveau(p.points)){ // passage de niveau
		user.niveau = niveau(p.points);
		let trophee={
			"date": new Date(),
			"icone":"FasCircleUp",
			"titre":`Lvl-up : niveau ${user.niveau}`,
			"texte":`Tu as dépassé les ${10*(2**(user.niveau))} points !<br>
								Prochain niveau : ${10*(2**(user.niveau+1))} points.`
		};
		user.trophees.push(trophee);
		messages.push(trophee);// seront dépilés et affichés après l'épilogue
	}

	// barre des milliers de points
	if(Math.floor(user.points/1000) < Math.floor(p.points/1000)){ // passage de milliers
		let trophee={
			"date": new Date(),
			"icone":"FasCocktail",
			"titre":`${Math.floor(p.points/1000)}K pts !`,
			"texte":`Tu as dépassé les ${1000*Math.floor(p.points/1000)} points !`
		};
		user.trophees.push(trophee);
		messages.push(trophee);// seront dépilés et affichés après l'épilogue
	}


	user={...user,...p}; // on update les points récents
	// attention ceci modifie user, en modifiant aussi quizAujourd'hui, perfectsAUjourdhui etc.

}




function actualiserBarres(a,b,c){
	// entrées : valeurs entre 0 et 100, somme <100 si possible...
	// actualisation des longueurs des barres de progression
	document.getElementById("progress-rouge").style.width=a+"%";
	document.getElementById("progress-jaune").style.width=b+"%";
	document.getElementById("progress-vert").style.width=c+"%";

}

function recupererHighScore(){
	fetch('http://damienmegy.xyz/php/vf/vf_record.txt?stamp='+ (new Date()).getTime())
	  		.then(response => response.text())
	  		.then((data) => {
				record=data;
				document.getElementById("record").innerHTML=record; // au lieu de tout réactualiser
		  })
}






