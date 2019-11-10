var policeData;
var sunday, monday, tuesday, wednesday, thursday, friday, saturday; // asssign variables
var url;

function preload() {
  wordData = loadJSON("https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft");

}

function setup() {
  // put setup code here
  createCanvas(1200, 500);
  background(200);

  url = "https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft";
  getPoliceInfo();


  // put variables at 0 to start
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;
  sunday = 0;



  for (var i = 0; i < 1000; i++) { // the .length command will count like  human like - used to step through
    var theday = wordData[i].incident_day_of_week; //.substring(0,1); // look up how to use substring
    if (theday == "Monday") {
      monday += 1;
    }
    if (theday == "Tuesday") {
      tuesday += 1;
    }
    if (theday == "Wednesday") {
      wednesday += 1;
    }
    if (theday == "Thursday") {
      thursday += 1;
    }
    if (theday == "Friday") {
      friday += 1;
    }
    if (theday == "Saturday") {
      saturday += 1;
    }
    if (theday == "Sunday") {
      sunday += 1;
    }
  }

print(sunday + ' sunday')
print(monday+ ' monday')
print(tuesday+ ' tuesday')
print(wednesday+ ' wednesday')
print(thursday+ ' thurday')
print(friday+ ' friday')
print(saturday+ ' saturday')

}

function getPoliceInfo() {
  loadJSON(url, gotData) // remember - got data is a function
}

function gotData(data) {
  policeData = data


}

function draw() {
  // put drawing code here



}




function mousePressed() {
  // define button and then call getPoliceInfo()

}
