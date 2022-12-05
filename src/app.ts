import express from "express";
import bodyParser from "body-parser";
import request from "request";
import https from "https";
import { IAPIResponse } from "./I_ApiResponse";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

const apiKey = process.env.apiKey;
console.log(apiKey);
const listID = process.env.listID;
console.log(listID);

app.post("/", (req, res) => {
	const firstName: string = req.body.fName;
	const lastName: string = req.body.lName;
	const email: string = req.body.email;
	console.log(firstName + " " + lastName + " " + email);
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};
	const dataCenter = "us17";

	const options = {
		method: "POST",
		auth: `michael:${apiKey}`,
	};
	const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listID}`;
	const jsonData = JSON.stringify(data);
	const request = https.request(url, options, (response) => {
		response.on("data", (data) => {
			console.log(JSON.parse(data));
			let apiResponse: IAPIResponse = JSON.parse(data);

			if (apiResponse.error_count === 0) {
				res.sendFile(__dirname + "/success.html");
			} else if (apiResponse.error_count > 0) {
				res.sendFile(__dirname + "/failure.html");
				console.log(apiResponse.errors[0].error_code);
			}
		});
	});

	request.write(jsonData);
	request.end();
});

app.post("/failure", (req, res) => {
	res.redirect("/");
});

app.listen(3000, () => {
	console.log("listening on port 3000 ...");
});
