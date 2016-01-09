/**
 * 服务访问路径的前缀
 * @author Finrila finrila@gmail.com
 */

var path = require('path');

module.exports = function(connect, options) {

    var back_pathnamePrefix = options.back_pathnamePrefix.replace(/\/+/g, '/').replace(/\/$/, '');

    return function(req, res, next) {
        if (!req.__back_requrest__) {
            return next();
        }
        var __real_url__ = req.__real_url__;
        var match = __real_url__.match(new RegExp('^' + back_pathnamePrefix + '(.*)$'));
        if (match) {
            if (match[1] === '' || /^\?/.test(match[1])) {
                match[1] = '/' + match[1];
            } else if (!/^\//.test(match[1])) { //处理路径与文件名字有重合的情况
                match = null;
            }
        }
        if (match) {
            req.url = path.join('/' + options.back_base, match[1]).replace(/\\+/g, '/').replace(/\/+/g, '/');
        }
        next();
    };
};