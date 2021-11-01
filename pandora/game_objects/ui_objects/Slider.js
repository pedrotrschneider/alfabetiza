class Slider extends UIObject
{
    constructor(name, min = 0, max = 100, value = 0, step = 0)
    {
        super(name);
        this.P5Element = createSlider(min, max, value, step);
        this.setPosition(0, 0);
        this.setSize(200, 25);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.changed(this.onChanged);
    }

    _onChanged()
    {
        console.log(this.getValue());
    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}