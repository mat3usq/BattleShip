import { width } from './board.js'

export const getValidation = (allBoardBlocks, isHorizontal, startIndex, ship) => {
	// Brak mozliwosci wyjscia poza 100 div
	// oraz poza dolna krawedz
	let validStart
	if (isHorizontal) {
		if (startIndex <= width ** 2 - ship.length) {
			validStart = startIndex
		} else {
			validStart = width ** 2 - ship.length
		}
	} else {
		if (startIndex <= width ** 2 - width * ship.length) {
			validStart = startIndex
		} else {
			validStart = startIndex - ship.length * width + width
		}
	}

	let shipBlocks = []
	// Dodawanie statku
	for (let i = 0; i < ship.length; i++) {
		if (isHorizontal) shipBlocks.push(allBoardBlocks[Number(validStart) + i])
		else shipBlocks.push(allBoardBlocks[Number(validStart) + i * width])
	}

	// Przesuwanie statku tak aby sie nie rozdzielaly
	let valid
	if (isHorizontal) {
		shipBlocks.every(
			(_shipBlock, index) => (valid = shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1)))
		)
	} else {
		shipBlocks.every((_shipBlock, index) => (valid = shipBlocks[0].id < 90 + (width * index + 1)))
	}

	const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

	return { shipBlocks, valid, notTaken }
}
