export class Ship {
	constructor(name, length) {
		this.name = name
		this.length = length
	}
}

export const destroyer = new Ship('destroyer', 2)
export const submarine = new Ship('submarine', 3)
export const crusier = new Ship('crusier', 3)
export const battleship = new Ship('battleship', 4)
export const carrier = new Ship('carrier', 5)

export const ships = [destroyer, submarine, crusier, battleship, carrier]
