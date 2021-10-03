const { register } = w96.app;
const { Theme } = w96.ui;

const releaseInfo = {
            "version": "1.0-alpha1",
            "date": "03/10/2021",
            "repo": "https://github.com/Driftini/windowpainter",
            "path": "c:/local/wpaint"
        }

class WindowPainterApplication extends WApplication {
    constructor() {
        super();
    }

    async main(argv) {
        super.main(argv);

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

        const wnd_main = this.createWindow({
            title: "WindowPainter",
            icon: Theme.getIconUrl("exec", "small"),
            initialWidth: 450,
            initialHeight: 188,
            body: await FS.readstr(`${releaseInfo.path}/wnd_main.html`),
            bodyClass: "windowpainter-app",
            center: true,
            taskbar: true,
            resizable: false,
            controlBoxStyle: "WS_CBX_MINCLOSE"
        }, true);

        const body = wnd_main.getBodyContainer();

        function generateTheme() {
            const css = `
                .titlebar {
                    background: linear-gradient(${body.querySelector(".tb-activedegrees").value}deg, ${body.querySelector(".cl-activeleft").value} 0, ${body.querySelector(".cl-activeright").value} 100%);
                }

                .titlebar-title-disabled {
                    background: linear-gradient(${body.querySelector(".tb-inactivedegrees").value}deg, ${body.querySelector(".cl-inactiveleft").value} 0, ${body.querySelector(".cl-inactiveright").value} 100%);
                }
            `
            return css;
        };

        body.querySelector(".w96-button.apply").addEventListener("click", ()=>w96.ui.Theme.cssa(generateTheme()));


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
                label: "Report an issue",
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

        wnd_main.show();
    }
}

const appStyle = URL.createObjectURL(await FS.toBlob(`${releaseInfo.path}/wpaint.css`));
await w96.sys.loader.loadStyleAsync(appStyle);
URL.revokeObjectURL(appStyle);

register({
    command: "wpaint",
    type: "gui",
    cls: WindowPainterApplication,
    meta: {
        icon: Theme.getIconUrl("exec"),
        friendlyName: "WindowPainter"
    }
});
