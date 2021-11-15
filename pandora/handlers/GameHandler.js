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

/**
 * This {@code GameHandler} singleton provides an interface for the user
 * to manipulate various parameters of the game, instance objects, and more.
 * 
 * @author Pedro Schneider
 * 
 * @namespace
 */
const GameHandler = {
    nextId: 0, // ID to be given to the next object added to the tree.
    rootObjects: [], // List of objects on the root of the tree.

    renderMode: 1, // Can be RENDER_MODES.P2D or RENDER_MODES.WEBGL.

    bDrawDebugFPS: false, // Should fps be drawn (for debug only).
    debugFpsLabel: null, // Object that drwas fps.
    bDrawDebugBufferBounds: false, // Should the secondary buffer's bounds be drawn?

    prevMillis: 0, // Milliseconds ellapsed since the begining of the application.
    delta: 0, // Milliseconds ellapsed since the last frame.

    db: null, // Object to hold the secondary buffer.
    dbWidth: 1920, // Width of the secondary buffer.
    dbHeight: 1080, // Height of the secondary buffer.

    isMobile: null, // True if the device is a mobile device (tablet of phone).
    pixelDen: 1, // Pixel density for the canvas on destop devices.
    pixelDenMobile: 2, // Pixel denisty for the canvas on mobile devices.

    mouseX: 0, // X position of the mouse relative to the secondary buffer.
    mouseY: 0, // Y position of the mouse relative to the secondary buffer.

    /**
     * Sets the initial game render mode.
     * 
     * @param {RENDER_MODES} mode   RENDER_MODES.P2D for default P5Js render or 
     *                              RENDER_MODES.WEBGL for webgl (not recomended for mobile).
     */
    setRenderMode: function(mode)
    {
        this.renderMode = mode;
    },

    /**
     * Sets the width and height in pixels to initialize the secondary buffer.
     * 
     * @param {number} w    width in pixels to initialize the secondary buffer.
     * @param {number} h    height in pixels to initialize the secondary buffer.
     */
    setDoubleBufferSize: function(w, h)
    {
        this.dbWidth = w;
        this.dbHeight = h;
    },

    /**
     * Sets the pixel density for the canvas to be initialized with on desktop
     * devices.
     * 
     * @param {number} val  pixel density for the canvas on desktop devices.
     */
    setPixelDensity: function(val)
    {
        this.pixelDen = val;
    },

    /**
     * Sets the pixel density for the canvas to be initialized with on desktop
     * devices.
     * 
     * @param {number} val  pixel density for the canvas on desktop devices.
     */
    setPixelDensityMobile: function(val)
    {
        this.pixelDenMobile = val;
    },

    /**
     * Sets the flag to draw the debug fps.
     * 
     * @param {boolean} val true if debug fps should be drawn, false if not.
     */
    drawDebugFPS(val)
    {
        this.bDrawDebugFPS = val;
    },

    /**
     * Sets the flag to draw secondary buffer bounds.
     * 
     * @param {boolean} val true if debug secondary buffer bounds should be drawn, false if not. 
     */
    drawDebugBufferBounds(val)
    {
        this.bDrawDebugBufferBounds = val;
    },

    /**
     * Initializes the game, creating the canvas, secondary buffer, and creates the
     * debug fps label if necessary.
     * 
     * @param {number} fps  target fps for the game (default if 60).
     */
    init: function(fps = 60)
    {
        // Sets the mobile flag.
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Creates the main canvas and the secondary buffer with the specified size and render mode.
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

        // Sets framerate and pixel density accordingly.
        frameRate(fps);
        if (this.isMobile)
            pixelDensity(this.pixelDenMobile);
        else
            pixelDensity(this.pixelDen);
        smooth();

        // Translates the canvas to the middle if render mode is webgl to maintain
        // consistency on the coordinate system.
        if (this.renderMode == RENDER_MODES.WEBGL)
        {
            translate(-windowWidth / 2, -windowHeight / 2);
            db.translate(-this.dbWidth / 2, -this.dbHeight / 2);
        }

        // Creates the debug fps label.
        if (this.bDrawDebugFPS)
        {
            this.debugFpsLabel = new Label("debugFps", `FPS: ${frameRate()}`);
            this.addRootObject(this.debugFpsLabel);
        }
    },

    /**
     * Instances a GameObject, meaning to give it an ID. This function is only called on the
     * constructor of GameObject, and probably shouldn't be used for anything else.
     * 
     * @param {GameObject} obj  GameObject to be instanced. 
     */
    instanceGameObject: function(obj)
    {
        obj.id = this.nextId;
        this.nextId++;
    },

    /**
     * Adds a GameObject to the root of the tree. There should be as little root objects as possible.
     * 
     * @param {GameObject} obj  GameObject to be added as a root of the tree. 
     */
    addRootObject: function(obj)
    {
        this.rootObjects.push(obj);
        obj.isRoot = true;
        obj.setup();
    },

    /**
     * Removes a GameObject from the root of the tree. This function is called automatically when a root object
     * is freed from memory, and probably shoudn't be used for anything else. DOES NOT DELETE THE OBJECT, ONLY
     * REMOVES IT FROM THE TREE.
     * 
     * @param {number} id   object id of the GameObject that should be removed from the tree.
     */
    removeRootObjectById: function(id)
    {
        for (let i = 0; i < this.rootObjects.length; i++)
        {
            if (this.rootObjects[i].id == id)
                this.rootObjects.splice(i, 1);
        }
    },

    upframecount: 0, // Frame count to be displayed.
    upframenum: 20, // Delay in frames to update the frame count.
    /**
     * Updates all of the GameObjects on the tree.
     */
    update: function()
    {
        // Updates the debug fps label if it existis.
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

        // Updates the delta.
        this.delta = (millis() - this.prevMillis) / 1000;

        let ar = this.db.screenWidth / this.db.width;
        let offsetx = (windowWidth - this.db.screenWidth) / 2;
        let offsety = (windowHeight - this.db.screenHeight) / 2;
        this.mouseX = (mouseX - offsetx) / ar;
        this.mouseY = (mouseY - offsety) / ar;

        // Updates all game objects on the tree.
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].update(this.delta);
    },

    /**
     * Draws all of the GameObjects on the tree.
     */
    draw: function()
    {
        // Clear the secondary buffer.
        this.db.clear();

        if (this.bDrawDebugBufferBounds)
        {
            // Draw a rectangle to visualize the secondary buffer.
            this.db.push();
            this.db.strokeWeight(5);
            this.db.noFill();
            this.db.rect(0, 0, this.dbWidth, this.dbHeight);
            this.db.pop();
        }

        // Centers the image and calculates the dimensions of the secondary
        // buffer to best fit the size of the window.
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

        // Draw all game objects.
        for (let i = 0; i < this.rootObjects.length; i++)
            this.rootObjects[i].draw(this.delta, this.db);

        // Draws the secondary buffer to the main canvas.
        image(this.db, windowWidth / 2, windowHeight / 2, this.db.screenWidth, this.db.screenHeight);

        // Updates the delta
        this.prevMillis = millis();
    }
}

/**
 * This function is called once every time the browser window is resized. Here, its used to make the game
 * always ocupy the entire browser window.
 * 
 * @callback
 */
function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}