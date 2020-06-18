import getStringIndexes from '../getStringIndexes'
import getType from '../Value/getType'
import getResultOrReturn from '../Value/getResultOrReturn/getResultOrReturn'

export default (strName, code, triggerFunction) => {

	const indexesRecurrency = getStringIndexes(code, strName+'(')
	// if we want to tolerate space between name and "(": indexesRecurrency.join(getStringIndexes(code, strName+' ('))

	for (const index of indexesRecurrency) {
		let parameters = []
		let i = index + strName.length
		let foundClosingBracket = false
		let operationFinished = false
		let foundOpeningBracket = false //if there's a function as parameter
		while (!foundClosingBracket && !operationFinished) {
			i++
			if (i < code.length) {
				if (code[i] === '(') {
					foundOpeningBracket = true
				}
				if (code[i] === ')') {
					if (foundOpeningBracket) {
						foundOpeningBracket = false
					} else {
						foundClosingBracket = true
					}
				}
				if (!foundClosingBracket) {
					parameters.push(code[i])
				}
			} else {
				operationFinished = true
				//THROW ERROR
				console.error("PEPS ERROR: Missing enclosing bracket in " + strName + "() function")
				return
			}
		}

		parameters = parameters.join('')
		parameters = parameters.split(',')

		let continueOperation = true
		parameters.forEach( (parameter, index) => {

			if (parameter[0] === ' ') {
				parameter = parameter.substr(1)
				parameters[index] = parameter
			}

			parameters[index] = getResultOrReturn(parameter)

			if (getType(parameter) === null) {
				//THROW ERROR
				console.error("PEPS ERROR: Invalid parameter for " + strName + "() function. Choose string, number or boolean type.")
				continueOperation = false
			}
		})

		if (continueOperation) {
			triggerFunction(parameters)
		}
	}
}