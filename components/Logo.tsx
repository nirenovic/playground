'use client';

interface Props {
	text: string; 
}

export default function Logo(props: Props) {
	return (
		<div id="logo"><span>{props.text}</span></div>
	);
}