module.exports.config = {
	name:"Bocchi",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Nana",
	description: "Random ảnh Bocchi theo api",
	commandCategory: "random-images",
	cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://bocchi-api.vercel.app').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `《Gái nè húp đi em》`,
						attachment: fs.createReadStream(__dirname + `/cache/vu.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/vu.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/vu.${ext}`)).on("close", callback);
			})
}