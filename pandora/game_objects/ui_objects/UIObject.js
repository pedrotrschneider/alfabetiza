class UIObject extends GameObject {
    constructor(name) {
        super(name);

        this.position = Vector2.ZERO();
        this.size = Vector2(100, 100);
    }
}