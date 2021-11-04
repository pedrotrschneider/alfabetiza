class Signal
{
    constructor(name)
    {
        this.name = name;
        this.targets = [];
        this.callbacks = [];
    }
}