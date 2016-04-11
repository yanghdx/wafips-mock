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
    var date = req.query.date || req.body.date,
        sign = req.query.sign || req.body.sign,
        now  = Math.floor(Date.now() / 1000);

    //check date and sign
    var r = checkDateAndSign(date, sign, now)
    if (r !== true) {
        res.json({result : false, serv_time : now, errmsg : r});
    } else {
        var arr = sign.split(':');
        if (arr[0] == USER) {
            var uri = '/api' + req.url.split('?')[0];
            console.log('uri is %s', uri);

            var serv_sign = USER + ':' +
                crypto.createHash('md5').update(date + uri + USER + MD5_PASS, 'utf-8').digest('hex');
            console.log('server sign is: %s', serv_sign);
            console.log('client sign is: %s', sign);

            if (serv_sign == sign) {
                var id = req.params.id;
                console.log('id is %s', id);
                var ret = {
                    id : id,
                    service_type : 'TYPE_WAF_PLUS',
                    name : 'waf_host',
                    site_ip : '1.1.1.1, 2.2.2.2/24, 3.3.3.3-5.5.5.5',
                    site_domain : 'www.test.com',
                    port : '80,443,8080-8090',

                    web_page_path : '',
                    exclude_process : '',
                    mon_url : '',

                    database_ip : '',
                    database_port : '',
                    database_type : '',
                    database_version : '',
                    database_os_type : ''
                };
                res.json({result:true, wafs : ret});
            } else {
                res.json({result : false, errmsg : 'sign error'});
            }
        } else {
            res.json({result : false, errmsg : 'sign error'});
        }
    }
});

/* Get ips detail info*/
router.get('/ips/:id', function(req, res, next) {
    var date = req.query.date || req.body.date,
        sign = req.query.sign || req.body.sign,
        now  = Math.floor(Date.now() / 1000);

    //check date and sign
    var r = checkDateAndSign(date, sign, now)
    if (r !== true) {
        res.json({result : false, serv_time : now, errmsg : r});
    } else {
        var arr = sign.split(':');
        if (arr[0] == USER) {
            var uri = '/api' + req.url.split('?')[0];
            console.log('uri is %s', uri);
            var serv_sign = USER + ':' +
                crypto.createHash('md5').update(date + uri + USER + MD5_PASS, 'utf-8').digest('hex');
            console.log('server sign is: %s', serv_sign);
            console.log('client sign is: %s', sign);

            if (serv_sign == sign) {
                var id = req.params.id;
                console.log('id is %s', id);
                var ret = {
                    id : id,
                    name : 'ips_host',
                    description : '',
                    protected_object : ['device']
                };
                res.json({result:true, ips : ret});
            } else {
                res.json({result : false, errmsg : 'sign error'});
            }
        } else {
            res.json({result : false, errmsg : 'sign error'});
        }
    }
});

//test method
router.get('/test', function(req, res, next) {
    var list = [{user : 'adm', pass: '123456'}];
    res.json({test:list});
});

//check date and sign
function checkDateAndSign(date, sign, now) {
    if (!date || !sign) {
        return 'date or sign is empty';
    } else if ( !/^[0-9]{10}$/.test(date)){
        return 'date format error';
    } else if (Math.abs(now - parseInt(date)) > threshold){
        return 'date check error';
    } else if (!/[:]/.test(sign)) {
        return 'sign format error.';
    }
    return true;
}

module.exports = router;