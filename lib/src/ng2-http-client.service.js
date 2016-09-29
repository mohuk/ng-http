"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
    }
    HttpClient.prototype.init = function (url) {
        this.baseUrl = url;
    };
    HttpClient.prototype.get = function (url, options) {
        var opts = this.build(http_1.RequestMethod.Get, url, options);
        return this.request(url, opts);
    };
    HttpClient.prototype.put = function (url, body, options) {
        var opts = this.build(http_1.RequestMethod.Put, url, options, body);
        return this.request(url, opts);
    };
    HttpClient.prototype.post = function (url, body, options) {
        var opts = this.build(http_1.RequestMethod.Post, url, options, body);
        return this.request(url, opts);
    };
    HttpClient.prototype.delete = function (url, options) {
        var opts = this.build(http_1.RequestMethod.Delete, url, options);
        return this.request(url, opts);
    };
    HttpClient.prototype.patch = function (url, body, options) {
        var opts = this.build(http_1.RequestMethod.Patch, url, options, body);
        return this.request(url, opts);
    };
    HttpClient.prototype.request = function (url, options) {
        var _this = this;
        var req;
        if (typeof url === 'string') {
            var reqOpt = new http_1.RequestOptions(options);
            reqOpt.url = url;
            req = new http_1.Request(reqOpt);
        }
        else {
            req = url;
        }
        this.beforeRequest(req);
        return this.http.request(req)
            .do(function (res) { return _this.afterCall(req, res); });
    };
    HttpClient.prototype.build = function (method, url, options, body) {
        var aBody = body ? body : options && options.body ? options.body : undefined;
        var opts = {
            method: method,
            url: url,
            headers: options && options.headers ? options.headers : new http_1.Headers(),
            search: options && options.search ? options.search : undefined,
            body: aBody
        };
        return opts;
    };
    HttpClient.prototype.beforeRequest = function (req) {
        //add headers and everything nice
        if (this.baseUrl) {
            req.url = this.baseUrl + "/" + req.url;
        }
    };
    HttpClient.prototype.afterCall = function (req, res) {
        //add json api transformation
    };
    HttpClient.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    HttpClient.ctorParameters = [
        { type: http_1.Http, },
    ];
    return HttpClient;
}());
exports.HttpClient = HttpClient;
