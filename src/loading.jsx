export default function Loading(){
    return(
        <>
        <style>
            {`
            
            
            * {
	border: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
:root {
	--hue: 223;
	--bg: white;
	--fg: hsl(var(--hue),90%,10%);
	--primary: hsl(var(--hue),90%,60%);
	--secondary: hsl(283,90%,60%);
	--trans-dur: 0.3s;
	--trans-timing: cubic-bezier(0.65,0,0.35,1);
	font-size: calc(14px + (30 - 14) * (100vw - 280px) / (3840 - 280));
}
body {
	background-color: white;
	color: var(--fg);
	display: flex;
	font: 1em/1.5 sans-serif;
	height: 100vh;
	transition:
		background-color var(--trans-dur),
		color var(--trans-dur);
}
.pl {
	--dur: 5s;
	--size: 8em;
	--bar-width: calc(var(--size) * 0.25);
	aspect-ratio: 1 / 1;
	display: flex;
	justify-content: space-between;
	margin: auto;
	width: var(--size);

	&__bar {
		background-color: var(--primary);
		position: relative;
		width: var(--bar-width);
		height: 100%;
		transform-style: preserve-3d;

		&,
		&:before,
		&:after {
			animation: spin var(--dur) var(--trans-timing) infinite;
		}
		&:before,
		&:after {
			animation-timing-function: step-end;
			background-color: var(--fg);
			content: "";
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			width: var(--bar-width);
			height: var(--bar-width);
			transition: background-color var(--trans-dur);
		}
		&:before {
			animation-name: spin-before;
			transform: translateY(-50%) rotateX(90deg) translateZ(calc(var(--size) / 2 + 1px));
		}
		&:after {
			animation-name: spin-after;
			border-radius: 50%;
			bottom: 0;
			transform: translateY(-50%) rotateX(-90deg) translateZ(calc(var(--size) / 2 + 1px));
		}
		@for $b from 2 through 3 {
			&:nth-child(#{$b}) {
				&,
				&:before,
				&:after {
					animation-delay: calc(var(--dur) * #{-1 + (0.04 * ($b - 1))});
				}
			}
		}
	}
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
	:root {
		--bg: hsl(var(--hue),90%,10%);
		--fg: hsl(var(--hue),90%,90%);
	}
}

/* Animations */
@keyframes spin {
	from {
		background-color: var(--primary);
		transform: rotateX(0);
	}
	25% {
		background-color: var(--primary);
		transform: rotateX(-0.25turn);
	}
	25.01% {
		background-color: var(--secondary);
		transform: rotateX(-0.25turn);
	}
	50% {
		background-color: var(--secondary);
		transform: rotateX(-0.5turn);
	}
	50.01% {
		background-color: var(--secondary);
		transform: rotateX(-0.5turn);
	}
	75% {
		background-color: var(--secondary);
		transform: rotateX(-0.75turn);
	}
	75.01% {
		background-color: var(--primary);
		transform: rotateX(-0.75turn);
	}
	to {
		background-color: var(--primary);
		transform: rotateX(-1turn);	
	}
}
@keyframes spin-before {
	from,
	25%,
	to {
		background-color: var(--fg);
		border-radius: 0;
	}
	50% {
		background-color: var(--secondary);
		border-radius: 50%;
	}
	75% {
		background-color: var(--primary);
		border-radius: 50%;
	}
}
@keyframes spin-after {
	from,
	to {
		background-color: var(--primary);
		border-radius: 0;
	}
	25% {
		background-color: var(--secondary);
		border-radius: 0;
	}
	50%,
	75% {
		background-color: var(--fg);
		border-radius: 50%;
	}
}`}
        </style>
        <div class="pl">
	<div class="pl__bar"></div>
	<div class="pl__bar"></div>
	<div class="pl__bar"></div>
	
</div>

        </>
    )
}