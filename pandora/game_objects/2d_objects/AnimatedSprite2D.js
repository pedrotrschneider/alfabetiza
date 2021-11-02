class AnimatedSprite2D extends Sprite2D
{
    constructor(name, p5Image, spriteFrames)
    {
        super(name, p5Image);

        this.spriteFrames = spriteFrames;
        this.playing = false;
        this.frame = 0;
        this.currentAnimation = 0;
        this.timeSinceLastFrame = 0;
    }

    // Setters
    setCurrentAnimationByIndex(idx)
    {
        if (idx < this.spriteFrames.numAnimations)
            this.currentAnimation = idx;
        else this.currentAnimation = null;
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    setCurrentAnimationByName(name)
    {
        this.currentAnimation = this.spriteFrames.getAnimationIndexByName(name);
        this.frame = 0;
        this.timeSinceLastFrame = 0;
    }

    setCurrentFrameTime(time)
    {
        this.getCurrentAnimation().setFrameTime(time);
    }

    setCurrentFPS(fps)
    {
        this.getCurrentAnimation().setFPS(fps);
    }

    // Getters
    getAnimationByIndex(idx)
    {
        return this.spriteFrames.getAnimationByIndex(idx);
    }

    getCurrentAnimation()
    {
        return this.spriteFrames.getAnimationByIndex(this.currentAnimation);
    }

    getCurrentFrame()
    {
        return this.getCurrentAnimation().getFrame(this.frame);
    }

    getCurrentFrameTime()
    {
        return this.getCurrentAnimation().getFrameTime();
    }

    getCurrentNumFrames()
    {
        return this.getCurrentAnimation().getNumFrames();
    }

    // Methods
    play()
    {
        this.playing = true;
    }

    stop()
    {
        this.playing = false;
    }

    isPlaying()
    {
        return this.playing;
    }

    update(delta)
    {
        if (this.playing)
        {
            this.timeSinceLastFrame += delta;
            if (this.timeSinceLastFrame >= this.getCurrentFrameTime())
            {
                this.frame = (this.frame + 1) % this.getCurrentNumFrames();
                this.timeSinceLastFrame = 0;
            }
        }
        this.P5Image = this.getCurrentFrame();
        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }
}