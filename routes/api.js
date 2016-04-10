/**
 * Created by yanghdx on 2016/4/9.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var threshold = 10 * 60, // 600s
    USER = 'virtual.user',
    PASS = 'virtual.pass';
    MD5_PASS = crypto.createHash('md5').update(PASS, 'utf-8').digest('hex');

/* Get waf detail info*/
router.get('/wafs/:id', function(req, res, next) {
    var date = req.query.date || req.body.date;
    var sign = req.query.sign || req.body.sign;

    if (!date || !sign) {
        res.json({result : false, errmsg : 'Request parameters : date or sign is null.'});
    } else if ( !/^[0-9]{10}$/.test(date)){
        res.json({result : false, errmsg : 'Request parameters : Date format is incorrect!'});
    } else if (Math.abs(Math.floor(Date.now()/1000) - parseInt(date)) > threshold){
        res.json({result : false, errmsg : 'The client and server time difference is more than 10 minutes.'});
    } else if (!/[:]/.test(sign)) {
        res.json({result : false, errmsg : 'Request parameters : sign format is incorrect.'});
    } else {
        var arr = sign.split(':');
        if (arr[0] == USER) {
            var uri = '/api' + req.url.split('?')[0];
            console.log('uri is %s', uri);
            var serv_sign = USER + ':' + crypto.createHash('md5').update(date + uri + USER + MD5_PASS, 'utf-8').digest('hex');
            console.log('server sign is: %s', serv_sign);
            console.log('client sign is: %s', sign);

            if (serv_sign == sign) {
                var id = req.params.id;
                console.log('id is %s', id);
                var ret = {
                    id : id,
                    site_ip : '1.1.1.1, 2.2.2.2/28, 3.3.3.3-5.5.5.5',
                    site_domain : 'www.test.com',
                    port : '80,443,8080-8090'
                };
                res.json({result:true, wafs : ret});
            } else {
                res.json({result : false, errmsg : 'Request parameters : sign is incorrect.'});
            }
        } else {
            res.json({result : false, errmsg : 'Request parameters : sign is incorrect.'});
        }
    }
});

/* Get ips detail info*/
router.get('/ips/:id', function(req, res, next) {
    var date = req.query.date || req.body.date;
    var sign = req.query.sign || req.body.sign;

    if (!date || !sign) {
        res.json({result : false, errmsg : 'Request parameters : date or sign is null.'});
    } else if ( !/^[0-9]{10}$/.test(date)){
        res.json({result : false, errmsg : 'Request parameters : Date format is incorrect!'});
    } else if (Math.abs(Math.floor(Date.now()/1000) - parseInt(date)) > threshold){
        res.json({result : false, errmsg : 'The client and server time difference is more than 10 minutes.'});
    } else if (!/[:]/.test(sign)) {
        res.json({result : false, errmsg : 'Request parameters : sign format is incorrect.'});
    } else {
        var arr = sign.split(':');
        if (arr[0] == USER) {
            var uri = '/api' + req.url.split('?')[0];
            console.log('uri is %s', uri);
            var serv_sign = USER + ':' + crypto.createHash('md5').update(date + uri + USER + MD5_PASS, 'utf-8').digest('hex');
            console.log('server sign is: %s', serv_sign);
            console.log('client sign is: %s', sign);

            if (serv_sign == sign) {
                var id = req.params.id;
                console.log('id is %s', id);
                var ret = {
                    id : id,
                    site_ip : '1.1.1.1, 2.2.2.2/28, 3.3.3.3-5.5.5.5',
                    site_domain : 'www.test.com',
                    port : '80,443,8080-8090'
                };
                res.json({result:true, wafs : ret});
            } else {
                res.json({result : false, errmsg : 'Request parameters : sign is incorrect.'});
            }
        } else {
            res.json({result : false, errmsg : 'Request parameters : sign is incorrect.'});
        }
    }
});

//test method
router.get('/test', function(req, res, next) {
    var list = [{user : 'adm', pass: '123456'}];
    res.json({test:list});
});


module.exports = router;