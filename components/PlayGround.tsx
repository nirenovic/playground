"use client";

import ToyBox from "@/components/ToyBox";
import { useEffect } from 'react';
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
	render,
	runner = Runner.create();

Runner.run(runner, engine);

// Create boundaries
var ground,
	leftWall,
	rightWall,
	ceiling;

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
		render: {
			fillStyle: c,
			strokeStyle: '#ffffff',
			lineWidth: 1
		}
	});
	Composite.add(world, newBox);
};

export const clearBoxes = () => {
	Composite.clear(world, true);
	Composite.add(world, mouseConstraint);
};

export default function PlayGround() {
  	// init Matter-js vars

	useEffect(() => {
		// create renderer
		render = Render.create({
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
				//stiffness: 0.6,
				angularStiffness: 0.5,
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
			window.innerWidth,
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
			window.innerHeight,
			{
				isStatic: true
			}
		);
	  	// right wall
		rightWall = Matter.Bodies.rectangle(
			window.innerWidth + 250, 
			window.innerHeight / 2,
			500,
			window.innerHeight,
			{
				isStatic: true
			}
		);
	  	// ceiling
		ceiling = Matter.Bodies.rectangle(
			window.innerWidth / 2, 
			-250, 
			window.innerWidth,
			500,
			{
				isStatic: true
			}
		);
		
		render.mouse = mouse;
		// run renderer
		Render.run(render);

		Composite.add(world, [ground, leftWall, rightWall, ceiling, mouseConstraint]);
	}, []);

	return (
		<div id="playGround">
		<ToyBox></ToyBox>
		</div>
	);
}