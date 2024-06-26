'use client';

import React, { useRef, MutableRefObject } from 'react';

interface Props {
	onClick: () => void;
	icon: string;
}

export default function InterfaceButton(props: Props) {
	const buttonRef = useRef() as MutableRefObject<HTMLDivElement>;

	
	const handleClick = () => {
		buttonRef.current.style.animation = `click 0.3s ease 0s 1 normal forwards`;
		buttonRef.current.className += " clicked";
	}

	const handleAnimationEnd = () => {
		if (buttonRef.current.className.includes('clicked')) {
			buttonRef.current.style.animation = `reset 0s linear 0s 1 normal forwards`;
		}
	}

	return (
		<div ref={buttonRef} className="interfaceButton" onClick={() => {props.onClick(); handleClick();}} onAnimationEnd={handleAnimationEnd}>
			<span>{props.icon}</span>
		</div>
	);
}