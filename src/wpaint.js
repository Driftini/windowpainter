const { register } = w96.app;
const { Theme, MenuBar, DialogCreator, OpenFileDialog, SaveFileDialog } = w96.ui;

const releaseInfo = {
    "version": "1.0-alpha1",
    "date": "08/10/2021",
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
            DialogCreator.create({
                title: "",
                body: `
                    placeholder
                    <br>
                    If you see this in anything other than a prerelease, please <a target="_blank" href="${releaseInfo.repo}/issues/new">report the issue</a>.
                `,
                icon: "info"
            });
        };

        // Main Window //

        const wnd_main = this.createWindow({
            title: "WindowPainter",
            icon: Theme.getIconUrl("image2", "small"),
            initialWidth: 450,
            initialHeight: 195,
            body: await FS.readstr(`${releaseInfo.path}/wnd_main.html`),
            bodyClass: "windowpainter-app",
            center: true,
            taskbar: true,
            resizable: false,
            controlBoxStyle: "WS_CBX_MINCLOSE"
        }, true);

        const body = wnd_main.getBodyContainer();

        function generateThemeStyle() {
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

        function generateThemeObject() {
            const obj = {
                "window_active": {
                    "color1": body.querySelector(".cl-activeleft").value,
                    "color2": body.querySelector(".cl-activeright").value,
                    "degrees": body.querySelector(".tb-activedegrees").value
                },
                "window_inactive": {
                    "color1": body.querySelector(".cl-inactiveleft").value,
                    "color2": body.querySelector(".cl-inactiveright").value,
                    "degrees": body.querySelector(".tb-inactivedegrees").value
                }
            };

            return JSON.stringify(obj);
        }

        body.querySelector(".w96-button.apply").addEventListener("click", () => w96.ui.Theme.cssa(generateThemeStyle()));

        const appBar = new w96.ui.MenuBar();

        appBar.addRoot("File", [
            {
                type: "normal",
                label: "New (reset colors)",
                onclick: () => showPlaceHolderWindow()
            },

            {
                type: "normal",
                label: "Open...",
                onclick: () => {
                    const wnd_open = new OpenFileDialog("c:/user", [".json"], async (file) => {
                        if (!file) return;
                        const fileContent = await FS.readstr(file);
                        let themeObject

                        try {
                            themeObject = JSON.parse(fileContent);
                        } catch (err) {
                            DialogCreator.alert(`
                                This is not a valid JSON file.
                                <br>
                                Please retry after fixing the syntax errors.
                                <br>
                                You can find more information in your browser's developer tools console.
                            `, {
                                title: "Error",
                                icon: "error"
                            });
                            console.error(err);
                            return;
                        }

                        if (!themeObject.window_active || !themeObject.window_inactive) {
                            DialogCreator.alert("This file is not a valid WindowPainter preset.", {
                                title: "Error",
                                icon: "error"
                            });
                            return;
                        } else {
                            body.querySelector(".tb-activedegrees").value = themeObject.window_active.degrees;
                            body.querySelector(".cl-activeleft").value = themeObject.window_active.color1;
                            body.querySelector(".cl-activeright").value = themeObject.window_active.color2;

                            body.querySelector(".tb-inactivedegrees").value = themeObject.window_inactive.degrees;
                            body.querySelector(".cl-inactiveleft").value = themeObject.window_inactive.color1;
                            body.querySelector(".cl-inactiveright").value = themeObject.window_inactive.color2;
                        };
                    });

                    wnd_open.show();
                }
            },

            {
                type: "normal",
                label: "Save",
                onclick: () => {
                    DialogCreator.alert("Make sure to save your presets as .json files, else you won't be able to load them.", {
                        events: {
                            onclose: () => {
                                const wnd_save = new SaveFileDialog("c:/user", [".json"], (path) => {
                                    if (!path) return;
                                    FS.writestr(path, generateThemeObject());
                                });

                                wnd_save.show();
                            }
                        }
                    })
                }
            },

            {
                type: "normal",
                label: "Save as...",
                onclick: () => showPlaceHolderWindow()
            },

            {
                type: "separator"
            },

            {
                type: "normal",
                label: "Exit",
                onclick: () => this.terminate()
            }
        ]);

        appBar.addRoot("Help", [
            {
                type: "normal",
                label: "GitHub repository",
                onclick: () => window.open(releaseInfo.repo, "_blank")
            },

            {
                type: "normal",
                label: "Report an issue",
                onclick: () => window.open(`${releaseInfo.repo}/issues/new`, "_blank")
            },

            {
                type: "separator"
            },

            {
                type: "normal",
                label: "About",
                onclick: () => DialogCreator.create({
                    title: "About WindowPainter",
                    body: `
                        <span class="bold-noaa">WindowPainter ${releaseInfo.version}</span> (${releaseInfo.date})
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
    filters: [".json"],
    meta: {
        icon: Theme.getIconUrl("image2"),
        friendlyName: "WindowPainter"
    }
});
