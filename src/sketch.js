let test, test2;
let monke;

class TestObject extends Object2D
{
    _setup()
    {
        console.log(this.name);
    }
}

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

    test = new TestObject("myTest");
    test.addChild(new TestObject("myTest2"));
    GameHandler.addRootObject(test);
    test.addChild(new TestObject("myTest3"))

}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}