import { width } from './board.js'
import { ships } from '../model/data.js'

const startBtn = document.querySelector('#start-button')
const optContainer = document.querySelector('.option-container')
const infoDisplay = document.querySelector('#info')
const turnDisplay = document.querySelector('#turn-display')
const title = document.querySelector('.title')

let playerHits = []
let computerHits = []
const playerShipsSunk = []
const computerShipsSunk = []
let gameOver = false
let playerTurn

const startGame = () => {
	if (optContainer.children.length != 0) {
		infoDisplay.textContent = 'First Place all your ships!'
	} else {
		const allBoardBlocks = document.querySelectorAll('#computer div')
		allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
		optContainer.remove()
		infoDisplay.textContent = 'Your move!'
	}
}

const handleClick = e => {
	if (!gameOver) {
		if (e.target.classList.contains('taken')) {
			e.target.classList.add('boom')
			let classes = Array.from(e.target.classList)
			classes = classes.filter(className => className != 'block')
			classes = classes.filter(className => className != 'boom')
			classes = classes.filter(className => className != 'taken')
			playerHits.push(...classes)
			infoDisplay.textContent = `You hit computers ${classes}!`
			checkScore('player', playerHits, playerShipsSunk)
		}
		if (!e.target.classList.contains('taken')) {
			infoDisplay.textContent = `Nothing hit this time`
			e.target.classList.add('empty')
		}
		playerTurn = false
		const allBoardBlocks = document.querySelectorAll('#computer div')
		allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
		setTimeout(computerMove, 1000)
	}
}

const computerMove = () => {
	if (!gameOver) {
		infoDisplay.textContent = 'Computer Moves'

		setTimeout(() => {
			let randomGo = Math.floor(Math.random() * width * width)
			const allBoardBlocks = document.querySelectorAll('#player div')

			if (allBoardBlocks[randomGo].classList.contains('taken') && allBoardBlocks[randomGo].classList.contains('boom')) {
				computerMove()
			} else if (
				allBoardBlocks[randomGo].classList.contains('taken') &&
				!allBoardBlocks[randomGo].classList.contains('boom')
			) {
				allBoardBlocks[randomGo].classList.add('boom')
				let classes = Array.from(allBoardBlocks[randomGo].classList)
				classes = classes.filter(className => className != 'block')
				classes = classes.filter(className => className != 'boom')
				classes = classes.filter(className => className != 'taken')
				computerHits.push(...classes)
				infoDisplay.textContent = `Computer hit yours ${classes}`
				checkScore('computer', computerHits, computerShipsSunk)
			} else {
				infoDisplay.textContent = 'Computer nothing hit this time'
				allBoardBlocks[randomGo].classList.add('empty')
			}
		}, 1000)

		setTimeout(() => {
			playerTurn = true
			infoDisplay.textContent = 'Your move!'
			const allBoardBlocks = document.querySelectorAll('#computer div')
			allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
		}, 2000)
	}
}

const checkScore = (user, userHits, userShipsSunk) => {
	const checkShip = (shipName, shipLength) => {
		if (userHits.filter(storedShipName => storedShipName === shipName).length === shipLength) {
			if (user == 'player') {
				playerHits = userHits.filter(storedShipName => storedShipName != shipName)
				infoDisplay.textContent = `You sunk the Computer's ${shipName}!`
			}

			if (user == 'computer') {
				computerHits = userHits.filter(storedShipName => storedShipName != shipName)
				infoDisplay.textContent = `Computer sunk your ${shipName}!`
			}

			userShipsSunk.push(shipName)
		}
	}
	ships.forEach(x => checkShip(x.name, x.length))

	if (playerShipsSunk.length == ships.length) {
		infoDisplay.textContent = 'You sunk all computers ships!'
		gameOver = true
	}

	if (computerShipsSunk.length == ships.length) {
		infoDisplay.textContent = 'GAME OVER!'
		gameOver = true
	}
}

startBtn.addEventListener('click', startGame)
