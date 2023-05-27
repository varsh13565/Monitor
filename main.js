let objects = [];
let status = "";
let humanDetected = false;

function preload() {

}

function setup() {
  video = createCapture(VIDEO);
  video.size(480, 380);
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  detectHumans();
}

function detectHumans() {
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
    humanDetected = false;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].label === "person") {
        humanDetected = true;
        break;
      }
    }
    if (!humanDetected) {
      console.log("Human not detected");
    }
  }
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (status != "") {
    console.log(objects);
  }
}
