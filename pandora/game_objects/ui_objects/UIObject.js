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
    // NOTE all callbacks change the scope to the P5 element
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

    onMousePressed()
    {
        this.pandoraObject._onMousePressed();
    }

    onDoubleClicked()
    {
        this.pandoraObject._onDoubleClicked();
    }

    onMouseWheel()
    {
        this.pandoraObject._onMouseWheel();
    }

    onMouseReleased()
    {
        this.pandoraObject._onMouseReleased();
    }

    onMouseClicked()
    {
        this.pandoraObject._onMouseClicked();
    }

    onMouseMoved()
    {
        this.pandoraObject._onMouseMoved();
    }

    onMouseOver()
    {
        this.pandoraObject._onMouseOver();
    }

    onMouseOut()
    {
        this.pandoraObject._onMouseOut();
    }

    onTouchStarted()
    {
        this.pandoraObject._onTouchStarted();
    }

    onTouchMoved()
    {
        this.pandoraObject._onTouchMoved();
    }

    onTouchEnded()
    {
        this.pandoraObject._onTouchEnded();
    }

    onDragOver()
    {
        this.pandoraObject._onDragOver();
    }

    onDragLeave()
    {
        this.pandoraObject._onDragLeave();
    }
}