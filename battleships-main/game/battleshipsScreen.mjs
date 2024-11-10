import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import { ANSI } from "../utils/ansi.mjs";
import { print, clearScreen } from "../utils/io.mjs";
import KeyBoardManager from "../utils/io.mjs";
import { language } from "./language.mjs";
import createMenu from "../utils/menu.mjs";
import buildMenu from "../game.mjs";
 

const createBattleshipScreen = () => {
    let currentPlayer = FIRST_PLAYER;
    let firstPlayerBoard = null;
    let secondPlayerBoard = null;
    let currentBoard = null;
    let opponentBoard = null;
    let cursorColumn = 0;
    let cursorRow = 0;
    let gameOver = false;
    let winner = null;
    let shouldSwapPlayer = false;
    let turnMessage = '';

    function swapPlayer() {
        currentPlayer *= -1;
        if (currentPlayer == FIRST_PLAYER) {
            currentBoard = firstPlayerBoard;
            opponentBoard = secondPlayerBoard;
        } else {
            currentBoard = secondPlayerBoard;
            opponentBoard = firstPlayerBoard;
        }
        turnMessage = currentPlayer === FIRST_PLAYER ? language.player1Turn : language.player2Turn;
    }

    function isAllShipsSunk(board) {
        for (let y = 0; y < GAME_BOARD_DIM; y++) {
            for (let x = 0; x < GAME_BOARD_DIM; x++) {
                if (board.ships[y][x] !== 0 && board.target[y][x] !== 'X') {
                    return false;
                }
            }
        }
        return true;
    }

    function checkGameOver() {
        if (isAllShipsSunk(firstPlayerBoard)) {
            gameOver = true;
            winner = SECOND_PLAYER;
            return true;
        }
        if (isAllShipsSunk(secondPlayerBoard)) {
            gameOver = true;
            winner = FIRST_PLAYER;
            return true;
        }
        return false;
    }

    function fireAtPosition(x, y) {
        if (x < 0 || x >= GAME_BOARD_DIM || y < 0 || y >= GAME_BOARD_DIM) {
            return false;
        }
    
        if (opponentBoard.target[y][x] !== 0) {
            return false;
        }
    
        if (opponentBoard.ships[y][x] !== 0) {
            opponentBoard.target[y][x] = 'X';
            turnMessage = language.hit;
            shouldSwapPlayer = false;
            return true;

        } else {
            opponentBoard.target[y][x] = 'O';
            turnMessage = language.miss;
            shouldSwapPlayer = true;
            return true;
        }
    }

    function drawBoard(board, showShips = false) {
        let output = '';
        
        output += '  ';
        for (let i = 0; i < GAME_BOARD_DIM; i++) {
            output += ` ${String.fromCharCode(65 + i)}`;
            
        }
        output += '\n';
    
    
        for (let y = 0; y < GAME_BOARD_DIM; y++) {
            output += `${String(y + 1).padStart(2, ' ')} `;
            for (let x = 0; x < GAME_BOARD_DIM; x++) {
                const isCurrentPosition = cursorColumn === x && cursorRow === y;
                const target = board.target[y][x];
                const ship = board.ships[y][x];
                
                if (isCurrentPosition) {
                    output += ANSI.COLOR.YELLOW + '█' + ANSI.RESET + ' ';
                } else if (target === 'X') {
                   
                    output += ANSI.COLOR.RED + '█' + ANSI.RESET + ' ';
                } else if (target === 'O') {
                  
                    output += ANSI.COLOR.BLUE + '●' + ANSI.RESET + ' ';
                } else if (showShips && ship !== 0) {
                 
                    output += ANSI.SEA__AND_SHIP + '█' + ANSI.RESET + ' ';
                } else {
                
                    output += ANSI.SEA + ' ' + ANSI.RESET + ' ';
                }
            }
            output += '\n';
        }
        return output;
    }

    return {
        isDrawn: false,
        next: null,
        transitionTo: null,

        init: function(firstPBoard, secondPBoard) {
            firstPlayerBoard = firstPBoard;
            secondPlayerBoard = secondPBoard;
            currentBoard = firstPlayerBoard;
            opponentBoard = secondPlayerBoard;
            turnMessage = currentPlayer === FIRST_PLAYER ? language.player1Turn : language.player2Turn;
        },
        

        update: function(dt) {
            if (gameOver) {
                if (KeyBoardManager.isEnterPressed()) {

                    const mainMenu = createMenu(buildMenu());
                    this.next = mainMenu;
                    this.transitionTo = "Main Menu";
                }
            } else {
                if (KeyBoardManager.isUpPressed()) {
                    cursorRow = Math.max(0, cursorRow - 1);
                    this.isDrawn = false;
                }
                if (KeyBoardManager.isDownPressed()) {
                    cursorRow = Math.min(GAME_BOARD_DIM - 1, cursorRow + 1);
                    this.isDrawn = false;
                }
                if (KeyBoardManager.isLeftPressed()) {
                    cursorColumn = Math.max(0, cursorColumn - 1);
                    this.isDrawn = false;
                }
                if (KeyBoardManager.isRightPressed()) {
                    cursorColumn = Math.min(GAME_BOARD_DIM - 1, cursorColumn + 1);
                    this.isDrawn = false;
                }
                if (KeyBoardManager.isEnterPressed()) {
                    if (fireAtPosition(cursorColumn, cursorRow)) {
                        this.isDrawn = false;
                        if (!checkGameOver()) {
                            if (shouldSwapPlayer) {
                                setTimeout(() => {
                                    swapPlayer();
                                    cursorColumn = 0;
                                    cursorRow = 0;
                                    this.isDrawn = false;
                                }, 1000);
                            }
                        }
                    }
                }
            }
        },

        draw: function(dr) {
            if (this.isDrawn) return;
            this.isDrawn = true;
        
            clearScreen();
            let output = '';
        
            output += `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}${turnMessage}${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n\n`;
        
            if (gameOver) {
                output += `${ANSI.TEXT.BOLD}${ANSI.COLOR.GREEN}${language.gameOver} ${winner === FIRST_PLAYER ? '1' : '2'} ${language.winner}${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`;
                output += `${language.return_To_Menu}\n\n`;
            }
        
            const currentPlayerBoard = drawBoard(currentBoard, true).split('\n');
            const opponentPlayerBoard = drawBoard(opponentBoard, false).split('\n');

            output += `${language.yourShips}${' '.repeat(GAME_BOARD_DIM * 2)}${language.opponentBoard}\n`;
            for (let i = 0; i < currentPlayerBoard.length; i++) {
                output += currentPlayerBoard[i] + '\t' + opponentPlayerBoard[i] + '\n';
            }
        
            output += `\n${language.controls}:\n`;
            output += `${language.arrowKeys}\n`;
            output += `${language.firePosition}\n`;
            
            output += `\n${language.infoTitle}:\n`;
            output += `${ANSI.COLOR.RED}█${ANSI.RESET} ${language.hitMarker}  `;
            output += `${ANSI.COLOR.BLUE}●${ANSI.RESET} ${language.missMarker}  `;
            output += `${ANSI.COLOR.YELLOW}█${ANSI.RESET} ${language.cursorMarker}\n`;
        
            print(output);
        }
    };
};

export default createBattleshipScreen;