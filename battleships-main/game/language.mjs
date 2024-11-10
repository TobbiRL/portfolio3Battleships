const DICTIONARY = {

en: {

START_GAME: "Start Game",
SHIP_PLACEMENT_START_PLAYER_ONE: `SHIP PLACEMENT\nFirst player get ready.\nPlayer two look away`,
SHIP_PLACEMENT_START_PLAYER_TWO: `SHIP PLACEMENT\nSecond player get ready.\nPlayer one look away`,
EXIT_GAME: "Exit Game",
LANGUAGE_SETTINGS: "Language Settings",

},

no: {

START_GAME: "Start spill",
SHIP_PLACEMENT_START_PLAYER_ONE: `SKIP PLASSERING\nSpiller 1 gjør deg klar.\nSpiller 2 se bort`,
SHIP_PLACEMENT_START_PLAYER_TWO: `SKIP PLASSERING\nSpiller 2 gjør deg klar.\nSpiller 1 se bort`,
EXIT_GAME: "Slutt spill",
LANGUAGE_SETTINGS: "Språk Instillinger",

},

}

let language = DICTIONARY.en;

function changeLanguage(lang) {
    language = DICTIONARY[lang];
}

export { DICTIONARY, language, changeLanguage }
