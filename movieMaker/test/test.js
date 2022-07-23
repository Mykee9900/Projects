var assert = require("assert");


describe("Time", () => {
    it("will test if time is working", () => {
        let date = new Date(); 
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let session = "AM";
        let time = hour + ":" + minute + ":" + second + " " + session;

        assert.ok(time);
    })
})

describe("Date", () => {
    it("Will test if the date function is working", () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let fullDate = year+"-"+month+'-'+day;

        assert.ok(fullDate);
    })
})