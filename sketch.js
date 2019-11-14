var policeData;
var sunday, monday, tuesday, wednesday, thursday, friday, saturday; // asssign variables
var url;
var vehicle, building, other, shoplift, bike;
var wordData, b1;
var catSlot = [];

var oompaloompa;

// visualization 1: time of day
// groups:
// midnight til 6 AM
// 6 AM til 9 AM
// 9 AM til noon
// noon til 5 PM
// 5 PM til 8 PM
// 8 PM til midnight.

// for day of the week
var monT = [];
var tueT = [];
var wedT = [];
var thuT = [];
var friT = [];
var satT = [];
var sunT = [];

// for location
var vehT = [];
var buiT = [];
var othT = [];
var shoT = [];
var bikT = [];

// for colors
var tr0Col, tr1Col, tr2Col, tr3Col, tr4Col, tr5Col;

function preload() {
  wordData = loadJSON("https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft");
  b1 = loadImage('images/bx.png');
}

function setup() {
  // put setup code here
  createCanvas(1200, 500);
  // background(200);

  catSlot[0] = "vehicle";
  catSlot[1] = "building";
  catSlot[2] = "other";
  catSlot[3] = "shoplift";
  catSlot[4] = "bike";

  // put drawing code here
  // these functions are for the vertical circle bars
  oompaloompa = 0;

  colorMode(HSB);
  tr0Col = color(230,80,55);
  tr1Col = color(220,60,85);
  tr2Col = color(210,20,95);
  tr3Col = color(50,20,95);
  tr4Col = color(30,60,85);
  tr5Col = color(10,80,55);
  runTimeOfDay();

/*tr0Col = color(24,40,66);
  tr1Col = color(158,178,190);
  tr2Col = color(229,222,178);  // old RGB colors
  tr3Col = color(235,237,238);
  tr4Col = color(69,97,177);
  tr5Col = color(12,26,66);*/
}

function draw() {
}



// Necessary JSON stuff
function getPoliceInfo() {
  loadJSON(url, gotData); // remember - got data is a function
}

function gotData(data) { // makes sure the data is there in order to read data
  policeData = data;
}


// repeatable function for finding subcatagories - PLEASE DONOT DELETE
function subcategory(subcategory) {
  var variable = 0; // needs to be out of the loop
  for (var i = 0; i < 1000; i++) { // for subcategory - reads all 999 - will error if over 1000

    var catagory = wordData[i].incident_subcategory;
    if (catagory == subcategory) {
      variable += 1;
    }
  }
  return variable;
}


// These functions allow the sorting of categories from lowest to highest.
function drawCrimeCat(slot) {
  textAlign(CENTER);
  textSize(16);

  var tempString;
  if (catSlot[slot] == "building") {
    tempString = "From Building";
  }
  else if (catSlot[slot] == "bike") {
    tempString = "Of Bicycle";
  }
  else if (catSlot[slot] == "other") {
    tempString = "Other";
  }
  else if (catSlot[slot] == "shoplift") {
    tempString = "Shoplifting";
  }
  else if (catSlot[slot] == "vehicle") {
    tempString = "From Vehicle";
  }

  text(tempString, 49 + (124 * slot), 487);
  subcircles(getVal(catSlot[slot]), 5 + (124 * slot));
}

function orderCats() {
  var temp;

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      if (getVal(catSlot[j]) > getVal(catSlot[j + 1])) {
        temp = catSlot[j + 1];
        catSlot[j + 1] = catSlot[j];
        catSlot[j] = temp;
      }
    }
  }
}

function getVal(category) {
  if (category == "vehicle") {
    return vehicle;
  }
  else if (category == "building") {
    return building;
  }
  else if (category == "other") {
    return other;
  }
  else if (category == "shoplift") {
    return shoplift;
  }
  else if (category == "bike") {
    return bike;
  }
}


// Classic Mode Functions
function runClassic() {
  background(255);
  image(b1, 0, 0, 1200, 500);

  url = "https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft";
  getPoliceInfo();

  // put variables at 0
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;
  sunday = 0;
  vehicle = 0;
  building = 0;
  other = 0;
  shoplift = 0;
  bike = 0;


  // Tally up incidents for each day
  for (var i = 0; i < 1000; i++) {
    var theday = wordData[i].incident_day_of_week; //.substring(0,1); // look up how to use substring
    if (theday == "Monday") {
      monday += 1;

    }
    else if (theday == "Tuesday") {
      tuesday += 1;
    }
    else if (theday == "Wednesday") {
      wednesday += 1;
    }
    else if (theday == "Thursday") {
      thursday += 1;
    }
    else if (theday == "Friday") {
      friday += 1;
    }
    else if (theday == "Saturday") {
      saturday += 1;
    }
    else if (theday == "Sunday") {
      sunday += 1;
    }
  }

  fill(0);

  //subcategory(subcategory,variable)
  vehicle = subcategory("Larceny - From Vehicle");
  building = subcategory("Larceny Theft - From Building");
  other = subcategory("Larceny Theft - Other");
  shoplift = subcategory("Larceny Theft - Shoplifting");
  bike = subcategory("Larceny Theft - Bicycle");

  orderCats();

  for (var i = 0; i < 5; i++) {
    drawCrimeCat(i);
  }

  drawDaysOfWeek();

  // print out each variable to see if data is being parced - look in the developer mode console
  print(sunday + ' sunday');
  print(monday + ' monday');
  print(tuesday + ' tuesday');
  print(wednesday + ' wednesday');
  print(thursday + ' thurday');
  print(friday + ' friday');
  print(saturday + ' saturday');

  print(vehicle + ' vehicle');
  print(building + ' building');
  print(other + ' other');
  print(shoplift + ' shoplifting');
  print(bike + ' bike theft');
}

function drawDaysOfWeekClassic() {
  supercircles(monday, 15);
  supercircles(tuesday, 83);
  supercircles(wednesday, 160);
  supercircles(thursday, 232);
  supercircles(friday, 307);
  supercircles(saturday, 385);
  supercircles(sunday, 454);
}

function subcircles(quantity, horizontalPlacement) { // this is so we can easily create and move circles based on the values
  noStroke();

  var biggy = int(quantity / 12);
  var smally = quantity % 12;

  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 12; j++) {
      circle(horizontalPlacement + (j * 8), 460 - (i * 8), 6); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(horizontalPlacement + 88 - (i * 8), 460 - (biggy * 8), 6); // x, y, diameter
    }
  }
}

function supercircles(quantity, verticalPlacement) { // this is so we can easily create and move circles based on the values
  noStroke();

  var biggy = int(quantity / 4);
  var smally = quantity % 4;

  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(730 + (i * 10), verticalPlacement + (j * 10), 8); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(730 + (biggy * 10), verticalPlacement + 30 - (i * 10), 8); // x, y, diameter
    }
  }
}


// Time of Day mode functions
function runTimeOfDay() {
  background(255);
  image(b1, 0, 0, 1200, 500);

  url = "https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft";
  getPoliceInfo();

  // put variables at 0
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;
  sunday = 0;
  vehicle = 0;
  building = 0;
  other = 0;
  shoplift = 0;
  bike = 0;

  for (var i = 0; i < 6; i++) {
    vehT[i] = 0;
    buiT[i] = 0;
    othT[i] = 0;
    shoT[i] = 0;
    bikT[i] = 0;
    monT[i] = 0;
    tueT[i] = 0;
    wedT[i] = 0;
    thuT[i] = 0;
    friT[i] = 0;
    satT[i] = 0;
    sunT[i] = 0;
  }


  // Tally up incidents for each day
  for (var i = 0; i < 1000; i++) {

    var theTime = int(str(wordData[i].incident_time).substring(0,2));

    var theday = wordData[i].incident_day_of_week; //.substring(0,1); // look up how to use substring
    if (theday == "Monday") {
      monday++;

      if (theTime < 6) {monT[0]++;}
      if (theTime >= 6 && theTime < 9) {monT[1]++;}
      if (theTime >= 9 && theTime < 12) {monT[2]++;}
      if (theTime >= 12 && theTime < 17) {monT[3]++;}
      if (theTime >= 17 && theTime < 20) {monT[4]++;}
      if (theTime >= 20 && theTime < 24) {monT[5]++;}
    }
    else if (theday == "Tuesday") {
      tuesday++;
      if (theTime < 6) {tueT[0]++;}
      if (theTime >= 6 && theTime < 9) {tueT[1]++;}
      if (theTime >= 9 && theTime < 12) {tueT[2]++;}
      if (theTime >= 12 && theTime < 17) {tueT[3]++;}
      if (theTime >= 17 && theTime < 20) {tueT[4]++;}
      if (theTime >= 20 && theTime < 24) {tueT[5]++;}
    }
    else if (theday == "Wednesday") {
      wednesday++;
      if (theTime < 6) {wedT[0]++;}
      if (theTime >= 6 && theTime < 9) {wedT[1]++;}
      if (theTime >= 9 && theTime < 12) {wedT[2]++;}
      if (theTime >= 12 && theTime < 17) {wedT[3]++;}
      if (theTime >= 17 && theTime < 20) {wedT[4]++;}
      if (theTime >= 20 && theTime < 24) {wedT[5]++;}
    }
    else if (theday == "Thursday") {
      thursday++;
      if (theTime < 6) {thuT[0]++;}
      if (theTime >= 6 && theTime < 9) {thuT[1]++;}
      if (theTime >= 9 && theTime < 12) {thuT[2]++;}
      if (theTime >= 12 && theTime < 17) {thuT[3]++;}
      if (theTime >= 17 && theTime < 20) {thuT[4]++;}
      if (theTime >= 20 && theTime < 24) {thuT[5]++;}
    }
    else if (theday == "Friday") {
      friday++;
      if (theTime < 6) {friT[0]++;}
      if (theTime >= 6 && theTime < 9) {friT[1]++;}
      if (theTime >= 9 && theTime < 12) {friT[2]++;}
      if (theTime >= 12 && theTime < 17) {friT[3]++;}
      if (theTime >= 17 && theTime < 20) {friT[4]++;}
      if (theTime >= 20 && theTime < 24) {friT[5]++;}
    }
    else if (theday == "Saturday") {
      saturday++;
      if (theTime < 6) {satT[0]++;}
      if (theTime >= 6 && theTime < 9) {satT[1]++;}
      if (theTime >= 9 && theTime < 12) {satT[2]++;}
      if (theTime >= 12 && theTime < 17) {satT[3]++;}
      if (theTime >= 17 && theTime < 20) {satT[4]++;}
      if (theTime >= 20 && theTime < 24) {satT[5]++;}
    }
    else if (theday == "Sunday") {
      sunday++;
      if (theTime < 6) {sunT[0]++;}
      if (theTime >= 6 && theTime < 9) {sunT[1]++;}
      if (theTime >= 9 && theTime < 12) {sunT[2]++;}
      if (theTime >= 12 && theTime < 17) {sunT[3]++;}
      if (theTime >= 17 && theTime < 20) {sunT[4]++;}
      if (theTime >= 20 && theTime < 24) {sunT[5]++;}
    }
  }

  var monV = monT[0] + monT[1] + monT[2] + monT[3] + monT[4] + monT[5];
  print('Monday: ' + monV);
  var tueV = tueT[0] + tueT[1] + tueT[2] + tueT[3] + tueT[4] + tueT[5];
  print('Tuesday: ' + tueV);
  var wedV = wedT[0] + wedT[1] + wedT[2] + wedT[3] + wedT[4] + wedT[5];
  print('Wednesday: ' + wedV);
  var thuV = thuT[0] + thuT[1] + thuT[2] + thuT[3] + thuT[4] + thuT[5];
  print('Thursday: ' + thuV);
  var friV = friT[0] + friT[1] + friT[2] + friT[3] + friT[4] + friT[5];
  print('Friday: ' + friV);
  var satV = satT[0] + satT[1] + satT[2] + satT[3] + satT[4] + satT[5];
  print('Saturday: ' + satV);
  var sunV = sunT[0] + sunT[1] + sunT[2] + sunT[3] + sunT[4] + sunT[5];
  print('Sunday: ' + sunV);
  var total = monV + tueV + wedV + thuV + friV + satV + sunV;
  print('Total: ' + total);

  fill(0);

  //subcategory(subcategory,variable)
  vehicle = subcategory("Larceny - From Vehicle");
  building = subcategory("Larceny Theft - From Building");
  other = subcategory("Larceny Theft - Other");
  shoplift = subcategory("Larceny Theft - Shoplifting");
  bike = subcategory("Larceny Theft - Bicycle");

  // but now we have to tally for type, because of time-of-day color-coding
  // Tally up incidents for each day
  for (var i = 0; i < 1000; i++) {

    var theTime = int(str(wordData[i].incident_time).substring(0,2));

    var theCategory = wordData[i].incident_subcategory; //.substring(0,1); // look up how to use substring
    if (theCategory == "Larceny Theft - From Vehicle") {
      if (theTime < 6) {vehT[0]++;}
      if (theTime >= 6 && theTime < 9) {vehT[1]++;}
      if (theTime >= 9 && theTime < 12) {vehT[2]++;}
      if (theTime >= 12 && theTime < 17) {vehT[3]++;}
      if (theTime >= 17 && theTime < 20) {vehT[4]++;}
      if (theTime >= 20 && theTime < 24) {vehT[5]++;}
    }
    else if (theday == "Larceny Theft - From Building") {
      if (theTime < 6) {buiT[0]++;}
      if (theTime >= 6 && theTime < 9) {buiT[1]++;}
      if (theTime >= 9 && theTime < 12) {buiT[2]++;}
      if (theTime >= 12 && theTime < 17) {buiT[3]++;}
      if (theTime >= 17 && theTime < 20) {buiT[4]++;}
      if (theTime >= 20 && theTime < 24) {buiT[5]++;}
    }
    else if (theday == "Larceny Theft - Other") {
      if (theTime < 6) {othT[0]++;}
      if (theTime >= 6 && theTime < 9) {othT[1]++;}
      if (theTime >= 9 && theTime < 12) {othT[2]++;}
      if (theTime >= 12 && theTime < 17) {othT[3]++;}
      if (theTime >= 17 && theTime < 20) {othT[4]++;}
      if (theTime >= 20 && theTime < 24) {othT[5]++;}
    }
    else if (theday == "Larceny Theft - Shoplifting") {
      if (theTime < 6) {shoT[0]++;}
      if (theTime >= 6 && theTime < 9) {shoT[1]++;}
      if (theTime >= 9 && theTime < 12) {shoT[2]++;}
      if (theTime >= 12 && theTime < 17) {shoT[3]++;}
      if (theTime >= 17 && theTime < 20) {shoT[4]++;}
      if (theTime >= 20 && theTime < 24) {shoT[5]++;}
    }
    else if (theday == "Larceny Theft - Bicycle") {
      if (theTime < 6) {bikT[0]++;}
      if (theTime >= 6 && theTime < 9) {bikT[1]++;}
      if (theTime >= 9 && theTime < 12) {bikT[2]++;}
      if (theTime >= 12 && theTime < 17) {bikT[3]++;}
      if (theTime >= 17 && theTime < 20) {bikT[4]++;}
      if (theTime >= 20 && theTime < 24) {bikT[5]++;}
    }
  }

  orderCats();

  for (var i = 0; i < 5; i++) {
    drawCrimeCat(i);
  }

  drawDaysOfWeekTimeOfDay();
//  drawDaysOfWeekClassic();
  print('Grand Total: ' + oompaloompa);

  // print out each variable to see if data is being parced - look in the developer mode console
  print(sunday + ' sunday');
  print(monday + ' monday');
  print(tuesday + ' tuesday');
  print(wednesday + ' wednesday');
  print(thursday + ' thurday');
  print(friday + ' friday');
  print(saturday + ' saturday');

  print(vehicle + ' vehicle');
  print(building + ' building');
  print(other + ' other');
  print(shoplift + ' shoplifting');
  print(bike + ' bike theft');
}

function drawDaysOfWeekTimeOfDay() {
  supercirclesTime("monday", 15);
  supercirclesTime("tuesday", 83);
  supercirclesTime("wednesday", 160);
  supercirclesTime("thursday", 232);
  supercirclesTime("friday", 307);
  supercirclesTime("saturday", 385);
  supercirclesTime("sunday", 454);
}

function supercirclesTime(category, verticalPlacement) { // this is so we can easily create and move circles based on the values
  if (category == "monday") {
    superCirclesIndividualTime(monday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(monday - int(monT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(monday - int(monT[5]) - int(monT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(monT[2]) + int(monT[1]) + int(monT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(monT[1]) + int(monT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(monT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "tuesday") {
    superCirclesIndividualTime(tuesday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(tuesday - int(tueT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(tuesday - int(tueT[5]) - int(tueT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(tueT[2]) + int(tueT[1]) + int(tueT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(tueT[1]) + int(tueT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(tueT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "wednesday") {
    superCirclesIndividualTime(wednesday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(wednesday - int(wedT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(wednesday - int(wedT[5]) - int(wedT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(wedT[2]) + int(wedT[1]) + int(wedT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(wedT[1]) + int(wedT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(wedT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "thursday") {
    superCirclesIndividualTime(thursday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(thursday - int(thuT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(thursday - int(thuT[5]) - int(thuT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(thuT[2]) + int(thuT[1]) + int(thuT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(thuT[1]) + int(thuT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(thuT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "friday") {
    superCirclesIndividualTime(friday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(friday - int(friT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(friday - int(friT[5]) - int(friT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(friT[2]) + int(friT[1]) + int(friT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(friT[1]) + int(friT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(friT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "saturday") {
    superCirclesIndividualTime(saturday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(saturday - int(satT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(saturday - int(satT[5]) - int(satT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(satT[2]) + int(satT[1]) + int(satT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(satT[1]) + int(satT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(satT[0]), verticalPlacement, tr0Col);
  }
  else if (category == "sunday") {
    superCirclesIndividualTime(sunday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(sunday - int(sunT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(sunday - int(sunT[5]) - int(sunT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(sunT[2]) + int(sunT[1]) + int(sunT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(sunT[1]) + int(sunT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(sunT[0]), verticalPlacement, tr0Col);
  }
}

function superCirclesIndividualTime(quantity, verticalPlacement, myCol) {
  noStroke();
  stroke(0,0.01);
  strokeWeight(5);
  fill(70);
  print(quantity);
  oompaloompa += quantity;

  var biggy = int(quantity / 4);
  var smally = quantity % 4;

  // Overwriting Existing Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(730 + (i * 10), verticalPlacement + (j * 10), 9); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(730 + (biggy * 10), verticalPlacement + 30 - (i * 10), 9); // x, y, diameter
    }
  }

  fill(myCol);
  // Making New Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(730 + (i * 10), verticalPlacement + (j * 10), 8); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(730 + (biggy * 10), verticalPlacement + 30 - (i * 10), 8); // x, y, diameter
    }
  }
}

function getSectionQuantity(category, timeslot) {
  if (category == "vehicle") {return vehT[timeslot];}
  else if (category == "building") {return vehT[timeslot];}
  else if (category == "other") {return vehT[timeslot];}
  else if (category == "shoplift") {return vehT[timeslot];}
  else if (category == "bike") {return vehT[timeslot];}
}
