'use client';

import Logo from "@/components/Logo";
import InterfaceButton from "@/components/InterfaceButton";
import { spawnBox, clearBoxes, boomBoxes } from "@/components/PlayGround";
import React, { useState, useRef, MutableRefObject } from 'react';

var spawns: number = 0;

export default function Interface() {
	const btnWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [showClearBtn, setShowClearBtn] = useState(false);
	const [showBoomBtn, setShowBoomBtn] = useState(false);

	const addClearButton = () => {
		setShowClearBtn(true);
	}

	const addBoomButton = () => {
		setShowBoomBtn(true);
	}

	const handleSpawn = () => {
		spawns += 1;
		if (spawns >= 10) {
			addBoomButton();
		}
		spawnBox();
		addClearButton();
	}

	const handleClear = () => {
		spawns = 0;
		clearBoxes();
		setShowClearBtn(false);
		setShowBoomBtn(false);
	}

	const handleBoom = () => {
		boomBoxes();
	}

	return (
		<div id="interface">
			<div id="interface-inner">
				<Logo text="Playground" />
				<nav></nav>
				<div ref={btnWrapperRef} id="interfaceButtonContainer">
					<InterfaceButton icon="📦" onClick={handleSpawn} />
					{showClearBtn && <InterfaceButton icon="💀" onClick={handleClear} />}
					{showBoomBtn && <InterfaceButton icon="💥" onClick={handleBoom} />}
				</div>
			</div>
		</div>
	);
}