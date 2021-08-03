const isObject = (el) => el !== null && typeof el === 'object';
const isString = (el) => typeof el === 'string' && el.trim();
const isTruthy = (el) => typeof el !== 'undefined' && el !== null && el !== false;

const truthyArguments = (args) =>
    args.reduce((acc, arg) => {
        if (!isTruthy(arg)) {
            acc = false;
            return acc;
        }
        return acc;
    }, true);

module.exports = {
    isObject,
    isString,
    isTruthy,
    truthyArguments,
};
