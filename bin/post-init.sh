#!/bin/bash
sed -i "s/protocol: 'ws',/protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',/g" node_modules/react-dev-utils/webpackHotDevClient.js