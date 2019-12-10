var policeData;
var sunday, monday, tuesday, wednesday, thursday, friday, saturday; // asssign variables
var url;
var vehicle, building, other, shoplift, bike;
var wordData, b1;
var catSlot = [];

var tCol, sCol, bCol;

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
var d0col, d1col, d2col, d3col, d4col, d5col, d6col, d7col, d8col, d9col, d10col;

/*
// day of the week (Active vs Resolved)
var monA;
var tueA;
var wedA;
var thuA;
var friA;
var satA;
var sunA;

// for location (Active vs Resolved)
var vehA;
var buiA;
var othA;
var shoA;
var bikA;*/ // I'm commenting this out because district is more interesting than active/closed because most are active (only 39 not) so if I only get to one, let it be district.

/*// day of the week (districts)
var monD = [];
var tueD = [];
var wedD = [];
var thuD = [];
var friD = [];
var satD = [];
var sunD = [];

// for location (districts)
var vehD = [];
var buiD = [];
var othD = [];
var shoD = [];
var bikD = [];*/ // I actually don't think I need these because I can just use -T ending ones again.

function preload() {
  wordData = loadJSON("https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft");
  b1 = loadImage('images/bx.png');
}

function setup() {
  // put setup code here
  createCanvas(1200, 600);
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
  tr0Col = color(230,80,70);
  tr1Col = color(220,60,90);
  tr2Col = color(210,25,100);
  tr3Col = color(45,25,100);
  tr4Col = color(25,60,90);
  tr5Col = color(10,80,70);

  tCol = color(100);
  sCol = color(100, 0.5);
  bCol = color(18);

  // colors for Districts mode:
  d0col = color(180,80,90); // Bayview
  d1col = color(120,60,80); // Central
  d2col = color(330,70,90); // Ingleside
  d3col = color(270,50,80); // Mission
  d4col = color(20,70,90); // Northern
  d5col = color(0,0,60); // Out of SF
  d6col = color(130,50,55); // Park
  d7col = color(0,70,70); // Richmond
  d8col = color(210,20,90); // Southern
  d9col = color(50,60,85); // Taraval
  d10col = color(230,60,70); // Tenderloin

  //runTimeOfDay();
  runDistricts();

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
  image(b1, 0, 0);

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

  //fill();

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
      circle(710 + (i * 10), verticalPlacement + (j * 10), 8); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(710 + (biggy * 10), verticalPlacement + 30 - (i * 10), 8); // x, y, diameter
    }
  }
}


// Time of Day mode functions
function runTimeOfDay() {
  background(255);
  image(b1, 0, 0);

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
  print('Days Total: ' + total);


  textAlign(LEFT);
  textSize(15);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.8);
  text('Mondays', 612, 20);
  text('Tuesdays', 612, 80);
  text('Wednesdays', 612, 155);
  text('Thursdays', 612, 230);
  text('Fridays', 612, 305);
  text('Saturdays', 612, 380);
  text('Sundays', 612, 455);

  //fill(tCol);

  //subcategory(subcategory,variable)
  vehicle = subcategory("Larceny - From Vehicle");
  vehicle += subcategory("Theft From Vehicle");
  building = subcategory("Larceny Theft - From Building");
  other = subcategory("Larceny Theft - Other");
  other += subcategory("Larceny - Auto Parts");
  other += subcategory("Larceny Theft - Pickpocket");
  shoplift = subcategory("Larceny Theft - Shoplifting");
  bike = subcategory("Larceny Theft - Bicycle");

  // but now we have to tally for type, because of time-of-day color-coding
  // Tally up incidents for each day
  for (var i = 0; i < 1000; i++) {

    var theTime = int(str(wordData[i].incident_time).substring(0,2));

    var theCategory = wordData[i].incident_subcategory; //.substring(0,1); // look up how to use substring
    if (theCategory == "Larceny - From Vehicle") {
      if (theTime < 6) {vehT[0]++;}
      if (theTime >= 6 && theTime < 9) {vehT[1]++;}
      if (theTime >= 9 && theTime < 12) {vehT[2]++;}
      if (theTime >= 12 && theTime < 17) {vehT[3]++;}
      if (theTime >= 17 && theTime < 20) {vehT[4]++;}
      if (theTime >= 20 && theTime < 24) {vehT[5]++;}
    }
    else if (theCategory == "Theft From Vehicle") {
      if (theTime < 6) {vehT[0]++;}
      if (theTime >= 6 && theTime < 9) {vehT[1]++;}
      if (theTime >= 9 && theTime < 12) {vehT[2]++;}
      if (theTime >= 12 && theTime < 17) {vehT[3]++;}
      if (theTime >= 17 && theTime < 20) {vehT[4]++;}
      if (theTime >= 20 && theTime < 24) {vehT[5]++;}
    }
    else if (theCategory == "Larceny Theft - From Building") {
      if (theTime < 6) {buiT[0]++;}
      if (theTime >= 6 && theTime < 9) {buiT[1]++;}
      if (theTime >= 9 && theTime < 12) {buiT[2]++;}
      if (theTime >= 12 && theTime < 17) {buiT[3]++;}
      if (theTime >= 17 && theTime < 20) {buiT[4]++;}
      if (theTime >= 20 && theTime < 24) {buiT[5]++;}
    }
    else if (theCategory == "Larceny Theft - Other") {
      if (theTime < 6) {othT[0]++;}
      if (theTime >= 6 && theTime < 9) {othT[1]++;}
      if (theTime >= 9 && theTime < 12) {othT[2]++;}
      if (theTime >= 12 && theTime < 17) {othT[3]++;}
      if (theTime >= 17 && theTime < 20) {othT[4]++;}
      if (theTime >= 20 && theTime < 24) {othT[5]++;}
    }
    else if (theCategory == "Larceny - Auto Parts") {
      if (theTime < 6) {othT[0]++;}
      if (theTime >= 6 && theTime < 9) {othT[1]++;}
      if (theTime >= 9 && theTime < 12) {othT[2]++;}
      if (theTime >= 12 && theTime < 17) {othT[3]++;}
      if (theTime >= 17 && theTime < 20) {othT[4]++;}
      if (theTime >= 20 && theTime < 24) {othT[5]++;}
    }
    else if (theCategory == "Larceny Theft - Pickpocket") {
      if (theTime < 6) {othT[0]++;}
      if (theTime >= 6 && theTime < 9) {othT[1]++;}
      if (theTime >= 9 && theTime < 12) {othT[2]++;}
      if (theTime >= 12 && theTime < 17) {othT[3]++;}
      if (theTime >= 17 && theTime < 20) {othT[4]++;}
      if (theTime >= 20 && theTime < 24) {othT[5]++;}
    }
    else if (theCategory == "Larceny Theft - Shoplifting") {
      if (theTime < 6) {shoT[0]++;}
      if (theTime >= 6 && theTime < 9) {shoT[1]++;}
      if (theTime >= 9 && theTime < 12) {shoT[2]++;}
      if (theTime >= 12 && theTime < 17) {shoT[3]++;}
      if (theTime >= 17 && theTime < 20) {shoT[4]++;}
      if (theTime >= 20 && theTime < 24) {shoT[5]++;}
    }
    else if (theCategory == "Larceny Theft - Bicycle") {
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
    drawCrimeCatTime(i);
  }

  var vehV = vehT[0] + vehT[1] + vehT[2] + vehT[3] + vehT[4] + vehT[5];
  print('Vehicle: ' + monV);
  var buiV = buiT[0] + buiT[1] + buiT[2] + buiT[3] + buiT[4] + buiT[5];
  print('Building: ' + buiV);
  var othV = othT[0] + othT[1] + othT[2] + othT[3] + othT[4] + othT[5];
  print('Other: ' + othV);
  var shoV = shoT[0] + shoT[1] + shoT[2] + shoT[3] + shoT[4] + shoT[5];
  print('Shoplift: ' + shoV);
  var bikV = bikT[0] + bikT[1] + bikT[2] + bikT[3] + bikT[4] + bikT[5];
  print('Bike: ' + bikV);
  var totalC = vehV + buiV + othV + shoV + bikV;
  print('Total Categories: ' + totalC);
  var totalCA = vehicle + building + other + shoplift + bike;
  print('Total Categories Alt: ' + totalCA);


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

  drawLegend();
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

function supercirclesTime(day, verticalPlacement) { // this is so we can easily create and move circles based on the values
  if (day == "monday") {
    superCirclesIndividualTime(monday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(monday - int(monT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(monday - int(monT[5]) - int(monT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(monT[2]) + int(monT[1]) + int(monT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(monT[1]) + int(monT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(monT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "tuesday") {
    superCirclesIndividualTime(tuesday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(tuesday - int(tueT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(tuesday - int(tueT[5]) - int(tueT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(tueT[2]) + int(tueT[1]) + int(tueT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(tueT[1]) + int(tueT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(tueT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "wednesday") {
    superCirclesIndividualTime(wednesday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(wednesday - int(wedT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(wednesday - int(wedT[5]) - int(wedT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(wedT[2]) + int(wedT[1]) + int(wedT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(wedT[1]) + int(wedT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(wedT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "thursday") {
    superCirclesIndividualTime(thursday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(thursday - int(thuT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(thursday - int(thuT[5]) - int(thuT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(thuT[2]) + int(thuT[1]) + int(thuT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(thuT[1]) + int(thuT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(thuT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "friday") {
    superCirclesIndividualTime(friday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(friday - int(friT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(friday - int(friT[5]) - int(friT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(friT[2]) + int(friT[1]) + int(friT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(friT[1]) + int(friT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(friT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "saturday") {
    superCirclesIndividualTime(saturday, verticalPlacement, tr5Col);
    superCirclesIndividualTime(saturday - int(satT[5]), verticalPlacement, tr4Col);
    superCirclesIndividualTime(saturday - int(satT[5]) - int(satT[4]), verticalPlacement, tr3Col);
    superCirclesIndividualTime(int(satT[2]) + int(satT[1]) + int(satT[0]), verticalPlacement, tr2Col);
    superCirclesIndividualTime(int(satT[1]) + int(satT[0]), verticalPlacement, tr1Col);
    superCirclesIndividualTime(int(satT[0]), verticalPlacement, tr0Col);
  }
  else if (day == "sunday") {
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
//  stroke(0,0.01);
//  strokeWeight(5);
  fill(bCol);
  print(quantity);
  oompaloompa += quantity;

  var biggy = int(quantity / 4);
  var smally = quantity % 4;

  // Overwriting Existing Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(710 + (i * 10), verticalPlacement + (j * 10), 10.25); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(710 + (biggy * 10), verticalPlacement + 30 - (i * 10), 10.25); // x, y, diameter
    }
  }

  fill(myCol);
  // Making New Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(710 + (i * 10), verticalPlacement + (j * 10), 9.75); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(710 + (biggy * 10), verticalPlacement + 30 - (i * 10), 9.75); // x, y, diameter
    }
  }
}

function subcirclesTime(category, horizontalPlacement) {
  if (category == "vehicle") {
    subCirclesIndividualTime(vehicle, horizontalPlacement, tr5Col);
    subCirclesIndividualTime(vehicle - int(vehT[5]), horizontalPlacement, tr4Col);
    subCirclesIndividualTime(vehicle - int(vehT[5]) - int(vehT[4]), horizontalPlacement, tr3Col);
    subCirclesIndividualTime(int(vehT[2]) + int(vehT[1]) + int(vehT[0]), horizontalPlacement, tr2Col);
    subCirclesIndividualTime(int(vehT[1]) + int(vehT[0]), horizontalPlacement, tr1Col);
    subCirclesIndividualTime(int(vehT[0]), horizontalPlacement, tr0Col);
  }
  else if (category == "building") {
    subCirclesIndividualTime(building, horizontalPlacement, tr5Col);
    subCirclesIndividualTime(building - int(buiT[5]), horizontalPlacement, tr4Col);
    subCirclesIndividualTime(building - int(buiT[5]) - int(buiT[4]), horizontalPlacement, tr3Col);
    subCirclesIndividualTime(int(buiT[2]) + int(buiT[1]) + int(buiT[0]), horizontalPlacement, tr2Col);
    subCirclesIndividualTime(int(buiT[1]) + int(buiT[0]), horizontalPlacement, tr1Col);
    subCirclesIndividualTime(int(buiT[0]), horizontalPlacement, tr0Col);
  }
  else if (category == "other") {
    subCirclesIndividualTime(other, horizontalPlacement, tr5Col);
    subCirclesIndividualTime(other - int(othT[5]), horizontalPlacement, tr4Col);
    subCirclesIndividualTime(other - int(othT[5]) - int(othT[4]), horizontalPlacement, tr3Col);
    subCirclesIndividualTime(int(othT[2]) + int(othT[1]) + int(othT[0]), horizontalPlacement, tr2Col);
    subCirclesIndividualTime(int(othT[1]) + int(othT[0]), horizontalPlacement, tr1Col);
    subCirclesIndividualTime(int(othT[0]), horizontalPlacement, tr0Col);
  }
  else if (category == "shoplift") {
    subCirclesIndividualTime(shoplift, horizontalPlacement, tr5Col);
    subCirclesIndividualTime(shoplift - int(shoT[5]), horizontalPlacement, tr4Col);
    subCirclesIndividualTime(shoplift - int(shoT[5]) - int(shoT[4]), horizontalPlacement, tr3Col);
    subCirclesIndividualTime(int(shoT[2]) + int(shoT[1]) + int(shoT[0]), horizontalPlacement, tr2Col);
    subCirclesIndividualTime(int(shoT[1]) + int(shoT[0]), horizontalPlacement, tr1Col);
    subCirclesIndividualTime(int(shoT[0]), horizontalPlacement, tr0Col);
  }
  else if (category == "bike") {
    subCirclesIndividualTime(bike, horizontalPlacement, tr5Col);
    subCirclesIndividualTime(bike - int(bikT[5]), horizontalPlacement, tr4Col);
    subCirclesIndividualTime(bike - int(bikT[5]) - int(bikT[4]), horizontalPlacement, tr3Col);
    subCirclesIndividualTime(int(bikT[2]) + int(bikT[1]) + int(bikT[0]), horizontalPlacement, tr2Col);
    subCirclesIndividualTime(int(bikT[1]) + int(bikT[0]), horizontalPlacement, tr1Col);
    subCirclesIndividualTime(int(bikT[0]), horizontalPlacement, tr0Col);
  }
}

function subCirclesIndividualTime(quantity, horizontalPlacement, myCol) { // this is so we can easily create and move circles based on the values
  noStroke();

  var biggy = int(quantity / 12);
  var smally = quantity % 12;

  fill(bCol);

  // overwriting existing circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 12; j++) {
      circle(horizontalPlacement + (j * 8), 460 - (i * 8), 8.25); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(horizontalPlacement + 88 - (i * 8), 460 - (biggy * 8), 8.25); // x, y, diameter
    }
  }

  fill(myCol);
  // creating new circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 12; j++) {
      circle(horizontalPlacement + (j * 8), 460 - (i * 8), 7.75); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(horizontalPlacement + 88 - (i * 8), 460 - (biggy * 8), 7.75); // x, y, diameter
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

function drawCrimeCatTime(slot) {
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

  textAlign(CENTER);
  textSize(16);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.8);
  text(tempString, 49 + (124 * slot), 487);
  subcirclesTime(catSlot[slot], 5 + (124 * slot));
}

function drawLegend() {
  noStroke();

  fill(tr0Col);
  rectAlt(0, 540, 300, 30);

  fill(tr1Col);
  rectAlt(300, 540, 150, 30);

  fill(tr2Col);
  rectAlt(450, 540, 150, 30);

  fill(tr3Col);
  rectAlt(600, 540, 250, 30);

  fill(tr4Col);
  rectAlt(850, 540, 150, 30);

  fill(tr5Col);
  rectAlt(1000, 540, 200, 30);


  fill(tCol);
  stroke(tCol);
  strokeWeight(2);
  line(xPosMod(0),570,xPosMod(1200),570);

  for (var i = 0; i < 25; i++) {
    line(xPosMod(i * 50), 560, xPosMod(i * 50), 575);
  }

  textAlign(LEFT);
  textSize(16);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.5);
  text('Legend:', 10, 526);

  textAlign(CENTER);
  textSize(12);
  strokeWeight(0);
  text('Midnight', xPosMod(0), 590);
  for (var i = 1; i < 12; i++) {
    text(str(i) + 'am', xPosMod(i*50), 590);
  }
  text('Noon', xPosMod(600), 590);
  for (var i = 13; i < 24; i++) {
    text(str(i - 12) + 'pm', xPosMod(i*50), 590);
  }
  text('Midnight', xPosMod(1200), 590);

  strokeWeight(0.5);
  text('Midnight', xPosMod(0), 590);
  text('6am', xPosMod(300), 590);
  text('9am', xPosMod(450), 590);
  text('Noon', xPosMod(600), 590);
  text('5pm', xPosMod(850), 590);
  text('8pm', xPosMod(1000), 590);
  text('Midnight', xPosMod(1200), 590);
}

function rectAlt(xpos, ypos, width, height) {
  rect(xPosMod(xpos), ypos, width * 0.916666667, height);
}

function xPosMod(xpos) {
  var blah = (xpos * 0.916666667) + 50;
  return blah;
}


// Districts mode Functions
function runDistricts() {
  background(255);
  image(b1, 0, 0);

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

  for (var i = 0; i < 11; i++) {
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

    var theDistrict = wordData[i].police_district;

    var theday = wordData[i].incident_day_of_week; //.substring(0,1); // look up how to use substring
    if (theday == "Monday") {
      monday++;
      if (theDistrict == "Bayview")    {monT[0]++;}
      if (theDistrict == "Central")    {monT[1]++;}
      if (theDistrict == "Ingleside")  {monT[2]++;}
      if (theDistrict == "Mission")    {monT[3]++;}
      if (theDistrict == "Northern")   {monT[4]++;}
      if (theDistrict == "Out of SF")  {monT[5]++;}
      if (theDistrict == "Park")       {monT[6]++;}
      if (theDistrict == "Richmond")   {monT[7]++;}
      if (theDistrict == "Southern")   {monT[8]++;}
      if (theDistrict == "Taraval")    {monT[9]++;}
      if (theDistrict == "Tenderloin") {monT[10]++;}
    }
    else if (theday == "Tuesday") {
      tuesday++;
      if (theDistrict == "Bayview")    {tueT[0]++;}
      if (theDistrict == "Central")    {tueT[1]++;}
      if (theDistrict == "Ingleside")  {tueT[2]++;}
      if (theDistrict == "Mission")    {tueT[3]++;}
      if (theDistrict == "Northern")   {tueT[4]++;}
      if (theDistrict == "Out of SF")  {tueT[5]++;}
      if (theDistrict == "Park")       {tueT[6]++;}
      if (theDistrict == "Richmond")   {tueT[7]++;}
      if (theDistrict == "Southern")   {tueT[8]++;}
      if (theDistrict == "Taraval")    {tueT[9]++;}
      if (theDistrict == "Tenderloin") {tueT[10]++;}
    }
    else if (theday == "Wednesday") {
      wednesday++;
      if (theDistrict == "Bayview")    {wedT[0]++;}
      if (theDistrict == "Central")    {wedT[1]++;}
      if (theDistrict == "Ingleside")  {wedT[2]++;}
      if (theDistrict == "Mission")    {wedT[3]++;}
      if (theDistrict == "Northern")   {wedT[4]++;}
      if (theDistrict == "Out of SF")  {wedT[5]++;}
      if (theDistrict == "Park")       {wedT[6]++;}
      if (theDistrict == "Richmond")   {wedT[7]++;}
      if (theDistrict == "Southern")   {wedT[8]++;}
      if (theDistrict == "Taraval")    {wedT[9]++;}
      if (theDistrict == "Tenderloin") {wedT[10]++;}
    }
    else if (theday == "Thursday") {
      thursday++;
      if (theDistrict == "Bayview")    {thuT[0]++;}
      if (theDistrict == "Central")    {thuT[1]++;}
      if (theDistrict == "Ingleside")  {thuT[2]++;}
      if (theDistrict == "Mission")    {thuT[3]++;}
      if (theDistrict == "Northern")   {thuT[4]++;}
      if (theDistrict == "Out of SF")  {thuT[5]++;}
      if (theDistrict == "Park")       {thuT[6]++;}
      if (theDistrict == "Richmond")   {thuT[7]++;}
      if (theDistrict == "Southern")   {thuT[8]++;}
      if (theDistrict == "Taraval")    {thuT[9]++;}
      if (theDistrict == "Tenderloin") {thuT[10]++;}
    }
    else if (theday == "Friday") {
      friday++;
      if (theDistrict == "Bayview")    {friT[0]++;}
      if (theDistrict == "Central")    {friT[1]++;}
      if (theDistrict == "Ingleside")  {friT[2]++;}
      if (theDistrict == "Mission")    {friT[3]++;}
      if (theDistrict == "Northern")   {friT[4]++;}
      if (theDistrict == "Out of SF")  {friT[5]++;}
      if (theDistrict == "Park")       {friT[6]++;}
      if (theDistrict == "Richmond")   {friT[7]++;}
      if (theDistrict == "Southern")   {friT[8]++;}
      if (theDistrict == "Taraval")    {friT[9]++;}
      if (theDistrict == "Tenderloin") {friT[10]++;}
    }
    else if (theday == "Saturday") {
      saturday++;
      if (theDistrict == "Bayview")    {satT[0]++;}
      if (theDistrict == "Central")    {satT[1]++;}
      if (theDistrict == "Ingleside")  {satT[2]++;}
      if (theDistrict == "Mission")    {satT[3]++;}
      if (theDistrict == "Northern")   {satT[4]++;}
      if (theDistrict == "Out of SF")  {satT[5]++;}
      if (theDistrict == "Park")       {satT[6]++;}
      if (theDistrict == "Richmond")   {satT[7]++;}
      if (theDistrict == "Southern")   {satT[8]++;}
      if (theDistrict == "Taraval")    {satT[9]++;}
      if (theDistrict == "Tenderloin") {satT[10]++;}
    }
    else if (theday == "Sunday") {
      sunday++;
      if (theDistrict == "Bayview")    {sunT[0]++;}
      if (theDistrict == "Central")    {sunT[1]++;}
      if (theDistrict == "Ingleside")  {sunT[2]++;}
      if (theDistrict == "Mission")    {sunT[3]++;}
      if (theDistrict == "Northern")   {sunT[4]++;}
      if (theDistrict == "Out of SF")  {sunT[5]++;}
      if (theDistrict == "Park")       {sunT[6]++;}
      if (theDistrict == "Richmond")   {sunT[7]++;}
      if (theDistrict == "Southern")   {sunT[8]++;}
      if (theDistrict == "Taraval")    {sunT[9]++;}
      if (theDistrict == "Tenderloin") {sunT[10]++;}
    }
  }

  var monV = monT[0] + monT[1] + monT[2] + monT[3] + monT[4] + monT[5] + monT[6] + monT[7] + monT[8] + monT[9] + monT[10];
  print('Monday: ' + monV);
  var tueV = tueT[0] + tueT[1] + tueT[2] + tueT[3] + tueT[4] + tueT[5] + tueT[6] + tueT[7] + tueT[8] + tueT[9] + tueT[10];
  print('Tuesday: ' + tueV);
  var wedV = wedT[0] + wedT[1] + wedT[2] + wedT[3] + wedT[4] + wedT[5] + wedT[6] + wedT[7] + wedT[8] + wedT[9] + wedT[10];
  print('Wednesday: ' + wedV);
  var thuV = thuT[0] + thuT[1] + thuT[2] + thuT[3] + thuT[4] + thuT[5] + thuT[6] + thuT[7] + thuT[8] + thuT[9] + thuT[10];
  print('Thursday: ' + thuV);
  var friV = friT[0] + friT[1] + friT[2] + friT[3] + friT[4] + friT[5] + friT[6] + friT[7] + friT[8] + friT[9] + friT[10];
  print('Friday: ' + friV);
  var satV = satT[0] + satT[1] + satT[2] + satT[3] + satT[4] + satT[5] + satT[6] + satT[7] + satT[8] + satT[9] + satT[10];
  print('Saturday: ' + satV);
  var sunV = sunT[0] + sunT[1] + sunT[2] + sunT[3] + sunT[4] + sunT[5] + sunT[6] + sunT[7] + sunT[8] + sunT[9] + sunT[10];
  print('Sunday: ' + sunV);
  var total = monV + tueV + wedV + thuV + friV + satV + sunV;
  print('Days Total: ' + total);


  textAlign(LEFT);
  textSize(15);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.8);
  text('Mondays', 612, 20);
  text('Tuesdays', 612, 80);
  text('Wednesdays', 612, 155);
  text('Thursdays', 612, 230);
  text('Fridays', 612, 305);
  text('Saturdays', 612, 380);
  text('Sundays', 612, 455);

  //fill(tCol);

  //subcategory(subcategory,variable)
  vehicle = subcategory("Larceny - From Vehicle");
  vehicle += subcategory("Theft From Vehicle");
  building = subcategory("Larceny Theft - From Building");
  other = subcategory("Larceny Theft - Other");
  other += subcategory("Larceny - Auto Parts");
  other += subcategory("Larceny Theft - Pickpocket");
  shoplift = subcategory("Larceny Theft - Shoplifting");
  bike = subcategory("Larceny Theft - Bicycle");

  // but now we have to tally for type, because of time-of-day color-coding
  // Tally up incidents for each day
  for (var i = 0; i < 1000; i++) {

    var theDistrict = wordData[i].police_district;

    var theCategory = wordData[i].incident_subcategory; //.substring(0,1); // look up how to use substring
    if (theCategory == "Larceny - From Vehicle") {
      if (theDistrict == "Bayview")    {vehT[0]++;}
      if (theDistrict == "Central")    {vehT[1]++;}
      if (theDistrict == "Ingleside")  {vehT[2]++;}
      if (theDistrict == "Mission")    {vehT[3]++;}
      if (theDistrict == "Northern")   {vehT[4]++;}
      if (theDistrict == "Out of SF")  {vehT[5]++;}
      if (theDistrict == "Park")       {vehT[6]++;}
      if (theDistrict == "Richmond")   {vehT[7]++;}
      if (theDistrict == "Southern")   {vehT[8]++;}
      if (theDistrict == "Taraval")    {vehT[9]++;}
      if (theDistrict == "Tenderloin") {vehT[10]++;}
    }
    else if (theCategory == "Theft From Vehicle") {
      if (theDistrict == "Bayview")    {vehT[0]++;}
      if (theDistrict == "Central")    {vehT[1]++;}
      if (theDistrict == "Ingleside")  {vehT[2]++;}
      if (theDistrict == "Mission")    {vehT[3]++;}
      if (theDistrict == "Northern")   {vehT[4]++;}
      if (theDistrict == "Out of SF")  {vehT[5]++;}
      if (theDistrict == "Park")       {vehT[6]++;}
      if (theDistrict == "Richmond")   {vehT[7]++;}
      if (theDistrict == "Southern")   {vehT[8]++;}
      if (theDistrict == "Taraval")    {vehT[9]++;}
      if (theDistrict == "Tenderloin") {vehT[10]++;}
    }
    else if (theCategory == "Larceny Theft - From Building") {
      if (theDistrict == "Bayview")    {buiT[0]++;}
      if (theDistrict == "Central")    {buiT[1]++;}
      if (theDistrict == "Ingleside")  {buiT[2]++;}
      if (theDistrict == "Mission")    {buiT[3]++;}
      if (theDistrict == "Northern")   {buiT[4]++;}
      if (theDistrict == "Out of SF")  {buiT[5]++;}
      if (theDistrict == "Park")       {buiT[6]++;}
      if (theDistrict == "Richmond")   {buiT[7]++;}
      if (theDistrict == "Southern")   {buiT[8]++;}
      if (theDistrict == "Taraval")    {buiT[9]++;}
      if (theDistrict == "Tenderloin") {buiT[10]++;}
    }
    else if (theCategory == "Larceny Theft - Other") {
      if (theDistrict == "Bayview")    {othT[0]++;}
      if (theDistrict == "Central")    {othT[1]++;}
      if (theDistrict == "Ingleside")  {othT[2]++;}
      if (theDistrict == "Mission")    {othT[3]++;}
      if (theDistrict == "Northern")   {othT[4]++;}
      if (theDistrict == "Out of SF")  {othT[5]++;}
      if (theDistrict == "Park")       {othT[6]++;}
      if (theDistrict == "Richmond")   {othT[7]++;}
      if (theDistrict == "Southern")   {othT[8]++;}
      if (theDistrict == "Taraval")    {othT[9]++;}
      if (theDistrict == "Tenderloin") {othT[10]++;}
    }
    else if (theCategory == "Larceny - Auto Parts") {
      if (theDistrict == "Bayview")    {othT[0]++;}
      if (theDistrict == "Central")    {othT[1]++;}
      if (theDistrict == "Ingleside")  {othT[2]++;}
      if (theDistrict == "Mission")    {othT[3]++;}
      if (theDistrict == "Northern")   {othT[4]++;}
      if (theDistrict == "Out of SF")  {othT[5]++;}
      if (theDistrict == "Park")       {othT[6]++;}
      if (theDistrict == "Richmond")   {othT[7]++;}
      if (theDistrict == "Southern")   {othT[8]++;}
      if (theDistrict == "Taraval")    {othT[9]++;}
      if (theDistrict == "Tenderloin") {othT[10]++;}
    }
    else if (theCategory == "Larceny Theft - Pickpocket") {
      if (theDistrict == "Bayview")    {othT[0]++;}
      if (theDistrict == "Central")    {othT[1]++;}
      if (theDistrict == "Ingleside")  {othT[2]++;}
      if (theDistrict == "Mission")    {othT[3]++;}
      if (theDistrict == "Northern")   {othT[4]++;}
      if (theDistrict == "Out of SF")  {othT[5]++;}
      if (theDistrict == "Park")       {othT[6]++;}
      if (theDistrict == "Richmond")   {othT[7]++;}
      if (theDistrict == "Southern")   {othT[8]++;}
      if (theDistrict == "Taraval")    {othT[9]++;}
      if (theDistrict == "Tenderloin") {othT[10]++;}
    }
    else if (theCategory == "Larceny Theft - Shoplifting") {
      if (theDistrict == "Bayview")    {shoT[0]++;}
      if (theDistrict == "Central")    {shoT[1]++;}
      if (theDistrict == "Ingleside")  {shoT[2]++;}
      if (theDistrict == "Mission")    {shoT[3]++;}
      if (theDistrict == "Northern")   {shoT[4]++;}
      if (theDistrict == "Out of SF")  {shoT[5]++;}
      if (theDistrict == "Park")       {shoT[6]++;}
      if (theDistrict == "Richmond")   {shoT[7]++;}
      if (theDistrict == "Southern")   {shoT[8]++;}
      if (theDistrict == "Taraval")    {shoT[9]++;}
      if (theDistrict == "Tenderloin") {shoT[10]++;}
    }
    else if (theCategory == "Larceny Theft - Bicycle") {
      if (theDistrict == "Bayview")    {bikT[0]++;}
      if (theDistrict == "Central")    {bikT[1]++;}
      if (theDistrict == "Ingleside")  {bikT[2]++;}
      if (theDistrict == "Mission")    {bikT[3]++;}
      if (theDistrict == "Northern")   {bikT[4]++;}
      if (theDistrict == "Out of SF")  {bikT[5]++;}
      if (theDistrict == "Park")       {bikT[6]++;}
      if (theDistrict == "Richmond")   {bikT[7]++;}
      if (theDistrict == "Southern")   {bikT[8]++;}
      if (theDistrict == "Taraval")    {bikT[9]++;}
      if (theDistrict == "Tenderloin") {bikT[10]++;}
    }
  }

  orderCats();

  for (var i = 0; i < 5; i++) {
    drawCrimeCatTime_Districts(i);
  }

  // If I feel the need I can add the other five but I don't think it's necessary.
  var vehV = vehT[0] + vehT[1] + vehT[2] + vehT[3] + vehT[4] + vehT[5];
  print('Vehicle: ' + monV);
  var buiV = buiT[0] + buiT[1] + buiT[2] + buiT[3] + buiT[4] + buiT[5];
  print('Building: ' + buiV);
  var othV = othT[0] + othT[1] + othT[2] + othT[3] + othT[4] + othT[5];
  print('Other: ' + othV);
  var shoV = shoT[0] + shoT[1] + shoT[2] + shoT[3] + shoT[4] + shoT[5];
  print('Shoplift: ' + shoV);
  var bikV = bikT[0] + bikT[1] + bikT[2] + bikT[3] + bikT[4] + bikT[5];
  print('Bike: ' + bikV);
  var totalC = vehV + buiV + othV + shoV + bikV;
  print('Total Categories: ' + totalC);
  var totalCA = vehicle + building + other + shoplift + bike;
  print('Total Categories Alt: ' + totalCA);


  drawDaysOfWeek_Districts();
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

  drawLegend_Districts();
}

function drawDaysOfWeek_Districts() {
  supercircles_Districts("monday", 15);
  supercircles_Districts("tuesday", 83);
  supercircles_Districts("wednesday", 160);
  supercircles_Districts("thursday", 232);
  supercircles_Districts("friday", 307);
  supercircles_Districts("saturday", 385);
  supercircles_Districts("sunday", 454);
}

function supercircles_Districts(day, verticalPlacement) { // this is so we can easily create and move circles based on the values
  if (day == "monday") {
    superCirclesIndividual_Districts(monday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(monday - int(monT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]), verticalPlacement, d5col);
//    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]) - int(monT[5]), verticalPlacement, d4col);
//    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]) - int(monT[5]) - int(monT[4]), verticalPlacement, d3col);
//    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]) - int(monT[5]) - int(monT[4]) - int(monT[3]), verticalPlacement, d2col);
//    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]) - int(monT[5]) - int(monT[4]) - int(monT[3]) - int(monT[2]), verticalPlacement, d1col);
//    superCirclesIndividual_Districts(monday - int(monT[10]) - int(monT[9]) - int(monT[8]) - int(monT[7]) - int(monT[6]) - int(monT[5]) - int(monT[4]) - int(monT[3]) - int(monT[2]) - int(monT[1]), verticalPlacement, d0col);
    superCirclesIndividual_Districts(int(monT[4]) + int(monT[3]) + int(monT[2]) + int(monT[1]) + int(monT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(monT[3]) + int(monT[2]) + int(monT[1]) + int(monT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(monT[2]) + int(monT[1]) + int(monT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(monT[1]) + int(monT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(monT[0]), verticalPlacement, d0col);
  }
  else if (day == "tuesday") {
    superCirclesIndividual_Districts(tuesday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(tuesday - int(tueT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(tuesday - int(tueT[10]) - int(tueT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(tuesday - int(tueT[10]) - int(tueT[9]) - int(tueT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(tuesday - int(tueT[10]) - int(tueT[9]) - int(tueT[8]) - int(tueT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(tuesday - int(tueT[10]) - int(tueT[9]) - int(tueT[8]) - int(tueT[7]) - int(tueT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(tueT[4]) + int(tueT[3]) + int(tueT[2]) + int(tueT[1]) + int(tueT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(tueT[3]) + int(tueT[2]) + int(tueT[1]) + int(tueT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(tueT[2]) + int(tueT[1]) + int(tueT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(tueT[1]) + int(tueT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(tueT[0]), verticalPlacement, d0col);
  }
  else if (day == "wednesday") {
    superCirclesIndividual_Districts(wednesday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(wednesday - int(wedT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(wednesday - int(wedT[10]) - int(wedT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(wednesday - int(wedT[10]) - int(wedT[9]) - int(wedT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(wednesday - int(wedT[10]) - int(wedT[9]) - int(wedT[8]) - int(wedT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(wednesday - int(wedT[10]) - int(wedT[9]) - int(wedT[8]) - int(wedT[7]) - int(wedT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(wedT[4]) + int(wedT[3]) + int(wedT[2]) + int(wedT[1]) + int(wedT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(wedT[3]) + int(wedT[2]) + int(wedT[1]) + int(wedT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(wedT[2]) + int(wedT[1]) + int(wedT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(wedT[1]) + int(wedT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(wedT[0]), verticalPlacement, d0col);
  }
  else if (day == "thursday") {
    superCirclesIndividual_Districts(thursday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(thursday - int(thuT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(thursday - int(thuT[10]) - int(thuT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(thursday - int(thuT[10]) - int(thuT[9]) - int(thuT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(thursday - int(thuT[10]) - int(thuT[9]) - int(thuT[8]) - int(thuT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(thursday - int(thuT[10]) - int(thuT[9]) - int(thuT[8]) - int(thuT[7]) - int(thuT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(thuT[4]) + int(thuT[3]) + int(thuT[2]) + int(thuT[1]) + int(thuT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(thuT[3]) + int(thuT[2]) + int(thuT[1]) + int(thuT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(thuT[2]) + int(thuT[1]) + int(thuT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(thuT[1]) + int(thuT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(thuT[0]), verticalPlacement, d0col);
  }
  else if (day == "friday") {
    superCirclesIndividual_Districts(friday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(friday - int(friT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(friday - int(friT[10]) - int(friT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(friday - int(friT[10]) - int(friT[9]) - int(friT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(friday - int(friT[10]) - int(friT[9]) - int(friT[8]) - int(friT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(friday - int(friT[10]) - int(friT[9]) - int(friT[8]) - int(friT[7]) - int(friT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(friT[4]) + int(friT[3]) + int(friT[2]) + int(friT[1]) + int(friT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(friT[3]) + int(friT[2]) + int(friT[1]) + int(friT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(friT[2]) + int(friT[1]) + int(friT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(friT[1]) + int(friT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(friT[0]), verticalPlacement, d0col);
  }
  else if (day == "saturday") {
    superCirclesIndividual_Districts(saturday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(saturday - int(satT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(saturday - int(satT[10]) - int(satT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(saturday - int(satT[10]) - int(satT[9]) - int(satT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(saturday - int(satT[10]) - int(satT[9]) - int(satT[8]) - int(satT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(saturday - int(satT[10]) - int(satT[9]) - int(satT[8]) - int(satT[7]) - int(satT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(satT[4]) + int(satT[3]) + int(satT[2]) + int(satT[1]) + int(satT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(satT[3]) + int(satT[2]) + int(satT[1]) + int(satT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(satT[2]) + int(satT[1]) + int(satT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(satT[1]) + int(satT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(satT[0]), verticalPlacement, d0col);
  }
  else if (day == "sunday") {
    superCirclesIndividual_Districts(sunday, verticalPlacement, d10col);
    superCirclesIndividual_Districts(sunday - int(sunT[10]), verticalPlacement, d9col);
    superCirclesIndividual_Districts(sunday - int(sunT[10]) - int(sunT[9]), verticalPlacement, d8col);
    superCirclesIndividual_Districts(sunday - int(sunT[10]) - int(sunT[9]) - int(sunT[8]), verticalPlacement, d7col);
    superCirclesIndividual_Districts(sunday - int(sunT[10]) - int(sunT[9]) - int(sunT[8]) - int(sunT[7]), verticalPlacement, d6col);
    superCirclesIndividual_Districts(sunday - int(sunT[10]) - int(sunT[9]) - int(sunT[8]) - int(sunT[7]) - int(sunT[6]), verticalPlacement, d5col);
    superCirclesIndividual_Districts(int(sunT[4]) + int(sunT[3]) + int(sunT[2]) + int(sunT[1]) + int(sunT[0]), verticalPlacement, d4col);
    superCirclesIndividual_Districts(int(sunT[3]) + int(sunT[2]) + int(sunT[1]) + int(sunT[0]), verticalPlacement, d3col);
    superCirclesIndividual_Districts(int(sunT[2]) + int(sunT[1]) + int(sunT[0]), verticalPlacement, d2col);
    superCirclesIndividual_Districts(int(sunT[1]) + int(sunT[0]), verticalPlacement, d1col);
    superCirclesIndividual_Districts(int(sunT[0]), verticalPlacement, d0col);
  }
}

function superCirclesIndividual_Districts(quantity, verticalPlacement, myCol) {
  noStroke();
//  stroke(0,0.01);
//  strokeWeight(5);
  fill(bCol);
  print(quantity);
  oompaloompa += quantity;

  var biggy = int(quantity / 4);
  var smally = quantity % 4;

  // Overwriting Existing Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(710 + (i * 10), verticalPlacement + (j * 10), 10.25); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(710 + (biggy * 10), verticalPlacement + 30 - (i * 10), 10.25); // x, y, diameter
    }
  }

  fill(myCol);
  // Making New Circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 4; j++) {
      circle(710 + (i * 10), verticalPlacement + (j * 10), 9.75); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(710 + (biggy * 10), verticalPlacement + 30 - (i * 10), 9.75); // x, y, diameter
    }
  }
}

function subcirclesTime(category, horizontalPlacement) {
  if (category == "vehicle") {
    subCirclesIndividual_Districts(vehicle, horizontalPlacement, d10col);
    subCirclesIndividual_Districts(vehicle - int(vehT[10]), horizontalPlacement, d9col);
    subCirclesIndividual_Districts(vehicle - int(vehT[10]) - int(vehT[9]), horizontalPlacement, d8col);
    subCirclesIndividual_Districts(vehicle - int(vehT[10]) - int(vehT[9]) - int(vehT[8]), horizontalPlacement, d7col);
    subCirclesIndividual_Districts(vehicle - int(vehT[10]) - int(vehT[9]) - int(vehT[8]) - int(vehT[7]), horizontalPlacement, d6col);
    subCirclesIndividual_Districts(vehicle - int(vehT[10]) - int(vehT[9]) - int(vehT[8]) - int(vehT[7]) - int(vehT[6]), horizontalPlacement, d5col);
    subCirclesIndividual_Districts(int(vehT[4]) + int(vehT[3]) + int(vehT[2]) + int(vehT[1]) + int(vehT[0]), horizontalPlacement, d4col);
    subCirclesIndividual_Districts(int(vehT[3]) + int(vehT[2]) + int(vehT[1]) + int(vehT[0]), horizontalPlacement, d3col);
    subCirclesIndividual_Districts(int(vehT[2]) + int(vehT[1]) + int(vehT[0]), horizontalPlacement, d2col);
    subCirclesIndividual_Districts(int(vehT[1]) + int(vehT[0]), horizontalPlacement, d1col);
    subCirclesIndividual_Districts(int(vehT[0]), horizontalPlacement, d0col);
  }
  else if (category == "building") {
    subCirclesIndividual_Districts(building, horizontalPlacement, d10col);
    subCirclesIndividual_Districts(building - int(buiT[10]), horizontalPlacement, d9col);
    subCirclesIndividual_Districts(building - int(buiT[10]) - int(buiT[9]), horizontalPlacement, d8col);
    subCirclesIndividual_Districts(building - int(buiT[10]) - int(buiT[9]) - int(buiT[8]), horizontalPlacement, d7col);
    subCirclesIndividual_Districts(building - int(buiT[10]) - int(buiT[9]) - int(buiT[8]) - int(buiT[7]), horizontalPlacement, d6col);
    subCirclesIndividual_Districts(building - int(buiT[10]) - int(buiT[9]) - int(buiT[8]) - int(buiT[7]) - int(buiT[6]), horizontalPlacement, d5col);
    subCirclesIndividual_Districts(int(buiT[4]) + int(buiT[3]) + int(buiT[2]) + int(buiT[1]) + int(buiT[0]), horizontalPlacement, d4col);
    subCirclesIndividual_Districts(int(buiT[3]) + int(buiT[2]) + int(buiT[1]) + int(buiT[0]), horizontalPlacement, d3col);
    subCirclesIndividual_Districts(int(buiT[2]) + int(buiT[1]) + int(buiT[0]), horizontalPlacement, d2col);
    subCirclesIndividual_Districts(int(buiT[1]) + int(buiT[0]), horizontalPlacement, d1col);
    subCirclesIndividual_Districts(int(buiT[0]), horizontalPlacement, d0col);
  }
  else if (category == "other") {
    subCirclesIndividual_Districts(other, horizontalPlacement, d10col);
    subCirclesIndividual_Districts(other - int(othT[10]), horizontalPlacement, d9col);
    subCirclesIndividual_Districts(other - int(othT[10]) - int(othT[9]), horizontalPlacement, d8col);
    subCirclesIndividual_Districts(other - int(othT[10]) - int(othT[9]) - int(othT[8]), horizontalPlacement, d7col);
    subCirclesIndividual_Districts(other - int(othT[10]) - int(othT[9]) - int(othT[8]) - int(othT[7]), horizontalPlacement, d6col);
    subCirclesIndividual_Districts(other - int(othT[10]) - int(othT[9]) - int(othT[8]) - int(othT[7]) - int(othT[6]), horizontalPlacement, d5col);
    subCirclesIndividual_Districts(int(othT[4]) + int(othT[3]) + int(othT[2]) + int(othT[1]) + int(othT[0]), horizontalPlacement, d4col);
    subCirclesIndividual_Districts(int(othT[3]) + int(othT[2]) + int(othT[1]) + int(othT[0]), horizontalPlacement, d3col);
    subCirclesIndividual_Districts(int(othT[2]) + int(othT[1]) + int(othT[0]), horizontalPlacement, d2col);
    subCirclesIndividual_Districts(int(othT[1]) + int(othT[0]), horizontalPlacement, d1col);
    subCirclesIndividual_Districts(int(othT[0]), horizontalPlacement, d0col);
  }
  else if (category == "shoplift") {
    subCirclesIndividual_Districts(shoplift, horizontalPlacement, d10col);
    subCirclesIndividual_Districts(shoplift - int(shoT[10]), horizontalPlacement, d9col);
    subCirclesIndividual_Districts(shoplift - int(shoT[10]) - int(shoT[9]), horizontalPlacement, d8col);
    subCirclesIndividual_Districts(shoplift - int(shoT[10]) - int(shoT[9]) - int(shoT[8]), horizontalPlacement, d7col);
    subCirclesIndividual_Districts(shoplift - int(shoT[10]) - int(shoT[9]) - int(shoT[8]) - int(shoT[7]), horizontalPlacement, d6col);
    subCirclesIndividual_Districts(shoplift - int(shoT[10]) - int(shoT[9]) - int(shoT[8]) - int(shoT[7]) - int(shoT[6]), horizontalPlacement, d5col);
    subCirclesIndividual_Districts(int(shoT[4]) + int(shoT[3]) + int(shoT[2]) + int(shoT[1]) + int(shoT[0]), horizontalPlacement, d4col);
    subCirclesIndividual_Districts(int(shoT[3]) + int(shoT[2]) + int(shoT[1]) + int(shoT[0]), horizontalPlacement, d3col);
    subCirclesIndividual_Districts(int(shoT[2]) + int(shoT[1]) + int(shoT[0]), horizontalPlacement, d2col);
    subCirclesIndividual_Districts(int(shoT[1]) + int(shoT[0]), horizontalPlacement, d1col);
    subCirclesIndividual_Districts(int(shoT[0]), horizontalPlacement, d0col);
  }
  else if (category == "bike") {
    subCirclesIndividual_Districts(bike, horizontalPlacement, d10col);
    subCirclesIndividual_Districts(bike - int(bikT[10]), horizontalPlacement, d9col);
    subCirclesIndividual_Districts(bike - int(bikT[10]) - int(bikT[9]), horizontalPlacement, d8col);
    subCirclesIndividual_Districts(bike - int(bikT[10]) - int(bikT[9]) - int(bikT[8]), horizontalPlacement, d7col);
    subCirclesIndividual_Districts(bike - int(bikT[10]) - int(bikT[9]) - int(bikT[8]) - int(bikT[7]), horizontalPlacement, d6col);
    subCirclesIndividual_Districts(bike - int(bikT[10]) - int(bikT[9]) - int(bikT[8]) - int(bikT[7]) - int(bikT[6]), horizontalPlacement, d5col);
    subCirclesIndividual_Districts(int(bikT[4]) + int(bikT[3]) + int(bikT[2]) + int(bikT[1]) + int(bikT[0]), horizontalPlacement, d4col);
    subCirclesIndividual_Districts(int(bikT[3]) + int(bikT[2]) + int(bikT[1]) + int(bikT[0]), horizontalPlacement, d3col);
    subCirclesIndividual_Districts(int(bikT[2]) + int(bikT[1]) + int(bikT[0]), horizontalPlacement, d2col);
    subCirclesIndividual_Districts(int(bikT[1]) + int(bikT[0]), horizontalPlacement, d1col);
    subCirclesIndividual_Districts(int(bikT[0]), horizontalPlacement, d0col);
  }
}

function subCirclesIndividual_Districts(quantity, horizontalPlacement, myCol) { // this is so we can easily create and move circles based on the values
  noStroke();

  var biggy = int(quantity / 12);
  var smally = quantity % 12;

  fill(bCol);

  // overwriting existing circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 12; j++) {
      circle(horizontalPlacement + (j * 8), 460 - (i * 8), 8.25); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(horizontalPlacement + 88 - (i * 8), 460 - (biggy * 8), 8.25); // x, y, diameter
    }
  }

  fill(myCol);
  // creating new circles
  for (var i = 0; i < biggy; i++) {
    for (var j = 0; j < 12; j++) {
      circle(horizontalPlacement + (j * 8), 460 - (i * 8), 7.75); // x, y, diameter
    }
  }

  if (smally != 0) {
    for (var i = 0; i < smally; i++){
      circle(horizontalPlacement + 88 - (i * 8), 460 - (biggy * 8), 7.75); // x, y, diameter
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

function drawCrimeCatTime_Districts(slot) {
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

  textAlign(CENTER);
  textSize(16);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.8);
  text(tempString, 49 + (124 * slot), 487);
  subcirclesTime(catSlot[slot], 5 + (124 * slot));
}

function drawLegend_Districts() {
  noStroke();

  fill(tr0Col);
  rectAlt(0, 540, 300, 30);

  fill(tr1Col);
  rectAlt(300, 540, 150, 30);

  fill(tr2Col);
  rectAlt(450, 540, 150, 30);

  fill(tr3Col);
  rectAlt(600, 540, 250, 30);

  fill(tr4Col);
  rectAlt(850, 540, 150, 30);

  fill(tr5Col);
  rectAlt(1000, 540, 200, 30);


  fill(tCol);
  stroke(tCol);
  strokeWeight(2);
  line(xPosMod(0),570,xPosMod(1200),570);

  for (var i = 0; i < 25; i++) {
    line(xPosMod(i * 50), 560, xPosMod(i * 50), 575);
  }

  textAlign(LEFT);
  textSize(16);
  fill(tCol);
  stroke(sCol);
  strokeWeight(0.5);
  text('Legend:', 10, 526);

  textAlign(CENTER);
  textSize(12);
  strokeWeight(0);
  text('Midnight', xPosMod(0), 590);
  for (var i = 1; i < 12; i++) {
    text(str(i) + 'am', xPosMod(i*50), 590);
  }
  text('Noon', xPosMod(600), 590);
  for (var i = 13; i < 24; i++) {
    text(str(i - 12) + 'pm', xPosMod(i*50), 590);
  }
  text('Midnight', xPosMod(1200), 590);

  strokeWeight(0.5);
  text('Midnight', xPosMod(0), 590);
  text('6am', xPosMod(300), 590);
  text('9am', xPosMod(450), 590);
  text('Noon', xPosMod(600), 590);
  text('5pm', xPosMod(850), 590);
  text('8pm', xPosMod(1000), 590);
  text('Midnight', xPosMod(1200), 590);
}

function rectAlt(xpos, ypos, width, height) {
  rect(xPosMod(xpos), ypos, width * 0.916666667, height);
}

function xPosMod(xpos) {
  var blah = (xpos * 0.916666667) + 50;
  return blah;
}
