const mqtt = require("mqtt");
const log4js = require("log4js");
require("dotenv").config();
const logger = log4js.getLogger();
let count = process.argv[2];
const CLIENT_ID = `${process.env.FAKE_AP_PREFIX}${1000 + parseInt(count)}`;
const FAKE_AP_HOST = process.env.FAKE_AP_HOST;
const log4js_filename = `${__dirname}/log/${CLIENT_ID}.log`;

console.log("子进程已启动");
log4js.configure({
  appenders: {
    file: {
      type: "file",
      filename: log4js_filename,
      layout: {
        type: "pattern",
        pattern: "%r %p - %m"
      }
    }
  },
  categories: {
    default: {
      appenders: ["file"],
      level: "debug"
    }
  }
});

process.on("message", m => {
  // console.log('message in child:', m);
});

(async () => {
  let client = mqtt.connect({
    host: FAKE_AP_HOST,
    port: 1883,
    clientId: `${CLIENT_ID}`,
    keepalive: 300
  });

  await client.on("connect", async () => {
    console.log(`${CLIENT_ID}>>>`);
    await client.publish(`$SYS/broker/connection/${CLIENT_ID}/state`, "1", {
      qos: 0,
      retain: true
    });

    logger.info(`topic:$SYS/broker/connection/${CLIENT_ID}/state`);
    logger.info("message:1");

    client.subscribe(`kp/${CLIENT_ID}/#`);

    let messageId = "";
    client.on("message", async (topic, message) => {
      let topicArray = topic.split("/");

      if (topicArray[1] == CLIENT_ID) {
        if (topicArray[topicArray.length - 1] == "group_id") {
          logger.info(`topic:${topic}`);
          logger.info(`message:${message}`);

          let msg;
          try {
            msg = JSON.parse(message);
          } catch (err) {
            msg = JSON.parse(message.slice(0, message.length - 1));
          }
          messageId = msg.id;
          client.subscribe(`kp/${messageId}/${topicArray[2]}/#`);
        }

        if (topicArray[topicArray.length - 1] == "report") {
          logger.info(`topic:${topic}`);
          logger.info(`message:${message}`);

          let msg = "";
          try {
            msg = JSON.parse(message);
          } catch (err) {
            msg = JSON.parse(message.slice(0, message.length - 1));
          }

          let mqttCotent = `{"id":"${CLIENT_ID}","type":"env","stalist":{"1E:13:DF:0F:FA:28":{"tick":30,"channe":0,"rssi":-61,"rate":6,"preq":1},"A2:F6:FD:38:44:04":{"tick":34,"channel":0,"rssi":-83,"rate":6,"preq":1},"CE:A9:D7:E7:D1:02:{"tick":10,"channel":0,"rssi":-79,"rate":6,"preq":1},"DC:F0:90:8D:6E:58":{"tick":24,"channel":0,"rssi":-87,"rate":6,"preq":1,"30:B4:9E:A3:36:B6":{"tick":56,"channel":0,"rssi":-59,"rate":6,"preq":1},"50:8F:4C:E6:32:CC":{"tick":54,"channel":0,"rssi":-7,"rate":6,"preq":1},"94:87:E0:42:AF:E9":{"tick":33,"channel":0,"rssi":-84,"rate":6,"preq":1},"DA:A1:19:0D:A0:E6":{"tick":33,channel":0,"rssi":-85,"rate":6,"preq":1},"6E:F6:33:B7:B4:D3":{"tick":38,"channel":0,"rssi":-64,"rate":6,"preq":1},"42:77:8C:0:1D:4A":{"tick":58,"channel":0,"rssi":-84,"rate":6,"preq":1},"DA:A1:19:45:F2:F4":{"tick":34,"channel":0,"rssi":-88,"rate":6,"req":1},"FC:1A:11:D6:DD:87":{"tick":40,"channel":0,"rssi":-91,"rate":6,"preq":1},"F2:86:DC:EB:99:A2":{"tick":46,"channel":0,"ssi":-82,"rate":6,"preq":1},"6C:AB:31:CE:86:D2":{"tick":11,"channel":0,"rssi":-64,"rate":6,"preq":1},"2E:26:63:CE:DB:A0":{"tik":18,"channel":0,"rssi":-76,"rate":6,"preq":1},"F2:40:FD:40:24:45":{"tick":39,"channel":0,"rssi":-53,"rate":6,"preq":1},"DA:1:19:D5:00:FE":{"tick":37,"channel":0,"rssi":-88,"rate":6,"preq":1},"4A:F3:0A:3F:2B:C5":{"tick":33,"channel":0,"rssi":-86,"rae":6,"preq":1},"22:AA:CE:E1:BD:C6":{"tick":47,"channel":0,"rssi":-70,"rate":6,"preq":1},"92:88:C6:45:D3:D2":{"tick":44,"channl":0,"rssi":-74,"rate":6,"preq":1},"FA:B3:C5:BD:94:28":{"tick":44,"channel":0,"rssi":-92,"rate":6,"preq":1},"C6:2F:2C:3A:C7:C":{"tick":5,"channel":0,"rssi":-78,"rate":6,"preq":1},"D0:BA:E4:29:CC:32":{"tick":45,"channel":0,"rssi":-78,"rate":6,"preq":1,"DA:A1:19:18:B5:69":{"tick":42,"channel":0,"rssi":-92,"rate":6,"preq":1},"82:5A:6E:80:7A:20":{"tick":36,"channel":0,"rssi":-0,"rate":6,"preq":1},"2C:D9:74:93:05:DD":{"tick":33,"channel":0,"rssi":-86,"rate":6,"preq":1},"DA:A1:19:D7:2F:32":{"tick":42,channel":0,"rssi":-89,"rate":6,"preq":1},"0C:8F:FF:DD:F3:DA":{"tick":57,"channel":0,"rssi":-85,"rate":6,"preq":1},"26:2C:5D:4:ED:7C":{"tick":38,"channel":0,"rssi":-75,"rate":6,"preq":1},"50:29:F5:A4:32:77":{"tick":49,"channel":0,"rssi":-83,"rate":6,"req":1},"DA:A1:19:6F:6F:6F":{"tick":43,"channel":0,"rssi":-89,"rate":6,"preq":1},"94:87:E0:38:55:71":{"tick":22,"channel":0,"ssi":-84,"rate":6,"preq":1},"DA:A1:19:17:95:A8":{"tick":55,"channel":0,"rssi":-86,"rate":6,"preq":1},"D6:D6:AF:1A:96:8B":{"tik":40,"channel":0,"rssi":-67,"rate":6,"preq":1},"CE:83:DA:83:2D:FD":{"tick":26,"channel":0,"rssi":-70,"rate":6,"preq":1},"26:2:8D:67:D4:91":{"tick":42,"channel":0,"rssi":-73,"rate":6,"preq":1},"A0:88:B4:45:3A:3C":{"tick":20,"channel":0,"rssi":-63,"rae":6,"preq":1},"70:70:0D:59:A5:35":{"tick":25,"channel":0,"rssi":-78,"rate":6,"preq":1},"B4:0B:44:EE:40:A2":{"tick":12,"channl":0,"rssi":-91,"rate":6,"preq":1},"E4:47:90:C9:C0:5B":{"tick":38,"channel":0,"rssi":-90,"rate":6,"preq":1},"70:EF:00:29:84:7":{"tick":17,"channel":0,"rssi":-58,"rate":6,"preq":1},"DA:A1:19:88:8A:FB":{"tick":53,"channel":0,"rssi":-82,"rate":6,"preq":},"E4:02:9B:7C:10:DC":{"tick":18,"channel":0,"rssi":-74,"rate":6,"preq":1},"D0:BA:E4:63:AB:9F":{"tick":4,"channel":0,"rssi":-1,"rate":6,"preq":1},"DA:A1:19:D6:66:17":{"tick":51,"channel":0,"rssi":-92,"rate":6,"preq":1},"A0:9D:C1:4A:73:34":{"tick":33,channel":0,"rssi":-91,"rate":6,"preq":1},"20:5D:47:A0:73:E1":{"tick":13,"channel":0,"rssi":-85,"rate":6,"preq":1},"6C:5C:14:9:6C:F1":{"tick":14,"channel":0,"rssi":-90,"rate":6,"preq":1},"DA:A1:19:A7:50:7F":{"tick":46,"channel":0,"rssi":-90,"rate":6,"req":1},"98:9C:57:E6:A1:41":{"tick":13,"channel":0,"rssi":-83,"rate":6,"preq":1},"FA:2A:49:DF:E0:B6":{"tick":39,"channel":0,"ssi":-91,"rate":6,"preq":1},"DA:A1:19:69:8F:EF":{"tick":59,"channel":0,"rssi":-79,"rate":6,"preq":1},"08:4A:CF:6B:6D:55":{"tik":37,"channel":0,"rssi":-91,"rate":6,"preq":1},"16:1A:4B:81:46:FD":{"tick":12,"channel":0,"rssi":-78,"rate":6,"preq":1},"8C:0:5A:C3:80:D4":{"tick":49,"channel":0,"rssi":-56,"rate":6,"preq":1},"78:45:61:58:5A:26":{"tick":8,"channel":0,"rssi":-79,"rat":6,"preq":1},"FE:A2:EF:4B:85:B6":{"tick":35,"channel":0,"rssi":-91,"rate":6,"preq":1}},"uniq":"${msg.uniq}"}`;
          await client.publish(
            `kp/${topicArray[2]}/${CLIENT_ID}/reply`,
            mqttCotent,
            {
              qos: 0,
              retain: true
            }
          );
          // console.log(mqttCotent)

          
          logger.info(`topic:kp/${topicArray[2]}/${CLIENT_ID}/reply`);
          logger.info(`message:${mqttCotent}`);
        }

        if (
          topicArray[topicArray.length - 1] == "status" &&
          topicArray[1] == CLIENT_ID
        ) {
          logger.info(`topic:${topic}`);
          logger.info(`message:${message}`);

          let mqttCotent = `{"radio":[{"ssid":"@nradio","encryption":"WPA2 PSK (CCMP)","assoclist":{"14:75:90:F9:AE:F7":{"rx_bytes":157031571,"noise":-96,"tx_bytes":399096663,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":23,"assoctime":23519,"rx_rate":85000,"signal":-70},"A8:BE:27:E3:05:2C":{"rx_bytes":4477527,"noise":-83,"tx_bytes":49708621,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":4,"assoctime":20057,"rx_rate":24000,"signal":-51},"30:B4:9E:A2:D6:71":{"rx_bytes":211999832,"noise":-84,"tx_bytes":871658647,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":8,"rx_short_gi":false,"rx_mcs":8,"assoctime":33014,"rx_rate":86000,"signal":-52},"B0:52:16:06:E9:17":{"rx_bytes":17941568,"noise":-91,"tx_bytes":174636008,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":8,"rx_short_gi":false,"rx_mcs":8,"assoctime":8589,"rx_rate":86000,"signal":-62},"30:B4:9E:7A:70:1E":{"rx_bytes":64402053,"noise":-81,"tx_bytes":430417355,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":65000,"inactive":0,"tx_mcs":7,"rx_short_gi":false,"rx_mcs":8,"assoctime":33298,"rx_rate":86000,"signal":-51},"88:25:93:B2:D2:6C":{"rx_bytes":77854870,"noise":-92,"tx_bytes":433211375,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":8,"rx_short_gi":false,"rx_mcs":8,"assoctime":33133,"rx_rate":86000,"signal":-63},"6C:72:E7:45:F8:EA":{"rx_bytes":23072691,"noise":-86,"tx_bytes":24295051,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":4,"assoctime":17067,"rx_rate":24000,"signal":-51},"30:B4:9E:42:35:8C":{"rx_bytes":52713899,"noise":-88,"tx_bytes":687651696,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":8,"rx_short_gi":false,"rx_mcs":8,"assoctime":32288,"rx_rate":86000,"signal":-62},"98:CA:33:43:82:50":{"rx_bytes":22375726,"noise":-89,"tx_bytes":632925443,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":117000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":4,"assoctime":30892,"rx_rate":24000,"signal":-64},"44:9E:F9:2A:7E:AB":{"rx_bytes":9128345,"noise":-88,"tx_bytes":142038748,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":23,"rx_short_gi":false,"rx_mcs":0,"assoctime":19960,"rx_rate":6000,"signal":-61},"A4:5E:60:3E:00:06":{"rx_bytes":255345,"noise":-91,"tx_bytes":1481636,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":78000,"inactive":0,"tx_mcs":8,"rx_short_gi":false,"rx_mcs":4,"assoctime":618,"rx_rate":24000,"signal":-70},"82:70:22:01:34:90":{"rx_bytes":245093,"noise":-86,"tx_bytes":6725803,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":8,"assoctime":23109,"rx_rate":86000,"signal":-58},"08:3E:8E:EC:E9:6D":{"rx_bytes":181627050,"noise":-81,"tx_bytes":451964012,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":144000,"inactive":0,"tx_mcs":15,"rx_short_gi":false,"rx_mcs":13,"assoctime":32966,"rx_rate":104000,"signal":-51},"8A:70:22:01:34:89":{"rx_bytes":318668575,"noise":-74,"tx_bytes":397204558,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":24,"assoctime":966654,"rx_rate":117000,"signal":-42},"38:89:2C:DF:D2:D0":{"rx_bytes":3487872,"noise":-90,"tx_bytes":24583862,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":117000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":4,"assoctime":11418,"rx_rate":24000,"signal":-65},"30:B4:9E:4C:EF:10":{"rx_bytes":163690736,"noise":-87,"tx_bytes":174118204,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":117000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":24,"assoctime":17178,"rx_rate":117000,"signal":-61},"88:6B:6E:E9:29:4A":{"rx_bytes":3073754,"noise":-88,"tx_bytes":34369292,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":130000,"inactive":0,"tx_mcs":24,"rx_short_gi":false,"rx_mcs":23,"assoctime":14079,"rx_rate":78000,"signal":-56},"88:25:93:B2:E2:44":{"rx_bytes":162854594,"noise":-91,"tx_bytes":446946047,"tx_40mhz":false,"rx_40mhz":false,"tx_short_gi":false,"tx_rate":65000,"inactive":0,"tx_mcs":7,"rx_short_gi":false,"rx_mcs":8,"assoctime":19577,"rx_rate":86000,"signal":-71}},"bssid":"FC:83:C6:00:16:2D","bitrate":173,"name":"wlan1","channel":36,"mode":"Master","quality":100,"frequency":"5.180"},{"ssid":"鲲鹏无限","encryption":"None","assoclist":{},"bssid":"FE:83:C6:01:16:2D","bitrate":173,"name":"wlan7","channel":36,"mode":"Master","quality":100,"frequency":"5.180"},{"ssid":"WXNRadio","encryption":"mixed WPA\/WPA2 PSK (CCMP)","assoclist":{},"bssid":"FE:83:C6:02:16:2D","bitrate":173,"name":"wlan3","channel":36,"mode":"Master","quality":100,"frequency":"5.180"}],"name":"WT3680","oid":"${CLIENT_ID}","id":"${CLIENT_ID}","uptime":976356,"sversion":"1.5.48","pos":"1"}`;
          client.publish(
            `kp/${topicArray[2]}/${CLIENT_ID}/reply/device_info`,
            mqttCotent,
            {
              qos: 0,
              retain: true
            }
          );
          // console.log(mqttCotent)

          logger.info(
            `topic:kp/${topicArray[2]}/${CLIENT_ID}/reply/device_info`
          );
          logger.info(`message:${mqttCoten}`);
        }
      }

      if (
        topicArray[topicArray.length - 1] === "status" &&
        topicArray[1] == messageId
      ) {
        logger.info(`topic:${topic}`);
        logger.info(`message:${message}`);

        let msg = "";
        try {
          msg = JSON.parse(message);
        } catch (err) {
          msg = JSON.parse(message.slice(0, message.length - 1));
        }

        let mqttCotent = `{"sversion":"1.6.4","oid":"${CLIENT_ID}","id":"${CLIENT_ID}","radiocnt":{"phy2":1,"phy5":1,"band5":1,"band2":1},"uniq":"${msg.uniq}","uptime":1127527,"ipaddr":"192.168.88.2","radio":[{"txbytes":9969434,"ssid":"@sofamiredo","encryption":"mixed WPA\/WPA2 PSK (CCMP)","assoclist":{},"bssid":"FC:83:C6:00:4B:A2","rxbytes":1114710,"bitrate":144,"name":"wlan0","channel":1,"mode":"Master","quality":54,"frequency":"2.412"},{"txbytes":0,"ssid":"@doremifasolasi","encryption":"None","assoclist":{},"bssid":"FC:83:C6:00:4B:A3","rxbytes":0,"bitrate":400,"name":"wlan1","channel":36,"mode":"Master","quality":100,"frequency":"5.180"}],"client":{},"name":"WT9762c","pos":"0"}`;

        client.publish(
          `kp/${topicArray[2]}/${CLIENT_ID}/reply/device_info`,
          mqttCotent,
          {
            qos: 0,
            retain: true
          }
        );
        
        // console.log(mqttCotent)

        logger.info(`topic:kp/${topicArray[2]}/${CLIENT_ID}/reply/device_info`);
        logger.info(`message:${mqttCotent}`);
      }
    });
  });
})();
