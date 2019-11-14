var policeData;
var sunday, monday, tuesday, wednesday, thursday, friday, saturday; // asssign variables
var url;
var vehicle, building, other, shoplift, bike;
var bProto;

function preload() {
  wordData = loadJSON("https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft");
  b1 = loadImage('images/b1.png');
  b2 = loadImage('images/prototype-01.png');
}

function setup() {
  // put setup code here
  createCanvas(1200, 500);
  // background(200);

  bProto = false;

}

function getPoliceInfo() {
  loadJSON(url, gotData); // remember - got data is a function
}

function gotData(data) { // makes sure the data is there in order to read data
  policeData = data;


}

function draw() {
  // put drawing code here
  // these functions are for the vertical circle bars


  background(255);
    image(b1, 0, 0, 1200, 500);

    url = "https://data.sfgov.org/resource/wg3w-h783.json?incident_category=Larceny%20Theft";
    getPoliceInfo();




    // put variables at 0 to start -
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

    fill(0);

    //subcategory(subcategory,variable)
    vehicle = subcategory("Larceny - From Vehicle");
    building = subcategory("Larceny Theft - From Building");
    other = subcategory("Larceny Theft - Other");
    shoplift = subcategory("Larceny Theft - Shoplifting");
    bike = subcategory("Larceny Theft - Bicycle");

    subcircles(bike, 5);
    subcircles(shoplift, 129);
    subcircles(building, 253);
    subcircles(other, 377);
    subcircles(vehicle, 501);

    supercircles(monday, 15);
    supercircles(tuesday, 83);
    supercircles(wednesday, 160);
    supercircles(thursday, 232);
    supercircles(friday, 307);
    supercircles(saturday, 385);
    supercircles(sunday, 454);

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

    if (bProto == true)
    {
//      image(b2, 0, 0, 1200, 500);
    }

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

function subcircles(quantity, horizontalPlacement) { // this is so we can easily create and move circles based on the values
  print('lol'); // wanna see this actually work for once!
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
  print('lol'); // wanna see this actually work for once!
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


/*  for (var i = 0; i < quantity; i+=10) { // adding 10 each time because this draws 10 each time
    p = 480 - i * 10; // this will move the circles up by 10
    circle(horizontalPlacement, p, 8); // x, y, diameter
    circle(horizontalPlacement + 10, p, 8); // x, y, diameter
    circle(horizontalPlacement + 20, p, 8); // x, y, diameter
    circle(horizontalPlacement + 30, p, 8); // x, y, diameter
    circle(horizontalPlacement + 40, p, 8); // x, y, diameter
    circle(horizontalPlacement + 50, p, 8); // x, y, diameter
    circle(horizontalPlacement + 60, p, 8); // x, y, diameter
    circle(horizontalPlacement + 70, p, 8); // x, y, diameter
    circle(horizontalPlacement + 80, p, 8); // x, y, diameter
    circle(horizontalPlacement + 90, p, 8); // x, y, diameter
    print('lol'); // wanna see this actually work for once!
  }
*/



function mousePressed() {
  // define button and then call getPoliceInfo()

}

function keyPressed() {
  if (keyCode == 32 && bProto == true) {
    bProto = false;
  }
  else if (keyCode == 32) {
    bProto = true;
  }
}
