import React, { useState, useRef, useEffect } from 'react'
import {
	Middleground,
	Background,
	Foreground,
	Input,
	ButtonGroups,
} from './components'

const App = () => {
	const [isBlinking, setBlinking] = useState(false)
	const [duration, setDuration] = useState(0)
	const [isRunning, setRunning] = useState(false)
	const [showStart, setShowStart] = useState(true)
	const [showPause, setShowPause] = useState(false)
	const [showStop, setShowStop] = useState(false)

	console.log(isBlinking)

	const inputElement = useRef(null)

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
		(inputArray[0] * 60 + inputArray[1]) * 60 + inputArray[2]

	useEffect(() => {
		let interval
		if (isRunning) {
			interval = setInterval(() => {
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
					setRunning(false)
					setBlinking(true)
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
	}, [isRunning])

	const clickStart = event => {
		event.target.blur()
		setShowStart(false)
		setShowPause(true)
		setShowStop(true)
		const input = formatInput(parseInput(inputElement.current.value))
		const [h, m, s] = input
		setDuration(calcDuration(input))
		hour.current = h
		minute.current = m
		second.current = s
		setRunning(true)
	}

	const clickPause = event => {
		event.target.blur()
		setShowStart(true)
		setShowPause(false)
		setShowStop(true)
		setRunning(false)
	}

	const clickStop = event => {
		event.target.blur()
		setShowStart(true)
		setShowPause(false)
		setShowStop(false)
		hour.current = 0
		minute.current = 0
		second.current = 0
		setRunning(false)
	}

	const blinkingAnimationEnd = () => setBlinking(false)

	return (
		<>
			<Background
				isBlinking={isBlinking}
				blinkingAnimationEnd={blinkingAnimationEnd}
			/>
			<Middleground isRunning={isRunning} duration={duration} />
			<Foreground>
				<h1 style={{ color: '#fff' }}>Unfancy Timer</h1>
				<Input ref={inputElement} readOnly={isRunning} />
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
