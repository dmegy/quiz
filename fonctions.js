
function getScript(scriptUrl, callback) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = callback;

    document.body.appendChild(script);
}



//les noms sont hérités de l'ancienne version
window.toggle = function (el,bool) { // attention c'est pas un vrai toggle, il y a bool
    el.style.display = bool ? '' : 'none';
}
window.html = function (el,content){
	el.innerHTML=content;
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




const shuffleArray = (array) => {
	// attention ceci modifie directement le tableau "sur place"
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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


function pointsGagnesEntre(dateA,dateB){
	dateA=new Date(dateA);
	dateB=new Date(dateB); // au cas où dates transformées en chaînes
	let total=0;

	for (let ajout of historique.pointsGagnes){ // en commencant par les plus récents
		// pour les points avant le temps donné
		if(dateA <= ajout.date){
				if (ajout.date <= dateB)
					total+=ajout.points;
		} else{ // on a dépassé dateA, on coupe la boucle
			break;
		}
	}
	return total;
}

function quizValidesEntre(dateA,dateB){
	dateA=new Date(dateA);
	dateB=new Date(dateB); // au cas où dates transformées en chaînes
	let total=0;

	for (let ajout of historique.quizFinis){ // en commencant par les plus récents
		// pour les points avant le temps donné
		if(dateA <= ajout.date){
				if (ajout.date <= dateB)
					total+=1;
		} else{ // on a dépassé dateA, on coupe la boucle
			break;
		}
	}
	return total;
}


function actifEntre(x,y){
	//retourne un booléen : 
	// est-ce qu'il y a eu un quiz validé aujourd'hui entre les heures x et y ?
	let d=new Date();
	let dateA=new Date(d.getFullYear(),d.getMonth(),d.getDate(),x);
	let dateB=new Date(d.getFullYear(),d.getMonth(),d.getDate(),y);
	return (quizValidesEntre(dateA,dateB)>0);
}



// - - - - - - - - - - - - - - - - - - - - - - - - -


const capitaliser = (str) => { // met le première caractère d'une chaîne en capitales
	let r=str.charAt(0).toUpperCase() + str.slice(1);;
	return r;
}



const saveTemplateAsFile = (filename, dataObjToWrite) => {
	// enregistre/downloade un objet dans un fichier texte chez l'utilsateur
	// objet -> JSON.stringify -> Blob json -> URL -> link puis clique le link
    const blob = new Blob([JSON.stringify(dataObjToWrite, null, 4)], { type: "text/json" });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
};



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

