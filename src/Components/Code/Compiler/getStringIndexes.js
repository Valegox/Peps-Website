export default (source, find) => {
  if (!source) {
    return [];
  }
  if (!find) {
      return source.split('').map(function(_, i) { return i; });
  }
  var result = [];
  var i = 0;
  while(i < source.length) {
    if (source.substring(i, i + find.length) === find) {
      result.push(i);
      i += find.length;
    } else {
      i++;
    }
  }
  return result;
}