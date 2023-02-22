export default class Game {
  'use strict';

  pixiApp;
  buttonContainer;
  boxContainer;
  mainButton;

  // Add your variables here

  // random colours
  colours = ['0xee3912', '0x6fee12', '0x12eebc', '0x122dee'];

  constructor(app) {
    this.pixiApp = app;
    this.create();
  }

  create() {
    this.boxContainer = new PIXI.Container();
    this.buttonContainer = new PIXI.Container();
    this.pixiApp.stage.addChild(this.boxContainer, this.buttonContainer);

    this.mainButton = this.addBox(0x00ff00, 100, 60, 60, 40, true);
    this.mainButton.interactive = true;
    this.mainButton.buttonMode = true;
    this.mainButton.on('pointerup', this.mainButtonPressed, this);
    this.buttonContainer.addChild(this.mainButton);


    // Add your code here
  }

  //***********************************/

  mainButtonPressed(evt) {
    console.log('Button Pressed!!');

    // Add button interaction here
    if (this.boxContainer.children.length >= 1) {
      // boxes is not an empty collection
      this.boxContainer.children.forEach(el => {
        this.boxContainer.removeChild(el);
        el.destroy();
      });

      // empty children array
      this.emptyChildren();
    } else {
      // boxes is an empty collection

      // make 'several' boxes, this can be a random amount between 2 and 4
      for (var i = 0; i < (Math.floor(Math.random() * 4) + 2); i++) {
        let randWidth =
            (Math.floor(Math.random() * (this.pixiApp.renderer.width - 100)) +
             1);
        let randHeight =
            (Math.floor(Math.random() * (this.pixiApp.renderer.height - 60)) +
             1);

        this.boxContainer.addChild(
            // creating boxes with the canavas resolution in mind while also
            // taking away the size of the boxes themselves so we dont have
            // boxes breaking out of the canvas
            this.addBox(
                this.colours[(Math.floor(Math.random() * 3) + 0)], 100, 60,
                randWidth, randHeight));
      }
    }
  }

  addBox(colour, w, h, x, y, drawRoundedBtn) {
    let width = w || 40;
    let height = h || 40;
    let box = new PIXI.Graphics().beginFill(colour || 0xffffff);

    // custom style
    if (drawRoundedBtn) {
      // make the btn have an outline
      box.lineStyle(5, 0xff0000, 1);
      // make the corner edges radius to 20
      box.drawRoundedRect(x, y, w, h, 20);
    } else {
      box.drawRect(-(width / 2), -(height / 2), width, height);
      box.x = x || 0;
      box.y = y || 0;
    }


    box.endFill();

    return box;
  }


  // Add your functions here

  // making this function generic as it may need to be reused
  emptyChildren(array) {
    this.boxContainer.children = [];
  }
}