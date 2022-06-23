let { clientid, token, dbkey } = require('./config.json');
let { CmdSchema } = require("./User.js")
let mongoose = require("mongoose");

class CmdInterface {
    constructor(CmdName, output, react, ownerreact) {
        this.CmdName = CmdName;
        this.output = output;
        this.react = react;
        this.ownerreact = ownerreact;
    }
}

function DBConnect() {
	const connect = mongoose.connect(dbkey, {  
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	family: 4 // Use IPv4, skip trying IPv6
	}).then(() => console.log("==> MongoDB Connected..."))
	.catch(err => console.error(err));
}

DBConnect();
Home();

async function Home() {
    rl.question(`    Select Command to Execute
`, async function (name) {
        await FindCmd(name);
    });
}

async function FindCmd(CmdName) {
    await mongoose.connection.on('disconnected', DBConnect);

    await CmdSchema.findOne({ CmdSchema : name }, async (err, user) => {
    }).catch(function(err){ console.log(err)});
    console.log(`Command not found`); Home(); return;
}

async function AddCmd() {}