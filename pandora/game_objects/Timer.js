/************************************************************************
 * Timer.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Pandora.
 *
 * Pandora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pandora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Pandora.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

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

    initSignals()
    {
        this.addSignal("timeout");
        this._initSignals();
    }

    onFinish()
    {
        if (this.oneShot) this.paused = true
        this.timeLeft = this.duration;
        this._onFinish();
        this.emitSignal("timeout");
    }

    _onFinish()
    {
        console.log("doneskis");
    }
}