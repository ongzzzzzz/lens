let f, r, theta;
let radiusOffset = 20;

let type;
let lensFlatX, lensFlatY; //for concave

let u, v, m;
let objHeight = 50;
let imgHeight;

let dragX, dragY;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ellipseMode(RADIUS);

	f = 80;

	r = 2 * f;
	theta = Math.acos(r / (r + radiusOffset))

	lensFlatX = r * Math.cos(theta);
	lensFlatY = (r - radiusOffset) * Math.sin(theta);

	u = 2.5 * f;

}

function draw() {
	background(0);

	stroke(255);

	drawPrincipalAxis();
	drawLens();

	v = (u * f) / (u - f);
	m = -v / u;
	imgHeight = m * objHeight;

	// draw object arrow
	drawArrow(u, objHeight);
	drawArrow(-v, imgHeight);

	drawRays()

	circle(width / 2 - u, height / 2 - objHeight - 5, 4)
}


let objClicked = false;
function mousePressed() {
	if (dist(width / 2 - u,
		height / 2 - objHeight - 5,
		mouseX, mouseY) <= 4) {
		objClicked = true;
	}
}

function mouseDragged() {
	if (objClicked) {
		u = width / 2 - mouseX;
		objHeight = height / 2 - mouseY;

		if (u < 0) type = "concave";
		if (u > 0) type = "convex";
	}
}

function mouseReleased() {
	objClicked = false
}


function drawPrincipalAxis() {
	// principal axis
	line(0, height / 2, width, height / 2);

	let lineHeight = 5;

	for (let i = 1; i <= Math.floor(width / 2 / f); i++) {
		// -f
		line(width / 2 - i * f, height / 2 - lineHeight,
			width / 2 - i * f, height / 2 + lineHeight);
		// +f
		line(width / 2 + i * f, height / 2 - lineHeight,
			width / 2 + i * f, height / 2 + lineHeight);
	}
}


function drawLens() {

	if (type == "convex") {
		radiusOffset = Math.abs(radiusOffset);
	}
	if (type == "concave") {
		radiusOffset = -Math.abs(radiusOffset);

		line(width / 2 - (r - radiusOffset) + lensFlatX, height / 2 - lensFlatY,
			width / 2 + (r - radiusOffset) - lensFlatX, height / 2 - lensFlatY);
		line(width / 2 - (r - radiusOffset) + lensFlatX, height / 2 + lensFlatY,
			width / 2 + (r - radiusOffset) - lensFlatX, height / 2 + lensFlatY);
	}

	noFill();
	arc(width / 2 - (2 * f), height / 2,
		(2 * f + radiusOffset), (2 * f + radiusOffset),
		-theta, theta);

	arc(width / 2 + (2 * f), height / 2,
		(2 * f + radiusOffset), (2 * f + radiusOffset),
		PI - theta, PI + theta);

	// DRAW FULL CIRCLES
	// arc(width / 2 - (2 * f), height / 2,
	// 	(2 * f + radiusOffset), (2 * f + radiusOffset),
	// 	0, 2 * PI);
	// arc(width / 2 + (2 * f), height / 2,
	// 	(2 * f + radiusOffset), (2 * f + radiusOffset),
	// 	0, 2*PI);
}


function drawArrow(dist, length) {
	// draw arrow body
	line(width / 2 - dist, height / 2,
		width / 2 - dist, height / 2 - length);

	// draw arrow head
	let headLength = 5;
	let dx = headLength * Math.sin(PI / 4);
	let dy = headLength * Math.cos(PI / 4);

	// invert arrow heads if image inverted
	dy *= length < 0 ? -1 : 1;

	// draw the arrow heads
	line(width / 2 - dist, height / 2 - length,
		width / 2 - dist - dx, height / 2 - length + dy);
	line(width / 2 - dist, height / 2 - length,
		width / 2 - dist + dx, height / 2 - length + dy);
}


function drawRays() {
	let objX = width / 2 - u;
	let objY = height / 2 - objHeight;

	let imgX = width / 2 + v;
	let imgY = height / 2 - imgHeight;

	// passing thru optical center
	line(objX, objY, imgX, imgY);

	// passing thru focal point on right
	line(objX, objY, width / 2, objY);
	line(width / 2, objY, imgX, imgY);

	// passing thru focal point on left
	line(objX, objY, width / 2, imgY);
	line(width / 2, imgY, imgX, imgY);
}
