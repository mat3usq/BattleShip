import { ships } from '../model/data.js'
import { angle } from './flip.js'
import { getValidation } from './validation.js'

const optContainer = document.querySelector('.option-container')
const optionShips = Array.from(optContainer.children)
const allPlayerBlocks = document.querySelectorAll('#player div')
let notDropped
let draggedShip

const addPlayerShips = (ship, startId) => {
	const allBoardBlocks = document.querySelectorAll('#player div')
	let isHorizontal = angle === 0

	const { shipBlocks, valid, notTaken } = getValidation(allBoardBlocks, isHorizontal, startId, ship)

	// Dodanie statku oraz do bloku ze jest zajety
	if (valid && notTaken) {
		shipBlocks.forEach(shipBlock => {
			shipBlock.classList.add(ship.name)
			shipBlock.classList.add('taken')
		})
	} else notDropped = true
}

const dragStart = e => {
	notDropped = false
	draggedShip = e.target
}

const dragOver = e => {
	e.preventDefault()
	const ship = ships[draggedShip.id]
	shipArea(e.target.id, ship)
}

const dropShip = e => {
	const startId = e.target.id
	const ship = ships[draggedShip.id]

	addPlayerShips(ship, startId)

	const allBoardBlocks = document.querySelectorAll('#player div')
	allBoardBlocks.forEach(block => {
		block.classList.remove('hover')
	})

	if (!notDropped) draggedShip.remove()
}

const shipArea = (startIndex, ship) => {
	const allBoardBlocks = document.querySelectorAll('#player div')
	let isHorizontal = angle === 0

	const { shipBlocks, valid, notTaken } = getValidation(allBoardBlocks, isHorizontal, startIndex, ship)

	// Dodaj nowy stan shipBlocks do zmiennej
	const previousShipBlocks = Array.from(shipBlocks)

	if (valid && notTaken) {
		// Usuń klasę hover z innych bloków na planszy
		allBoardBlocks.forEach(block => {
			if (!shipBlocks.includes(block)) {
				block.classList.remove('hover')
			}
		})

		shipBlocks.forEach(shipBlock => {
			shipBlock.classList.add('hover')
		})

		// Po 300 ms, porównaj shipBlocks z poprzednimi
		setTimeout(() => {
			const stillHoveredBlocks = Array.from(shipBlocks)

			// Jeśli shipBlocks są takie same jak poprzednie, nie usuwaj podświetlenia
			if (stillHoveredBlocks.every(block => previousShipBlocks.includes(block))) {
			} else {
				shipBlocks.forEach(shipBlock => {
					shipBlock.classList.remove('hover')
				})
			}
		}, 300)
	}
}

optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))
allPlayerBlocks.forEach(playerBlock => {
	playerBlock.addEventListener('dragover', dragOver)
	playerBlock.addEventListener('drop', dropShip)
})
