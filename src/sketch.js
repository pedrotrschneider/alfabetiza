let test, test2;

function preload()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
}

function setup()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new Sprite2D("mySprite", AssetHandler.getP5ImageByName("monke"));
    GameHandler.addRootObject(test);
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}