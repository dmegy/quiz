
// un composant est une fonction qui renvoie de l'html (ou une variable avec de l'html)
// pour l'instant, c'est utilisé via la classe 'sync' 
// avec data-action="html", data-param="composant()"

// à la fin du fichier, des fonction qui ne sont pas des composants mais qui modifient le DOM





/* ATTENTION préciser si fa regular ou fa solid ! (Fas ou Far)*/
/* fa solid se prête bien au dark mode et aux fontes grasses*/

/* var pour pouvoir y accéder via window ? Autre méthode ?*/

/* changer la façon d'encoder : encoder la chaîne de points (le 'd') */

var svgPathFasFolderOpen		= `<path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/>`;
var svgPathFasArrowRight		= `<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>`;
var svgPathFasDumbbell		= `<path d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>`;
var svgPathFasPlay			= `<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>`;
var svgPathFasCirclePlay	= `<path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>`;

var svgPathFasListUl			= `<path d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/>`;

var svgPathFasGift			= `<path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"/>`;
var svgPathFasStopwatch		= `<path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>`;
var svgPathFasCocktail		= `<path d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z"/>`;
var svgPathFasTrophy			= `<path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>`;
var svgPathFasRocket			= `<path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"/>`;
var svgPathFasMedal			= `<path d="M16 0H144c5.3 0 10.3 2.7 13.3 7.1l81.1 121.6c-49.5 4.1-94 25.6-127.6 58.3L2.7 24.9C-.6 20-.9 13.7 1.9 8.5S10.1 0 16 0zM509.3 24.9L401.2 187.1c-33.5-32.7-78.1-54.2-127.6-58.3L354.7 7.1c3-4.5 8-7.1 13.3-7.1H496c5.9 0 11.3 3.2 14.1 8.5s2.5 11.5-.8 16.4zM432 336c0 97.2-78.8 176-176 176s-176-78.8-176-176s78.8-176 176-176s176 78.8 176 176zM264.4 241.1c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/>`;

var svgPathFasSkullCrossbones	= `<path d="M400 128c0 44.4-25.4 83.5-64 106.4V256c0 17.7-14.3 32-32 32H208c-17.7 0-32-14.3-32-32V234.4c-38.6-23-64-62.1-64-106.4C112 57.3 176.5 0 256 0s144 57.3 144 128zM200 176c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm144-32c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM35.4 273.7c7.9-15.8 27.1-22.2 42.9-14.3L256 348.2l177.7-88.8c15.8-7.9 35-1.5 42.9 14.3s1.5 35-14.3 42.9L327.6 384l134.8 67.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L256 419.8 78.3 508.6c-15.8 7.9-35 1.5-42.9-14.3s-1.5-35 14.3-42.9L184.4 384 49.7 316.6c-15.8-7.9-22.2-27.1-14.3-42.9z"/>`;
var svgPathFasGlasses 		= `<path d="M118.6 80c-11.5 0-21.4 7.9-24 19.1L57 260.3c20.5-6.2 48.3-12.3 78.7-12.3c32.3 0 61.8 6.9 82.8 13.5c10.6 3.3 19.3 6.7 25.4 9.2c3.1 1.3 5.5 2.4 7.3 3.2c.9 .4 1.6 .7 2.1 1l.6 .3 .2 .1 .1 0 0 0 0 0s0 0-6.3 12.7h0l6.3-12.7c5.8 2.9 10.4 7.3 13.5 12.7h40.6c3.1-5.3 7.7-9.8 13.5-12.7l6.3 12.7h0c-6.3-12.7-6.3-12.7-6.3-12.7l0 0 0 0 .1 0 .2-.1 .6-.3c.5-.2 1.2-.6 2.1-1c1.8-.8 4.2-1.9 7.3-3.2c6.1-2.6 14.8-5.9 25.4-9.2c21-6.6 50.4-13.5 82.8-13.5c30.4 0 58.2 6.1 78.7 12.3L481.4 99.1c-2.6-11.2-12.6-19.1-24-19.1c-3.1 0-6.2 .6-9.2 1.8L416.9 94.3c-12.3 4.9-26.3-1.1-31.2-13.4s1.1-26.3 13.4-31.2l31.3-12.5c8.6-3.4 17.7-5.2 27-5.2c33.8 0 63.1 23.3 70.8 56.2l43.9 188c1.7 7.3 2.9 14.7 3.5 22.1c.3 1.9 .5 3.8 .5 5.7v6.7V352v16c0 61.9-50.1 112-112 112H419.7c-59.4 0-108.5-46.4-111.8-105.8L306.6 352H269.4l-1.2 22.2C264.9 433.6 215.8 480 156.3 480H112C50.1 480 0 429.9 0 368V352 310.7 304c0-1.9 .2-3.8 .5-5.7c.6-7.4 1.8-14.8 3.5-22.1l43.9-188C55.5 55.3 84.8 32 118.6 32c9.2 0 18.4 1.8 27 5.2l31.3 12.5c12.3 4.9 18.3 18.9 13.4 31.2s-18.9 18.3-31.2 13.4L127.8 81.8c-2.9-1.2-6-1.8-9.2-1.8zM64 325.4V368c0 26.5 21.5 48 48 48h44.3c25.5 0 46.5-19.9 47.9-45.3l2.5-45.6c-2.3-.8-4.9-1.7-7.5-2.5c-17.2-5.4-39.9-10.5-63.6-10.5c-23.7 0-46.2 5.1-63.2 10.5c-3.1 1-5.9 1.9-8.5 2.9zM512 368V325.4c-2.6-.9-5.5-1.9-8.5-2.9c-17-5.4-39.5-10.5-63.2-10.5c-23.7 0-46.4 5.1-63.6 10.5c-2.7 .8-5.2 1.7-7.5 2.5l2.5 45.6c1.4 25.4 22.5 45.3 47.9 45.3H464c26.5 0 48-21.5 48-48z"/>`;
var svgPathFasCheckDouble		= `<path d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/>`;
var svgPathFasCheck			= `<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>`;
var svgPathFasXmark			= `<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>`;

var svgPathFasCircleUp			= `<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9H304v96c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V256H144c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>`;
var svgPathFasCircleXmark		= `<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>`;
var svgPathFasCircleExclamation = `<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>`;
var svgPathFasCircleCheck 	= `<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>`;
/* Fa regular ?*/
var svgPathFarCircleCheck = `<path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>`;



var svgPathFasUserLarge		= `<path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4c0 17-13.8 30.7-30.7 30.7H265.1 182.9 30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z"/>`;
var svgPathFasUserTie			= `<path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4c0 17-13.8 30.7-30.7 30.7H265.1 182.9 30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z"/>`;
var svgPathFasBookOpenReader	= `<path d="M352 96c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM240 248V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z"/>`;
var svgPathFasUserGraduate	= `<path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM129.1 323.2l83.2 88.4c6.3 6.7 17 6.7 23.3 0l83.2-88.4c73.7 14.9 129.1 80 129.1 158.1c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-78.1 55.5-143.2 129.1-158.1z"/>`;
var svgPathFasRobot			= `<path d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/>`;
var svgPathFasUserAstronaut 	= `<path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z"/>`;








function htmlStatsChapitre(idChap){
	// ici on pourra mettre plus de stats si besoin : nombre de perfects, de médailles, de questions vues...
	let p=chapitres[idChap].points;
	let s=`(${p} pt${p==1?'':'s'})`;
	return s;
}

function htmlBoutonTheme(id){
	let s=`
		<div style="--progression:0;" class="bouton-petit bouton-coul-secondaire" id="boutonTheme_${id}" onclick="afficherInfoTheme('${id}')">
			<div class="bouton-theme-progress" style="opacity:70%"></div>
			<div class="bouton-theme-texte">${themes[id].etiquette}</div>
		</div>
	`;
	return s;
}




function htmlTripleBarre([a,b,c]){
	// retourne un div html avec des barres de progression dans le ratio a:b:c

	let n=a+b+c;
	let [pratees,psautees,preussies]=[0,0,0];
	if(n!=0)
		[pratees,psautees,preussies]=[100*a/n,100*b/n,100*c/n];

	let s="";
	s=`	<div class='barre-conteneur'>
				<div style='width:${pratees}%;background-color:var(--c-danger)'></div>
				<div style='width:${psautees}%;background-color:var(--c-warning)'></div>
				<div style='width:${preussies}%;background-color:var(--c-success)'></div>
			</div>`;
	return s;
}

function htmlBarre(a,b){
	// retourne un div html avec une barre de progression
	if (a>b)
		a=b;
	let p=0;
	if (b!=0)
		p=a/b;
	return `<div class='barre-conteneur'>
				<div style='width:${100*p}% ; background-color:var(--c-primaire)'></div>
			</div>`;
}


function htmlIconeResultat(r){
	// utilisé pour la correction des questions
	// r est le résultat à une question -1, 0 ou 1
	// sortie : une icone de cercle avec check, ! ou X
	let s=`<svg class="svg-icone" viewBox="0 0 512 512">`;
	if(r==1)
		s+=svgPathFasCircleCheck;
	if(r==-1)
		s+=svgPathFasCircleXmark;
	if(r==0)
		s+=svgPathFasCircleExclamation;
	s+=`</svg>`;
	return s;
}



function htmlIconeNote(note){
	// écran de fin de quiz
	let icone='';
	if(note==20) icone="FasTrophy";
	else if (note>=15) icone="FasChampagneGlasses";
	else if (note>=10) icone="FasThumbsUp";
	else icone="FasFaceMeh";

	let s=`<svg class="svg-icone svg-strong-glow" viewBox="0 0 600 512">${globalThis['svgPath'+icone]}"></svg>`;
	return s;
}



function htmlTrophee(trophee){
	let date=new Date(trophee.date);
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	let s=`
		<div class="trophee">
			<div style="font-size:2.5rem;margin:.5rem">
				<svg class="svg-icone svg-strong-glow" viewBox="0 0 600 512">${globalThis['svgPath'+trophee.icone]}</svg>

			</div>
			<div>
				<div style="opacity:60%;font-size:.8rem;">${capitaliser(date.toLocaleDateString("fr-FR", options))}, ${date.getHours()}h${String(date.getMinutes()).padStart(2, "0")}</div>
				<div style="color:var(--c-secondaire-accent);font-size:1.5rem;font-weight:800">${trophee.titre}</div>
				<div style="font-size:1rem;">${trophee.texte}</div>
				
			</div>
		</div>`;
	return s;
}


function htmlProfil(){
	// on utilise la classe "trophée" ? Faire une autre classe
	let s=`
		<div style="flex-grow:1;padding:0 1rem">
			Bilan : 
			${historique.questionsVues.length} questions vues dont : <br> 
			<span class="danger">${user.repFausses} ratées</span>, 
			<span class="warning">${user.repNeutres} sautées</span>, 
			<span class="success">${user.repJustes} réussies</span>.
			<div style="width:100%;height:.5rem">${htmlTripleBarre([user.repFausses,user.repNeutres,user.repJustes])}</div>
			<!--<div class="margin-l-r">
			${user.combo} rép. correctes d'affilée (${user.combo*(user.combo+1)/2} pts cumulés).
			</div>-->
		</div>
		`;
	return s;
}


function htmlQuetesDuJour(){
	let s=`
		<div class="margin-l-r">
			
			<div style="display:flex;gap:.5rem;align-items:center" ${user.pointsAujourdhui>=100 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.pointsAujourdhui>=100)} 
				<div style="flex-shrink:0">Gagner 100 points : </div>
				<div style="height:.5rem;flex-grow:1">${htmlBarre(user.pointsAujourdhui,100)}</div>
			</div>

			<div style="display:flex;gap:.5rem;align-items:center" ${user.quizAujourdhui>=5 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.quizAujourdhui>=5)} 
				<div style="flex-shrink:0">Valider 5 quiz : </div>
				<div style="height:.5rem;flex-grow:1">${htmlBarre(user.quizAujourdhui,5)}</div>
			</div>

			<div  style="display:flex;gap:.5rem;align-items:center" ${user.perfectsAujourdhui>0 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.perfectsAujourdhui>0)}
				<div>Valider un quiz avec 20/20</div>
			</div>


			<div style="display:flex;gap:.5rem;align-items:center"  ${user.quizCeMatin>0 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.quizCeMatin>0)}
				<div>Valider un quiz entre 6h et 8h</div>
			</div>


			<div style="display:flex;gap:.5rem;align-items:center" ${user.quizCeMidi>0 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.quizCeMidi>0)}
				<div>Valider un quiz entre midi et 14h</div>
			</div>


			<div style="display:flex;gap:.5rem;align-items:center" ${user.quizCeSoir>0 ? 'class="glow-accent"' :''}>
				${htmlCheckbox(user.quizCeSoir>0)}
				<div>Valider un quiz entre 18h et 20h</div>
			</div>
		</div>`;
	// à rajouter:
	// finir un quiz dans trois thèmes différents
	return s;
}



function htmlQuetesLongues(){
	let s=`<div style="display:flex;gap:.5rem;align-items:center">
				<div style="flex-shrink:0">Niveau ${niveau(user.points)+1} (${prochainPalier(user.points)} pts):</div>
				<div style="height:.5rem;flex-grow:1">${htmlBarre(user.points,prochainPalier(user.points))}</div>
			</div>
			<div style="display:flex;gap:.5rem;align-items:center">
				<div style="flex-shrink:0">Réussir ${100*(Math.floor(user.repJustes/100)+1)} questions : </div>
				<div style="height:.5rem;flex-grow:1">${htmlBarre(user.repJustes,100*Math.ceil(user.repJustes/100))}</div>
			</div>
			<div style="display:flex;gap:.5rem;align-items:center">
				<div style="flex-shrink:0">Finir ${10*(Math.floor(user.perfects/10)+1)} quiz avec un score parfait</div>
				<div style="height:.5rem;flex-grow:1">${htmlBarre(user.perfects,10*(Math.floor(user.perfects/10)+1))}</div>
			</div>`;
	return s;
}

function htmlGraphiques(){
	//ca serai bien de mettre 48h au lieu de 24h...
	// 24h pour commencer, avec les points
	let s=`<div class="histogramme">`;
	let max=0;
	let indexMax=0;
	let pointsSurLaPeriode=0;
	for (let i=0; i<48;i++){
		pointsSurLaPeriode+=user.seriePointsHeures[i];
		if(user.seriePointsHeures[i]>max){
			max=user.seriePointsHeures[i];
			indexMax=i;
		}
	}
	if(max==0){
		s="Pas de données à afficher";
	}
	else{
		for (let i=0; i<48;i++){
			s+=`<div class="histogramme-colonne">
					<!-- ici, soit un div avec hauteur non maximale, soit plusieurs divs-->
					<div class="histogramme-barre" style="height:${100*user.seriePointsHeures[i]/max}%"></div>
				</div>`;
		}

		s+="</div>";
		s+=`<div class="histogramme-legende">${pointsSurLaPeriode} points gagnés ces dernières 48h</div>`;
	}
	return s;
}



function htmlCheckbox(bool){
	if(bool){
		return `<div style="width:1rem;flex-shrink:0">
			<svg class="svg-icone" viewBox="0 0 512 512">${svgPathFasCheck}</svg>
			</div>`;
	} else{
		return `<div style="width:1rem;flex-shrink:0;text-align:center">•</div>`;
	}
}







