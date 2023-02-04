export default class Random {
  static integer(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  static nonConsecutiveInteger(min, max, previous) {
    const integer = Random.integer(min, max);

    if (integer !== previous) {
      return integer;
    }

    return Random.nonConsecutiveInteger(previous);
  }
}
