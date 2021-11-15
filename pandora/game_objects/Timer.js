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

/**
 * The {@code Timer} class represents a Timer GameObject with the functionality
 * of emiting a signal after some amount of time passed.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Timer extends GameObject
{
    /**
     * Initializes a Timer GameObject with the given parameters.
     * 
     * @param {String} name         name for this Timer GameObject.
     * @param {number} duration     duration in seconds of the timer.
     *                              Default is 1 second.
     * @param {boolean} autostart   shuold the timer start automaticaly
     *                              when it enters the tree? Default is false.
     * @param {boolean} oneShot     should the timer run only once?
     *                              Default is false.
     * 
     * @constructor
     */
    constructor(name, duration = 1, autostart = false, oneShot = false)
    {
        super(name);

        this.duration = duration;
        this.timeLeft = this.duration;
        this.paused = !autostart;
        this.autostart = autostart;
        this.oneShot = oneShot;
    }

    /**
     * Starts counting the Timer if it is paused, and does nothing if
     * the Timer is already running.
     * 
     * @param {number} timeSec  duration in seconds to override Timer's duration.
     *                          Defaults to current Timer's duration.
     */
    start(timeSec = this.duration)
    {
        if (!this.paused) return;
        this.duration = timeSec;
        this.paused = false;
        this.timeLeft = this.duration;
    }

    /**
     * Pauses the Timer. Does nothing if already paused.
     */
    stop()
    {
        this.paused = true;
    }

    /**
     * Resumes the Timer. Does nothing if already running.
     */
    resume()
    {
        this.paused = false;
    }

    /**
     * Returns the paused state of the Timer.
     * 
     * @returns {boolean} true if the timer is paused, false if not.
     */
    isStopped()
    {
        return this.paused;
    }

    /**
     * This function is called when the timer is done and serves
     * to change the data of the timer accordingly and emit the
     * timeout signal.
     */
    onFinish()
    {
        if (this.oneShot) this.paused = true
        this.timeLeft = this.duration;
        this._onFinish();
        this.emitSignal("timeout");
    }

    /**
     * Updates the Timer and calls the onFinish() function if the timer ended.
     * Also recursively calls the update() function for all of this GameObject's
     * children.
     * 
     * @param {number} delta    time in seconds ellapsed since the last frame. 
     * 
     * @override
     */
    update(delta)
    {
        if (!this.paused)
        {
            this.timeLeft -= delta;
            if (this.timeLeft <= 0) this.onFinish();
        }

        this.updateChildren(delta);
    }

    /**
     * Adds default signals for the Timer GameObject and serves as a caller
     * to the _initSignals() callback.
     * 
     * @signal timeout  emited once every time this timer is done.
     * 
     * @override
     */
    initSignals()
    {
        this.addSignal("timeout");
        this._initSignals();
    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time the Timer is done and can be used in
     * objects that inherit from Timer to add functinoality this event.
     * 
     * @callback
     */
    _onFinish()
    {

    }
}