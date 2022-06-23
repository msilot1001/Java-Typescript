const { Client } = require("pg");
const PGCli = new Client();
require("dotenv").config();
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log("PsqlTester @v0.1.0 By Msilot1001");
DB_Connect();
//Interface_Home();

async function DB_Connect() {
	const pg = new Client({
		user: "hololo",
		host: "hololo",
		database: "hololo",
		password: "hololo",
		port: 5432,
		ssl: {
			rejectUnauthorized: false,
		},
	});

	try {
		await pg.connect((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Psql connect success");
				queryDatabase(); /*Interface_Home();*/
			}
		});
	} catch (e) {
		console.error(e);
	}
}

//#region Interface
async function Interface_Home() {
	rl.question(
		`
Select Function to Execute 

(1) Add User

(2) Find User

(3) Delete User

(4) Reset Table

(5) End Session
`,
		function (name) {
			console.log(`input : ${name}`);

			switch (name) {
				case "1":
					break;
			}

			Interface_Home();
		}
	);
}
//#endregion

/*
    Query 부분 사용법
    함수)
    -함수는 "Query_(함수명)"로 구성됩니다.
    Execute) Query 내용을 ①번째 인자로 받습니다.
*/

//#region Query

async function Query_Execute(query) {
	await PGCli.query(query, (err, res) => {
		console.log(`Query_Execute`);
		if (err) {
			console.log(err.stack);
		} else {
			console.log(res.rows[0]);
		}
		client.end();
	});
}

async function Query_ResetTable() {
	// username 길면 컷하기 명심!
	// username 오류나면 글자 제한 생각해보기
	const query = `
        DROP TABLE IF EXISTS userinfo; 
        CREATE TABLE userinfo (
            "user_id" serial PRIMARY KEY, 
            "user_name" VARCHAR (50) UNIQUE NOT NULL,
            "wallet" INT NOT NULL,
            "bank" INT NOT NULL);
    `;
}
//#endregion

async function queryDatabase() {
	console.log(`:102`);
	const query = `CREATE TABLE IF NOT EXISTS usertbl1 ("user_id" bigint PRIMARY KEY, 
"user_name" VARCHAR (50) UNIQUE NOT NULL,
"wallet" INT NOT NULL,
"bank" INT NOT NULL );

SELECT * FROM usertbl1 WHERE user_id=780771337332981780;
DELETE FROM usertbl1 WHERE user_id=780771337332981780;

INSERT INTO usertbl1(user_id, user_name, wallet, bank) VALUES(780771337332981780, 'Msilot1001', 20220307 , 2141 ) RETURNING *;`;

	await PGCli.query(query, (err, res) => {
		console.log(`:115`);
		if (err) {
			console.log(err.stack);
		} else {
			console.log(res.rows[0]);
		}
		client.end();
	});
}
