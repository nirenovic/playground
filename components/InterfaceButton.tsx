'use client';

import {useRef} from 'react';

export default function InterfaceButton(props) {
	const buttonRef = useRef(null);
	
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