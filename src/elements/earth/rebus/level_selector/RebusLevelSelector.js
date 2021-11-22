/************************************************************************
 * RebusLevelSelector.js
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

class RebusLevelSelector extends Object2D
{
    /** @type {Object} */
    gridMargins = {
        left: 0,
        right: 0,
        up: 500,
        down: 0
    };

    /** @type {number} */
    gridCols = 5;

    _setup()
    {
        var b = new RebusLevelButton("Tutorial");
        b.levelData = REBUS_LEVELS.tutorial;
        b.setLabel("Tutorial");
        b.setFontSize(40);
        this.addChild(b);
        b.setSize(200, 100);
        b.setPosition((1920 - b.getSize().x) / 2, 300);
        b.connect("levelSelected", this, "_onTutorialSelected");

        var i = 1;
        while (REBUS_LEVELS[`level${i}`])
        {
            var b = new RebusLevelButton(`level${i}`);
            b.levelData = REBUS_LEVELS[`level${i}`];
            b.setLabel(`${i}`);
            b.setFontSize(40);
            this.addChild(b);
            b.setSize(100, 100);
            b.setPosition((((i - 1) % this.gridCols) + 1) * 1920 / (this.gridCols + 1) - b.getSize().x / 2, this.gridMargins.up + 200 * int((i - 1) / this.gridCols));
            b.connect("levelSelected", this, "_onLevelSelected");
            i++;
        }

        this.backButton = new Button("BackButton");
        this.backButton.setLabel("Voltar");
        this.backButton.setFontSize(30);
        this.backButton.setPosition(20, 20);
        this.backButton.setSize(110, 75);
        this.backButton.connect("mouseClicked", this, "_onBackClicked");
        this.addChild(this.backButton);
    }

    _draw( /** @type {number} */ delta, /** @type {p5.Graphics} */ db)
    {
        background(52);

        db.textAlign(CENTER, CENTER);
        db.fill(255);
        db.textSize(100);
        db.text("RÉBUS", 1920 / 2, 125);
        db.textSize(40);
        db.text("Escolha o nível", 1920 / 2, 200);
    }

    _onTutorialSelected( /** @type {Object} */ levelData)
    {
        var rg = new RebusTutorial("RebusTutorial");
        rg.levelData = levelData;
        GameHandler.addRootObject(rg);
        this.queueFree();
    }

    _onLevelSelected( /** @type {Object} */ levelData)
    {
        var rg = new RebusGame("RebusGame");
        rg.levelData = levelData;
        GameHandler.addRootObject(rg);
        this.queueFree();
    }

    _onBackClicked()
    {
        var ems = new EarthMinigameSelector("EarthMinigameSelector");
        GameHandler.addRootObject(ems);
        this.queueFree();
    }
}