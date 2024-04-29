'use client';

import Logo from "@/components/Logo";
import InterfaceButton from "@/components/InterfaceButton";
import { spawnBox, clearBoxes } from "@/components/PlayGround";
import React, { useState, useRef, MutableRefObject } from 'react';

export default function Interface() {
	const btnWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [showClearBtn, setShowClearBtn] = useState(false);

	const addNextButton = () => {
		setShowClearBtn(true);
	}

	const handleSpawn = () => {
		spawnBox();
		addNextButton();
	}

	const handleClear = () => {
		clearBoxes();
		setShowClearBtn(false);
	}
	return (
		<div id="interface">
			<div id="interface-inner">
				<Logo text="Alex Nirenovic" />
				<nav></nav>
				<div ref={btnWrapperRef} id="interfaceButtonContainer">
					<InterfaceButton icon="📦" onClick={handleSpawn} />
					{showClearBtn && <InterfaceButton icon="💀" onClick={handleClear} />}
				</div>
			</div>
		</div>
	);
}