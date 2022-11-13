import Random from '../../../utils/random.js';

export default class QuotesService {
	constructor(quotes = []) {
		this.quotes = quotes;
	}

	getAuthoredQuotes() {
		return this.quotes.filter(quote => Boolean(quote.author));
	}

	getRandomAuthoredQuote(previous = null) {
		const quotes = this.getAuthoredQuotes();
		const integer = Random.nonConsecutiveInteger(0, quotes.length, Number(previous));

		return quotes[integer];
	}
}
