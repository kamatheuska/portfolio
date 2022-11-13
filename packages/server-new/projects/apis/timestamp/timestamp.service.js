import createError from 'http-errors';

export default class TimestampService {
	static create(date = new Date()) {
		const unix = date.getTime();

		if (!unix) {
			throw TimestampService.dateError();
		}

		return {
			unix,
			utc: date.toUTCString(),
		};
	}

	static parseAndCreate(dateString) {
		const parsedDate = TimestampService.parseDate(dateString);
		const date = new Date(parsedDate);

		return TimestampService.create(date);
	}

	static parseDate(dateString) {
		const parsed = Number(dateString);
		const date = Number.isNaN(parsed) ? decodeURI(dateString) : parsed;

		if (!date) {
			throw TimestampService.dateError();
		}

		return date;
	}

	static dateError() {
		return createError(400, 'Invalid Date', { error: 'Invalid Date' });
	}
}
