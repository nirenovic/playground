"use client";

import ToyBox from "@/components/ToyBox";
import React, { useEffect } from 'react';
import Matter from "matter-js"

export default function PlayGround() {
  useEffect(() => {
    // Create a Matter.js engine
    const engine = Matter.Engine.create();

    // Create a Matter.js renderer
    const render = Matter.Render.create({
      element: document.getElementById('playGround'),
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showAngleIndicator: true
      }
    });

    // Get DOM elements with class 'toy'
    const toys = document.getElementsByClassName('toy');

    // Create Matter.js bodies for each DOM element
    const toyBodies = [];
    for (let i = 0; i < toys.length; i++) {
      const toy = toys[i];
      const rect = toy.getBoundingClientRect();
      const body = Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        { isStatic: false }
      );
      toyBodies.push(body);
      Matter.World.add(engine.world, body); // Add the body to the Matter.js world
    }

    // Create a ground body
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2, // Center horizontally
      window.innerHeight - 130, // Position above the bottom of the screen
      window.innerWidth,
      20,
      {
        isStatic: true
      }
    );
    Matter.World.add(engine.world, ground);

    // Run the engine
    Matter.Engine.run(engine);

    // Run the renderer
    Matter.Render.run(render);

    // Update positions of DOM elements based on Matter.js body positions
    const updateElements = () => {
      for (let i = 0; i < toys.length; i++) {
        const toy = toys[i];
        const body = toyBodies[i];
        const posX = body.position.x
        const posY = body.position.y;
        toy.style.transform = `translate(${posX}px, ${posY}px)`;
      }
    };

    // Update positions on every render
    Matter.Events.on(engine, 'afterUpdate', updateElements);
    //Matter.Runner.run(Matter.Render)
  }, []);

  return (
    <div id="playGround">
      <ToyBox></ToyBox>
    </div>
  );
}