const gamesBoardContainer = document.querySelector('#gamesboard-container')

export const width = 10

const createBoard = (color, user) => {
	const gameBoard = document.createElement('div')
	gameBoard.classList.add('game-board')
	gameBoard.style.backgroundColor = color
	gameBoard.id = user

	for (let i = 0; i < width ** 2; i++) {
		const block = document.createElement('div')
		block.classList.add('block')
		block.id = i
		gameBoard.append(block)
	}

	gamesBoardContainer.append(gameBoard)
}

createBoard('none', 'player')
createBoard('none', 'computer')
