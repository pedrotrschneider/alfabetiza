/************************************************************************
 * Input.js
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

class Input extends UIObject
{
    constructor(name, value = "", type = "text")
    {
        super(name);

        this.P5Element = createInput(value, type);
        this.setPosition(0, 0);
        this.setStyle(STYLE.DEFAULT_STYLE);
        this.size = new Vector2(200, 30);

        this.connectCallbacks();
        this.P5Element.input(this.onInput);
    }

    _onInput()
    {

    }

    initSignals()
    {
        this.addSignal("mousePressed");
        this.addSignal("doubleClicked");
        this.addSignal("mouseWheel");
        this.addSignal("mouseReleased");
        this.addSignal("mouseClicked");
        this.addSignal("mouseMoved");
        this.addSignal("mouseOver");
        this.addSignal("mouseOut");
        this.addSignal("touchStarted");
        this.addSignal("touchMoved");
        this.addSignal("touchEnded");
        this.addSignal("dragOver");
        this.addSignal("dragLeave");

        this.addSignal("input");
        this._initSignals();
    }

    onInput()
    {
        this.pandoraObject.emitSignal("input");
        this.pandoraObject._onInput();
    }
}