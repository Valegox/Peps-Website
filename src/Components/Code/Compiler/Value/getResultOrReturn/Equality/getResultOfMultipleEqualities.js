import getResultOfEquality from './getResultOfEquality'

export default equalities => {

	//equalities are separated by "and" / "or"

	let equalitiesTranslatedToJS = equalities.replace('or', '||')
	equalitiesTranslatedToJS = equalitiesTranslatedToJS.replace('and', '&&')
	let equalitiesList = equalities.split(/and|or/g)

	equalitiesList.forEach( (equality, index) => {
		if (equality.startsWith(' ')) {
			equalitiesList[index] = equalitiesList[index].substr(1)
		}
		if (equality.endsWith(' ')) {
			equalitiesList[index] = equalitiesList[index].slice(0, -1)
		}

		equalitiesTranslatedToJS.replace(equality, getResultOfEquality(equality))
	})

	return eval(equalitiesTranslatedToJS)
}