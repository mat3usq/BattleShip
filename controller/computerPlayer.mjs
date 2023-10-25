import { ships } from '../model/data.js'
import { getValidation } from './validation.js'
import { width } from './board.js'

const addShipComputer = (ship, user) => {
	let allBoardBlocks = user ? document.querySelectorAll('#computer div') : document.querySelectorAll('#player div')

	let startIndex = Math.floor(Math.random() * width ** 2)
	let isHorizontal = Math.random() < 0.5

	const { shipBlocks, valid, notTaken } = getValidation(allBoardBlocks, isHorizontal, startIndex, ship)

	// Dodanie statku oraz do bloku ze jest zajety
	if (valid && notTaken) {
		shipBlocks.forEach(shipBlock => {
			shipBlock.classList.add(ship.name)
			shipBlock.classList.add('taken')
		})
	} else addShipComputer(ship, user)
}

ships.forEach(ship => addShipComputer(ship, true))

const btnDock = document.querySelector('#dock-button')
btnDock.addEventListener('click', function () {
	ships.forEach(ship => addShipComputer(ship, false))
	const x = Array.from(document.querySelector('.option-container').children)
	x.forEach(y => y.remove())
})
