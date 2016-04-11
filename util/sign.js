/**
 * Created by yanghdx on 2016/4/10.
 */
var crypto = require('crypto');

var now = Math.floor(Date.now() / 1000),
    user = 'virtual.user',
    pass = 'virtual.pass',
    md5_pass = crypto.createHash('md5').update(pass, 'utf-8').digest('hex');

//waf api
var uri = '/api/ips/100';
var sign = user + ':' + crypto.createHash('md5').update(now + uri + user + md5_pass, 'utf-8').digest('hex');

console.log('%s?date=%s&sign=%s', uri, now, sign);
