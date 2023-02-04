const { getRandomInteger } = require('.');

class Randomize {
    constructor() {
        this.previousValue = null;
    }

    getNonConsecutiveInteger(minimum, maximum) {
        let isSameIntegerAsBefore;
        let integer;

        do {
            integer = getRandomInteger(minimum, maximum);
            isSameIntegerAsBefore = this.previousValue === integer;
            this.previousValue = integer;
        } while (isSameIntegerAsBefore);
        return integer;
    }

    getRandomItemFromList(list) {
        const integer = this.getNonConsecutiveInteger(0, list.length - 1);
        return list[integer];
    }
}

module.exports = Randomize;
