import getType from '../getType'
import getResultOfMultipleEqualities from './Equality/getResultOfMultipleEqualities'
import getResultOfOperation from './getResultOfOperation'
import getReturnedValueByFunction from './getReturnedValueByFunction'

export default value => {
	if (getType(value) === 'equality') {
		return getResultOfMultipleEqualities(value)
	}

	if (getType(value) === 'operation') {
		return getResultOfOperation(value)
	}

	if (getType(value) === 'function') {
		return getReturnedValueByFunction(value)
	}

	return value
}