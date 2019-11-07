var policeData;
var train1min, train2min, train3min;  // asssign variables 
var url;

function setup() {
  // put setup code here
  createCanvas(600,600);
  background(100);

url = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=HAYW&key=MW9S-E7SL-26DU-VV8V&json=y";
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
