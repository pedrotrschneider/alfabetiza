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

/**
 * The {@code Input} class represents an UIObject that holds and HTML input box.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Input extends UIObject
{
    /**
     * @constructor
     * Initializes an empty Input with the given parameters.
     * 
     * @param {String} name     name for the Input GameObject.
     * @param {String} value    default message inside the input box.
     * @param {String} type     type of the input box (e.g: "text", "password"). 
     */
    constructor(name, value = "", type = "text")
    {
        super(name);

        this.P5Element = createInput(value, type); // This Button's HTML input.
        this.setPosition(0, 0); // Set the position of the Input on the secondary buffer.
        this.setSize(200, 30); // Set the size of the Input on the secondary buffer.

        this.setStyle(STYLE.DEFAULT_STYLE); // Set the default style of the UIObject.

        this.connectCallbacks(); // Connect events of the p5.Element.
        this.P5Element.input(this.onInput); // Connect the extra event inputs have.
    }

    /**
     * @override
     * Defines default signals for UIObjects and serves as the caller to this UIObject's
     * _initSignals() callbacks. Also adds the extra onChaged signal for CheckBoxes.
     * 
     * @signal mousePressed     emited once every time a mouse button is pressed over this
     *                          UIObject.
     * @signal doubleClicked    emited once every time a mouse button is pressed twice over
     *                          this UIObject.
     * @signal mouseWheel       emited once everty time a mouse wheel is scrolled over this
     *                          UIObject. Passes one argument {event} that holds the deltaY
     *                          property, that holds a number based on how much was vertically
     *                          scrolled (up is positive) and the deltaX property, that holds a
     *                          number based on how much was horizontaly scrolled (right is positive).
     * @signal mouseReleased    emited once every time a mouse button is released over this
     *                          UIObject.
     * @signal mouseClicked     emited once every time a mouse button is pressed and released
     *                          over this UIObject.
     * @signal mouseMoved       emited once every time a mouse moves over this UIObject.
     * @signal mouseOver        emited once every time a mouse moves onto this UIObject.
     * @signal mouseOut         emited once every time a mouse moves out of this UIObject.
     * @signal touchStarted     emited once every time a touch is regiestered over this UIObject.
     * @signal touchMoved       emited once every time a touch move is regiestered over this
     *                          UIObject.
     * @signal touchEnded       emited once every time a touch is regiestered over this UIObject.
     * @signal dragOver         emited once every time a file is dragged over this UIObject.
     * @signal dragLeave        emited once every time a dragged file leaves this UIObject's area.
     * 
     * @signal input            emited once every time and input is dettected.
     */
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

    /**
     * Called once everty this this UIObject's input is triggered i.e typing.
     * Connectec to the input event from this UIObject's p5.Element.
     * Serves as an emitter to the input signal and calls the _onInput()
     * callback.
     */
    onInput()
    {
        this.pandoraObject.emitSignal("input");
        this.pandoraObject._onInput();
    }

    /**
     * @callback
     * ! This function should be overriden, it provides no default functionality.
     * Called once everty this this UIObject's input is triggered i.e typing.
     */
    _onInput()
    {

    }
}