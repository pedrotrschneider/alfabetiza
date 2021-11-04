class Timer extends GameObject
{
    constructor(name, duration = 1, autostart = false, oneShot = false)
    {
        super(name);

        this.duration = duration;
        this.timeLeft = this.duration;
        this.paused = !autostart;
        this.autostart = autostart;
        this.oneShot = oneShot;
    }

    start(timeSec = this.duration)
    {
        if (!this.paused) return;
        this.duration = timeSec;
        this.paused = false;
        this.timeLeft = this.duration;
    }

    stop()
    {
        this.paused = true;
    }

    resume()
    {
        this.paused = false;
    }

    isStopped()
    {
        return this.paused;
    }

    update(delta)
    {
        if (!this.paused)
        {
            this.timeLeft -= delta;
            if (this.timeLeft <= 0) this.onFinish();
        }

        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }

    onFinish()
    {
        if (this.oneShot) this.paused = true
        this.timeLeft = this.duration;
        this._onFinish();
    }

    _onFinish()
    {
        console.log("doneskis");
    }
}