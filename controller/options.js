document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('button')
	let selectedLinkIndex = 0

	function highlightSelectedLink() {
		links.forEach((link, index) => {
			if (index === selectedLinkIndex) {
				link.classList.add('selected')
				link.classList.add('x1')
			} else {
				link.classList.remove('selected')
				link.classList.remove('x1')
			}
		})
	}

	document.addEventListener('keydown', function (event) {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			selectedLinkIndex = Math.max(0, selectedLinkIndex - 1)
			highlightSelectedLink()
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			selectedLinkIndex = Math.min(links.length - 1, selectedLinkIndex + 1)
			highlightSelectedLink()
		}
	})

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			links[selectedLinkIndex].click()

			const infoHowToPlay = document.querySelector('.infoHowToPlay')
			if (links[selectedLinkIndex].classList.contains('howToPlay')) {
				if (infoHowToPlay.style.display === 'block') {
					infoHowToPlay.style.display = 'none'
				} else {
					infoHowToPlay.style.display = 'block'
				}
			}

            const difficultyLevel = document.querySelector('.levelOption')
            if (links[selectedLinkIndex].classList.contains('difficultyLevel')) {
				if (difficultyLevel.style.display === 'flex') {
					difficultyLevel.style.display = 'none'
				} else {
					difficultyLevel.style.display = 'flex'
				}
			}
		}
	})

	highlightSelectedLink()
})
