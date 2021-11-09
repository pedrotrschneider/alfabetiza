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

class TweenData
{
    constructor(target, property, propertyType, initVal, finalVal, duration, transType, easeType, delay)
    {
        this.target = target;
        this.property = property;
        this.propertyType = propertyType;
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
        this.duration = duration;
        this.transType = transType;
        this.easeType = easeType;

        this.t = -delay;
        this.playing = false;
        this.done = false;

        this.p = [];
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

        this.trans = "";
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

        this.ease = "";
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

class Tween extends GameObject
{
    constructor(name)
    {
        super(name);

        this.tweenData = [];
        this.doneTweens = 0;
        this.done = false;
    }

    interpolateProperty(target, property, propertyType, initVal, finalVal, duration, transType = 1, easeType = 3, delay = 0)
    {
        this.done = false;
        this.tweenData.push(new TweenData(target, property, propertyType, initVal, finalVal, duration, transType, easeType, delay));
    }

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

    start()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = true;
    }

    startByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = true;
    }

    stopAll()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = false;
    }

    stopByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = false;
    }

    resumeAll()
    {
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].playing = true;
    }

    resumeByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].playing = true;
    }

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

    resetByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.doneTweens--;
        this.done = false;
        this.tweenData[idx].t = 0;
        this.tweenData[idx].done = false;
    }

    removeAll()
    {
        while (this.tweenData.length > 0)
            this.tweenData.pop();
    }

    removeByIndex(idx)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData.splice(idx, 1);
    }

    seekAll(time)
    {
        if (time < 0) return;
        for (let i = 0; i < this.tweenData.length; i++)
            this.tweenData[i].t = min(time, this.tweenData[i].duration);
    }

    seekByIndex(idx, time)
    {
        if (idx < 0 && idx >= this.tweenData.length) return;
        this.tweenData[idx].t = min(time, this.tweenData[idx].duration);
    }

    allDone()
    {
        this.emitSignal("tweenAllCompleted");
        this.done = true;
    }

    initSignals()
    {
        this.addSignal("tweenAllCompleted");
        this.addSignal("tweenCompleted");
        this.addSignal("tweenStarted");
        this._initSignals();
    }

    update(delta)
    {
        if (!this.done && this.doneTweens == this.tweenData.length) this.allDone();

        for (let i = 0; i < this.tweenData.length; i++)
        {
            if (!this.tweenData[i].playing) continue;

            if (this.tweenData[i].t >= 0)
            {
                this.interpolate(this.tweenData[i]);
            }

            if (this.tweenData[i].t < 0 && this.tweenData[i].t + delta >= 0)
                this.emitSignal("tweenStarted", this.tweenData[i]);
            this.tweenData[i].t = min(this.tweenData[i].t + delta, this.tweenData[i].duration);

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