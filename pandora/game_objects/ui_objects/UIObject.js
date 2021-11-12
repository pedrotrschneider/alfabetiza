/************************************************************************
 * UIObject.js
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
 * The {@code UIObject} class represents a minimal structure for any GameObject that
 * hold an HTML interface element.
 * 
 * ! All GameObjects need to be inside the tree to do anything (can be added as a child
 * ! of another GameObject on the tree or as a root).
 * 
 * @author Pedro Schneider
 * 
 * @class
 */
class UIObject extends GameObject
{
    /**
     * Initializes an empty UIObject.
     * 
     * @param {String} name name for this UIObject. 
     * 
     * @constructor
     */
    constructor(name)
    {
        super(name);

        this.P5Element = null; // This UIOBject's p5.Element (that holds an HTML element).
        this.visible = true; // Is this UIObject visible at the moment?
        this.position = new Vector2(0, 0); // This UIObject's position on the secondary buffer.
        this.size = new Vector2(300, 100); // The UIObject's size on the secondary buffer.
        this.fontSize = STYLE.DEFAULT_FONT_SIZE; // This UIObject's font style.
    }

    /**
     * Connects this UIObject's p5.Element's events to this GameObject's appropriate
     * methods.
     */
    connectCallbacks()
    {
        this.P5Element.mousePressed(this.onMousePressed);
        this.P5Element.doubleClicked(this.onDoubleClicked);
        this.P5Element.mouseWheel(this.onMouseWheel);
        this.P5Element.mouseReleased(this.onMouseReleased);
        this.P5Element.mouseClicked(this.onMouseClicked);
        this.P5Element.mouseMoved(this.onMouseMoved);
        this.P5Element.mouseOver(this.onMouseOver);
        this.P5Element.mouseOut(this.onMouseOut);
        this.P5Element.touchStarted(this.onTouchStarted);
        this.P5Element.touchMoved(this.onTouchMoved);
        this.P5Element.touchEnded(this.onTouchEnded);
        this.P5Element.dragOver(this.onDragOver);
        this.P5Element.dragLeave(this.onDragLeave);

        this.P5Element.pandoraObject = this;
    }

    /**
     * Sets the position of this UIObject on the secondary buffer.
     * 
     * @param {number} x    pixel position on the X axis.
     * @param {number} y    pixel position on the Y axis.
     */
    setPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    /**
     * Sets the size of this UIObject on the secondary buffer.
     * 
     * @param {number} w    pixel width of this UIObject. 
     * @param {number} h    pixel height of this UIObject.
     */
    setSize(w, h)
    {
        this.size.x = w;
        this.size.y = h;
    }

    /**
     * Sets this UIObject's font size.
     * 
     * @param {number} fs   new font size.
     */
    setFontSize(fs)
    {
        this.fontSize = fs;
    }

    /**
     * Sets the visibility of this UIObject's p5.Element's visibility.
     * 
     * @param {boolean} vis new value for the visibility of the UIObject.
     */
    setVisibility(vis)
    {
        if (vis) this.P5Element.show();
        else this.P5Element.hide();
        this.visible = !this.visible;
    }

    /**
     * Sets the inner html value of this UIObject's p5.Element.
     * 
     * @param {*} val   new inner HTML value for this UIObject.
     */
    setValue(val)
    {
        this.P5Element.value(val)
    }

    /**
     * Sets the CSS style of this UIObject's p5.Element.
     * 
     * @param {Object} style    object containing the CSS style for this
     *                          UIObject. 
     */
    setStyle(style)
    {
        for (const [key, value] of Object.entries(style))
        {
            this.P5Element.style(`${key}`, value);
        }
    }

    /**
     * Returns this UIOBject's position on the secondary buffer.
     * 
     * @returns {Vector2} this UIObject's position on the secondary buffer.
     */
    getPosition()
    {
        return this.position;
    }

    /**
     * Returns this Object's position on the secondary buffer.
     * 
     * @returns {Vector2}   this UIObject's size on the secondary buffer.
     */
    getSize()
    {
        return this.size;
    }

    /**
     * Returns this UIObject's font size.
     * 
     * @returns {number}    this UIObject's font size.
     */
    getFontSize()
    {
        return this.fontSize;
    }

    /**
     * Returns this UIObject's visibility flag.
     * 
     * @returns {boolean}   true if this UIObject is visible, false if not.
     */
    getVisibility()
    {
        return this.visible;
    }

    /**
     * Return the inner HTML value of this UIObject's p5.Element.
     * 
     * @returns {String}    inner HTML value of this UIObject's p5.Element. 
     */
    getValue()
    {
        return this.P5Element.value();
    }

    /**
     * Sets this UIObject's visibility flag to true, shows the p5.Element, and
     * recursively calls the show() method on all of this GameObject's children 
     * if they have it.
     */
    show()
    {
        this.visible = true;
        this.P5Element.show();

        for (let i = 0; i < this.children.length; i++)
        {
            if (!this.children[i].show) continue;
            this.children[i].show();
        }
    }

    /**
     * Sets this UIObject's visibility flag to false, hides the p5.Element, and
     * recursively calls the hide() method on all of this GameObject's children 
     * if they have it.
     */
    hide()
    {
        this.visible = false;
        this.P5Element.hide();

        for (let i = 0; i < this.children.length; i++)
        {
            if (!this.children[i].hide) continue;
            this.children[i].hide();
        }
    }

    /**
     * Adds a GameObject as a child of this UIObject, and parents the child's p5.Element
     * if they are a UIObject.
     * 
     * @param {GameObject} child 
     * 
     * @override
     */
    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        if (child.P5Element)
            child.P5Element.parent(this.P5Element);
    }

    /**
     * Recursively marks this GameObject's and all of its children's
     * memory for garbage collection. Also removes this UIObject's p5.Element.
     * 
     * @override
     */
    destroy()
    {
        for (let i = 0; i < this.children.length; i++)
            this.children[i].destroy();

        if (this.P5Element)
            this.P5Element.remove();

        for (var prop in this)
            this[prop] = null;
    }

    /**
     * Defines default signals for UIObjects and serves as the caller to this UIObject's
     * _initSignals() callbacks.
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

        this._initSignals();
    }

    /**
     * Updates this UIObject's p5.Element size, position and font size based
     * on the secondary buffer's size on the actual window. This gives the
     * impression that the HTML element is actually beeing drawn to the secondary
     * buffer instead of the main one.
     * ? is it possible to draw them directly to the secondary buffer?
     * 
     * @param {number} delta    number of ellapsed seconds since the last frame.
     * @param {p5.Graphics} db  secondary buffer to draw to.
     * 
     * @override
     */
    draw(delta, db)
    {
        let ar = db.screenWidth / db.width;
        let offsetx = (windowWidth - db.screenWidth) / 2;
        let offsety = (windowHeight - db.screenHeight) / 2;
        this.P5Element.position(offsetx + this.position.x * ar, offsety + this.position.y * ar);
        this.P5Element.size(this.size.x * ar, this.size.y * ar);

        this.setStyle(
        {
            "font-size": `${this.fontSize * ar}px`
        });

        this._draw(delta, db);
        for (let i = 0; i < this.children.length; i++)
            this.children[i].draw(delta, db);
    }

    /**
     * Called once every time a mouse button is pressed over this UIObject.
     * Connected to the mousePressed event from this UIObject's p5.Element.
     * Serves as an emiter to the mousePressed signal and calls the _onMousePressed()
     * callback.
     */
    onMousePressed()
    {
        this.pandoraObject.emitSignal("mousePressed");
        this.pandoraObject._onMousePressed();
    }

    /**
     * Called once every time a mouse button in pressed twice over this UIObject.
     * Connected to the doubleClicked event from this UIObject's p5.Element.
     * Serves as an emiter to the doubleClicked signal and calls the _onDoubleClicked()
     * callback.
     */
    onDoubleClicked()
    {
        this.pandoraObject.emitSignal("doubleClicked");
        this.pandoraObject._onDoubleClicked();
    }

    /**
     * Called once every time a mouse wheel is scrolled over this UIObject.
     * Connected to the mouseWheel event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseWheel signal and calls the _onMouseWheel()
     * callback.
     * 
     * @param {Object} event    contains data about the wheen scroll, with the deltaY
     *                          and deltaX property, containing data about the vertical
     *                          and horizontal scrolling, repsctively.
     */
    onMouseWheel(event)
    {
        this.pandoraObject.emitSignal("mouseWheel", event);
        this.pandoraObject._onMouseWheel(event);
    }

    /**
     * Called once every time a mouse button is released over this UIObject.
     * Connected to the mouseReleased event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseReleased signal and calls the _onMouseReleased()
     * callback.
     */
    onMouseReleased()
    {
        this.pandoraObject.emitSignal("mouseReleased");
        this.pandoraObject._onMouseReleased();
    }

    /**
     * Called once every time a mouse button is pressed and released over this UIObject.
     * Connected to the mouseClicked event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseClicked signal and calls the _onMouseClicked()
     * callback.
     */
    onMouseClicked()
    {
        this.pandoraObject.emitSignal("mouseClicked");
        this.pandoraObject._onMouseClicked();
    }

    /**
     * Called once everty time a mouse moves over this UIObject.
     * Connected to the mouseMoved event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseMoved signal and calls the _onMouseMoved()
     * callback.
     */
    onMouseMoved()
    {
        this.pandoraObject.emitSignal("mouseMoved");
        this.pandoraObject._onMouseMoved();
    }

    /**
     * Called once every time a mouse moves onto this UIObject.
     * Connected to the mouseOver event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseOver signal and calls the _onMouseOver()
     * callback.
     */
    onMouseOver()
    {
        this.pandoraObject.emitSignal("mouseOver");
        this.pandoraObject._onMouseOver();
    }

    /**
     * Called once every time a mouse moves off the UIObject.
     * Connected to the mouseOut event from this UIObject's p5.Element.
     * Serves as an emiter to the mouseOut signal and calls the _onMouseOut()
     * callback.
     */
    onMouseOut()
    {
        this.pandoraObject.emitSignal("mouseOut");
        this.pandoraObject._onMouseOut();
    }

    /**
     * Called once every time a touch is registered over this UIObject.
     * Connected to the touchStarted event from this UIObject's p5.Element.
     * Serves as an emiter to the touchStarted signal and calls the _onTouchStarted()
     * callback.
     */
    onTouchStarted()
    {
        this.pandoraObject.emitSignal("touchStarted");
        this.pandoraObject._onTouchStarted();
    }

    /**
     * Called once every time a touch move is registered over this UIObject.
     * Connected to the touchMoved event from this UIObject's p5.Element.
     * Serves as an emiter to the touchMoved signal and calls the _onTouchMoved()
     * callback.
     */
    onTouchMoved()
    {
        this.pandoraObject.emitSignal("touchMoved");
        this.pandoraObject._onTouchMoved();
    }

    /**
     * Called once every time a touch is registered over this UIObject.
     * Connected to the touchEnded event from this UIObject's p5.Element.
     * Serves as an emiter to the touchEnded signal and calls the _onTouchEnded()
     * callback.
     */
    onTouchEnded()
    {
        this.pandoraObject.emitSignal("touchEnded");
        this.pandoraObject._onTouchEnded();
    }

    /**
     * Called once every time a file is dragged over this UIObject's area.
     * Connected to the dragOver event from this UIObject's p5.Element.
     * Serves as an emiter to the dragOver signal and calls the _onDragOver()
     * callback.
     */
    onDragOver()
    {
        this.pandoraObject.emitSignal("dragOver");
        this.pandoraObject._onDragOver();
    }

    /**
     * Called once every time a dragged file leaves tis UIObject's area.
     * Connected to the dragLeave event from this UIObject's p5.Element.
     * Serves as an emiter to the dragLeave signal and calls the _onDragLeave()
     * callback.
     */
    onDragLeave()
    {
        this.pandoraObject.emitSignal("dragLeave");
        this.pandoraObject._onDragLeave();
    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse button is pressed over this UIObject.
     * 
     * @callback
     */
    _onMousePressed()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse button in pressed twice over this UIObject.
     * 
     * @callback
     */
    _onDoubleClicked()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse wheel is scrolled over this UIObject.
     * 
     * @callback
     * 
     * @param {Object} event    contains data about the wheen scroll, with the deltaY
     *                          and deltaX property, containing data about the vertical
     *                          and horizontal scrolling, repsctively.
     */
    _onMouseWheel(event)
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse button is released over this UIObject.
     * 
     * @callback
     */
    _onMouseReleased()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse button is pressed and released over this UIObject.
     * 
     * @callback
     */
    _onMouseClicked()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once everty time a mouse moves over this UIObject.
     * 
     * @callback
     */
    _onMouseMoved()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse moves onto this UIObject.
     * 
     * @callback
     */
    _onMouseOver()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a mouse moves off the UIObject.
     * 
     * @callback
     */
    _onMouseOut()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a touch is registered over this UIObject.
     * 
     * @callback
     */
    _onTouchStarted()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a touch move is registered over this UIObject.
     * 
     * @callback
     */
    _onTouchMoved()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a touch is registered over this UIObject.
     * 
     * @callback
     */
    _onTouchEnded()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a file is dragged over this UIObject's area.
     * 
     * @callback
     */
    _onDragOver()
    {

    }

    /**
     * ! This function should be overriden, it provides no default functionality.
     * Called once every time a dragged file leaves tis UIObject's area.
     * 
     * @callback
     */
    _onDragLeave()
    {

    }
}