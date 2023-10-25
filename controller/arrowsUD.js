document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('.links a')
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
		if (event.key === 'ArrowUp') {
			selectedLinkIndex = (selectedLinkIndex - 1 + links.length) % links.length
			highlightSelectedLink()
		} else if (event.key === 'ArrowDown') {
			selectedLinkIndex = (selectedLinkIndex + 1) % links.length
			highlightSelectedLink()
		}
	})

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			links[selectedLinkIndex].click()
		}
	})

	highlightSelectedLink()
})
