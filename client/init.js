import '6to5/polyfill';

import { Request } from 'superagent';

Request.prototype.exec = function() {
    let req = this;

    return new Promise ((resolve, reject) => {
        req.end((error, res) => {
            if (error) return reject(error);
            resolve(res);
        });
    });
};