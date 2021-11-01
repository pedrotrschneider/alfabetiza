class Input extends UIObject
{
    constructor(name, value = "", type = "text")
    {
        super(name);

        this.P5Element = createInput(value, type);
        this.setPosition(0, 0);
        this.setStyle(DEFAULT_STYLE);

        this.connectCallbacks();
        this.P5Element.input(this.onInput);
    }

    _onInput()
    {

    }

    onInput()
    {
        this.pandoraObject._onInput();
    }
}