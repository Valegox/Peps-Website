import registerFunction from './Function/registerFunction'

//basic functions triggered code:
import wait from './Basic_Functions/wait'	

export default (code, state, callback) => {

	let linesList = code.split('\n')
	let newState = {...state}
	for (const lineIndex in linesList) {
		let line = linesList[lineIndex]

		//returning functions:
		/*registerFunction('getVar', line, parameters => {
			line = line.replace(('getVar('+parameters[0]+')'), newState.variables[parameters[0]])
		})*/


		//delayed function:
		let lineReservedToWait = false
		registerFunction('wait', line, parameters => {
			lineReservedToWait = true
			wait(parameters[0], parameters[1])
		})

		if (!lineReservedToWait) {
			//effect only functions:
			registerFunction('print', line, parameters => { 
				newState.consoleLogs.push(parameters[0])
			})

			registerFunction('setVar', line, parameters => {
				newState.variables[parameters[0]] = parameters[1] 
			})
		}
	}
	callback(newState, () => {})
}