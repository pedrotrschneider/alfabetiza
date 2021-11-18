GameHandler._preload = function()
{
    AssetHandler.loadFont("Lato", "/assets/fonts/Lato-Regular.ttf");
}

GameHandler._setup = function()
{
    // GameHandler.drawDebugFPS(true);
    // GameHandler.drawDebugBufferBounds(true);
    textFont(AssetHandler.getP5FontByName("Lato"));

    // rg = new RebusGame("Rebus game");
    // rg.levelData = REBUS_LEVELS.tutorial;
    // GameHandler.addRootObject(rg);
    let rls = new RebusLevelSelector("LevelSelector");
    GameHandler.addRootObject(rls);
}