import React, { useState, useRef, useEffect } from 'react'
import {
	Middleground,
	Background,
	Foreground,
	Input,
	ButtonGroups,
} from './components'
import { animations, animationTimings } from './animations'

const App = () => {
	const [isInputReadonly, setInputReadonly] = useState(false)
	const [isMiddlegroundClean, setMiddlegroundClean] = useState(true)
	const [showStart, setShowStart] = useState(true)
	const [showPause, setShowPause] = useState(false)
	const [showStop, setShowStop] = useState(false)

	const inputElement = useRef(null)
	const backgroundElement = useRef(null)
	const middlegroundElement = useRef(null)
	const backgroundAnimation = useRef(null)
	const middlegroundAnimation = useRef(null)

	const hour = useRef(0)
	const minute = useRef(0)
	const second = useRef(0)

	const concatTime = ([h, m, s]) =>
		`${h === 0 ? '' : `${h} ${h === 1 ? 'hour' : 'hours'} `}${
			m === 0 ? '' : `${m} ${m === 1 ? 'minute' : 'minutes'} `
		}${s} ${s === 1 ? 'second' : 'seconds'}`
	const parseInput = input =>
		[
			0,
			0,
			...input
				.split(' ')
				.map(x => Number.parseInt(x, 10))
				.filter(x => !Number.isNaN(x)),
		].slice(-3)
	const formatInput = inputArray => {
		const result = inputArray.slice()
		result[1] += Math.floor(result[2] / 60)
		result[2] %= 60
		result[0] += Math.floor(result[1] / 60)
		result[1] %= 60
		return result
	}

	const calcDuration = inputArray =>
		((inputArray[0] * 60 + inputArray[1]) * 60 + inputArray[2]) * 1000

	useEffect(() => {
		backgroundAnimation.current = backgroundElement.current.animate(
			animations.blink,
			animationTimings.blink()
		)
		backgroundAnimation.current.pause()
	}, [])

	useEffect(() => {
		let interval
		if (isInputReadonly) {
			interval = setInterval(() => {
				console.log('interval set')
				if (second.current > 0) {
					second.current -= 1
				} else if (minute.current > 0) {
					second.currend = 59
					minute.current -= 1
				} else if (hour.current > 0) {
					second.current = 59
					minute.current = 59
					hour.current -= 1
				} else {
					middlegroundAnimation.current.cancel()
					setMiddlegroundClean(true)
					setInputReadonly(false)
					backgroundAnimation.current.play()
					setShowPause(false)
					setShowStart(true)
					setShowStop(false)
				}

				inputElement.current.value = concatTime([
					hour.current,
					minute.current,
					second.current,
				])
			}, 1000)
		}

		return () => clearInterval(interval)
	}, [isInputReadonly])

	const clickStart = event => {
		event.target.blur()
		setShowStart(false)
		setShowPause(true)
		setShowStop(true)
		const input = formatInput(parseInput(inputElement.current.value))
		const [h, m, s] = input
		hour.current = h
		minute.current = m
		second.current = s
		if (isMiddlegroundClean) {
			middlegroundAnimation.current = middlegroundElement.current.animate(
				animations.middleground,
				animationTimings.middleground(calcDuration(input))
			)
			middlegroundAnimation.current.finished.then(() => {
				middlegroundElement.current.style.transform =
					'translateX(100vw)'
			})
		} else {
			middlegroundAnimation.current.play()
		}

		setMiddlegroundClean(false)
		setInputReadonly(true)
	}

	const clickPause = event => {
		event.target.blur()
		setShowStart(true)
		setShowPause(false)
		setShowStop(true)
		setInputReadonly(false)
		middlegroundAnimation.current.pause()
	}

	const clickStop = event => {
		event.target.blur()
		setShowStart(true)
		setShowPause(false)
		setShowStop(false)
		hour.current = 0
		minute.current = 0
		second.current = 0
		middlegroundAnimation.current.cancel()
		setMiddlegroundClean(true)
		setInputReadonly(false)
	}

	return (
		<>
			<Background ref={backgroundElement} />
			<Middleground ref={middlegroundElement} />
			<Foreground>
				<h1 style={{ color: '#fff' }}>Unfancy Timer</h1>
				<Input ref={inputElement} readOnly={isInputReadonly} />
				<ButtonGroups
					isPauseVisible={showPause}
					isStartVisible={showStart}
					isStopVisible={showStop}
					clickStart={clickStart}
					clickPause={clickPause}
					clickStop={clickStop}
				/>
			</Foreground>
		</>
	)
}

export default App
