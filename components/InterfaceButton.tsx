'use client';

import React, { useRef } from 'react';

interface Props {
	onClick: () => void;
	icon: string;
}

export default function InterfaceButton(props: Props) {
	const buttonRef = useRef<HTMLDivElement | null>(null)

	
	const handleClick = () => {
		buttonRef.current.style.animation = `click 0.3s ease 0s 1 normal forwards`;
	}

	const handleAnimationEnd = () => {
		buttonRef.current.style.animation = `reset 0s linear 0s 1 normal forwards`;
	}

	return (
		<div ref={buttonRef} className="interfaceButton" onClick={() => {props.onClick(); handleClick();}} onAnimationEnd={handleAnimationEnd}>
			<span>{props.icon}</span>
		</div>
	);
}