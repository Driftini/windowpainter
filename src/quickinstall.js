const urlPrefix = "https://raw.githubusercontent.com/Driftini/windowpainter/master/src"

let downloadList = [
	{
		"filename": "wpaint.js",
		"savepath": "c:/system/boot/apps"
	},
	{
		"filename": "wpaint.css",
		"savepath": "c:/local/wpaint"
	},
	{
		"filename": "wnd_main.html",
		"savepath": "c:/local/wpaint"
	}
]

let done = 0

const shortcutPaths = [
	"c:/system/programs/Other",
	"c:/user/desktop"
]

console.group(`%c[ QuickInstall ]`, "color:#8af;font-weight:bold")

async function save(value) {
	if (!w96.FS.exists(value.savepath)) {
		w96.FS.mkdir(value.savepath);
	};

    console.log(`Fetching ${value.filename}...`);

    value.content = await w96.sys.loader.loadTextAsync(`${urlPrefix}/${value.filename}`, false);
    console.log(`${value.filename} fetched. Now saving...`);

    await w96.FS.writestr(`${value.savepath}/${value.filename}`, value.content);
    done++;
    console.log(`${value.filename} saved. (${done}/${downloadList.length})`);
	
	for (let i = 0; i < shortcutPaths.length; i++) {
		if (!w96.FS.exists(shortcutPaths[i])) w96.FS.mkdir(shortcutPaths[i]);
    	w96.shell.mkShortcut(`${shortcutPaths[i]}/WindowPainter.link`, "image2", "wpaint");
	}

    if (done == downloadList.length) {
    	console.log("All files have been saved. Rebooting...");
		console.groupEnd();

		setTimeout(()=>w96.sys.reboot(), 3000);
    }
}

downloadList.forEach(save);
