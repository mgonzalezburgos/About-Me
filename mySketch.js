particles = [];
words = ["4,645","Abandoned Emergency Supplies","#RickyRenuncia","Daily Power Outages","LUMA Energy","Junta de Control Fiscal","Earthquakes","Blue Tarps", "Jones Act", "Trump throws Paper Towels at Hurricane Survivors", "Pedro Pierluisi's Unconstitutional three-day Governmental Reign between Governors Roselló II and Vázquez", "Not American Enough", "Not Latine Enough", "Not Spanish Enough","Not White Enough","Not Black Enough","Not Hispanic Enough","How do you get your food in Puerto Rico, do you hunt for it?", "Have you ever considered becoming a citizen?", "Outdated Colonial Status", "Increased Crime Rates", "Leniency For Criminals","#JusticiaParaLara","#MataronAAlexa","More Airbnbs Than Homes Available to Residents", "Ley Num. 20-2012", "Ley Num. 22-2012", "Ley Num. 60-2019", "Cuban Flag in Miles Morales' Room in Spiderman Game", "Superbowl Racism", "Miss Universe Racism", "Olympics Racism", "General Racism in the US", "Scarcity of Essentials", "Months to a year without power after Hurricane Maria","People Living in Tents after Earthquakes","COVID-19 Halts Tourism","Are you here on a Visa?","Your ID seems fake - can we see your passport?","Speak out, aren't all you Latinos supposed to be loud?", "I knew you were latin, I just didn't know which kind of latin you were.","Arrrriba, Arrrrrrrrriba *finger guns*", "All those Spanish singers sound like drug dealers", "Even you if you dye your hair blonde and put on some makeup you're golden.", "You don't sound Puerto Rican."];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let babyBlueColor = color(173, 216, 230); // Baby blue
  let indigoColor = color(75, 0, 130); // Indigo

  for (let x = 0; x < width; x++) {
    let gradientValue = map(x, 0, width, 0, 1);
    let blendedColor = lerpColor(babyBlueColor, indigoColor, pow(gradientValue, 2)); // Use pow() function to increase the weight of baby blue

    stroke(blendedColor);
    line(x, 0, x, height);
  }
  
  for (let i = 0; i < 3; i++) {
    let p = new Particle();
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.angle = random(TWO_PI);
    this.radius = random(50, min(windowWidth, windowHeight));
    this.speed = random(0.001, 0.01); // Decreased speed for slower movement
    this.alpha = 255;
    this.text = random(words);
    this.color = random([color(255, 0, 0), color(255)]); // Red or white color
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.angle += this.speed;
    this.x = width / 2 + cos(this.angle) * this.radius;
    this.y = height / 2 + sin(this.angle) * this.radius;
    this.alpha -= 0.5;
  }

  show() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha); // Set text color and alpha
    text(this.text, this.x, this.y);
  }
}
