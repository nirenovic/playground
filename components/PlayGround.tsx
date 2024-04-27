"use client";

import ToyBox from "@/components/ToyBox";
import React, { useEffect } from 'react';
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
	mouseConstraint;

// Function to spawn a new box
export const spawnBox = () => {
	const x = 40;
	const y = 40;
	const newBox = Matter.Bodies.rectangle(x, y, 50, 50);
	Composite.add(world, newBox);
	console.log('spawn box called');
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
				enabled: true,
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
				length: 0,
				angularStiffness: 0,
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