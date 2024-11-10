import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen, printCentered } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, GAME_BOARD_DIM, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import { language, changeLanguage } from "./game/language.mjs";
import { clear } from "console";
import { create2DArrayWithFill } from "./utils/array.mjs";

const MAIN_MENU_ITEMS = buildMenu();



const GAME_FPS = 1000 / 60; 
let currentState = null;  
let gameLoop = null;        

let mainMenuScene = null;
let languageMenu = null;

(function initialize() {
    resolutionTest();
    print(ANSI.HIDE_CURSOR);
    clearScreen();
    mainMenuScene = createMenu(MAIN_MENU_ITEMS);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen
    gameLoop = setInterval(update, GAME_FPS);
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}

function resolutionTest() {
    if (process.stdout.rows < 25) {
        clearScreen();
        printCentered(language.resolution);
        process.exit(); 
}
}

function buildMenu() {
    let menuItemCount = 0;

    return [
        {
            text: language.start_game, id: menuItemCount++, action: function () {
                clearScreen();
                let innbetween = createInnBetweenScreen();
                innbetween.init(language.ship_placement + "\n" + language.player_one_ready + "\n" + language.player_two_nolook, () => {

                    let p1map = createMapLayoutScreen();
                    let p1Board = null;

                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {
                        p1Board = {
                            ships: player1ShipMap,
                            target: create2DArrayWithFill(GAME_BOARD_DIM),
                        };

                        let innbetween = createInnBetweenScreen();
                        innbetween.init(language.ship_placement + "\n" + language.player_two_ready + "\n" + language.player_one_nolook, () => {

                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                let p2Board = {
                                    ships: player2ShipMap,
                                    target: create2DArrayWithFill(GAME_BOARD_DIM),
                                };

                                let battleShipScreen = createBattleshipScreen(); 
                                battleShipScreen.init(p1Board, p2Board);
                                return battleShipScreen;
                            })
                            return p2map;
                        });
                        return innbetween;
                    });

                    return p1map;

                }, 3);
                currentState.next = innbetween;
                currentState.transitionTo = "Map layout";
            }
        },
        { text: language.language_settings, id: menuItemCount++, action: function () {
            clearScreen();
            languageMenu = createMenu(buildLanguageMenu());
            currentState.next = languageMenu;
            currentState.transitionTo = "Language Menu";
        } },
    
        { text: language.exit_game, id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); process.exit(); } },
    ];
}

function buildLanguageMenu() {
    let menuItemCount = 0;
    
    return [
       { text: language.english, id: menuItemCount++, action: function () {
        changeLanguage("en");
        mainMenuScene = createMenu(buildMenu())
        currentState.next = mainMenuScene;
        currentState.transitionTo = "Main Menu";
    } },

    { text: language.norwegian, id: menuItemCount++, action: function () {
        changeLanguage("no");
        mainMenuScene = createMenu(buildMenu())
        currentState.next = mainMenuScene;
        currentState.transitionTo = "Main Menu";
    } }
    ]
}

export default buildMenu
