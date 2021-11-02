let test, test2;
let monke;

function preload()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
    gimoi = loadImage("/assets/textures/gimoi.png");
}

function setup()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    monke = AssetHandler.getP5ImageByName("monke");
    let sf = new SpriteFrames();
    sf.addAnimation("monke", monke, 4, 4, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    test2 = new AnimatedSprite2D("myAnimSprite", null, sf);
    test2.play();
    test2.setCurrentFPS(1);
    GameHandler.addRootObject(test2);
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}