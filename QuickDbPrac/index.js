const db = require("quick.db");

const kumyul = new db.table("kumyul");

kumyul.set("ㅁㅊ", "어허! 그런말은 주의하도록 해요!");

console.log(JSON.parse(kumyul.all()));
