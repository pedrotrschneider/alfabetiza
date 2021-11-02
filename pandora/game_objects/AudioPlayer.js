class AudioPlayer extends GameObject
{
    constructor(name, p5Audio = null)
    {
        super(name);

        this.p5Audio = p5Audio;
    }

    setP5Audio(p5Audio)
    {
        if (this.p5Audio) this.p5Audio.stop();
        this.p5Audio = p5Audio;
    }

    getP5Audio()
    {
        return this.p5Audio;
    }

    play()
    {
        if (this.p5Audio) this.p5Audio.play();
    }

    stop()
    {
        if (this.p5Audio) this.p5Audio.stop();
    }

    // TODO: This don't worky, make it worky
    // Something to do with new browser audio policy
    autoplay()
    {
        if (this.p5Audio) this.p5Audio.autoplay(true);
    }
}