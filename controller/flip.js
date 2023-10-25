const flipBtn = document.querySelector('#flip-button')
const optContainer = document.querySelector('.option-container')

export let angle = 0
const flip = () => {
	const optionShips = Array.from(optContainer.children)
	angle = angle == 0 ? 90 : 0
	optionShips.forEach(optionShip => (optionShip.style.transform = `rotate(${angle}deg)`))
}

flipBtn.addEventListener('click', flip)

//      Przyciski
const buttons = document.querySelectorAll('.buttons button')

let selectedButtonIndex = 0

function updateSelectedButton() {
	buttons.forEach((button, index) => {
		if (index === selectedButtonIndex) {
			button.classList.add('selected')
			button.classList.add('x1')
		} else {
			button.classList.remove('selected')
			button.classList.remove('x1')
		}
	})
}

document.addEventListener('keydown', event => {
	if (event.key === 'ArrowRight') {
		selectedButtonIndex = (selectedButtonIndex + 1) % buttons.length
		updateSelectedButton()
	} else if (event.key === 'ArrowLeft') {
		selectedButtonIndex = (selectedButtonIndex - 1 + buttons.length) % buttons.length
		updateSelectedButton()
	} else if (event.key === 'Enter') {
		buttons[selectedButtonIndex].click()
	}
})

updateSelectedButton()
