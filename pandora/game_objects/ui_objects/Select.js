class Select extends UIObject
{
    constructor(name)
    {
        super(name);

        this.P5Element = createSelect();
        this.setPosition(0, 0);
        this.setSize(100, 20);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.changed(this.onChanged);
    }

    // Setters
    setSelected(value)
    {
        this.P5Element.selected(value);
    }

    // Getters
    getSelected()
    {
        return this.P5Element.selected();
    }

    // Methods
    addOption(value)
    {
        this.P5Element.option(value);
    }

    // TODO confirm if disable methods really dont exist or if
    // something is fucky wooky.

    // disableAll()
    // {
    //     this.P5Element.disable();
    // }

    // disableOption(value)
    // {
    //     this.P5Element.disable(value);
    // }

    // Callbacks
    _onChanged()
    {

    }

    onChanged()
    {
        this.pandoraObject._onChanged();
    }
}