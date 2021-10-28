class UIObject extends GameObject
{
    constructor(name)
    {
        super(name);

        this.P5Element = null;
        this.visible = true;
    }

    connectCallbacks()
    {
        this.P5Element.mousePressed(this._onMousePressed);
        this.P5Element.doubleClicked(this._onDoubleClicked);
        this.P5Element.mouseWheel(this._onMouseWheel);
        this.P5Element.mouseReleased(this._onMouseReleased);
        this.P5Element.mouseClicked(this._onMouseClicked);
        this.P5Element.mouseMoved(this._onMouseMoved);
        this.P5Element.mouseOver(this._onMouseOver);
        this.P5Element.mouseOut(this._onMouseOut);
        this.P5Element.touchStarted(this._onTouchStarted);
        this.P5Element.touchMoved(this._onTouchMoved);
        this.P5Element.touchEnded(this._onTouchEnded);
        this.P5Element.dragOver(this._onDragOver);
        this.P5Element.dragLeave(this._onDragLeave);
    }

    // Setters
    setPosition(x, y)
    {
        this.P5Element.position(x, y);
    }

    setSize(w, h)
    {
        this.P5Element.size(w, h);
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
        return this.P5Element.position();
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
    toggleVisibility()
    {
        this.setVisibility(!this.visible);
    }

    addChild(child)
    {
        child.parent = this;
        child.parented = true;
        this.children.push(child);

        child.P5Element.parent(this.P5Element);
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
}