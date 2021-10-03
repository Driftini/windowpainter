const { register } = w96.app;
const { Theme } = w96.ui;

class WindowPainterApplication extends WApplication {
    constructor() {
        super();
    }

    async main(argv) {
        super.main(argv);

        const releaseInfo = {
            "version": "1.0-alpha1",
            "date": "03/10/2021",
            "repo": "https://github.com/Driftini/windowpainter"
        }

        function showPlaceHolderWindow() {
                w96.ui.DialogCreator.create({
                title: "",
                body: `
                    placeholder
                    <br>
                    If you see this in anything other than a prerelease, please <a target="_blank" href="${releaseInfo.repo}/issues/new">report the issue</a>.
                `,
                icon: "info"
            });
        };

        const wndMain = this.createWindow({
            title: "WindowPainter",
            icon: Theme.getIconUrl("exec", "small"),
            initialWidth: 450,
            initialHeight: 215,
            body: `
                <div class="appbar"></div>
                <div class="controls">
                    <div class="bold-noaa">This app is only meant to be used with the "classic" themes (98, 2000...).</div>
                    <br>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">
                                    <span class="bold-noaa">Active windows</span>
                                </th>
                                <th colspan="2">
                                    <span class="bold-noaa">Inactive windows</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="color" class="w96-button" value="#FF00FF">
                                </td>
                                <td>
                                    <label>Left color</label>
                                </td>

                                <td>
                                    <input type="color" class="w96-button" value="#700070">
                                </td>
                                <td>
                                    <label>Left color</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="color" class="w96-button" value="#00FFFF">
                                </td>
                                <td>
                                    <label>Right color</label>
                                </td>

                                <td>
                                    <input type="color" class="w96-button" value="#007070">
                                </td>
                                <td>
                                    <label>Right color</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="number" class="w96-textbox" value="90" placeholder="90" min="0" max="360">
                                </td>
                                <td>
                                    <label>Gradient direction (degrees)</label>
                                </td>
                                
                                <td>
                                    <input type="number" class="w96-textbox" value="90" placeholder="90" min="0" max="360">
                                </td>
                                <td>
                                    <label>Gradient direction (degrees)</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <button class="w96-button apply">Apply</button>
                </div>
            `,
            bodyClass: "windowpainter-app",
            center: true,
            taskbar: true,
            resizable: false,
            controlBoxStyle: "WS_CBX_MINCLOSE"
        }, true);

        const body = wndMain.getBodyContainer();

        const appBar = new w96.ui.MenuBar();

        appBar.addRoot("File", [
            {
                type: "normal",
                label: "New (reset colors)",
                onclick: ()=>showPlaceHolderWindow()
            },

            {
                type: "normal",
                label: "Open...",
                onclick: ()=>showPlaceHolderWindow()
            },

            {
                type: "normal",
                label: "Save",
                onclick: ()=>showPlaceHolderWindow()
            },

            {
                type: "normal",
                label: "Save as...",
                onclick: ()=>showPlaceHolderWindow()
            },

            {
                type: "separator"
            },

            {
                type: "normal",
                label: "Exit",
                onclick: ()=>this.terminate()
            }
        ]);

        appBar.addRoot("Help", [
            {
                type: "normal",
                label: "GitHub repository",
                onclick: ()=>window.open(releaseInfo.repo, "_blank")
            },

            {
                type: "normal",
                label: "Report issue",
                onclick: ()=>window.open(`${releaseInfo.repo}/issues/new`, "_blank")
            },

            {
                type: "separator"
            },

            {
                type: "normal",
                label: "About",
                onclick: ()=>w96.ui.DialogCreator.create({
                    title: "About WindowPainter",
                    body: `
                        <span class="bold-noaa">WindowPainter ${releaseInfo.version}</span> (3/10/2021)
                        <br>
                        Developed by <a href="https://github.com/Driftini" target="_blank">Driftini</a>
                    `,
                    icon: "info"
                })
            }
        ]);

        body.querySelector('.appbar').replaceWith(appBar.getMenuDiv());

        wndMain.show();
    }
}

Theme.cssa(`.windowpainter-app *
    {
        box-sizing: border-box;
    }

    .windowpainter-app > .controls
    {
        margin: 5px;
    }

    .windowpainter-app > .controls > table {
        width: calc(100% + -2px)` /* Blurry font rendering fix */ + `
    }

    .windowpainter-app > .buttons
    {
        width: 100%;
        padding: 5px;
    }

    .windowpainter-app .w96-textbox
    {
        width: 64px;
    }

    .windowpainter-app > .buttons > button
    {
        float: right;
        margin-left: 5px;
        height: 23px;
        width: 75px;
    }`);

register({
    command: "wpaint",
    type: "gui",
    cls: WindowPainterApplication,
    meta: {
        icon: Theme.getIconUrl("exec"),
        friendlyName: "WindowPainter"
    }
});
