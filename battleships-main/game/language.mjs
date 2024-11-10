const DICTIONARY = {

en: {

START_GAME: "Start Game",
SHIP_PLACEMENT: "SHIP PLACEMENT",
PLAYER_ONE_READY: "First player get ready.",
PLAYER_TWO_NOLOOK: "Player two look away!",
PLAYER_TWO_READY: "Second player get ready.",
PLAYER_ONE_NOLOOK: "Player one look away!",
EXIT_GAME: "Exit Game",
LANGUAGE_SETTINGS: "Language Settings",
ENGLISH: "English",
NORWEGIAN: "Norwegian",

},

no: {

START_GAME: "Start spill",
SHIP_PLACEMENT: "PLASSERING AV SKIP",
PLAYER_ONE_READY: "Spiller 1 gjør deg klar.",
PLAYER_TWO_NOLOOK: "Spiller 2 se bort!",
PLAYER_TWO_READY: "Spiller 2 gjør deg klar.",
PLAYER_ONE_NOLOOK: "Spiller 1 se bort!",
EXIT_GAME: "Slutt spill",
LANGUAGE_SETTINGS: "Språk Instillinger",
ENGLISH: "Engelsk",
NORWEGIAN: "Norsk",

},

}

let language = DICTIONARY.en;

function changeLanguage(lang) {
    language = DICTIONARY[lang];
}

export { DICTIONARY, language, changeLanguage }
