/************************************************************************
 * Select.js
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
 * The {@code Select} class represents an UIObject that holds and HTML select.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class Select extends UIObject
{
    /**
     * Intializes an empty Select.
     * 
     * @param {String} name name for the Select GameObject.
     * 
     * @constructor
     */
    constructor(name)
    {
        super(name);

        this.P5Element = createSelect(); // This Select's HTML select.
        this.setPosition(0, 0); // Set this Select's position on the secondary buffer.
        this.setSize(100, 20); // Set this Select's size on the secondary buffer.

        this.setStyle(STYLE.DEFAULT_STYLE); // Set this UIObject's default style.

        this.connectCallbacks(); // Connect the events of the p5.Element.
        this.P5Element.changed(this.onChanged); // Connect the extra event selects have.
    }

    /**
     * Set this Select's selected option based on the option's value.
     * 
     * @param {String} value    value of the option to be selected.
     */
    setSelected(value)
    {
        this.P5Element.selected(value);
    }

    /**
     * Returns the selecte option's value.
     * 
     * @returns {String}
     */
    getSelected()
    {
        return this.P5Element.selected();
    }

    /**
     * Add a new option to this Select's HTML select with the given value.
     * 
     * @param {String} value    value for the new option.
     */
    addOption(value)
    {
        this.P5Element.option(value);
    }

    // TODO confirm if disable methods really dont exist or if something is broken.

    // disableAll()
    // {
    //     this.P5Element.disable();
    // }

    // disableOption(value)
    // {
    //     this.P5Element.disable(value);
    // }

    /**
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
     * @signal changed          emited once every time this UIObject's select's value is changed.
     * 
     * @override
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

        this.addSignal("changed");
        this._initSignals();
    }

    /**
     * Called once every time this UIObject's select's value is changed.
     * Connected to the changed event from this UIObject's p5.Element.
     * Serves as an emiter to the changed signal and calls the _onChanged()
     * callback.
     */
    onChanged()
    {
        this.pandoraObject.emitSignal("changed");
        this.pandoraObject._onChanged();
    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time this UIObject's select's value is changed.
     * 
     * @callback
     */
    _onChanged()
    {

    }
}