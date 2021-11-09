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

    db: null,
    dbWidth: 1920,
    dbHeight: 1080,

    setRenderMode: function(mode)
    {
        this.renderMode = mode;
    },

    setDoubleBufferSize: function(w, h)
    {
        this.dbWidth = w;
        this.dbHeight = h;
    },

    pixelDen: 1,
    setPixelDensity: function(val)
    {
        this.pixelDen = val;
    },

    pixelDenMobile: 2,
    setPixelDensityMobile: function(val)
    {
        this.pixelDenMobile = val;
    },

    drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
    },

    isMobile: null,
    init: function(fps = 60)
    {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!this.renderMode) this.renderMode = RENDER_MODES.P2D;
        switch (this.renderMode)
        {
            case RENDER_MODES.P2D:
                createCanvas(windowWidth, windowHeight);
                this.db = createGraphics(this.dbWidth, this.dbHeight);
                break;
            case RENDER_MODES.WEBGL:
                createCanvas(windowWidth, windowHeight, WEBGL);
                this.db = createGraphics(this.dbWidth, this.dbHeight, WEBGL);
                this.db.smooth();
                break;

        }

        frameRate(fps);
        if (this.isMobile)
            pixelDensity(this.pixelDenMobile);
        else
            pixelDensity(this.pixelDen);
        smooth();

        if (this.renderMode == RENDER_MODES.WEBGL)
        {
            translate(-windowWidth / 2, -windowHeight / 2);
            db.translate(-this.dbWidth / 2, -this.dbHeight / 2);
        }

        if (this.bDrawDebugFPS)
        {
            this.debugFpsLabel = new Label("debugFps", `FPS: ${frameRate()}`);
            this.addRootObject(this.debugFpsLabel);
        }
    },

    instanceGameObject: function(obj)
    {
        obj.id = this.nextId;
        this.nextId++;
    },

    addRootObject: function(obj)
    {
        this.rootObjects.push(obj);
        obj.isRoot = true;
        obj.setup();
    },

    removeRootObjectById: function(id)
    {
        for (let i = 0; i < this.rootObjects.length; i++)
        {
            if (this.rootObjects[i].id == id)
                this.rootObjects.splice(i, 1);
        }
    },

    upframecount: 0,
    upframenum: 20,
    update: function()
    {
        if (this.bDrawDebugFPS)
        {
            if (frameCount % this.upframenum == 0)
            {
                this.debugFpsLabel.setText(`FPS: ${
                    Math.round(this.upframecount * 1000) / 1000
                }`);
                this.upframecount = 0;
            }
            else
                this.upframecount = max(this.upframecount, frameRate());
        }
        this.delta = (millis() - this.prevMillis) / 1000;
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(this.delta);
    },

    draw: function()
    {
        this.db.clear();
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(this.delta, this.db);

        this.db.push();
        this.db.strokeWeight(5);
        this.db.noFill();
        this.db.rect(0, 0, this.dbWidth, this.dbHeight);
        this.db.pop();

        imageMode(CENTER);
        if (windowWidth / windowHeight < this.dbWidth / this.dbHeight)
        {
            this.db.screenWidth = windowWidth;
            this.db.screenHeight = windowWidth * (this.dbHeight / this.dbWidth);
        }
        else
        {
            this.db.screenHeight = windowHeight;
            this.db.screenWidth = windowHeight * (this.dbWidth / this.dbHeight);
        }

        image(this.db, windowWidth / 2, windowHeight / 2, this.db.screenWidth, this.db.screenHeight);

        this.prevMillis = millis();
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}