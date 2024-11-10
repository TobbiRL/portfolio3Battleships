import { language } from "./language.mjs"

const units = {
    carrier: { size: 5, id: language.carrier, symbole: "O" },
    battleship: { size: 4, id: language.battleship, symbole: "K" },
    cruiser: { size: 3, id: language.cruiser, symbole: "T" },
    submarine: { size: 3, id: language.submarine, symbole: "X" },
    destroyer: { size: 2, id: language.destroyer, symbole: "Q" }
}

export default units