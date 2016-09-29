"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ng2_http_client_service_1 = require('./ng2-http-client.service');
var Ng2HttpClient = (function () {
    function Ng2HttpClient() {
    }
    Ng2HttpClient.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        http_1.HttpModule
                    ],
                    providers: [
                        ng2_http_client_service_1.HttpClient
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2HttpClient.ctorParameters = [];
    return Ng2HttpClient;
}());
exports.Ng2HttpClient = Ng2HttpClient;
