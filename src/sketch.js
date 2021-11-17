let test, test2, but;

GameHandler._preload = function()
{
    AssetHandler.loadTexture("monke", "/assets/textures/monke.png");
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
    AssetHandler.loadAudio("bonk", "/assets/audio/thonk.wav");
    AssetHandler.loadAudio("music", "/assets/audio/music.ogg");
}

GameHandler._setup = function()
{
    GameHandler.drawDebugFPS(true);
    GameHandler.drawDebugBufferBounds(true);
}