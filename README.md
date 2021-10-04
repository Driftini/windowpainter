# WindowPainter
An app for https://windows96.net to easily change the colors of the default theme.

## Installation
> **NOTE:** This app is still unfinished.
> It is a good idea to make a backup of your Windows96 installation before installing WindowPainter in its current state to avoid possible data loss, even though it would obviously be unintended and very unlikely.

### Automatic (recommended)
Simply open your browser's developer tools console (usually accessible by pressing F12, Ctrl+I, Ctrl+Shift+I...) and run the following command:

```js
w96.WRT.run(await w96.sys.loader.loadTextAsync("https://raw.githubusercontent.com/Driftini/windowpainter/master/src/quickinstall.js", false));
```

A shortcut will be created in Start Menu > Other.

If you don't trust me, you're free to read the contents of `src/quickinstall.js` for yourself to verify that there's no malicious code in it.

### Manual

First of all, download `src/wnd_main.html` and `src/wpaint.css` and upload both to `C:/local/wpaint` in Windows96.
Next, download `src/wpaint.js` and upload it to `C:/system/boot/apps`, then reload Windows96.

No shortcuts will be created automatically: you have to run WindowPainter as `wpaint` from either the Terminal or the Run prompt.

## Help WindowPainter improve!
Find a bug of any kind in WindowPainter? Don't hesitate to file an issue! Reporting bugs allows me to improve the experience for future users and the overall quality of the application. Please make sure to add as much information as possible in your bug reports, especially what pops up in your browser's developer tools console.

## Contact me
If for any reason you feel like discussing anything regarding WindowPainter with me, the easiest choice would be joining the Windows96 official Discord server at **https://discord.gg/KCTaM75** and talking to me there. You can also find several other community-made apps there!

## Roadmap
Current version: **1.0-alpha1**

- [ ] **WindowPainter 1.0**
    - [x] Basic GUI
    - [x] Titlebar color editing
    - [ ] New/Open/Save
- [ ] **WindowPainter 1.1**
    - [ ] Background color editing
    - [ ] Included presets
- [ ] **WindowPainter 1.2**
    - [ ] GUI redesign
    - [ ] Font editing
    - [ ] Theme preview
