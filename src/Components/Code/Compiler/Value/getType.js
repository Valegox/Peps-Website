export default (checkedValue) => {

	if (checkedValue === 'true' || checkedValue === 'false') {
		return 'boolean'
	}

	else if (checkedValue === 'undefined') {
		return 'undefined'
	} 

	else if (!isNaN(checkedValue) && checkedValue.length > 0) {
		return 'number'
	}

	else if (checkedValue[0] === '"' && checkedValue[checkedValue.length-1] === '"') {
		return 'string'
	}

	//equality is future boolean
	else if (checkedValue.includes('==') || checkedValue.includes('!=') || checkedValue.includes('>') || checkedValue.includes('<') ) {
		//let comparatedValues = checkedValue.split('==')
		return 'equality'
	}

	//operation is future number
	else if (checkedValue.includes('+') || checkedValue.includes('-') || checkedValue.includes('*') || checkedValue.includes('/')) {
		return 'operation'
	}

	//function is future returned value
	else if (!checkedValue.startsWith('(') && checkedValue.includes('(') && checkedValue.endsWith(')')) {
		return 'function'
	}

	else {
		return null
	}
}