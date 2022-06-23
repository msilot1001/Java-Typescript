let readline = require('readline');
let fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('ChatTester @v0.1.0 By Msilot1001');

let commandjson = fs.readFileSync('commands.json','utf-8');

let obj = JSON.parse(commandjson);
let cmdlist = obj.cmdlist;

for(var i = 0; i < cmdlist.length; i++) {
    switch (i) {
        case 0:
            console.log(`${i+1}st command : ${cmdlist[i]["CmdName"]}`);
            break;
        case 1:
            console.log(`${i+1}nd command : ${cmdlist[i]["CmdName"]}`);
            break;
        case 2:
            console.log(`${i+1}rd command : ${cmdlist[i]["CmdName"]}`);
            break;
        default:
            console.log(`${i+1}th command : ${cmdlist[i]["CmdName"]}`);
            break;
    }
}


Home();

async function Home() {
    rl.question(`    Select Command to Execute
`, async function (name) {
        await FindCmd(name);
    });
}

async function Test(i) {
    console.log(
`
Output of Command ${i} : ${cmdlist[i]["output"]}
`); Home(); return;
}

async function FindCmd(CmdName) {
    for (var i=0 ; i < cmdlist.length ; i++)
    {
        if(cmdlist[i]!=undefined)
        {
            if (cmdlist[i]["CmdName"] == CmdName) {
                console.log(
                    `\nOutput of Command ${CmdName} : ${cmdlist[i]["output"]}\nReaction of the Command : ${cmdlist[i]["reaction"]}\nCustomCmd : ${cmdlist[i]["customcmd"]}`); 
                    Home(); return;
            }
        }
        
    }
    console.log(`Command not found`); Home(); return;
}