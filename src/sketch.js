let test, test2;
let monke;

class TestAudio extends AudioPlayer
{

}

class TestButton extends Button
{
    _setup()
    {
        this.setPosition(100, 100);
    }

    _onMousePressed()
    {
        this.getParent().play();
    }

    _onMouseReleased()
    {
        this.getParent().stop();
    }
}

function preload()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
    AssetHandler.loadAudio("music", "/assets/audio/music.ogg");
}

function setup()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.setRenderMode(RENDER_MODES.WEBGL);
    GameHandler.init();
    textFont(AssetHandler.getP5FontByName("Lato"));

    test = new TestAudio("myTestAudio", AssetHandler.getP5AudioByName("music"));
    test.autoplay();
    test.addChild(new TestButton("myTestButton", "play audio"));
    GameHandler.addRootObject(test);
}

function draw()
{
    background(220);
    GameHandler.update();
    GameHandler.draw();
}