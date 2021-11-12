/************************************************************************
 * Tween.js
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
 * The {@code TweenData} class represents the data that a Tween GameObject needs to
 * interpolate a given property.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class TweenData
{
    /**
     * Creates a TweenData Object with the specified parameters.
     * 
     * @param {Object} target                   Object that has the property to be interpolated.
     * @param {String} property                 name of the property of target to be interpolated.
     *                                          target[property] should be number, Vector2 or Color. 
     * @param {PROPERTY_TYPE} propertyType      type of the property to be interpolated. 
     * @param {number, Vector2, Color} initVal  initial value for the interpolation.
     *                                          Should be the same type as target[property].
     * @param {number, Vector2, Color} finalVal final value for the interpolation.
     *                                          Should be the same type as target[property].
     * @param {number} duration                 duration in seconds of the interpolation. 
     * @param {TRANS_TYPE} transType            transition type of the interpolation. 
     * @param {EASE_TYPE} easeType              easing type of the interpolation.
     * @param {number} delay                    delay in seconds for the interpolation to start. 
     * 
     * @constructor
     */
    constructor(target, property, propertyType, initVal, finalVal, duration, transType, easeType, delay)
    {
        this.target = target; // Object that has the property to be interpolated.
        this.property = property; // Name of the property to be interpolated.
        this.propertyType = propertyType; // Type of the property to be interpolated.

        // Initializes new objects for final value and initial value depending on the type.
        switch (this.propertyType)
        {
            case PROPERTY_TYPE.COLOR:
                this.initVal = new Color(initVal.r, initVal.g, initVal.b, initVal.a);
                this.finalVal = new Color(finalVal.r, finalVal.g, finalVal.b, finalVal.a);
                break;
            case PROPERTY_TYPE.VECTOR2:
                this.initVal = new Vector2(initVal.x, initVal.y);
                this.finalVal = new Vector2(finalVal.x, finalVal.y);
                break;
            case PROPERTY_TYPE.NUMBER:
                this.initVal = initVal;
                this.finalVal = finalVal;
                break;
        }

        this.duration = duration; // Duration in seconds of the interpolation
        this.transType = transType; // Type of the transition.
        this.easeType = easeType; // Type of the easing.

        this.t = -delay; // Current time of the interpolation.
        this.playing = false; // Is the interpolation playing?
        this.done = false; // Is the interpolation done?

        this.p = []; // List of sub-properties to be interpolated depending on the type.
        switch (this.propertyType)
        {
            case PROPERTY_TYPE.COLOR:
                this.p.push("r");
                this.p.push("g");
                this.p.push("b");
                break;
            case PROPERTY_TYPE.VECTOR2:
                this.p.push("x");
                this.p.push("y");
                break;
            case PROPERTY_TYPE.NUMBER:
                break;
        }

        this.trans = ""; // String for the transition type.
        switch (this.transType)
        {
            case TRANS_TYPE.LINEAR:
                this.trans = "Linear";
                break;
            case TRANS_TYPE.QUAD:
                this.trans = "Quad";
                break;
            case TRANS_TYPE.CUBIC:
                this.trans = "Cubic";
                break;
            case TRANS_TYPE.QUART:
                this.trans = "Quart";
                break;
            case TRANS_TYPE.QUINT:
                this.trans = "Quint";
                break;
            case TRANS_TYPE.SINE:
                this.trans = "Sine";
                break;
            case TRANS_TYPE.EXPONENTIAL:
                this.trans = "Expo";
                break;
            case TRANS_TYPE.CIRCULAR:
                this.trans = "Circ";
                break;
            case TRANS_TYPE.ELASTIC:
                this.trans = "Elastic";
                break;
            case TRANS_TYPE.BACK:
                this.trans = "Back";
                break;
            case TRANS_TYPE.BOUNCE:
                this.trans = "Bounce";
                break;
        }

        this.ease = ""; // String for the easing type.
        if (this.transType == TRANS_TYPE.LINEAR) this.ease = "ease";
        else
        {
            switch (this.easeType)
            {
                case EASE_TYPE.IN:
                    this.ease = "easeIn";
                    break;
                case EASE_TYPE.OUT:
                    this.ease = "easeOut";
                    break;
                case EASE_TYPE.IN_OUT:
                    this.ease = "easeInOut";
                    break;
            }
        }
    }
}

/**
 * The {@code Tween} class represents a Tween GameObject that has functionality to
 * interpolate any property of another GameObject if the properties are of the type
 * number, Vector2 or Color.
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Tween extends GameObject
{
    /**
     * Creates an empty Tween GameObject.
     * 
     * @param {String} name name of the Tween GameObject. 
     * 
     * @constructor
     */
    constructor(name)
    {
        super(name);

        this.tweenData = [];
        this.doneTweens = 0;
        this.done = false;
    }

    /**
     * Add a new TweenData Object to this Tween with the necessary information to interpolate
     * the target's property.
     * 
     * @param {Object} target                   Object that has the property to be interpolated.
     * @param {String} property                 name of the property of target to be interpolated.
     *                                          target[property] should be number, Vector2 or Color. 
     * @param {PROPERTY_TYPE} propertyType      type of the property to be interpolated. 
     * @param {number, Vector2, Color} initVal  initial value for the interpolation.
     *                                          Should be the same type as target[property].
     * @param {number, Vector2, Color} finalVal final value for the interpolation.
     *                                          Should be the same type as target[property].
     * @param {number} duration                 duration in seconds of the interpolation. 
     * @param {TRANS_TYPE} transType            transition type of the interpolation.
     *                                          Default is TRANS_TYPE.LINEAR.
     * @param {EASE_TYPE} easeType              easing type of the interpolation.
     *                                          Default is EASY_TYPE.IN_OUT.
     * @param {number} delay                    delay in seconds for the interpolation to start.
     *                                          Default is 0. 
     */
    interpolateProperty(target, property, propertyType, initVal, finalVal, duration, transType = 1, easeType = 3, delay = 0)
    {
        this.done = false; // Are all TweenData on this Tween done?

        // Adding a new TweenData.
        this.tweenData.push(new TweenData(target, property, propertyType, initVal, finalVal, duration, transType, easeType, delay));
    }

    /**
     * Given a TweenData, sets its interpolation's target's property to the appropriate value for
     * the current time of the interpolation.
     * 
     * @param {TweenData} td    reference to the TweenData Object. 
     */
    interpolate(td)
    {
        if (td.propertyType == PROPERTY_TYPE.NUMBER)
            td.target[td.property] = Easings[td.trans][td.ease](td.t, td.initVal, td.finalVal - td.initVal, td.duration);
        else
        {
            for (let i = 0; i < td.p.length; i++)
                td.target[td.property][td.p[i]] = Easings[td.trans][td.ease](td.t, td.initVal[td.p[i]], td.finalVal[td.p[i]] - td.initVal[td.p[i]], td.duration);
        }
    }

    /**
     * Starts interpolating all TweenData Objectcs currently added to this Tween.
     */
    startAll()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = true;
    }

    /**
     * Starts interpolating a specific TweenData Object based on its index.
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the desired TweenData to start.
     */
    startByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = true;
    }

    /**
     * Stops interpolating all TweenData Objects currently added to this Tween.
     */
    stopAll()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = false;
    }

    /**
     * Stops interpolating a specific TweenData Object based on its index.
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the desired TweenData to stop.
     */
    stopByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = false;
    }

    /**
     * Resumes interpolating all TweenData currently added to this Tween.
     */
    resumeAll()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = true;
    }

    /**
     * Resumes interpolating a specific TweenData Object based on its index.
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the desired TweenData to resume.
     */
    resumeByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = true;
    }

    /**
     * Resets all TweenData currently added to this Tween.
     */
    resetAll()
    {
        this.doneTweens = 0;
        this.done = false;
        for (let i = 0; i < this.tweenData.length; i++)
        {
            this.tweenData[i].t = 0;
            this.tweenData[i].done = false;
        }
    }

    /**
     * Resets a specific TweenData Object based on its index.
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the desired TweenData to reset.
     */
    resetByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.doneTweens--;
        this.done = false;
        this.tweenData[idx].t = 0;
        this.tweenData[idx].done = false;
    }

    /**
     * Removes all TweenData currently added to this Tween.
     */
    removeAll()
    {
        while (this.tweenData.length > 0)
            this.tweenData.pop();
    }

    /**
     * Removes a specific TweenData Object based on its index.
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the desired TweenData to remove.
     */
    removeByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData.splice(idx, 1);
    }

    /**
     * Sets the current time of all TweenData currently added to this Tween
     * to the specified time.
     * 
     * @param {number} time time in seconds to seek all TweenData on this Tween. 
     */
    seekAll(time)
    {
        if (time < 0) return;
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].t = min(time, this.tweenData[i].duration);
    }

    /**
     * Sets the current time of a specific TweenData Object, based on its index,
     * to the specified time. 
     * 
     * ! Since TwennData are not GameObjects, this is the only way to query
     * ! for them. The index refera to the order you added the TweenData to
     * ! this Tween, starting at 0.
     * 
     * @param {number} idx  index of the TweenData to seek to the time.
     * @param {number} time time in seconds to seek the specified TweenData
     */
    seekByIndex(idx, time)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].t = min(time, this.tweenData[idx].duration);
    }

    /**
     * Called once every time all TweenData on this Tween are completed.
     * Emits the tweenDataAllCompleted signal.
     */
    allDone()
    {
        this.emitSignal("tweenAllCompleted");
        this.done = true;
    }

    /**
     * Adds default signals for the Tween GameObject and serves as a caller
     * to the _initSignals() callback.
     * 
     * @signal tweenAllCompleted    Emited once when all TweenData on this Tween
     *                              are done.
     * @signal tweenCompleted       Emited once when one TweenData on this Tween
     *                              is done. Passes the completed TweenData as a
     *                              parameter.
     * @signal tweenStarted         Emited once when one TweenData on this Tween
     *                              starts. Passes the started TweenData as a 
     *                              parameter.
     * 
     * @override
     */
    initSignals()
    {
        this.addSignal("tweenAllCompleted");
        this.addSignal("tweenCompleted");
        this.addSignal("tweenStarted");
        this._initSignals();
    }

    /**
     * Updates all TweenData added to this Tween and recursively calls the _update(delta)
     * callback for this GameObject and all of it's children.
     * 
     * @param {number} delta    number of ellapsed seconds since the last frame.
     * 
     * @override
     */
    update(delta)
    {
        // Checks if all TweenData are done.
        if (!this.done && this.doneTweens == this.tweenData.length) this.allDone();

        for (let i = 0; i < this.tweenData.length; i++)
        {
            // Ignores TweenData that aren't playing.
            if (!this.tweenData[i].playing) continue;
            
            // Interpolates TweenData that are out of the delay.
            if (this.tweenData[i].t >= 0)
                this.interpolate(this.tweenData[i]);

            // Checks if the TweenData just went out of the delay (just started).
            if (this.tweenData[i].t <= 0 && this.tweenData[i].t + delta >= 0)
                this.emitSignal("tweenStarted", this.tweenData[i]);
            
            // Updates TweenData's current time.
            this.tweenData[i].t = min(this.tweenData[i].t + delta, this.tweenData[i].duration);

            // Checks if the TweenData is done.
            if (!this.tweenData[i].done && this.tweenData[i].t == this.tweenData[i].duration)
            {
                this.emitSignal("tweenDone", this.tweenData[i]);
                this.tweenData[i].done = true;
                this.doneTweens += 1;
            }
        }

        this._update(delta);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].update(delta);
    }
}