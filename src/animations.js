export const animations = {
	middleground: [
		{
			transform: 'translateX(0px)',
			opacity: 1,
		},
		{
			transform: 'translateX(100vw)',
			opacity: 0.4,
		},
	],
	blink: [
		{
			backgroundColor: '#16ccc8',
		},
		{
			backgroundColor: '#ffffff',
		},
	],
}

export const animationTimings = {
	middleground: duration => ({
		duration,
		iterations: 1,
		easing: 'linear',
		fill: 'backwards',
	}),
	blink: () => ({
		duration: 500,
		iterations: 6,
		easing: 'ease-out',
		direction: 'alternate',
		fill: 'both',
	}),
}
