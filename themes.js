// - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - C O N T E N U - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - 
// - - T H E M E S  *E T*  C H A P I T R E S -
// - - - - - - - - - - - - - - - - - - - - - - 

const range = (start, stop) => Array.from({ length: stop - start + 1}, (_, i) => start + i);


// la liste de thèmes est chargée en synchrone, avant le moteur de l'appli.
// constante : l'objet sera copié

const _themes={
	"abs1":{
		"etiquette" : "Valeur absolue",
		"niveau":-1,
		"titre" : "Valeur absolue",
		"info" : "Questions de base, trier questions",
		"questions" : range(1,20)
	},
	"analyse1":{
		"etiquette" : "Analyse 1",
		"niveau":0,
		"titre" : "Analyse, première partie",
		"info" : "Un peu d'analyse. Fonctions paires, impaires, dérivables, continues.",
		"questions" : range(21,34)
	},
	"applications":{
		"etiquette" : "Applications",
		"niveau":1,
		"titre" : "Applications entre ensembles",
		"info" : "Injections, surjections, bijections. Images, images réciproques etc.<br>Les mots 'fonction' et 'application' sont synonymes.<br>Sauf précision supplémentaire, les applications vont d'un ensemble $E$ dans un ensemble $F$.",
		"questions" : range(35,61)
	},
	"app_lin1":{
		"etiquette" : "Appl. linéaires",
		"niveau":1,
		"titre" : "Applications linéaires",
		"info" : "Des questions sur les applications linéaires en dimension quelconque.<br><b>Notations:</b> Les lettres $E$, $F$ et $G$ désignent des espaces vectoriels. L'ensemble des endomorphismes d'un espace vectoriel $E$ est noté $\\mathcal{L}(E)$.<br> Si une assertion n'est pas bien définie, on demande de répondre 'Faux'.",
		"questions" : [...range(62,92),...range(1213,1219)]
	},
	"arithmetique1":{
		"etiquette" : "Arithmétique 1",
		"niveau":-3,
		"titre" : "Arithmétique, première partie",
		"info" : "Divisibilité, diviseurs, nombres premiers. Pas de congruences.",
		"questions" : range(93,116)
	},
	"multiplication1":{
		"etiquette" : "Multiplications",
		"niveau":-4,
		"titre" : "Multiplications",
		"info" : "Multiplications à deux chiffres.",
		"questions" : range(1305,1337)
	},
	"tables_logique1":{
		"etiquette" : "Tables et logique",
		"niveau":-3,
		"titre" : "Tables et logique",
		"info" : "Tables de multiplication et connecteurs logiques «et» et «ou».",
		"questions" : range(117,132)
	},
	"complexes_mult":{
		"etiquette" : "Forme alg.",
		"niveau":0,
		"titre" : "Nombres complexes : forme algébrique",
		"info" : "Multiplications concrètes de nombres complexes, renforcement en calcul. L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon lors des premiers essais) et seulement alors d'augmenter sa rapidité.",
		"questions" : range(133,168)
	},
	"complexes_arg":{
		"etiquette" : "Arguments classiques",
		"niveau":0,
		"titre" : "Nombres complexes : arguments classiques",
		"info" : "Calculs d'arguments concrets simples (ceux correspondant à des valeurs classiques de sinus et cosinus). L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon) et seulement alors d'augmenter sa rapidité.",
		"questions" : range(169,187)
	},
	"complexes_mod":{
		"etiquette" : "Module",
		"titre" : "Nombres complexes : module, conjugaison",
		"niveau":0,
		"info" : "Module, conjugaison, parties réelles et imaginaires.<br>les lettres non définies ($z$, $z'$, $w$ etc) désignent des nombres complexes. On demande de répondre 'VRAI' uniquement si l'assertion est universellement vraie, quelque soient les éventuels paramètres, et de répondre 'FAUX' dans le cas contraire. Par exemple, on répondra 'FAUX' à $|z|=|z|^2$ car même si ça peut exceptionnellement être vrai (pour $z=0$ par exemple), c'est en général faux.",
		"questions" : range(188,211)
	},
	"complexes_geo":{
		"etiquette" : "Géométrie",
		"titre" : "Nombres complexes : géométrie élémentaire",
		"niveau":0,
		"info" : "Triangles, alignement, orthogonalité, quadrilatères, angles. Pas de transformations.<br>Les lettres minuscules non définies ($z$, $z'$, $w$, $a$, $b$ etc) désignent des nombres complexes. Les lettres majuscules désignent des points du plan. Le point $A$ a pour affixe $a$ etc. Tous les points sont distincts.",
		"questions" : range(212,239)
	},
	"derivees1":{
		"etiquette" : "Dérivées 1",
		"titre" : "Dérivées, première partie",
		"niveau":-1,
		"info" : "Dérivées simples, pas de logarithme ni d'exponentielle, pas de primitives.",
		"questions" : range(240,266)
	},
	"derivees2":{
		"etiquette" : "Dérivées 2",
		"titre" : "Dérivées, primitives",
		"niveau":0,
		"info" : "Dérivées et primitives sur le programme de terminale.",
		"questions" : range(267,283)
	},
	"domaines_zero":{
		"etiquette" : "Domaines de def° 1",
		"titre" : "Domaines de définition, 1",
		"niveau":-2,
		"info" : "Détermination de domaines de définition en n'utilisant que l'interdiction de diviser par zéro. Pas de racines carrées, ni de logarithmes.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
		"questions" : range(284,304)
	},
	"domaines_sqrt":{
		"etiquette" : "Domaines 2 (sqrt)",
		"titre" : "Domaines de définition 2 (sqrt)",
		"info" : "Détermination de domaines de définition d'expression comportant des racines carrées.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
		"niveau":-1,
		"questions" : range(305,324)
	},
	"domaines_log":{
		"etiquette" : "Domaines 3 (log)",
		"titre" : "Domaines de définition, 3 (log)",
		"info" : "Détermination de domaines de définition, avec logarithmes. Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
		"niveau":0,
		"questions" : range(325,344)
	},
	"domaines_red":{
		"etiquette" : "Domaines 4 (rédact°)",
		"niveau":0,
		"titre" : "Domaines de définition, 4 (rédaction)",
		"info" : "Différentes rédactions de détermination de domaines de définition. On demande de répondre «Vrai» si la rédaction est correcte, et «Faux» si elle ne l'est pas.",
		"questions" : range(345,363)
	},
	"droites1":{
		"etiquette" : "Droites",
		"niveau":-1,
		"titre" : "Droites et équations",
		"info" : "Géométrie en coordonnées, droites du plan, équations cartésiennes et paramétrages. <br/>Terminologie : l'origine du plan est notée $O$. Les axes de coordonnées (abscisses et ordonnées) partagent le plan en quatre <b>quadrants</b>. Le premier quadrant est le quadrant supérieur droit ($x>0$ et $y>0$). Le deuxième quadrant est le supérieur gauche et les autres suivent dans le sens trigonométrique.",
		"questions" : range(364,384)
	},
	"equations1":{
		"etiquette" : "Équations1",
		"niveau":0,
		"titre" : "Équations 1",
		"info" : "Équations, avec vérification qu'un élément est solution (en injectant).",
		"questions" : range(385,402)
	},
	"ev1":{
		"etiquette" : "Espaces vectoriels",
		"niveau":1,
		"titre" : "Espaces vectoriels 1",
		"info" : "Espaces vectoriels, sous-espaces vectoriels. Familles libres, liées, bases.<br>Attention, la dimension n'est pas forcément finie.",
		"questions" : [...range(403,436),...range(1197,1212)]
	},
	"calcul_litt1":{
		"etiquette" : "Calcul littéral 1",
		"niveau":-2,
		"titre" : "Calcul littéral, 1",
		"info" : "Exercices de calcul littéral : identités remarquables, développement d'expressions avec une variable.",
		"questions" : range(1338,1385)
	},
	"calcul_litt2":{
		"etiquette" : "Calcul littéral 2",
		"niveau":-2,
		"titre" : "Calcul littéral, 2",
		"info" : "Exercices de calcul littéral : identités remarquables, développement d'expressions avec deux variables.",
		"questions" : range(1386,1427)
	},
	"calcul_litt3":{
		"etiquette" : "Calcul littéral 3",
		"niveau":-2,
		"titre" : "Calcul littéral, 3",
		"info" : "Exercices de calcul littéral : développement d'expressions avec deux variables, avec des expressions de degré trois ou plus. (À bac+1, ce sont des identités remarquables à connaître.)",
		"questions" : range(1431,1466)
	},
	"facto1":{
		"etiquette" : "Factorisat°",
		"niveau":-2,
		"titre" : "Factorisation, première partie",
		"info" : "Exercices de calcul littéral, accessible en théorie dès la fin du collège. (Note : il n'y a pas besoin de savoir ce qu'est un discriminant et même si la notion est connue, elle fait perdre beaucoup de temps. La compétence à travailler ici est la factorisation de tête.)",
		"questions" : range(437,465)
	},
	"fractions1":{
		"etiquette" : "Fractions",
		"niveau":-3,
		"titre" : "Fractions2",
		"info" : "Calcul mental et littéral sur les fractions. Les lettres désignent des entiers qui peuvent être quelconques du moment que ça ne provoque pas une division par zéro.",
		"questions" : range(466,485)
	},
	"implication":{
		"etiquette" : "Implication",
		"niveau":1,
		"titre" : "Implication logique. <br>Les symboles $A$ et $B$ désignent des assertions.",
		"info" : "",
		"questions" : range(486,513)
	},
	"inegalites1":{
		"etiquette" : "Inégalités 1",
		"niveau":-1,
		"titre" : "Inégalités 1",
		"info" : "inégalités avec variables, racines carrées, élévation au carré d'inégalités, implications et équivalences.",
		"questions" : range(514,536)
	},
	"isometries_planes1":{
		"etiquette" : "Isométries planes 1",
		"niveau":1,
		"titre" : "Isométries planes, partie 1",
		"info" : "On se place dans leplan euclidien blabla, notations etc",
		"questions" : range(537,574)
	},
	"matrices1":{
		"etiquette" : "Matrices",
		"niveau":1,
		"titre" : "Matrices",
		"info" : "Attention, une matrice est en général rectangulaire !",
		"questions" : [...range(575,600),...range(1226,1232),...range(1188,1196)]
	},
	"complexes_mod1":{
		"etiquette" : "𝕌 et 𝕌<sub>n</sub>",
		"niveau":1,
		"titre" : "Nombres complexes de module un, racines de l'unité",
		"info" : "blabla; Notations.",
		"questions" : range(601,626)
	},
	"predicats":{
		"etiquette" : "Prédicats",
		"niveau":1,
		"titre" : "Calcul des précicats",
		"info" : "La lettre $x$ désigne un nombre réel",
		"questions" : range(627,656)
	},
	"quadrilateres":{
		"etiquette" : "Quadrilatères",
		"niveau":-4,
		"titre" : "Quadrilatères",
		"info" : "Questions sur les quadrilatères : rectangles, carrés, losanges, parallélogrammes, trapèzes etc.",
		"questions" : [...range(657,685),...range(1259,1273),...range(1428,1430)]
	},
	"symetries":{
		"etiquette" : "Symétries",
		"niveau":-4,
		"titre" : "Symétries",
		"info" : "Axes et centres de symétrie des polygones du plan.",
		"questions" : [...range(1274,1304)]
	},
	"quantificateurs1":{
		"etiquette" : "∃ ∀",
		"niveau":1,
		"titre" : "Quantificateurs",
		"info" : "<b>CONSIGNE IMPORTANTE:</b><br>Certaines phrases sont mal formées et n'ont pas de sens mathématique. Dans ce cas, il est demandé de choisir «FAUX».",
		"questions" : range(686,718)
	},
	"sqrt1":{
		"etiquette" : "Racine carrée 1",
		"niveau":-3,
		"titre" : "Racines carrées (sans produits)",
		"info" : "Calculs avec racines carrées : simplifications, factorisations, inégalités.",
		"questions" : range(719,758)
	},
	"sqrt2":{
		"etiquette" : "Racine carrée 2",
		"niveau":-3,
		"titre" : "Racines carrées et produits",
		"info" : "Avec produits, mais sans quotients ni calcul littéral",
		"questions" : range(759,778)
	},
	"sqrt3":{
		"etiquette" : "Racine carrée 3",
		"niveau":-3,
		"titre" : "Racines carrées et fractions",
		"info" : "Racines carrées et fractions, sans calcul littéral",
		"questions" : range(779,806)
	},
	"recap1":{
		"etiquette" : "Recap1",
		"niveau":0,
		"titre" : "Récap terminale",
		"info" : "Vérifier s'il n'y a pas deux thèmes ici",
		"questions" : range(807,858)
	},
	"relations_equiv":{
		"etiquette" : "Rel. d'équiv.",
		"niveau":1,
		"titre" : "Relations d'équivalence",
		"info" : "Sans ensemble quotient",
		"questions" : range(859,903)
	},
	"relations_ordre":{
		"etiquette" : "Rel. d'ordre",
		"niveau":1,
		"titre" : "Relations d'ordre",
		"info" : "Plus grand élément, divisibilité etc..",
		"questions" : range(904,926)
	},
	"rotations_planes1":{
		"etiquette" : "Rotations",
		"niveau":1,
		"titre" : "Rotations planes",
		"info" : "notations, plan, application complexe associée",
		"questions" : range(927,946)
	},
	"systemes1":{
		"etiquette" : "Systèmes 2x2",
		"niveau":1,
		"titre" : "Systèmes à deux équations et deux inconnues",
		"info" : "les variables désignent des nombres réels.",
		"questions" : range(947,975)
	},
	"trigo_valeurs":{
		"etiquette" : "Valeurs classiques",
		"niveau":-1,
		"titre" : "Trigonométrie, 1 : valeurs classiques",
		"info" : "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
		"questions" : [...range(1005,1019),...range(1030,1042)]
	},
	"trigo_formules1":{
		"etiquette" : "Formules",
		"niveau":-1,
		"titre" : "Trigonométrie 2 : formules de base",
		"info" : "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
		"questions" : [...range(976,1004),...range(1020,1029),1043]
	},
	"trigo_tan":{
		"etiquette" : "Tangente",
		"niveau":1,
		"titre" : "",
		"info" : "Tangente, valeurs classiques, formules, domaine de définition",
		"questions" : [...range(1044,1068),...range(1079,1084),1093,1094,1095,...range(1099,1119)]
	},
	"trigo_congruences":{
		"etiquette" : "Trigo et congruences",
		"niveau":1,
		"titre" : "Trigonométrie 4",
		"info" : "Congruences et équations",
		"questions" : [...range(1069,1078),...range(1085,1092),1096,1097,1098]
	},
	"dim_finie":{
		"etiquette" : "Dim. finie",
		"niveau":1,
		"titre" : "Dimension finie",
		"info" : "Espaces vectoriels en dimension finie",
		"questions" : range(1220,1225)
	},
	"polynomes1":{
		"etiquette" : "Polynômes",
		"niveau":1,
		"titre" : "Polynômes",
		"info" : "Questions sur les polynômes, l'espace des polynômes, et leur arithmétique.",
		"questions" : [...range(1233,1239)]
	},
	"espaces_probabilises_finis":{
		"etiquette" : "Esp. probabilisés finis",
		"niveau":1,
		"titre" : "Espaces probabilisés finis",
		"info" : "",
		"questions" : [...range(1248,1253)]
	},
	"variables_aleatoires_finies":{
		"etiquette" : "Var. aléatoires finies",
		"niveau":1,
		"titre" : "Variables aléatoires",
		"info" : "(Sur un espace probabilisé fini.)",
		"questions" : [...range(1254,1258)]
	},
	"analyse_asymptotique1":{
		"etiquette" : "Analyse asymptotique",
		"niveau":1,
		"titre" : "Analyse asymptotique",
		"info" : "Équivalents de suites, petit o, grand O.",
		"questions" : [...range(1127,1129),...range(1131,1133)]
	},
	"suites1":{
		"etiquette" : "Suites et limites",
		"niveau":1,
		"titre" : "Suites et limites",
		"info" : "Questions de convergence.",
		"questions" : [...range(1134,1144)]
	},
	"series1":{
		"etiquette" : "Séries",
		"niveau":1,
		"titre" : "Séries",
		"info" : "Questions de convergence.",
		"questions" : [...range(1145,1148)]
	},
	"continuite1":{
		"etiquette" : "Continuité",
		"niveau":1,
		"titre" : "Limites et continuité",
		"info" : "Convergence et limite en un point, continuité de fonctions réelles à variable réelle, prolongements par continuité.",
		"questions" : [...range(1157,1165)]
	},
	"derivabilite1":{
		"etiquette" : "Dérivabilité",
		"niveau":1,
		"titre" : "Dérivabilité",
		"info" : "",
		"questions" : [...range(1166,1174)]
	}
};



// - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - C H A P I T R E S - - - - - -
// - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - 


// Mettre les étiquettes ici ? Et pas dans les thèmes ?
// Car l'étiquette dépend du titre du chapitre

const _chapitres={
	"geom_elementaire":{
		"nom": "Géométrie élémentaire",
		"themes":["quadrilateres","symetries"],
		"etiquettes":[]
	},
	"calcul_mental":{
		"nom": "Calcul mental",
		"themes":["multiplication1","tables_logique1","fractions1","calcul_litt1","calcul_litt2","facto1","calcul_litt3"],
		"etiquettes":[]
	},
	"racines":{
		"nom": "Racine carrée",
		"themes":["sqrt1","sqrt2","sqrt3"],
		"etiquettes":[]
	},
	"domaines":{
		"nom": "Domaines de définition",
		"themes":["domaines_zero","domaines_sqrt","domaines_log","domaines_red"],
		"etiquettes":[]
	},
	"analyse":{
		"nom": "Analyse",
		"themes":["analyse1","derivees1","derivees2","abs1","equations1","inegalites1","recap1"],
		"etiquettes":[]
	},
	"arithmetique":{
		"nom": "Arithmétique",
		"themes":["arithmetique1"],
		"etiquettes":[]
	},
	"complexes":{
		"nom": "Nombres complexes",
		"themes":["complexes_mult","complexes_arg","complexes_mod","complexes_geo","complexes_mod1"],
		"etiquettes":[]
	},
	"trigo":{
		"nom": "Trigonométrie",
		"themes":["trigo_valeurs","trigo_formules1","trigo_tan","trigo_congruences"],
		"etiquettes":[]
	},
	"geometrie_plane":{
		"nom": "Géométrie plane",
		"themes":["isometries_planes1","rotations_planes1","systemes1","droites1"],
		"etiquettes":[]
	},
	"fondements":{
		"nom": "Logique, quantificateurs",
		"themes":["implication","quantificateurs1","predicats"],
		"etiquettes":[]
	},
	"relations":{
		"nom": "Relations binaires",
		"themes":["relations_equiv","relations_ordre"],
		"etiquettes":[]
	},
	"algebre_lineraire":{
		"nom": "Algèbre linéaire",
		"themes" : ["ev1","app_lin1","matrices1","dim_finie"],
		"etiquettes":[]
	},
	"suites_series":{
		"nom": "Suites et séries",
		"themes" : ["analyse_asymptotique1","suites1","series1"],
		"etiquettes":[]
	},
	"continuite_derivabilite":{
		"nom": "Continuité et dérivabilité",
		"themes" : ["continuite1","derivabilite1"],
		"etiquettes":[]
	},
	"probabilites":{
		"nom": "Probabilités",
		"themes" : ["espaces_probabilises_finis","variables_aleatoires_finies"],
		"etiquettes":[]
	}
};

