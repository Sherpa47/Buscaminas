/* THIS CODE IN A NUTSHELL:

+ When you start game, generate field based on user's
request, and generate random mine numbers all in 1 function.

+ When a square clicked, check to see if the flag button
is on, (if it is, then flag the square), and check the 
squares around it for mines. I use a different algorithm
for the sides.

+ When the function has checked to see if there are any 
mines around it, activate the color function to color
the square based on the number for easier reading.

FUTURE CHANGES:
I'm thinking of running a loop to evaluate all the squares
for mines on the map rather than just evaluating squares
once you click on it. This will help with the logic of
opening all the squares with 0 if you click it.

*/

document.getElementById("flag").addEventListener("click",flagByAlert);
document.getElementById("darktheme").addEventListener("click",lightsoff);
var darktheme = false; // Self explanatory: declares wether or not dark theme (Or high contrast) is on
var userinput; // The number of rows / columns to be genetrated
var totalmines; // Contains the number of mines (based on user's request)
var minenumbers = []; //Contains a list of all the mines
var preminenumbers = []; // Contains a list of all the id numbers in the field
var a = 0; // Used to asign id numbers to generated buttons
var loop1 = 0; // Loop1 is for generating buttons
var loop2 = 0; // Loop2 is for generating a break (or new row)
var loop3 = 0; // Loop3 is for removing the buttons before they are generated again
var loop4 = 0; // Loop4 is for generating mine numbers
var loop5 = 0; // Loop5 is for checking to see if a duplicate mine number exists
var loop6 = 0; // Loop6 is for defining the sides of the field
var checkmines = 0; // Checkmines is for detecting mine hits
var attribute = 0; // A variable that contains the button that called the function
var minesAround = 0; //How many mines around a number
var squares = 0;
var flag = false;
document.getElementById("minesinput").value = 15; //Default mines number
document.getElementById("userinput").value = 10; //Default field layout
document.getElementById("go").addEventListener("click",render);

function render() {
userinput = document.getElementById("userinput").value;
totalmines = document.getElementById("minesinput").value;
if(totalmines < 1 || totalmines >= eval(userinput) * eval(userinput))
{alert("Error: Number of mines is either below 1 or more than or equal to the number of rows/columns");
console.log("The minimum number of mines is 1. The number of mines also can't be greater than or equal to the number of rows/columns squared");}
else if( eval(userinput) < 5)
{alert("Error: Number of rows and columns is less that 5");
console.log("The minimum of rows and columns is 5");}
else{
//RENDER CODE HERE
a = 0;
loop1 = 0;
loop2 = 0;
loop3 = 0;
loop4 = 0;
loop5 = 0;
loop6 = 0;
preminenumbers = [];
minenumbers = [];
while (loop1 < eval(userinput)){
while (loop2 < eval(userinput)){
var elm = document.createElement('button');
elm.setAttribute('id', a);
document.getElementById("wrapper").appendChild(elm);
document.getElementById(a).addEventListener("click",check);
document.getElementById(a).innerHTML = "+";
document.getElementById(a).style.color = "gray";
document.getElementById(a).style.backgroundColor = "gray";
loop2++;
a++;
}
loop1++;
var div2 = document.createElement('br');
document.getElementById("wrapper").appendChild(div2);
loop2 = 0;
}
document.getElementById("go").innerHTML = "Generate New Minefield";
document.getElementById("go").id = "newField";
  document.getElementById("newField").addEventListener("click",reset);
while (loop4 < eval(userinput) * eval(userinput)) {
	preminenumbers.push(loop4);
	loop4++;
	}
while (loop5 < totalmines) {
	var ran = Math.floor(Math.random() * preminenumbers.length);
	if(preminenumbers[ran] !== undefined){minenumbers.push(ran); delete preminenumbers[ran]; loop5++;}else{}
	}
}
for (loop6 = 0; loop6 < userinput*userinput; loop6++){
if (loop6%userinput == 0){
document.getElementById(loop6).class = "side";
}else if(loop6 < userinput){
document.getElementById(loop6).class = "side";
}else if (loop6 > userinput*userinput-userinput){
document.getElementById(loop6).class = "side";
}else if ((loop6+1)%userinput == 0){ 
document.getElementById(loop6).class = "side";
}
}
}
//document.getElementById("wrapper").style.paddingLeft = (userinput*userinput)+"px";
//document.getElementById("wrapper").style.paddingTop = (userinput*userinput)+"px";
a = 0;
function reset() {
$("button").not(document.getElementsByClassName("stationary")).remove();
$("br").not(document.getElementsByClassName("st")).remove();
document.getElementById("newField").id = "go";
render();
squares = 0;
}

function check(){ //This function checks if you clicked a mine
attribute = $(this).attr("id"); // jQuery finds out which button activated the function and returns the ID
if(flag == true){
document.getElementById(attribute).innerHTML = "X"
document.getElementById(attribute).style.fontWeight = "bold";
document.getElementById(attribute).style.color = "red";
document.getElementById(attribute).style.backgroundColor = "orange";
}else{
checkmines = 0;
while (checkmines < minenumbers.length){
if( $(this).attr("id") == minenumbers[checkmines]){
	showmines();
	break;
	}
	checkmines++;
}
if (checkmines == minenumbers.length) {open();}
}
}
function open() {
if(document.getElementById(attribute).innerHTML == "X"){
  document.getElementById(attribute).innerHTML = "+";
  document.getElementById(attribute).style.color = "white";
  document.getElementById(attribute).style.backgroundColor = "white";
}else{
squares = 0;
attribute = eval(attribute);
userinput = eval(userinput);
var x = 0;
minesAround = 0;
var Mr = attribute+1;
var Tr = (attribute - userinput)+1;
var Tm = attribute - userinput;
var Tl = attribute - (userinput+1);
var Ml = attribute - 1;
var Bl = attribute + (userinput-1);
var Bm = attribute + userinput;
var Br = attribute + (userinput+1);
if (document.getElementById(attribute).class != "side"){
while ( x < minenumbers.length){
	if (Mr == minenumbers[x]){ //Middle Right
	minesAround++;
	}
	if (Tr == minenumbers[x]){ //Top Right
	minesAround++;
	}
	if (Tm == minenumbers[x]){ //Top Middle
	minesAround++;
	}
	if (Tl == minenumbers[x]){ //Top Left
	minesAround++;
	}
	if (Ml == minenumbers[x]){ //Middle Left
	minesAround++;
	}
	if (Bl == minenumbers[x]){ //Bottom Left
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	if (Br == minenumbers[x]){ //Bottom Right
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();
}else if (attribute == 0) { // Top Left Corner Of Map
while (x < minenumbers.length){
	if (Mr == minenumbers[x]){ //Middle Right
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	if (Br == minenumbers[x]){ //Bottom Right
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();
}else if (attribute == (userinput-1)) {
while (x < minenumbers.length){
	if (Ml == minenumbers[x]){ //Middle Left
	minesAround++;
	}
	if (Bl == minenumbers[x]){ //Bottom Left
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();}
else if(attribute == ((userinput*userinput)-userinput)){
while (x < minenumbers.length){
	if (Mr == minenumbers[x]){ //Middle Right
	minesAround++;
	}
	if (Tr	== minenumbers[x]){ //Top Right
	minesAround++;
	}
	if (Tm == minenumbers[x]){ //Top Middle
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();
}else if(attribute == ((userinput*userinput)-1)){
while(x < minenumbers.length){
	if (Tm == minenumbers[x]){ //Top Middle
	minesAround++;
	}
	if (Tl == minenumbers[x]){ //Top Left
	minesAround++;
	}
	if (Ml == minenumbers[x]){ //Middle Left
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
document.getElementById(attribute).style.backgroundColor = "white";
color();
}else if(attribute%userinput == 0){
while(x < minenumbers.length){
	if (Mr == minenumbers[x]){ //Middle Right
	minesAround++;
	}
	if (Tr == minenumbers[x]){ //Top Right
	minesAround++;
	}
	if (Tm == minenumbers[x]){ //Top Middle
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	if (Br == minenumbers[x]){ //Bottom Right
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();
}else if (attribute < (userinput-1)){
while (x < minenumbers.length){
	if (Mr == minenumbers[x]){ //Middle Right
	minesAround++;
	}
	if (Ml == minenumbers[x]){ //Middle Left
	minesAround++;
	}
	if (Bl == minenumbers[x]){ //Bottom Left
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	if (Br == minenumbers[x]){ //Bottom Right
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();
}else if ((attribute +1)%userinput == 0){
while (x < minenumbers.length){
	if (Tm == minenumbers[x]){ //Top Middle
	minesAround++;
	}
	if (Tl == minenumbers[x]){ //Top Left
	minesAround++;
	}
	if (Ml == minenumbers[x]){ //Middle Left
	minesAround++;
	}
	if (Bl == minenumbers[x]){ //Bottom Left
	minesAround++;
	}
	if (Bm == minenumbers[x]){ //Bottom Middle
	minesAround++;
	}
	x++;
}
document.getElementById(attribute).innerHTML = minesAround;
color();	
}else{
while (x < minenumbers.length){
	if(Tm == minenumbers[x]){
	minesAround++;
	}
	if(Tr == minenumbers[x]){
	minesAround++;
	}
	if(Mr == minenumbers[x]){
	minesAround++;
	}
	if(Ml == minenumbers[x]){
	minesAround++;
	}
	if(Tl == minenumbers[x]){
	minesAround++;
	}
	x++;
	}
document.getElementById(attribute).innerHTML = minesAround;
color();
}
minesAround = 0;
var final = 0;
while(final < userinput*userinput){
if(document.getElementById(final).innerHTML == "X"){
  squares++;
}
final++;
}
if (squares == totalmines){alert("Yay! You won!");}
document.getElementById("minesleft").innerHTML = "Mines Left: " + (totalmines-squares);
}
}
function flag() { //This function is for flagging squares (WIP);
alert("triggered!!");
if (document.getElementById($(this).attr("id")).innerHTML != "X"){
document.getElementById($(this).attr("id")).innerHTML = "X";
}else{document.getElementById($(this).attr("id")).innerHTML = "+";}
}
function showmines() { //This function reveals all the mines once you lost
if(document.getElementById(attribute).innerHTML == "X"){
  document.getElementById(attribute).innerHTML = "+";
  document.getElementById(attribute).style.color =  "gray";
}else{
  var show = 0;
alert("You Lost");
squares = 0;
while (show < minenumbers.length){
document.getElementById(minenumbers[show]).innerHTML = "☼";
document.getElementById(minenumbers[show]).style.color = "white";
document.getElementById(minenumbers[show]).style.backgroundColor = "red";
show++; 
}
}
}
function lightsoff() { //This function toggles Dark Theme
if(darktheme === false){
darktheme = true
document.body.style.backgroundColor = "#424242";
}else
{
darktheme = false;
document.body.style.backgroundColor = "white";
}
}
function color() {
  document.getElementById(attribute).style.backgroundColor = "white";
if(minesAround == 0){
	document.getElementById(attribute).style.color = "black";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 1){
	document.getElementById(attribute).style.color = "blue";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 2){
	document.getElementById(attribute).style.color = "green";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 3){
	document.getElementById(attribute).style.color = "lime"
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 4){
	document.getElementById(attribute).style.color = "orange";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 5){
	document.getElementById(attribute).style.color = "red";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 6){
	document.getElementById(attribute).style.color = "brown";
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 7){
	document.getElementById(attribute).style.color = "purple"
	document.getElementById(attribute).style.fontWeight = "bold";
	}else if(minesAround == 8){
	document.getElementById(attribute).style.color = "gray";
	document.getElementById(attribute).style.fontWeight = "bold";
	}
}
function flagByAlert(){
if(document.getElementById("flag").style.backgroundColor != "red"){
document.getElementById("flag").style.backgroundColor = "red";
flag = true;
}else{
document.getElementById("flag").style.backgroundColor = "white";
flag = false;
}
var final = 0;
squares = 0;
while(final < userinput*userinput){
if(document.getElementById(final).innerHTML == "X"){
  squares++;
}
final++;
}
if (squares == totalmines){alert("Yay! You won!");}
document.getElementById("minesleft").innerHTML = "Mines Left: " + (totalmines-squares);
}