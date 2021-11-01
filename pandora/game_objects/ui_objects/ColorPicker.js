class ColorPicker extends UIObject
{
    constructor(name, color = "#FFFFFF")
    {
        super(name);

        this.P5Element = createColorPicker(color);
        this.setPosition(0, 0);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
    }

    getColor()
    {
        return this.P5Element.color();
    }
}