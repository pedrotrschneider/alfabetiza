class Label extends UIObject
{
    constructor(name, text = "Label")
    {
        super(name);
        this.text = text;
        this.P5Element = createDiv(text);
        this.P5Element.position(0, 0);

        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
    }

    setText(t)
    {
        this.P5Element.html(t);
        this.text = t;
    }
}