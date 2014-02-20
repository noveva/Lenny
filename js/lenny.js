//*********** 
//constants and links to svg element parts
var svgElement = document.getElementById("svgElement"); 
var gradient = document.getElementById("blueradial"); 
var aquarium = document.getElementById("aquarium"); 
var white = document.getElementById("white"); 
var boxWidth = svgElement.width.baseVal.value; // The width of the SVG viewport.
var boxHeight = svgElement.height.baseVal.value; // The height of the SVG viewport.
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame;
//used in pickJoke() to detect begin and end of bio array
var i = 0;
//array to fill up the inner html of #bio element
var bio = [];
bio[0] = ["has been studying Art & Technology at Saxion University for last 4 years"];
bio[1] = ["did a Minor on Mobile interaction at HvA in the spring semester of 2013"];
bio[2] = ["was born in Moscow, but has lived many years in Vienna and a couple of months in Barcelona"];
bio[3] = ["has been working on her JavaScript knowledge for the last several months"];
bio[4] = ["is vegetarian and prefers coffee over tea"];
bio[5] = ["has a degree in linguistics, allowing her to teach German and English professionally"];
bio[6] = ["worked once on a movie set translating live for a German camera and light team but survived"];
bio[7] = ["knows what responsine and what mobile first design principles mean"];
bio[8] = ["before moving to the Netherlands she thought that eating French fries with mayonnaise is yucky"];
bio[9] = ["has learnt LESS and Git this summer to work faster"];
bio[10] = ["has become pro with Illustrator and AfterEffects after her internship at an animation company"];

//*********** 
//supporting functions

//triggers on button click, 
//changes inner html in #bio and scales Lenny (scale method evoked in path() ), pickJoke() not working in this version
function tellStory(){
  circle0.scale();
  pickJoke();
}
//picks an item from bio array
function pickJoke(){
      if(i == bio.length){i=0} else {
        i++;}
      $('#bio>p').html(bio[i]);
      $('#bio').css('background','#FBCB38');
      setTimeout(function(){$('#bio').css('background','#ffffff')},2000);
}


//*********** 
//Lenny appearance and behavior

//returns number of sides for Lenny, called from path()
function generateShape() {
  return Math.round (Math.random() * (15 - 3) + 3);
}

//returns random color for Lenny, called from path()
function color() {
  //splits the string with all symbols used to define hex colors
  var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      //adds 6 random symbols from the string defined above
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.round(Math.random() * 15)];}
  return color;
}

// draws new shape based on random number numberOfSides,called from path()
function pathSide(cx,cy,r,numberOfSides){
  var pathSide = '';
  // calculates coordinate for drawing the shapes, do not touch 
  for (var i = 1; i <= numberOfSides;i ++) {
    // geometry formulas to the rescue
    var Lx = cx + r * Math.cos(i * 2 * Math.PI / numberOfSides);
    var Ly = cy + r * Math.sin(i * 2 * Math.PI / numberOfSides);
    // the actual path data 
    pathSide += "L" + Lx + " " + Ly + " ";
  } //for  
// string attached to Lenny svg attribute "d", can break Lenny down - do not touch  
return 'M' + (cx +  r * Math.cos(0)) + ' ' + (cy +  r *  Math.sin(0)) + ' ' + pathSide+  "Z";
}//pathSide  


//the constructor function, all properties and methods on Lenny are defined here
function path (cx,cy,r){
// properties 
  //native SVG properties to set up Lenny
  this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  this.shape.prototype = path;
  this.shape.setAttribute('d', pathSide(cx,cy,r,numberOfSides)); 
  this.shape.style.fill = aquarium.style.stroke = color();
  //draws Lenny in the SVG container
  svgElement.appendChild(this.shape);
//variables needed to change movement and look of Lenny
  //velocity
  var vx = 3; // x velocity of path
  var vy = 2; // y velocity of path
  //initial size
  var size = 1;
  //initial amount of sides, basically draws a cirle
  var numberOfSides = 50;

// methods 
  // behaviour for other particles (food, poop etc), written but not included yet
  this.fall = function (){
  cy += vy; // Move in the y-direction by a small amount.
  this.shape.setAttribute('d', pathSide(cx,cy,r,numberOfSides));
  if (cy >= (boxHeight - r) || cy <= r){
    console.log('fallen');cancelAnimationFrame(this.fall.bind(this)); }else{
        requestAnimationFrame(this.fall.bind(this)); 
    }
  }
// movement of Lenny
  this.position = function (){
    cx += vx; // Move in the x-direction by a small amount.
    cy += vy; // Move in the y-direction by a small amount.
    //checking if Lenny collides with x-axis
    if ((cx >= (boxWidth - r)) || cx <= r){
      //change shape
      numberOfSides = generateShape();
      //change x-direction
      vx *= -1;
      //change color Lenny and container
      this.shape.style.fill = aquarium.style.stroke = color();
    }
    //checking if Lenny collides with y-axis
    if (cy >= (boxHeight - r) || cy <= r){
      //change y-direction
      vy *= -1; 
      //change shape
      numberOfSides = generateShape();
      //change color Lenny and container
      this.shape.style.fill = aquarium.style.stroke = color();
    }
    this.shape.setAttribute('d', pathSide(cx,cy,r,numberOfSides));
    requestAnimationFrame(this.position.bind(this));
  }
// changes radius of Lenny when button is clicked
  this.scale = function(){
    //scale Lenny
    r += 10;
    //animating opacity and scaling back
    setTimeout(function(){circle0.shape.style.opacity =0.5;},4450);
    setTimeout(function(){circle0.shape.style.opacity =0.5;},4550);
    setTimeout(function(){circle0.shape.style.opacity =1;},4600);
    setTimeout(function(){circle0.shape.style.opacity =0.5;},4700);
    setTimeout(function(){circle0.shape.style.opacity =0.5;},4750);
    setTimeout(function(){r-=10;circle0.shape.style.opacity =1;},5000);
  }
}// path

//*********** 
//calling an instance of path, reffered to as Lenny

// draw Lenny
var circle0 = new path(100,100,20);
// move Lenny
circle0.position();

