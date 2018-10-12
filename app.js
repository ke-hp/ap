const child_process = require("child_process");
require('dotenv').config();
(() => {
  for (let i = 0; i < process.env.FAKE_AP_AMOUNT; i++) {
    let workerProcess = child_process.spawn("node", ["fakeAp", i], {
      stdio: [null, null, null, "ipc"]
    });

    workerProcess.stdout.on("data", function(data) {
      console.log("processMessege: " + data);
    });

    workerProcess.on("message", m => {
      process.send(workerProcess.pid);
    });
    workerProcess.send(workerProcess.pid);

    workerProcess.stderr.on("err", function(err) {
      console.log("processMessegeerr: " + err);
    });

    workerProcess.on("close", function(code) {
      console.log("子进程已退出，退出码 " + code);
    });
  }
})();
