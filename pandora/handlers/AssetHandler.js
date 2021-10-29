class AssetHandler
{
    static cachedTextures = [];

    static loadTexture(name, link)
    {
        let textRes = new TextureRes(name, null);
        this.cachedTextures.push(textRes);
        loadImage(link, img =>
        {
            textRes.P5Image = img;
        });
    }

    static getTextureByName(name)
    {
        for (let i = 0; i < this.cachedTextures.length; i++)
        {
            if (this.cachedTextures[i].name == name)
            {
                return this.cachedTextures[i];
            }
        }
        return null;
    }

    static getP5ImageByName(name)
    {
        for (let i = 0; i < this.cachedTextures.length; i++)
        {
            if (this.cachedTextures[i].name == name)
            {
                return this.cachedTextures[i].P5Image;
            }
        }
        return null;
    }

    static cachedAudio = [];

    static loadAudio(name, link)
    {
        let audio = createAudio(link);
        this.cachedAudio.push(new AudioRes(name, audio));
    }

    static getAudioByName(name)
    {
        for (let i = 0; i < this.cachedAudio.length; i++)
        {
            if (this.cachedAudio[i].name == name)
            {
                return this.cachedAudio[i];
            }
        }
        return null;
    }

    static getP5AudioByName(name)
    {
        for (let i = 0; i < this.cachedAudio.length; i++)
        {
            if (this.cachedAudio[i].name == name)
            {
                return this.cachedAudio[i].P5Audio;
            }
        }
        return null;
    }

    static cachedFonts = [];
    
    static loadFont(name, link)
    {
        let fontRes = new FontRes(name, null);
        this.cachedFonts.push(fontRes);
        loadFont(link, font =>
        {
            fontRes.P5Font = font;
        })
    }

    static getFontByName(name)
    {
        for (let i = 0; i < this.cachedFonts.length; i++)
        {
            if (this.cachedFonts[i].name == name)
            {
                return this.cachedFonts[i];
            }
        }
        return null;
    }

    static getP5FontByName(name)
    {
        for (let i = 0; i < this.cachedFonts.length; i++)
        {
            if (this.cachedFonts[i].name == name)
            {
                return this.cachedFonts[i].P5Font;
            }
        }
        return null;
    }
}