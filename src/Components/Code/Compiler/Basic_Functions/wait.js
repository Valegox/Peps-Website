import getType from '../Value/getType'

export default (delay, triggerAfterWait) => {
	
	if (getType(delay) === 'number' && getType(triggerAfterWait) === 'function') {
		setTimeout( () => {
			
			//@TODO
			console.log('execute function')

		}, delay)
	} else {
		console.error('PEPS ERROR: the wait function requires a number as first parameter and a function as second parameter.')
	}
}