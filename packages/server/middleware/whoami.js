function getWhoami(req, res) {
    const whoami = {
        ipaddress: req.ip,
        language: req.headers['accept-language'],
        software: req.headers['user-agent'],
    };

    res.send(whoami);
}

exports.getWhoami = getWhoami;
