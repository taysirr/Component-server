###############################CustomComponent##########################
var express = require('express');
const app = express();
var request = require('request');
var http = require('http');
module.exports = {

    metadata: () => ({
        name: 'ts.Insurance.BotComponent',
        properties: {
            Code: {required: true, type: "int"},
            Body1: {required: false, type: "string"},
            Body2: {required: false, type: "string"},
            Body3: {required: false, type: "string"},
            Body4: {required: false, type: "string"},
            Body: {required: false, type: "string"},
        },
        supportedActions: []
    }),

    invoke: (conversation, done) => {
        const {Code} = conversation.properties();
        const {Body1} = conversation.properties();
        const {Body2} = conversation.properties();
        const {Body3} = conversation.properties();
        const {Body4} = conversation.properties();
        const {Body} = conversation.properties();
        //structure de notre body
        var GlobalBody = {"Preneur":" ","Conducteur":" ","Assurance":" ","commonpart":""}
        var att2 = conversation.attachment();
       // Un objet d'options pour indiquer où poster
        var reqBody = {code: Code, url: att2.url};
        request({
            url: "http://196.203.88.239:4000/test",
            method: "POST",
            json: true,   // <--Very important!!!
            body: reqBody
        }, function (error, response, body){
           //console.log(response);
            // console.log(body);
            if(Code == 1){
                conversation.variable(Body1,body);
                conversation.transition();
                done();}

            else if(Code == 2){
                conversation.variable(Body2,body);
                conversation.transition();
                done();}

             else if(Code == 3){
                 conversation.variable(Body3,body);
                 conversation.transition();
                 done();}

            else if(Code == 4){
                //affectation des 3 body
                 conversation.variable(Body4,body);
                 //console.info (Body3.value.conducteurA.name);
                 GlobalBody.commonpart = body;
                 GlobalBody.Assurance = Body3;
                 GlobalBody.Preneur=Body1;
                 GlobalBody.Conducteur=Body2;
                 conversation.variable(Body,GlobalBody);
                 console.info (JSON.stringify(GlobalBody) );
                 conversation.transition();
                done();}

        });
    }
}