# Fritz!Box Host Tracker
------

Queries the Fritz!Box API for given MAC adresses and returns IPs and connection states.
This script is useful for "is someone at home"-detection scripts.

* Promise-based API
* ES2015
* only one call for all observed MACs

## Install

    npm install git+https://git@github.com/marfnk/fritzbox-host-tracker.git --save

## Usage Example

    const fritzboxHostTracker = require('fritzbox-host-tracker');
    var config = {
        fritzBoxPassword: 'secret',
        fritzBoxHost: 'fritz.box', //or IP
        macAdresses: {
            'Sam\'s Mobile': 'AA:BB:CC:DD:EE:FF',
            'Jessica\'s Laptop': 'AA:00:BB:11:CC:22',
            //...
        }
    };

    fritzboxHostTracker(config)
        .then(function(result) {
            console.log(result); //see example below
        })
        .catch(function(error) {
            console.error(error);
        });

## Response Example

    {
        online: 1,
        devices: {
            'Sam\'s Mobile': {
                id: 'landevice9813',
                name: 'sam-nexus-5',
                address: '192.168.178.101',
                mac: 'AA:BB:CC:DD:EE:FF',
                connection: 'WLAN',
                state: true
            },
            'Jessica\'s Laptop': {
                id: 'landevice9831',
                name: 'android-e92f751a4a1492e',
                address: '192.168.178.100',
                mac: 'AA:00:BB:11:CC:22',
                connection: 'WLAN',
                state: false
            }
        }
    }
