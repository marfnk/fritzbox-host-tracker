var config = {};
const _ = require('lodash');
const fritzBox = {};
fritzBox.auth = require('node-fritzbox/modules/login');
fritzBox.devices = require('node-fritzbox/modules/devices');

function authenticate() {
    return new Promise(function (resolve, reject) {
        fritzBox.auth({ host: config.fritzBoxHost }, [config.fritzBoxPassword], function (err, result) {
            if (err) {
                reject(err);
                return;
            }

            var sid = result.sid;
            // console.log('Login successful. SID: ' + sid);
            resolve(result.sid);
        });
    });
}

function getConnectedHosts(sid) {
    return new Promise(function (resolve, reject) {
        fritzBox.devices.list({ host: config.fritzBoxHost, sid: sid }, null, function (err, result) {
            if (err) {
                reject(err);
                return;
            }

            // console.log(result);
            resolve(result.results);
        });
    });
}

function logError(err) {
    console.error(err);
}

function createResult(hosts) {
    var results = {
        online: 0,
        devices: {}
    };

    _.forIn(config.macAdresses, function (val, key) {
        var deviceInfo = _.find(hosts, { 'mac': val });
        results.devices[key] = deviceInfo;
        if (deviceInfo && deviceInfo.state) {
            results.online = results.online + 1;
        }
    });
    return results;
}

function main(newConfig) {
    config = newConfig;
    return authenticate().then(getConnectedHosts).then(createResult);
}

module.exports = main;
