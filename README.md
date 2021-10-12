# WindowPainter
An app for https://windows96.net to easily change the colors of the default theme.

## Installation
> **NOTE:** This app is still unfinished.
> It is a good idea to make a backup of your Windows96 installation before installing WindowPainter in its current state to avoid possible data loss, even though it would obviously be unintended and very unlikely.

### Automatic (recommended)
The quick installation script automatically pulls the latest (unstable) version of WindowPainter from the repository.

Simply open your browser's developer tools console (usually accessible by pressing F12, Ctrl+I, Ctrl+Shift+I...) in Windows96 and run the following command.
Do **NOT** place it in `c:/system/boot/apps`, as it will make Windows96 unable to boot.

```js
w96.WRT.run(await w96.sys.loader.loadTextAsync("https://raw.githubusercontent.com/Driftini/windowpainter/master/src/quickinstall.js", false));
```

A shortcut will be created in Start Menu > Other and in the desktop.

If you don't trust me, you're free to read the contents of `src/quickinstall.js` for yourself to verify that there's no malicious code in it.

### Mobile users
If you are a mobile user and/or do not have access to your browser's developer tools, save the installation script as a `.js` file in Windows96, then use the Terminal to run it with the `wjs` command. Example:

```
wjs c:/user/desktop/quickinstall.js
```

### Manual
First of all, download `src/wnd_main.html` and `src/wpaint.css` and upload both to `C:/local/wpaint` in Windows96.
Next, download `src/wpaint.js` and upload it to `C:/system/boot/apps`, then reload Windows96.

No shortcuts will be created automatically: you have to run WindowPainter as `wpaint` from either the Terminal or the Run prompt.

## Help WindowPainter improve!
Find a bug of any kind in WindowPainter? Don't hesitate to file an issue! Reporting bugs allows me to improve the experience for future users and the overall quality of the application. Please make sure to add as much information as possible in your bug reports, especially what pops up in your browser's developer tools console.

## Contact me
If for any reason you feel like discussing anything regarding WindowPainter with me, the easiest choice would be joining the Windows96 official Discord server at **https://discord.gg/KCTaM75** and talking to me there. You can also find several other community-made apps there!

## Roadmap
Current version: **1.0-alpha2**

### WindowPainter pre-1.x
- [x] WindowPainter 1.0-alpha1
    - [x] Basic GUI
- [x] WindowPainter 1.0-alpha2
    - [x] Separated JS, CSS & HTML
    - [x] Titlebar color editing
    - [x] New/Open/Save
- [ ] WindowPainter 1.0-beta1
    - [ ] GUI Redesign #1 (Tabbed view)
    - [ ] Themes don't get _fully_ replaced by the config
    - [ ] Load config on boot

### WindowPainter 1.x
- [ ] **WindowPainter 1.0**
    - [x] Titlebar color editing
    - [x] New/Open/Save
    - [ ] GUI Redesign #1 (Tabbed view)
    - [ ] Load config on boot
    - [ ] Config preview
- [ ] **WindowPainter 1.1**
    - [ ] Individual window styling
    - [ ] Start Menu gradient editing
    - [ ] Background color editing
    - [ ] Example configs
- [ ] **WindowPainter 1.2**
    - [ ] Config switcher
