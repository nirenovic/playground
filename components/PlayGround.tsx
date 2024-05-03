"use client";

import ToyBox from "@/components/ToyBox";
import { useEffect, useRef, useState } from 'react';
import Matter from "matter-js";

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
	render = Render,
	runner = Runner.create();

// track lowgrav state
var lowGrav = false;

Runner.run(runner, engine);

// Create boundaries
var ground = Matter.Body,
	leftWall = Matter.Body,
	rightWall = Matter.Body,
	ceiling = Matter.Body;

// add mouse control and make the mouse revolute
var mouse,
	mouseConstraint: Matter.MouseConstraint;

function rand(min: number, max: number) {
	var n = Math.floor(Math.random() * (max - min));
	n += min;

	return n;
}

function pickRandColor() {
	var bodyColors = ['#54478c', '#2c699a', '#048ba8', '#0db39e', '#16db93', '#83e377', '#b9e769', '#efea5a', '#f1c453', '#f29e4c'];
	return bodyColors[rand(0, bodyColors.length)];
}

// Function to spawn a new box
export const spawnBox = () => {
	const x = rand(0, window.innerWidth);
	const y = rand(0, window.innerHeight);
	const w = rand(10, 100);
	const h = rand(10, 100);
	const c = pickRandColor();
	// const c = pickRandColor();
	// console.log(c);
	const newBox = Matter.Bodies.rectangle(x, y, w, h, {
		label: "box",
		render: {
			fillStyle: c,
			strokeStyle: 'transparent',
			lineWidth: 1
		}
	});
	Composite.add(world, newBox);
};

export const clearBoxes = () => {
	Composite.clear(world, true);
	Composite.add(world, mouseConstraint);
};

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
		force = Matter.Vector.mult(force, dist * 0.0005);
		Body.applyForce(body, pos, force);
	}
}

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

const useWidth = () => {
    const [width, setWidth] = useState(0); // default width, detect on server.
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
    return width;
};

export default function PlayGround() {
	useEffect(() => {
		// create renderer
		render = Matter.Render.create({
			element: document.body,
			engine: engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
			  // showAngleIndicator: true,
				wireframes: false,
				background: 'transparent',
			}
		});
		mouse = Mouse.create(render.canvas);
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.6,
				//angularStiffness: 0.5,
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
		
		render.mouse = mouse;
		// run renderer
		Render.run(render);

		Composite.add(world, [ground, leftWall, rightWall, ceiling, mouseConstraint]);

		// window resize events
		function handleResize() {
			// update renderer
			// render.bounds.max.x = window.innerWidth;
		    // render.bounds.max.y = window.innerHeight;
		    // render.options.width = window.innerWidth;
		    // render.options.height = window.innerHeight;
		    // render.canvas.width = window.innerWidth;
		    // render.canvas.height = window.innerHeight;
			// update ground
			Matter.Body.setPosition(ground, {x: window.innerWidth / 2, y: window.innerHeight + 250});
			// update left wall
			Matter.Body.setPosition(leftWall, {x: -250, y: window.innerHeight / 2});
			// update right wall
			Matter.Body.setPosition(rightWall, {x: window.innerWidth + 250, y: window.innerHeight / 2});
			// update ceiling
			Matter.Body.setPosition(ceiling, {x: window.innerWidth / 2, y: -250});

			mouse = Mouse.create(render.canvas);
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.6,
					//angularStiffness: 0.5,
					length: 0,
					render: {
						visible: false
					}
				}
			});
  		}

  		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<div id="playGround">
		<ToyBox></ToyBox>
		</div>
	);
}