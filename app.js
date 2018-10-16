const child_process = require("child_process");
require('dotenv').config();
let i = 1;
(run = () => {
	let workerProcess = child_process.spawn("node", [
		"fakeAp", i,
	], {
		stdio: [
			null, null, null, "ipc",
		],
	});

	workerProcess.stdout.on("data", data => {
		console.log(`processMessege: ${ data}`);
	});

	workerProcess.on("message", m => {
	});

	workerProcess.stderr.on("err", err => {
		console.log(`processMessegeerr: ${ err}`);
	});

	workerProcess.on("close", code => {
		console.log(`子进程已退出，退出码 ${ code}`);
	});

	if ( i < process.env.FAKE_AP_AMOUNT ) {
		if ( i % process.env.FAKE_AP_EACH_AMOUNT === 0 ) {
			setTimeout(()=>{
				run(++i);
			}, process.env.FAKE_AP_EACH_TIME * 1000)
		} else {
			run(++i);
		}
	}

})(i);