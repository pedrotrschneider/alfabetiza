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

class UIObject extends GameObject
{
    constructor(name)
    {
        super(name);

        this.P5Element = null;
        this.visible = true;
        this.position = new Vector2(0, 0);
        this.size = new Vector2(300, 100);
        this.fontSize = STYLE.DEFAULT_FONT_SIZE;
    }

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

    // Setters
    setPosition(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

    setSize(w, h)
    {
        this.size.x = w;
        this.size.y = h;
    }

    setFontSize(fs)
    {
        this.fontSize = fs;
    }

    setVisibility(vis)
    {
        if (vis) this.P5Element.show();
        else this.P5Element.hide();
        this.visible = !this.visible;
    }

    setValue(val)
    {
        this.P5Element.value(val)
    }

    setStyle(style)
    {
        for (const [key, value] of Object.entries(style))
        {
            this.P5Element.style(`${key}`, value);
        }
    }

    // Getters
    getPosition()
    {
        return this.position;
    }

    getSize()
    {
        return this.size;
    }

    getFontSize()
    {
        return this.fontSize;
    }

    getVisibility()
    {
        return this.visible;
    }

    getValue()
    {
        return this.P5Element.value();
    }

    // Methods
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

    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        child.P5Element.parent(this.P5Element);
    }

    destroy()
    {
        for (let i = 0; i < this.children.length; i++)
            this.children[i].destroy();

        if (this.P5Element)
            this.P5Element.remove();

        for (var prop in this)
            this[prop] = null;
    }

    // Callbacks


    _onMousePressed()
    {

    }

    _onDoubleClicked()
    {

    }

    _onMouseWheel()
    {

    }

    _onMouseReleased()
    {

    }

    _onMouseClicked()
    {

    }

    _onMouseMoved()
    {

    }

    _onMouseOver()
    {

    }

    _onMouseOut()
    {

    }

    _onTouchStarted()
    {

    }

    _onTouchMoved()
    {

    }

    _onTouchEnded()
    {

    }

    _onDragOver()
    {

    }

    _onDragLeave()
    {

    }

    // -----------------------------------------------

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

    onMousePressed()
    {
        this.pandoraObject.emitSignal("mousePressed");
        this.pandoraObject._onMousePressed();
    }

    onDoubleClicked()
    {
        this.pandoraObject.emitSignal("doubleClicked");
        this.pandoraObject._onDoubleClicked();
    }

    onMouseWheel()
    {
        this.pandoraObject.emitSignal("mouseWheel");
        this.pandoraObject._onMouseWheel();
    }

    onMouseReleased()
    {
        this.pandoraObject.emitSignal("mouseReleased");
        this.pandoraObject._onMouseReleased();
    }

    onMouseClicked()
    {
        this.pandoraObject.emitSignal("mouseClicked");
        this.pandoraObject._onMouseClicked();
    }

    onMouseMoved()
    {
        this.pandoraObject.emitSignal("mouseMoved");
        this.pandoraObject._onMouseMoved();
    }

    onMouseOver()
    {
        this.pandoraObject.emitSignal("mouseOver");
        this.pandoraObject._onMouseOver();
    }

    onMouseOut()
    {
        this.pandoraObject.emitSignal("mouseOut");
        this.pandoraObject._onMouseOut();
    }

    onTouchStarted()
    {
        this.pandoraObject.emitSignal("touchStarted");
        this.pandoraObject._onTouchStarted();
    }

    onTouchMoved()
    {
        this.pandoraObject.emitSignal("touchMoved");
        this.pandoraObject._onTouchMoved();
    }

    onTouchEnded()
    {
        this.pandoraObject.emitSignal("touchEnded");
        this.pandoraObject._onTouchEnded();
    }

    onDragOver()
    {
        this.pandoraObject.emitSignal("dragOver");
        this.pandoraObject._onDragOver();
    }

    onDragLeave()
    {
        this.pandoraObject.emitSignal("dragLeave");
        this.pandoraObject._onDragLeave();
    }
}