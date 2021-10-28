class Button extends UIObject
{
    constructor(name, label = "Button")
    {
        super(name);

        this.P5Element = createButton();
        this.label = label;
        this.P5Element.html(label);
        this.P5Element.position(0, 0);
        

        this.connectCallbacks();
    }

    setLabel(label)
    {
        this.label = label;
        this.P5Element.html(label);
    }
}