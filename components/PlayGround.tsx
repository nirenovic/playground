"use client";

import { useEffect, useRef, useState } from 'react';
import Matter from "matter-js";

// matter js variables
var Engine = Matter.Engine,
	Events = Matter.Events,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Common = Matter.Common,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	Bodies = Matter.Bodies;

	// create engine
var engine = Engine.create(),
	world = engine.world,
	runner = Runner.create();

// track lowgrav state
var lowGrav = false;

// physical boundaries
var ground: Matter.Body,
	leftWall: Matter.Body,
	rightWall: Matter.Body,
	ceiling: Matter.Body;

// mouse variables
var mouse: Matter.Mouse,
	mouseConstraint: Matter.MouseConstraint;

// general randrange function
function rand(min: number, max: number) {
	var n = Math.floor(Math.random() * (max - min));
	n += min;

	return n;
}

// pick random color from palette 
function pickRandColor() {
	var bodyColors = ['#54478c', '#2c699a', '#048ba8', '#0db39e', '#16db93', '#83e377', '#b9e769', '#efea5a', '#f1c453', '#f29e4c'];
	return bodyColors[rand(0, bodyColors.length)];
}

// spawning new boxes
export const spawnBox = () => {
	const x = rand(0, window.innerWidth);
	const y = rand(0, window.innerHeight);
	const w = rand(10, 100);
	const h = rand(10, 100);
	const c = pickRandColor();
	const newBox = Matter.Bodies.rectangle(x, y, w, h, {
		label: "box",
		render: {
			fillStyle: c,
			strokeStyle: 'transparent',
			lineWidth: 1
		}
	});
	Body.setMass(newBox, w * h);
	Composite.add(world, newBox);
};

// clear all boxes
export const clearBoxes = () => {
	Composite.clear(world, true);
	Composite.add(world, mouseConstraint);
};


// create explosion effect
export const boomBoxes = () => {
	var force = Matter.Vector.create(0.1, 0.1);
	var origin = Matter.Vector.create(window.innerWidth/2, window.innerHeight);
	var pos = Matter.Vector.create(rand(0, window.innerWidth), rand(0, window.innerHeight)); 

	for (var body of Composite.allBodies(world).filter(body => body.label === "box"))
	{
		force = Matter.Vector.create(0.1, 0.1);
		var x1 = pos.x;
		var x2 = body.position.x;
		var y1 = pos.y;
		var y2 = body.position.y;
		var dist = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
		force = Matter.Vector.mult(force, dist * 0.5);
		Body.applyForce(body, pos, force);
	}
}

// toggle low gravity state with minor conditional styling
export const toggleGrav = () => {
	const doc = document;
	const logo = (document.getElementById('logo') as HTMLInputElement)
	if (lowGrav) {
		if (doc === null) {
			console.log("document is null");
		} else {
			document.body.style.background = `#ffffff`;
 			logo.style.filter = `invert(0)`;
		}
		engine.gravity.y = 1;
		lowGrav = !lowGrav;
	} else {
		if (doc === null) {
			console.log("document is null");
		} else {
			document.body.style.background = `#171717`;
			logo.style.filter = `invert(1)`;
		}
		engine.gravity.y = 0;
		lowGrav = !lowGrav;
	}
}

// run engine
Runner.run(runner, engine);

export default function PlayGround() {
	useEffect(() => {
		var render = Render.create({
			element: document.body,
			engine: engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				wireframes: false,
				background: 'transparent',
			}
		});		
		
		// run renderer
		Render.run(render);

		// create matter.js mouse and constraint
		mouse = Mouse.create(render.canvas);
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.6,
				length: 0,
				render: {
					visible: false
				}
			}
		});

		// Create boundaries
	  	// ground
		ground = Matter.Bodies.rectangle(
			window.innerWidth / 2,
			window.innerHeight + 250,
			99999,
			500,
			{
				isStatic: true
			}
		);
	 	// left wall
		leftWall = Matter.Bodies.rectangle(
			-250,
			window.innerHeight / 2,
			500,
			99999,
			{
				isStatic: true
			}
		);
	  	// right wall
		rightWall = Matter.Bodies.rectangle(
			window.innerWidth + 250, 
			window.innerHeight / 2,
			500,
			99999,
			{
				isStatic: true
			}
		);
	  	// ceiling
		ceiling = Matter.Bodies.rectangle(
			window.innerWidth / 2, 
			-250, 
			99999,
			500,
			{
				isStatic: true
			}
		);

		// add bodies and mouseConstraint to world
		Composite.add(world, [ground, leftWall, rightWall, ceiling, mouseConstraint]);

		// window resize events
		function handleResize() {
			// update renderer
			render.bounds.max.x = window.innerWidth;
		    render.bounds.max.y = window.innerHeight;
		    render.options.width = window.innerWidth;
		    render.options.height = window.innerHeight;
		    render.canvas.width = window.innerWidth;
		    render.canvas.height = window.innerHeight;
			// update boundaries
			// ground
			Matter.Body.setPosition(ground, {x: window.innerWidth / 2, y: window.innerHeight + 250});
			// left wall
			Matter.Body.setPosition(leftWall, {x: -250, y: window.innerHeight / 2});
			// right wall
			Matter.Body.setPosition(rightWall, {x: window.innerWidth + 250, y: window.innerHeight / 2});
			// ceiling
			Matter.Body.setPosition(ceiling, {x: window.innerWidth / 2, y: -250});
  		}

  		// assign handleResize to resize event listener
  		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<div id="playGround">
		</div>
	);
}