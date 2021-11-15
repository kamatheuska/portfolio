const { getWhoami } = require('../whoami');

let res;
let req;

describe('🌳  Whoami Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('🌴 getWhoami', () => {
        beforeEach(() => {
            res = { locals: {}, send: jest.fn() };
            req = {
                ip: '127.168.0.1',
                headers: {
                    'accept-language': 'en-US,en;q=0.9',
                    'user-agent':
                        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                },
            };

            getWhoami(req, res);
        });

        it('🌱 should call res.send() with a whoami object', () => {
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({
                ipaddress: req.ip,
                language: req.headers['accept-language'],
                software: req.headers['user-agent'],
            });
        });
    });
});
