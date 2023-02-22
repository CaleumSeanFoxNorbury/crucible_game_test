import Game from './game.js';

let app, game;

createPixiApp();

game = new Game(app);

function createPixiApp() {
    app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(app.view);
}