const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const loansAPIData = require('../server/data/loans');

server.post('', (req, res, next) => {
	loansAPIData.calculate['loanAmount'] = req.body['requestedAmount'];
	handleAndValidate(req, res, next);
});

server.listen(3000, () => { });

function handleAndValidate(req, res, next) {
	const fieldConditions = [
		{ field: 'requestedAmount', min: 20000000, max: 50000000, message: 'Requested Amount incorrect' },
		{ field: 'monthlyIncome', min: 500000, max: 1e+20, message: 'Monthly income incorrect' },
		{ field: 'loanTerm', min: 36, max: 360, message: 'Loan term incorrect' }
	];

	let errorFields = [];

	for (let condition of fieldConditions) {
		if (req.body[condition.field] < condition.min || req.body[condition.field] > condition.max) {
			errorFields.push({ params: condition.field, message: condition.message });
		}
	}

	if (errorFields.length > 0) {
		loansAPIData.calculate_error = { general: {}, fields: errorFields };
		return res.status(400).send(loansAPIData.calculate_error);
	}

	return res.status(200).send(loansAPIData.calculate);
}
