class CheckBox extends UIObject
{
    constructor(name, label = "checkbox", val = false)
    {
        super(name);

        this.label = label;
        this.P5Element = createCheckbox(label, val);
        this.P5Element.position(0, 0);

        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.changed(this.onChanged);
    }

    setLabel(label)
    {
        this.label = label;
        this.P5Element.html(label);
    }

    _onChanged()
    {
        console.log(this.P5Element.checked());
    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}