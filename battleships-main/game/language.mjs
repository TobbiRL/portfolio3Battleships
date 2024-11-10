const DICTIONARY = {

en: {

start_game: "Start Game",
ship_placement: "SHIP PLACEMENT",
player_one_ready: "First player get ready.",
player_two_nolook: "Player two look away!",
player_two_ready: "Second player get ready.",
player_one_nolook: "Player one look away!",
exit_game: "Exit Game",
language_settings: "Language Settings",
english: "English",
norwegian: "Norwegian",
hit: "HIT! Shoot again",
miss: "SPLASH! That was a miss",
player1Turn: "Player 1 it's your turn",
player2Turn: "Player 2 it's your turn",
gameOver: "Game Over! Player",
winner: "is the winner!",
returnToMenu: "To return to the main menu, press ENTER",
spaces: "Spaces",
carrier: "Carrier",
battleship: "Battleship",
cruiser: "Cruiser",
submarine: "Submarine",
destroyer: "Destroyer",
yourShips: "Your Ships",
opponentBoard: "Opponents board",
controls: "Controls",
shipsToPlace: "Ships to place",
placeShips: "Press Enter: Place ship",
shipPlacingPhase: "Ship Placement Phase",
arrowKeys: "Arrow keys: Move cursor",
firePosition: "Press Enter: Fire at position",
info: "Info",
hitMarker: "Hit",
missMarker: "Miss",
marker: "Cursor",
resolution: "Resolution is too small, make the terminal bigger and restart the game",

},

no: {

start_game: "Start spill",
ship_placement: "PLASSERING AV SKIP",
player_one_ready: "Spiller 1 gjør deg klar.",
player_two_nolook: "Spiller 2 se bort!",
player_two_ready: "Spiller 2 gjør deg klar.",
player_one_nolook: "Spiller 1 se bort!",
exit_game: "Slutt spill",
language_settings: "Språk Instillinger",
english: "Engelsk",
norwegian: "Norsk",
hit: "TREFF! Skyt en gang til!",
miss: "PLASK! Det var bom!",
player1Turn: "Spiller 1 det er din tur",
player2Turn: "Spiller 2 det er din tur",
gameOver: "Spillet er slutt! Spiller",
winner: "vant!",
returnToMenu: "To return to the main menu, press ENTER",
spaces: "Plasser",
carrier: "Carrier",
battleship: "Battleship",
cruiser: "Cruiser",
submarine: "Submarine",
destroyer: "Destroyer",
yourShips: "Dine skip",
opponentBoard: "Motstanders brett",
controls: "Kontroller",
shipsToPlace: "Skip å plassere",
placeShips: "Trykk Enter: Plasser skip",
shipPlacingPhase: "Skip plasserings fase",
arrowKeys: "Piltast: Beveg markøren",
firePosition: "Trykk Enter: Skyt på posisjon",
info: "Info",
hitMarker: "Treff",
missMarker: "Bom",
marker: "Markør",
resolution: "Resolution er for liten, gjør terminalen større og kjør spillet på nytt",

},

}

const MAGICSTRINGREMOVER = {

    languageMenu: "Language Menu",
    mapLayout: "Map layout",
    en: "en",
    no: "no",
    mainMenu: "Main Menu",


}

let char = MAGICSTRINGREMOVER;

let language = DICTIONARY.en;

function changeLanguage(lang) {
    language = DICTIONARY[lang];
}

export { DICTIONARY, language, changeLanguage, char }
