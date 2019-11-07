var policeData;
var train1min, train2min, train3min;  // asssign variables
var url;

function setup() {
  // put setup code here
  createCanvas(800,1000);
  background(100);

url = "https://data.sfgov.org/resource/wg3w-h783.json";
getPoliceInfo();

}

function getPoliceInfo(){
loadJSON(url, gotData)    // remember - got data is a function
}

function gotData(data){
policeData=data

}

function draw() {
  // put drawing code here
}




function mousePressed(){
// define button and then call getPoliceInfo()

}
