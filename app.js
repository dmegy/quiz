

// - - - - - - - - - - - - - - - - - - - - - - -

// PETITE APPLI DE QUIZ MATHÉMATIQUES

// Auteur : Damien Mégy
// Domaine public


// TODO : remplacer les unshift par des push, qui sont plus rapides ?
// actuellement les trophées et messages sont push/pop



// - - - - - - V A R I A B L E S - - - - - - - - 




let timeoutQuiz; // gestion timer du lancement automatique des quiz

const probaCadeau=0.2; // proba d'avoir un cadeau (petit, en points)
const probaBooster=0.2; //  proba d'obtenir un booster après un quiz fini
const dureeBooster= 10*60*1000; // 10 minutes

// enlever ?
let aujourdhui={"barrePoints":0,"barreQuiz":0};// booléens pour savoir si les quetes du jour sont validées


let messages=[]; // la pile de messages à afficher après la validation d'un quiz

let historique={
	"questionsVues":[],	// un tableau d'objets qustions, avec le num, le temps, le score etc
	"questionsReussies":[], // tableau, pour commodité ?
	"questionsSautees":[], // ptableau, our commodité ?
	"questionsRatees":[], // tableau, pour commodité ?
	"quizFinis":[],		// un tableau d'objets quiz, finis c-à-s validés
	"pointsGagnes":[]	// tableau avec chaque ajout de points, et la date
};

/* ATTENTION faire le ménage dans les propriétés*/
let user={
	"premiereConnexion":new Date(),
	"pseudo":"",
	"avatar":"", /* type : dataURL*/
	"affiliation":"", // lycée, ou club, ou "UL", ou autre ?
	"points":0,
	"pointsAujourdhui":0,
	"points24h":0,
	"pointsSemaine":0,
	"points7j":0,
	"pointsMois":0,
	"points30j":0,
	"quizAujourdhui":0,
	"quiz24h":0,
	"quizSemaine":0,
	"quiz7j":0,
	"quizMois":0,
	"quiz30j":0,
	"niveau":0, //Math.floor(log2(points/10))
	"combo":0, // bonnes réponses d'affilée
	"comboRecord":0, // meilleure combo enregistrée
	"serie":0, // jours d'affilée avec un quiz validé 
	"perfects":0,
	"perfectsAujourdhui":0,
	"perfects24h":0,
	"perfectsSemaine":0,
	"perfects7j":0,
	"perfectsMois":0,
	"perfects30j":0,
	"questionsVues":0,
	"repNeutres":0,
	"repJustes":0,
	"repFausses":0,
	"trophees":[],
	"boosters":[],
	"objectifsDuJour":[],
}; // réinitialisé avec Storage ensuite, si existant




let themes={}; // tableau avec les thèmes ? mais c'est un objet ?
let questions=[]; // tableau avec toutes les questions et leurs stats, sera loadé à partir du storage s'il existe


let etat = 'accueil';
// Variable d'état de l'application.
// Peut prendre les valeurs : 'accueil', 'chargement', 'info', 'jeu', 'resultats', 'correction', 'fin'.
// Elle détermine ce qui doit être affiché ou pas (voir le template dans index.html)

// longueur des quiz : 10
let longueurQuiz=10;




// seuils absolus, hebdomadaires, journaliers ?
// utiliser les puissances de deux pour les seuils ? plutôt tranches de 10, ça félicite plus souvent.


let barreQuiz=5 // la barre pour qu'un quiz soit pris en compte (=pts enregistrés)
let barre=0.5; // pas const car ça peut être modifié ensuite ?
// la barre pour pouvoir dire qu'une question est sue, sur son 'scoreRecent'
// pour .5, c'est deux dernières fois d'affilée
// pour .75, c'est trois fois.

// - - - - - - - - - - - - - - - - - 

// variables de thème, question etc courant : sert à l'affichage
// ATTENTION : à terme, virer l'id du quiz : un quiz n'aura pas d'id, c'est unesous-liste aléatoire de 20 questions (au plus) parmi celles d'un thème (ou parmi ttes les questions ?)


let quiz = {"nom":"","info":"","titre":"","questions":[0],"id":"ev1"}; // le thème/quiz choisi en cours
let theme={"nom":"","info":"","titre":"","questions":[0],"id":"ev1"}; 
// thème courant : enlever, remplacer par juste:
let id="ev1"; // le thème courant, initialiser au thème videou trivial
let question = {}; // la question en cours d'affichage
let numQuestion=0; // le numéro de la question en cours d'affichage
// virer/réparer ceci, c'est un fossile
let c = "quiz"; // contexte actuel d'affichage de stats, peut aussi valoir "theme", ou "glob" ?






let messageAccueil="Bienvenue"; // sera changé si le localstorge contient qq chose






// - - - - -
// HIGHSCORES

// remplacer ceci par un système de highscore qui affiche les 5 meilleurs score ?
// Mais d'abord, gérer le nom et l'affiliation du record
let record=0; // record de points enregistré sur le serveur. Récupéré dans un fichier texte en ajax au démarrage







// - - - - - - - - -
// - - -  LOCALSTORAGE

const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};


/* virer, utiliser structuredClone() en natif */
const clone= (obj)=> {
	return JSON.parse(JSON.stringify(obj));
};









function sauvegarder(){
	// enregistrement des résultats en local :
	if (typeof(Storage) !== "undefined") {
		window.localStorage.setItem('questions',JSON.stringify(questions));
		window.localStorage.setItem('themes',JSON.stringify(themes));
		window.localStorage.setItem('chapitres',JSON.stringify(chapitres));
		window.localStorage.setItem('user',JSON.stringify(user));
		window.localStorage.setItem('historique',JSON.stringify(historique));
	}
}



// - - - - - - - - -
// STATS NON LOCALES

// faire ceci au onload ?

//fetch('http://damienmegy.xyz/php/vf/vf_compteur.php'); 
// attention, faire un truc avec sessionStorage pour ne pas renvoyer le compteur à chaque refresh

/*
fetch('http://damienmegy.xyz/php/vf/vf_record.txt?stamp='+ (new Date()).getTime())
  		.then(response => response.text())
  		.then((data) => {
			record=data;
			document.getElementById("record").innerHTML=record; // au lieu de tout réactualiser
	  })
	  
*/










// - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - -

// - - - - - - F O N C T I O N S - - - - - - - - 

// fonctions pour
// pts du moi,s quiz finis ce momi,s cette semaine (nb de jours en param : 1, 7 ou 30)
// attention, check le jour/la date ?



function activiteRecente(){
	console.log("calcul de l'activité récente");
	let now=new Date();

	let sixHeures=new Date(now.getFullYear(),now.getMonth(),now.getDate(),6);
	let huitHeures=new Date(now.getFullYear(),now.getMonth(),now.getDate(),8);
	let midi=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
	let quatorzeHeures=new Date(now.getFullYear(),now.getMonth(),now.getDate(),14);
	let dixhuitHeures=new Date(now.getFullYear(),now.getMonth(),now.getDate(),18);
	let vingtHeures=new Date(now.getFullYear(),now.getMonth(),now.getDate(),20);

	// retourne les nouvelles propriétés, on pourra actualiser user avec la syntaxe spread
	let a={
		"points":0,
		"pointsAujourdhui":0,
		"points24h":0,
		"pointsSemaine":0,
		"points7j":0,
		"pointsMois":0,
		"points30j":0,
		"quizAujourdhui":0,
		"quizCeMatin":0,
		"quizCeMidi":0,
		"quizCeSoir":0,
		"quiz24h":0,
		"quizSemaine":0,
		"quiz7j":0,
		"quizMois":0,
		"quiz30j":0,
		"perfectsAujourdhui":0,
		"perfects24h":0,
		"perfectsSemaine":0,
		"perfects7j":0,
		"perfectsMois":0,
		"perfects30j":0,
		"serieJustesHeures": 	new Array(24*30).fill(0),
		"serieJustesJours": 	new Array(30).fill(0),
		"serieNeutresHeures": 	new Array(24*30).fill(0),
		"serieNeutresJours": 	new Array(30).fill(0),
		"serieFaussesHeures": 	new Array(24*30).fill(0),
		"serieFaussesJours": 	new Array(30).fill(0),
		"seriePointsHeures": 	new Array(24*30).fill(0),
		"seriePointsJours": 	new Array(30).fill(0),
		"serieQuizHeures": 		new Array(24*30).fill(0),
		"serieQuizJours": 		new Array(30).fill(0),
	}


	for(let ajout of historique.pointsGagnes){
		let diffTemps = new Date() - new Date(ajout.date);
		// on ne peut pas checker les points aggnés sur les quiz finis
		// des points sont suceptibles d'être octoyés hors quiz:
		// anniversaires, cadeaux temporels etc ?
		a.points+=ajout.points; // tous les points
		if(isToday(ajout.date))
			a.pointsAujourdhui+=ajout.points;
		if(diffTemps < 24*3600*1000)
			a.points24h+=ajout.points;
		if(isThisWeek(ajout.date))
			a.pointsSemaine+=ajout.points;
		if(diffTemps < 7*24*3600*1000)
			a.points7j+=ajout.points;
		if(isThisMonth(ajout.date))
			a.pointsMois+=ajout.points;
		if(diffTemps < 30*24*3600*1000){
			a.points30j+=ajout.points;
			// pour le grphe des activités récentes :
			a.seriePointsJours[Math.floor(diffTemps/(24*3600*1000))]+=ajout.points;
			a.seriePointsHeures[Math.floor(diffTemps/(3600*1000))]+=ajout.points;
		}


		// calculer les points gagnés sur 24h heure par heure, sur 7j jour par jour, sur 30j idem
		// pour le graphique
	}

	for(let q of historique.quizFinis){
		
		let d=new Date(q.fin);
		let diffTemps = new Date() - d;

		if(sixHeures < d && d < huitHeures)
			a.quizCeMatin=1;
		if(midi < d && d < quatorzeHeures)
			a.quizCeMidi=1;
		if(dixhuitHeures < d && d < vingtHeures)
			a.quizCeSoir=1;

		if(isToday(d)){
			a.quizAujourdhui++;
			if(q.note==20) a.perfectsAujourdhui++;
		}
		if(diffTemps <24*3600*1000){
			a.quiz24h+=1;
			if(q.note==20) a.perfects24h++;
		}
		if(isThisWeek(d)){ // bug ici ?
			a.quizSemaine+=1;
			if(q.note==20) a.perfectsSemaine++;
		}
		if(diffTemps <7*24*3600*1000){
			if(q.note==20) a.perfects7j++;
			a.quiz7j+=1;
		}
		if(isThisMonth(d)){
			if(q.note==20) a.perfectsMois++;
			a.quizMois+=1;
		}
		if(diffTemps <30*24*3600*1000){
			a.quiz30j+=1;
			if(q.note==20) a.perfects30j++;
			// pour le graphe des activités récentes : 
			a.serieFaussesJours[Math.floor(diffTemps/(30*24*3600*1000))*30]+=q.repFausses;
			a.serieFaussesHeures[Math.floor(diffTemps/(24*30*3600*1000))*24*30]+=q.repFausses;
			a.serieNeutresJours[Math.floor(diffTemps/(30*24*3600*1000))*30]+=q.repNeutres;
			a.serieNeutresHeures[Math.floor(diffTemps/(24*30*3600*1000))*24*30]+=q.repNeutres;
			a.serieJustesJours[Math.floor(diffTemps/(30*24*3600*1000))*30]+=q.repJustes;
			a.serieJustesHeures[Math.floor(diffTemps/(24*30*3600*1000))*24*30]+=q.repJustes;
			a.serieQuizJours[Math.floor(diffTemps/(30*24*3600*1000))*30]+=1;
			a.serieQuizHeures[Math.floor(diffTemps/(24*30*3600*1000))*24*30]+=1;
		}
	}

	return a;

}

function noScroll(){
	document.getElementsByTagName('body')[0].style.overflow='hidden';
}
function scroll(){
	document.getElementsByTagName('body')[0].style.overflow='';
}

function afficherTrophees(){
	let e=document.getElementById("listeTrophees");
	e.innerHTML=""; //  on vide : vider à chaque fois ?? bof
	if(user.trophees.length==0)
		e.innerHTML=`<p>Les récompenses s'afficheront ici (records de points gagnés, séries de bonnes réponses d'affilée, de jours actifs d'afilée etc).</p>`;
	for(let i=0;i<user.trophees.length;i++){
		e.innerHTML = htmlTrophee(user.trophees[i])+e.innerHTML; // on affiche en haut de la liste
	}
	goto("trophees");
}




function afficherThemes(){
	// fonction lancée lorsque l'user clique pour voir les thèmes
	// on vide #themes, et on redessine, avec les nouveaux points par chapitre, et les nouveaux avancements sur les thèmes
	// on pourrait dessiner ça au tout début et pas à chaque fois, mais:
	// 1. on devrait updater certains contenus (pts/chapitre, progression des thèmes)
	// 2. ça nécessite d'avoir chargé tout le data lors de l'execution de app.js
	// D'autre part, redessiner tous les boutons est très rapide
	
	document.getElementById("themes").replaceChildren();

	for (let idChap in chapitres){
		let nomDuChapitre=chapitres[idChap].nom;
		let themesDuChapitre=chapitres[idChap].themes;
		document.getElementById("themes").insertAdjacentHTML("beforeend",`
			<h4>
				<svg class="svg-icone sync"  viewBox="0 0 576 512" data-action="html" data-param="svgPathFasFolderOpen"></svg>
				 ${nomDuChapitre} 
				<span class="sync" data-action="html" data-param="htmlStatsChapitre('${idChap}')"></span>
			</h4>`);
		document.getElementById("themes").insertAdjacentHTML("beforeend",`<div id='chapitre_${idChap}' class='margin-l-r'></div>`);

		chapitres[idChap].points=0;
		for(let idTheme of themesDuChapitre){
			calculerStatsTheme(idTheme);
			chapitres[idChap].points+=themes[idTheme].points;
			document.getElementById("chapitre_"+idChap).insertAdjacentHTML("beforeend",htmlBoutonTheme(idTheme));

			// update variables css pour l'affichage des progressions sur le bouton
			let el=document.getElementById("boutonTheme_"+idTheme);
			if(el!=null){
				el.style.setProperty('--progression', themes[idTheme].progression);
			}

		}
	}
	document.getElementById("themes").insertAdjacentHTML("beforeend",`
		<p>Les chapitres de niveau bac+1 sont encore expérimentaux : ils sont parfois très courts, et il peut y avoir des erreurs de mise en forme LaTeX sur les derniers.</p>
		<p>À moyen-terme, cette base de données (pour l'instant personnelle) va fusionner avec plusieurs autres bases, en particulier la base de QCMs du site exo7 et plusieurs centaines de nouvelles questions apparaitront ici (vrai-faux ou QCMs). Les questions seront accessibles via le compte github d'exo7, et un export sera disponible aux formats AMC et Moodle. Tout ceci est en préparation !</p>
		<p>À plus long terme, les questions de niveau prépa-agreg de la page <a href="https://dmegy.perso.math.cnrs.fr/agreg/" target="_blank">https://dmegy.perso.math.cnrs.fr/agreg</a> seront également intégrées à exo7 et donc automatiquement intégrées à cette application.</p>`);
	// NE PAS METTRE DE LATEX DANS LES ETIQUETTES ! PREFERER UNICODE.


	// préchargement de MathJax : 
	document.getElementById('themes').insertAdjacentHTML("beforeend",'<span id="formuleSecrete" style="visibility:hidden">Test MathJax: $\\int_{\\mathbb R} e^{-x^2} dx = \\sqrt\\pi$.<br></span>');
	actualiserMathJax();


	goto('themes');
}




function calculerStatsTheme(id){
	// actualisation des stats du theme
	// fonction lancée lors de l'affichage de la liste des thèmes
	// et non pas seulement lors de la complétion d'un quiz 
	// car on a pu commence un quiz et réussir des questions
	let t=themes[id]; // pointeur

	t.nbQuestionsVues=0;
	t.nbQuestionsReussies=0;
	t.nbQuestionsConsolidees=0;

	for(let i=0;i<t.questions.length;i++){
		if(questions[t.questions[i]].nbVues>=1){
			t.nbQuestionsVues++;}
		if(questions[t.questions[i]].dernierScore==1){
			t.nbQuestionsReussies++;} 
		if(questions[t.questions[i]].scoreRecent>barre){
			t.nbQuestionsConsolidees++;}
	}
	t.progression 					= Math.floor(100*t.nbQuestionsReussies/t.nbQuestions);
	t.progressionConsolidee = Math.floor(100*t.nbQuestionsConsolidees/t.nbQuestions);

	
}



function afficherInfoTheme(id){ // lorsqu'on clique sur un thème :
	console.log("afficherInfoTheme de "+id);
	calculerStatsTheme(id);
	let t=themes[id];// pointeur
	theme = JSON.parse(JSON.stringify(t)); // theme courant : on pourrait remplacer par juste l'id courant
	//theme.id=id; // déjà fait au démarrage
	
	// barres de progression circulaires:
	// faire une fonction d'affichage / un composant
	document.documentElement.style.setProperty('--progress-vues', `${360*t.nbQuestionsVues/t.nbQuestions}deg`);
	document.documentElement.style.setProperty('--progress-reussies', `${360*t.nbQuestionsReussies/t.nbQuestions}deg`);
	document.documentElement.style.setProperty('--progress-consolidees', `${360*t.nbQuestionsConsolidees/t.nbQuestions}deg`);

	
	// on teste s'il y a une question récemment ratée pour désactiver le bouton "réviser les erreurs"
	let temp = theme.questions.filter( n => questions[n].dernierScore<=-1)
	if(temp.length==0){
		document.getElementById("boutonErreurs").style.display="none";
	} else {
		document.getElementById("boutonErreurs").style.display="";
	}


	goto("info");
	

	// lancement automatique : (la barre de progression est gérée en css, le style est ptogrammé pour 15 secondes)
	// éventuellement permettre d'avoir des temps différents avec des variables css
	 timeoutQuiz = window.setTimeout(demarrerQuiz,15000); // si modif de temps, modifier le css également
}




let demarrerQuiz = function(seuil=1){// seuil est le seuil pour selectionner les questions
	// par rapport au dernier score : <=-1 pour les questions ratées au dernier essai,
	// ou bien <=0 pour ratées ou sautées
	// valeur 1 par défaut, c'est-à-dire ttes les questions

	// démarrer un quiz aléatoire sur le thème préselectionné (variable globale "theme")

	// on duplique mais attention, transforme les dates en chaînes :
	quiz = JSON.parse(JSON.stringify(theme)); 


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
	// on devrait colorier, ou alors à la correction


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







// - - - -   A C T U A L I S A T I O N   A F F I C H A G E - - - - 

function goto(e,mathjax=true){

	window.clearTimeout(timeoutQuiz);

	if(etat=="themes"){
		// enregistrer le scoll actuel
	}
	etatPrecedent=etat; // au cas où
	etat=e;

	// aide visuelle en haut pour savoir où on est
	// refaire, pas assez visible

	if(e=="accueil" || e=="themes" || e=="user" || e=="trophees"){
		document.querySelectorAll(".menu").forEach((el)=>{el.classList.remove('svg-superstrong-glow');});
		document.getElementById("menu-"+e).classList.add("svg-superstrong-glow");
	}

	// activation/désactivation du scroll :

	if(e=='themes' || e=='trophees'||e=='info'){
		// scroller à l'ancien scroll ?
		window.scrollTo(0,0); 
		scroll();
	}
	else{
		window.scrollTo(0,0); 
		noScroll();
	}
	actualiserAffichage();

	if(mathjax){// ceci permet de faire goto sans réactualiser mathjax si on en veut pas, par exemple au démarrage
		actualiserMathJax();
	}
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

function actualiserAffichage(){ // l'angular du pauvre :
	let t=new Date().getTime();
	document.querySelectorAll(".sync").forEach((el, i) => {
		let f=window[el.dataset.action];//la fonction
		let param=el.dataset.param;// avant eval
		let paramEvalue = eval(param);//peut-on éviter ceci ??
		if(typeof(f)=='function'){
			f(el,paramEvalue);
		}else{
			console.log(el.dataset.action+" n'est pas une fonction")
		}
	});
	console.log("Page rendue en "+(new Date().getTime()-t)+" ms");
}


function actualiserMathJax(){
	if(typeof(MathJax)!= 'undefined') {// si MathJax est chargé, on relance le rendu
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	} else { // sinon, on le recharge et on relance le rendu en callback
		getScript('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML', function() {
    // relancer le rendu ? Mais ça provoque une erreur ?
		});
	}
}

function actualiserBarres(a,b,c){ // entrées : valeurs entre 0 et 100, somme <100 si possible...
	// actualisation des longueurs des barres de progression
	document.getElementById("progress-rouge").style.width=a+"%";
	document.getElementById("progress-jaune").style.width=b+"%";
	document.getElementById("progress-vert").style.width=c+"%";

}

// - - - -   A C T U A L I S A T I O N   D E   D O N N E E S  - - - - 

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




/* Ceci était auparavant dans un event DOMContentLoaded, mais c'est maintenant inutile.
Comme tous les scripts sont en defer, aucun risque, les questions et chapitres sont déjà arrivés.
Il est déjà arrivé que MathJax prenne plus de 10 secondes à loader : 
dans ce cas, le window.onload n'arrive pas, mais ça ne bloque pas l'application. */

// on prend les choses dans le localstorage et on réinitialise ce qui doit l'être
// on est dnas le onload donc tous les scripts etc sont chargés.

if (isLocalStorageEnabled()) { // si localStorage est supporté :
	if (window.localStorage.getItem("premiereConnexion") !== null) 
		messageAccueil="Te revoilà !";
	else
		window.localStorage.setItem("premiereConnexion",JSON.stringify(new Date()));

	console.log("local storage supporté");
	if (window.localStorage.getItem("points") !== null) 
	  points=parseInt(window.localStorage.getItem('points'),10);

	if (window.localStorage.getItem("historique") !== null) 
	  historique= JSON.parse(window.localStorage.getItem('historique'));

	if (window.localStorage.getItem("user") !== null) 
	  user= {...user,...JSON.parse(window.localStorage.getItem('user'))};

	if (window.localStorage.getItem("questions") !== null){
		questions= JSON.parse(window.localStorage.getItem('questions'));
	 } else {
	 	questions=structuredClone(_questions);
	 	for(let i=0;i<questions.length;i++){
	 		// on rajoute des propriétés vides aux questions (stats de la question)
			// dernière vue sera une date quand on aura vu la question
			let nouvellesProp={'derniereVue':0,'points':0,'nbVues':0,'scoreMoyen':0,'scoreRecent':0,'dernierScore':0,'resultat':0};
			questions[i]={...questions[i],...nouvellesProp};
		}
	 }

	 if (window.localStorage.getItem("themes") !== null){
		themes= JSON.parse(window.localStorage.getItem('themes'));
	 } else {
	 	themes=structuredClone(_themes);
	 	for(id in themes){
	 		let nouvellesProp={
	 			'id':id, //pratique, chaque theme contient son id
				'nbQuestions':themes[id].questions.length, // pratique aussi
				'nbQuestionsVues':0,
				'nbQuestionsReussies':0,
				'nbQuestionsConsolidees':0,
				'progression':0,
				'progressionConsolidee':0,
				'points':0 		//pts gagnés sur ce thème, update en fin de quiz
			};
			themes[id]={...themes[id],...nouvellesProp}; // on rajoute les nouvelles propriétés
		}
	}

	 if (window.localStorage.getItem("chapitres") !== null){
		chapitres= JSON.parse(window.localStorage.getItem('chapitres'));
		// ATTENTION ?
		chapitres={...chapitres,...structuredClone(_chapitres)};// on récupère les nouveaux chapitres éventuels ?
	 } else {
	 	chapitres=structuredClone(_chapitres);
	 	
	}
	

} else{
	console.log("localStorage n'est pas supporté");
}

for(id in chapitres){
		chapitres[id].points= chapitres[id].points || 0;
}



user={...user,...activiteRecente()}; 
// on remet l'activité récente une fois l'historique chargé à partir du localstorage
// (par sécurité, pour anciennes versions de l'app)





// le input pour l'upload de photos de profil
const uploadFile=document.getElementById("inputTag");
uploadFile.addEventListener('change', async (evt) => {
	let taille=96; // taille de l'image carrée, après recadrage et redimmension
	let file = evt.currentTarget.files[0];
	if(!file) return;

	let b64str = await readFileAsDataURL(file);

	let _IMG = await loadImage(b64str);

	const inputWidth = _IMG.naturalWidth;
  const inputHeight = _IMG.naturalHeight;
  const petitCote = Math.min(inputWidth,inputHeight);
  const debutX=(inputWidth-petitCote)/2;
  const debutY=(inputHeight-petitCote)/2;
	let canvas = document.createElement("canvas");
	canvas.width = taille;
	canvas.height = taille;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(_IMG, debutX,debutY,petitCote,petitCote,0,0,taille,taille);
	let avatarImg = document.getElementById('avatarImg');
	// compression puis création de la dataURL
	let avatarURL=canvas.toDataURL("image/jpeg", 0.8);
	// on affiche l'image :
	avatarImg.src=avatarURL;
	// on enlève le cercle en pointillés puis on affiche l'image
	document.getElementById("avatarDisque").classList.remove('avatar-manquant');
	document.getElementById("avantAvatar").style.display="none";// l'icone d'image manquante
	avatarImg.style.display="block";
	// on sauvegarde l'image dans le storage :
	user.avatar=avatarURL;
	sauvegarder();
}, false);

// s'il y a une image d'avatar dans le storage, on l'affiche
if(user.avatar!=""){
	document.getElementById("avantAvatar").style.display="none";
	let avatarImg = document.getElementById("avatarImg");
	avatarImg.src=user.avatar;
	document.getElementById("avatarDisque").classList.remove("avatar-manquant");
	avatarImg.style.display="block";
}






goto("accueil",false);
// ceci réactualise, pour afficher les points, l'icône personnalisée etc, mais sans mathjax, donc sans lancer le chargement du script







// ceci s'execute quand le DOM est prêt car le scrit est en defer
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('font')){
	const font = urlParams.get('font');
	document.body.style.fontFamily=font;
}

const setFont = (f)=>{
	document.body.style.fontFamily=f;
}



window.onload=function(){
	// on lance mathjax, mais sans rien à mettre en forme, juste pour les premiers fichiers.
	//Une formule invisible sera ajoutée dans la page "thèmes" pour précharger un peu les choses, mais pas à la page de démarrage
	getScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML",()=>{
	//MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
});
}


/* - - - -- -  TODO

minifier le js, par exemple les composants
mettre les fonctions utilisées par les composants dans composants.js, ou dans app.js pour les autres
décider si on inline les fonts en base64, si on met du svg parfois (premières icones), etc
décider si on changer de police avec Nunito ? (google font donc open source)
mettre en place un choix de loader flexible, changeable facilement, mais avant, accélérer le vrai chargement avec les svg etc
coder quelques loader reliés aux maths, qui ne seront pas partout djavus


- plus de questions, thèmes et chapitres
- fabriquer les chapitres des questions de Maxime pour les séries, l'analyse asymtotique etc




*/
