const schema = require('../utilities/list_users');
const expect = require('chai').expect;
const request = require('supertest');
const joi = require('joi');
const serviceEndPoint = 'https://reqres.in';
const resourceEndPoint = '/api/users?';
const parameter = 'page=2';

//https://reqres.in/
//https://github.com/zac11/supertest-demo
//https://seleniumwithjavapython.wordpress.com/rest-api-testing/supertest/
//https://github.com/adamgruber/mochawesome-report-generator

describe('Get list of users details', () =>{
    let get_res;
    it('get list of users details', async() =>{
        get_res = await request(serviceEndPoint).get(resourceEndPoint+parameter);
        console.log(get_res.body);
    })

    it('asserts that the response code is 200', async () =>{
        await (expect(get_res.status).to.equal(200));
    })

    it('asserts the various attributes', async () =>{
        await(expect(get_res.body.page).to.equal(2));
    })

    it('checks that the data is an array', async () =>{
        await (expect(get_res.body.data).to.be.an('array'));
    })

    it('prints length of data array', async () =>{
        await (console.log(get_res.body.data.length));
    })

    it('gets the id and first_name from the array', async () =>{
        for(let i=0;i<get_res.body.data.length;i++){
            await(console.log(get_res.body.data[i].id));
            await (console.log(get_res.body.data[i].first_name));
        }
    });

    it('matches the schema for the API', async () =>{
        await (expect(joi.validate(schema.schema).error).to.be.null);
    })





})
