//todo
// bugs dûs au fait qu'on veut synx tout, même les choses non visibles
// par exemple l'écran de fin avec la note, et donc avec l'icone de note
// or ceci est dans app2.js
// changer actualiserAffichage pour checker si un element est visible avant de lui appliquer la méthode "html" ?


// - - - - - - - - - - - - - - - - - - - - - - -

// PETITE APPLI DE QUIZ MATHÉMATIQUES

// Auteur : Damien Mégy
// Domaine public


// TODO : remplacer les unshift par des push, qui sont plus rapides ?
// actuellement les trophées et messages sont push/pop



// - - - - - - V A R I A B L E S - - - - - - - - 


let premiereVue=true;
let sessionEnCours=false;

// transformation nombres en b64
const digit="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
toB64=x=>x.toString(2).split(/(?=(?:.{6})+(?!.))/g).map(v=>digit[parseInt(v,2)]).join("");
fromB64=x=>x.split("").reduce((s,v)=>s*64+digit.indexOf(v),0);



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

let t0=new Date();
/* ATTENTION faire le ménage dans les propriétés*/
let user={
	"premiereConnexion":t0,
	"userId":toB64(t0.getTime()),
	"pseudo":"user"+toB64(t0.getTime()), 
	"avatar":"", /* type : dataURL*/
	"affiliationEtablissement":"",
	"affiliationClub":"",
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
const isSessionStorageEnabled = () => {
  try {
    const key = `__session__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
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
	console.log("sauvegarde");
	// enregistrement des résultats en local :
	if (typeof(Storage) !== "undefined") {
		console.log("progression quadrilatères : "+themes["quadrilateres"].progression);

		window.localStorage.setItem('questions',JSON.stringify(questions));
		window.localStorage.setItem('themes',JSON.stringify(themes));
		window.localStorage.setItem('chapitres',JSON.stringify(chapitres));
		window.localStorage.setItem('user',JSON.stringify(user));
		window.localStorage.setItem('historique',JSON.stringify(historique));
	}
}













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


// on devrait toujours laisser scroller et voilà, non ? Du moment qu'on masque la barre de défilement ?
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
	
	// on vide tout :
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
		for(let idTheme of themesDuChapitre){// deuxième boucle for

			calculerStatsTheme(idTheme);
			chapitres[idChap].points+=themes[idTheme].points;


			document.getElementById("chapitre_"+idChap).insertAdjacentHTML("beforeend",htmlBoutonTheme(idTheme));

			// update variables css pour l'affichage des progressions sur le bouton
			// l'élément a été créé par le composant
			document.getElementById("boutonTheme_"+idTheme).style.setProperty('--progression', themes[idTheme].progression);


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
	// entrée : un *id* de thème, et non le thème lui-même !
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
	theme = structuredClone(t); // theme courant : on pourrait remplacer par juste l'id courant
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







// - - - -   A C T U A L I S A T I O N   A F F I C H A G E - - - - 

function goto(e,refreshMathJax=true){
	// ne pas essayer de sauvegarder des le début, les champs input n'existent pas encore
	if(!premiereVue){
		user.pseudo = document.getElementById("inputPseudo").value;
		user.affiliationClub=document.getElementById("inputClub").value;
		user.affiliationEtablissement=document.getElementById("inputEtablissement").value;
		window.localStorage.setItem('user',JSON.stringify(user)); // on enregistre le pseudo etc tt de suite

	}
	else
		premiereVue=false;

	window.clearTimeout(timeoutQuiz); // les lancements automatiques
	// on devrait peut-être enregistrer le scroll actuel ?
	etatPrecedent=etat; // au cas où
	etat=e; //on change d'état

	// aide visuelle en haut pour savoir où on est
	// refaire, pas assez visible

	if(e=="accueil" || e=="themes" || e=="user" || e=="trophees"){
		document.querySelectorAll(".menu").forEach((el)=>{el.classList.remove('svg-superstrong-glow');});
		document.getElementById("menu-"+e).classList.add("svg-superstrong-glow");
	}

	// activation/désactivation du scroll :
	window.scrollTo(0,0); // scroller à l'ancien scroll à la place ?
	if(e=='themes' || e=='trophees'||e=='info'){
		scroll();
	}
	else{
		noScroll();
	}
	actualiserAffichage();

	
	
	if(refreshMathJax){// par défaut, ==true
		// ceci permet de faire goto sans réactualiser mathjax si on en veut pas, 
		// par exemple au démarrage, puisque MathJax n'est pas encore chargé
		actualiserMathJax();
	}
}


/*function actualiserAffichage(selecteur="body"){ // l'angular du pauvre :
	let t=new Date().getTime();
	// le target dans lequel on va sync les machins. Par défaut c'est tout le document
	let target=document.querySelector(selecteur);

	target.querySelectorAll(".sync").forEach((el, i) => {
		if(el.dataset.action=="toggle"){
			el.style.display=eval(el.dataset.param);
		}
		else if (el.dataset.action=="html"){

			let paramEvalue=eval(el.dataset.param);
			//console.log("l'élément "+el+ " est visible, on tente de changer son innerHTML avec "+paramEvalue);
			el.innerHTML=paramEvalue;
		}
		else {
			console.log(`actualiserAffichage() : action ${el.dataset.action} non autorisée.`)
		}
	});
	console.log("Page rendue en "+(new Date().getTime()-t)+" ms");
}*/


//les noms sont hérités de l'ancienne version
window.toggle = function (el,bool) { // attention c'est pas un vrai toggle, il y a bool
    el.style.display = bool ? '' : 'none';
}
window.html = function (el,content){
	el.innerHTML=content;
}


function actualiserAffichage(selecteur="body"){ // l'angular du pauvre :
	let t=new Date().getTime();
	// le target dans lequel on va sync les machins. Par défaut c'est tout le document
	let target=document.querySelector(selecteur);

	target.querySelectorAll(".sync").forEach((el, i) => {
		let f=window[el.dataset.action];//la fonction
		let param=el.dataset.param;// avant eval
		let paramEvalue = eval(param);//peut-on éviter ceci ??
		if(typeof(f)=='function'){
			f(el,paramEvalue);
		}else{
			console.log(el.dataset.action+" n'est pas une fonction")
		}
	});
	// - - - - - - - 
	// remettre les bonnes valeurs dans les inpu d'affiliation etc 
	document.getElementById("inputPseudo").value=user.pseudo;
	let inputClub = document.getElementById("inputClub");
  for (var i = 0; i < inputClub.options.length; ++i) {
    if (inputClub.options[i].text === user.affiliationClub)
      inputClub.options[i].selected = true;
  }
  let inputEtablissement = document.getElementById("inputEtablissement");
  for (var i = 0; i < inputEtablissement.options.length; ++i) {
    if (inputEtablissement.options[i].text === user.affiliationEtablissement)
      inputEtablissement.options[i].selected = true;
  }
  //- - - - - - - --



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






/* Ceci était auparavant dans un event DOMContentLoaded, mais c'est maintenant inutile.
Comme tous les scripts sont en defer, aucun risque, les questions et chapitres sont déjà arrivés.
Il est déjà arrivé que MathJax prenne plus de 10 secondes à loader : 
dans ce cas, le window.onload n'arrive pas, mais ça ne bloque pas l'application. */

// on prend les choses dans le localstorage et on réinitialise ce qui doit l'être
// on est dnas le onload donc tous les scripts etc sont chargés.

function demarrage(){
	console.log("Demarrage")


	questions=structuredClone(_questions);
 	for(let i=0;i<questions.length;i++){
		let nouvellesProp={'derniereVue':0,'points':0,'nbVues':0,'scoreMoyen':0,'scoreRecent':0,'dernierScore':0,'resultat':0};
		questions[i]={...questions[i],...nouvellesProp};
	}

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

	chapitres=structuredClone(_chapitres);




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



		
		// maintenant on rajoue ceu qu'il y avait dans le storage, qui écrase ce qui précède
		if (window.localStorage.getItem("questions") !== null){
			// les questions dans le storage écrasent les autres, mais il pouvait y en avoir de nouvelles dans questions.js
			let questionsStockees = JSON.parse(window.localStorage.getItem('questions'));
			for (let i = 0 ; i < questionsStockees.length;i++){
				questions[i]= structuredClone(questionsStockees[i]);
			}
			
		 }


		if (window.localStorage.getItem("themes") !== null){
			themes= {...chapitres, ...JSON.parse(window.localStorage.getItem('themes'))};
		 } 

		 if (window.localStorage.getItem("chapitres") !== null){
			chapitres= {...chapitres,...JSON.parse(window.localStorage.getItem('chapitres'))};
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

	document.querySelectorAll(".inerte").forEach((el)=>{
		el.classList.remove("inerte");
	});



	goto("accueil",false);
	// ceci réactualise, pour afficher les points, l'icône personnalisée etc, mais sans mathjax, donc sans lancer le chargement du script

	// fin de la fonction de démarrage
}
















// ceci s'execute quand le DOM est prêt car le scrit est en defer
// ceci permet de changer la fonte dans l'url, pour comparer

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('font')){
	const font = urlParams.get('font');
	document.body.style.fontFamily=font;
}

const setFont = (f)=>{
	document.body.style.fontFamily=f;
}







// - - - - GESTION DE L'UPLOAD D'AVATAR - - - - - -

// retourne une promesse d'image avec une url loadée dedans
const loadImage = (url) => new Promise((resolve, reject) => {
   const img = new Image();
   img.addEventListener('load', () => resolve(img));
   img.addEventListener('error', (err) => reject(err));
   img.src = url;
});

// prend un type file (récupéré dans un 'input file') et le met dans un filereader
// retourne une promesse de dataURL de ceci
function readFileAsDataURL(file) {
  return new Promise((resolve,reject) => {
    let fileredr = new FileReader();
    fileredr.onload = () => resolve(fileredr.result);
    fileredr.onerror = () => reject(fileredr);
    fileredr.readAsDataURL(file);
  });
}



function getScript(scriptUrl, callback) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = callback;

    document.body.appendChild(script);
}






// fonction générales:
// - - - - - - - - - - - - - - - - - - - - - - - - -


// utilisé pour afficher le niveau sur un thème (avec les points gagnés sur ce thème), ou globalement

const  niveau = (points) => {
	if(points<20)
		return 0;
	else 
		return Math.floor(Math.log(points/10)/Math.log(2));
}


const prochainPalier = (points) => {// on retourne la prochaine (puissance de 2 multiplée par 10)
		return 10* (2**(niveau(points)+1))
}

const triplet = (r=0) =>{ // r vaut 1, 0 ou -1, c'est le résultat à une question
	let t=[0,0,0];
	if(r==1)
		t=[0,0,1];
	else if (r==0)
		t=[0,1,0];
	else if (r==-1)
		t=[1,0,0];
	else
		console.log("résultat non valable");
	return t;
}







function tempsAujourdhui(){ // millisecondes aujourd'hui
	const d= new Date();
	return 1000*(d.getHours()*3600+d.getMinutes()*60+d.getSeconds());
}

function debutJournee(){ // retourne une date 
	const d=new Date();
	return new Date(d.getFullYear(), d.getMonth(), d.getDate() );
}

function debutSemaine(){ // retourne une date 
	const d=new Date();
	return new Date(d.getFullYear(), d.getMonth(), d.getDate()-d.getDay() );
}

function debutMois(){ // retourne une date 
	const d=new Date();
	return new Date(d.getFullYear(), d.getMonth() );
}





const isThisMonth = (someDate) => {
	someDate=new Date(someDate);// au cas où la date a été tansformée en chaîne
  const today = new Date();
  return someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear();
}


const isToday = (someDate) => {
	someDate=new Date(someDate);// au cas où la date a été tansformée en chaîne
  const today = new Date();
  return someDate.getDate() == today.getDate() && isThisMonth(someDate) ;
}



const isThisWeek = (someDate) => {
	someDate=new Date(someDate);// au cas où la date a été tansformée en chaîne
	const today = new Date();
	return getWeekNumber(someDate) == getWeekNumber(today) &&  someDate.getFullYear() == today.getFullYear();
}

const  getWeekNumber = (d) => {
	d= new Date(d);
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}





function tripletQuestions(){
	let reussies=0, sautees=0, ratees=0;
	for (let q of historique.questionsVues){
		// pour questions aujourd'hui
		if(isToday(new Date(q.debut))){
				if( q.resultat == 1 ){
					reussies += 1;
				} else if ( q.resultat == 0 ){
					sautees += 1
				} else {
					ratees +=1;
				}
				
		} else{ // on a dépassé la date
			break;
		}
		
	}
	let t=[ratees,sautees,reussies];
	return t;
}






// - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - -




const capitaliser = (str) => { // met le première caractère d'une chaîne en capitales
	let r=str.charAt(0).toUpperCase() + str.slice(1);;
	return r;
}



function iconeUser(pts){
	let icone="";
	if(pts>10000)
		icone="FasRobot";
	else if(pts>5000)
		icone="FasUserAstronaut";
	else if(pts>2000)
		icone="FasUserGraduate";
	else if(pts>500)
		icone="FasBookOpenReader";
	else if(pts>20)
		icone="FasUserTie";
	else
		icone="FasUserLarge";
	return icone;
}

// un composant...

function htmlPoints(){
	let s=`<span style="font-weight:400"><span style="position:relative">${user.points} pt`;
	if(user.points>0) s+="s";

	s+=`<span class="notif">Niv. ${niveau(user.points)}</span`;
	s+="</span></span>";
	return s;
}



// - - - - - -  O N L O A D - - - - - - - - - 

window.addEventListener('load',()=>{
	if(isSessionStorageEnabled()){
		if (window.sessionStorage.getItem("foo") !== null) {
			sessionEnCours=true;
		}
	}
	
	// - - - COMPTEUR - - - - - 
	// pas besoin de retour ?
	if(!sessionEnCours){
		console.log("pas de session en cours");
		fetch('https://damienmegy.xyz/php/quiz/compteur.php')
			.then((response) => response.text())
  		.then((data) => console.log(data));
	}

	if(isSessionStorageEnabled()){
		window.sessionStorage.setItem("foo","bar")
	}


});


demarrage(); // le script est en defer donc ceci arrive juste avant le DOMContentLoaded en théorie, après les autres scripts genre composants.js