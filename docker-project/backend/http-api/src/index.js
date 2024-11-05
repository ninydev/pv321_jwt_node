const SERVER_NAME = process.env.SERVER_NAME || "http module";
const SERVER_HOST = process.env.SERVER_HOST || "0.0.0.0";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

import { createCache } from 'cache-manager';
import redisStore from 'cache-manager-redis-store';

const cache = createCache({
    store: redisStore,
    host: 'vp321.redis', // имя контейнера Redis в docker-compose
    db: 0,
    port: 6379,   // порт Redis по умолчанию
    ttl: 60000000 // Время жизни кэша в секундах
});



// Bad
// const cache = createCache( {
//     store: 'memory',
//     max: 100,
//     ttl: 606868686
// });


import { createServer } from "http";


const httpServer
    = createServer( async (req, res) => {
    console.log('Some request');

    let msg = `<html><body><ul><li>SERVER_NAME = ${SERVER_NAME}</li>`;
    msg += '<li> Cache Var:' + (await cache.get('Var')) + '</li>';
    msg += '<li> Cache MainVar:' + (await cache.get('MainVar')) + '</li>';
    msg += '</ul></body></html>';

    res.end(msg);
})

httpServer.listen(SERVER_PORT, SERVER_HOST,async () => {
    await cache.set('Var', 'Value');
    await cache.set('MainVar', SERVER_NAME);

    console.log(`HTTP Server '${SERVER_NAME}' is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});