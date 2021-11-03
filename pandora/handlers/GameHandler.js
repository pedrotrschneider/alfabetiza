/************************************************************************
 * GameHandler.js
 ************************************************************************
 * Copyright (c) 2021 Pedro Tonini Rosenberg Schneider.
 *
 * This file is part of Pandora.
 *
 * Pandora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pandora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *     
 * You should have received a copy of the GNU General Public License     
 * along with Pandora.  If not, see <https://www.gnu.org/licenses/>.
 *************************************************************************/

const GameHandler = {
    nextId: 0,
    rootObjects: [],

    renderMode: null,

    bDrawDebugFPS: false,
    debugFpsLabel: null,

    prevMillis: 0,
    delta: 0,

    setRenderMode: function(mode)
    {
        this.renderMode = mode;
    },

    drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
    },

    init: function(fps = 60)
    {
        if (!this.renderMode) this.renderMode = RENDER_MODES.P2D;
        switch (this.renderMode)
        {
            case RENDER_MODES.P2D:
                createCanvas(windowWidth, windowHeight);
                break;
            case RENDER_MODES.WEBGL:
                createCanvas(windowWidth, windowHeight, WEBGL);
                break;

        }
        frameRate(fps);
        smooth();

        if (this.bDrawDebugFPS)
            this.debugFpsLabel = new Label(`FPS: ${frameRate()}`)
    },

    instanceGameObject: function(obj)
    {
        obj.id = this.nextId;
        this.nextId++;
    },

    addRootObject: function(obj)
    {
        this.rootObjects.push(obj);
        obj.setup();
    },

    update: function()
    {
        if (this.bDrawDebugFPS) this.debugFpsLabel.setText(`FPS: ${frameRate()}`)
        this.delta = (millis() - this.prevMillis) / 1000;
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(this.delta);
    },

    draw: function()
    {
        if (this.renderMode == RENDER_MODES.WEBGL)
            translate(-windowWidth / 2, -windowHeight / 2);

        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(this.delta);
        this.prevMillis = millis();
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}