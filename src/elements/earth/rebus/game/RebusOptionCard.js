/************************************************************************
 * RebusOptionCard.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Alfabetiza.
 *
 * Alfabetiza is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfabetiza is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Alfabetiza.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

class RebusOptionCard extends Object2D
{
    thumb = null;
    imgName = "";
    isAnswer = false;
    selected = false;
    selectable = true;

    fillColor = new Color(200, 200, 200);
    mouseOver = false;
    mousePress = false;

    tweenStarted = false;
    tween = null;
    timer = null;

    _initSignals()
    {
        this.addSignal("selected");
    }

    _setup()
    {
        var sprite = new Sprite2D("sprite", this.thumb);
        sprite.width = 250;
        sprite.height = 250;
        sprite.setPosition(0, -75);
        this.addChild(sprite);

        var area = new Area2D("area", SHAPES.RECT, new Rect(300, 400), true);
        area.connect("mouseEntered", this, "_onMouseEntered");
        area.connect("mouseExited", this, "_onMouseExited");
        this.addChild(area);

        this.addChild(new RebusCardVisualEffect("CardVfx"));

        this.tween = new Tween("Tween");
        this.tween.interpolateProperty(this, "scale", PROPERTY_TYPE.VECTOR2, Vector2.ZERO(), Vector2.ONE(), 1, TRANS_TYPE.ELASTIC, EASE_TYPE.OUT);
        this.addChild(this.tween);

        this.timer = new Timer("Timer", 1, false, true);
        this.timer.connect("timeout", this, "_onTimerTimeout");
        this.addChild(this.timer);
    }

    _update(delta)
    {
        if (this.visible && !this.tweenStarted)
        {
            this.timer.start();
            this.tween.startAll();
            this.tweenStarted = true;
        }

        if (this.selectable && this.mouseOver)
        {
            if (InputHandler.mouseIsClicked)
            {
                this.selected = true;
                this.selectable = false;
                this.emitSignal("selected", this.isAnswer);
            }

            if (InputHandler.mouseIsPressed)
            {
                this.scale.x = max(this.scale.x - 3.0 * delta, 0.95);
                this.scale.y = max(this.scale.y - 3.0 * delta, 0.95);
            }
            else
            {
                this.scale.x = min(this.scale.x + 2.0 * delta, 1.1);
                this.scale.y = min(this.scale.y + 2.0 * delta, 1.1);
            }
        }

        else
        {
            this.scale.x = max(this.scale.x - 2.0 * delta, 1);
            this.scale.y = max(this.scale.y - 2.0 * delta, 1);
        }
    }

    _draw(delta, db)
    {
        db.rectMode(CENTER);
        db.fill(this.fillColor.getP5Color());
        db.rect(0, 0, 300, 400, 10, 10);
        db.textAlign(CENTER, CENTER);
        db.fill(0);
        db.textSize(40);
        db.text(this.imgName, 0, 100);

        if (this.selected && !this.isAnswer)
        {
            db.fill(0, 80);
            db.rect(0, 0, 300, 400, 10, 10);
        }
    }

    _onMouseEntered()
    {
        this.mouseOver = true;
    }

    _onMouseExited()
    {
        this.mouseOver = false;
    }

    _onTimerTimeout()
    {
        this.tween.stopAll();
    }
}