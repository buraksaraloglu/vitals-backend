const moment = require('moment');

const isValidDateRange = ({startDate, endDate}) => moment(startDate).isAfter(endDate);

const getValidDates = ({ startDate, endDate }) => {
	if(!isValidDateRange({ startDate, endDate })) {
		return {
			startDate: moment().subtract(30, 'minutes').toISOString(),
			endDate: moment().toISOString(),
		};
	}

	return { startDate, endDate };
};

module.exports = { getValidDates };
