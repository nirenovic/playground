'use client';

import Logo from "@/components/Logo";
import InterfaceButton from "@/components/InterfaceButton";
import { spawnBox } from "@/components/PlayGround";

export default function Interface() {
	return (
		<div id="interface">
			<div id="interface-inner">
				<Logo text="Alex Nirenovic" />
				<nav></nav>
				<div id="interfaceButtonContainer">
					<InterfaceButton icon="+" onClick={spawnBox} />
				</div>
			</div>
		</div>
	);
}