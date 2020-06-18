import getType from '../../getType'
import getResultOrReturn from '../getResultOrReturn'

export default equality => {

	let equalityConvertedToJS = equality
	let valuesToCompare = equality.split(/!=|>=|<=|==|>|</g)

	if (valuesToCompare.length > 2) {
		//THROW ERROR
		console.error('PEPS ERROR: you cannot compare more than 2 values with one comparator.')
		return 'undefined' 

	} else {
		let valueToReturn = 'undefined'
		valuesToCompare.forEach( (value, index) => {

			let filtredValue = value

			if (filtredValue[0] === ' ') {
				filtredValue = filtredValue.substr(1)
			}
			if (filtredValue[filtredValue.length-1] === ' ') {
				filtredValue = filtredValue.slice(0, -1)
			}

			if (getType(filtredValue) === null) {
				//THROW ERRROR
				console.error('PEPS ERROR: you are comparing a value without type.')
				return
			}

			equalityConvertedToJS = equalityConvertedToJS.replace(filtredValue, getResultOrReturn(filtredValue))
		})


		return eval(equalityConvertedToJS)
	}
}