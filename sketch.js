var stepData;
let steps=[];
let speed=[];
let calories=[];
let distance=[];


let countSlider;

function preload(){

	stepData=loadJSON("Step_count.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(225);
	pixelDensity(4);//better resolution :)
	
	countSlider=createSlider(0,846,20,1);
	countSlider.style('width', '400px');
	countSlider.position(width/2-200,10);
	
	//pass data from json file to arrays 
	for(i=0;i<=846;i++){
		steps[i]=stepData[i].count;
		speed[i]=stepData[i].speed;
		calories[i]=stepData[i].calorie;
		distance[i]=stepData[i].distance;
	}
}

function draw() {
	background(225);
	translate(width/2,height/2);
  	scale(0.8);
	let count=countSlider.value();
	
	printLabels(count);
	for(i=240;i<=870;i+=90){
		noFill();
		strokeWeight(0.1);
		stroke(100,0,50);
		if (i==690){strokeWeight(0.5)}
		ellipse(0,0,i,i);
	}
	//visualise data.
	beginShape();
	for(i=1;i<=count;i++){
		let alpha=map(speed[i],0,max(speed),150,255);
		strokeWeight(map(count,0,846,5,1));
		strokeCap(SQUARE);
		stroke(100,0,50,alpha);
		fill(100,0,50,alpha);

		let angle=map(i,0,count,0,TWO_PI);
		let lineLength=map(steps[i],0,max(steps),0,300);
		let radius=120; 
		let x1=radius*cos(angle);
		let y1=radius*sin(angle);
		let x2=(radius+lineLength)*cos(angle);
		let y2=(radius+lineLength)*sin(angle);
		line(x1,y1,x2,y2);

		let r=map(calories[i],0,max(calories),0,25);
		let x=(radius+lineLength+10)*cos(angle); //20px away from the end of the line.
		let y=(radius+lineLength+10)*sin(angle);
		stroke(100,0,50);
		strokeWeight(1);
		fill(100,0,50,100);
		ellipse(x,y,r,r);
	
		//draw a vertex that demonstrates the estimated walked distance.
		//The close to the center means small distance.Range between 2 external circles with a step of 14.000 m.
		let walkedDistance=map(distance[i],0,max(distance),345,435);
		let vx=(walkedDistance)*cos(angle);
		let vy=(walkedDistance)*sin(angle);
		noFill();
		stroke(100,0,50);
		strokeWeight(2);
		curveVertex(vx,vy);		
	}
	endShape(CLOSE);
}


function printLabels(count){
	//lables for number of steps.
	if (count==0){
		noStroke();
		fill(100,0,50);
		for(i=0;i<=7;i++){
			let num= i;
			text(num,0-textWidth(num)/2,-120-(45*i));
		}
		text(4,390,0);
		text(5,435,0);
		ellipse(420,-440,25,25);
		//speed gradient.
		for (i=150;i<=255;i+=10){
			fill(150,0,20,i);
			rect(415,-550+i,10,10);		
		}
		text("7",435,-550+170);
		text("1",435,-550+260);
	}
}