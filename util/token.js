/**
 * Created by yanghdx on 2016/4/10.
 */
var events = require('events');
var util   = require('util');

var TOKEN_CACHE = [],
    TIMEOUT = 10 * 60 * 1000;
function Token() {
    events.EventEmitter.call(this);
}
util.inherits(Token, events.EventEmitter);

Token.prototype.add = function(token) {
    TOKEN_CACHE
}
/**
 * Clear token cache
 */
Token.prototype.clearAll = function() {
    TOKEN_CACHE = {};
}

/**
 * Create token
 * @param tokenName
 * @param callback
 */
Token.prototype.putToken = function (token) {
    var item = {
        token : token,
        time : Date.now()
    }
    TOKEN_CACHE.push(item);
    //��ʱ�Զ����
    setTimeout(function(){
                var index = -1;
                for (var i= 0, len=TOKEN_CACHE.length; i<len; i++) {
                    var item =TOKEN_CACHE[i];
                    if (item.token == token) {
                        index = i;
                        break;
                    }
                }
                if (index >= 0) {
                    TOKEN_CACHE.splice(i, 1);
                }
            }, TIMEOUT);
}
Token.prototype.removeToken = function(token) {
    var index = -1;
    for (var i= 0, len=TOKEN_CACHE.length; i<len; i++) {
        var item =TOKEN_CACHE[i];
        if (item.token == token) {
            index = i;
            break;
        }
    }
    if (index >= 0) {
        TOKEN_CACHE.splice(i, 1);
    }
}
Token.prototype.hasToken = function(token) {
    var index = -1;
    for (var i= 0, len=TOKEN_CACHE.length; i<len; i++) {
        var item =TOKEN_CACHE[i];
        if (item.token == token) {
            index = i;
            break;
        }
    }
    return index > -1;
}

Token.prototype.showAll = function(){
    console.log(TOKEN_CACHE);
}

var token = new Token();

module.exports = token;