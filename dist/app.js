"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
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
    const listId = "bac66442fc";
    const options = {
        method: "POST",
        auth: "michael:9c48789563c44cbe6ff8fbdec89ffb5a-us17",
    };
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}`;
    const jsonData = JSON.stringify(data);
    const request = https_1.default.request(url, options, (response) => {
        response.on("data", (data) => {
            // console.log(JSON.parse(data));
            let apiResponse = JSON.parse(data);
            // console.log(apiResponse);
            if (apiResponse.error_count === 0) {
                res.sendFile(__dirname + "/success.html");
            }
            else if (apiResponse.error_count > 0) {
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
//api key
//9c48789563c44cbe6ff8fbdec89ffb5a-us17
// list id
//bac66442fc
//api url https://<dc>.api.mailchimp.com/3.0/
