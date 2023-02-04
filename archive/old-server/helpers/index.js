const isObject = (el) => el !== null && typeof el === 'object';
const isString = (el) => typeof el === 'string' && el.trim();
const isTruthy = (el) => typeof el !== 'undefined' && el !== null && el !== false;

const truthyArguments = (args) => args.reduce((acc, arg) => (!isTruthy(arg) ? false : acc), true);

module.exports = {
    isObject,
    isString,
    isTruthy,
    truthyArguments,
};
