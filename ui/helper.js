HTMLElement.prototype.classContains = function() {
	var args = arguments;
	if (args.length < 1) {
		return false;
	}

	for (var i = 0; i < args.length; i++) {
		var classList = this.classList;
		if (!classList.contains(args[i])) {
			return false;
		}
	}
	return true;
};
Array.prototype.contains = function() {
	var args = arguments;
	if (args.length < 1) {
		return false;
	}
	for (var i = 0; i < args.length; i++) {
		var found = false;
		for (var aIndex = 0; aIndex < this.length; aIndex++) {
			if (this[aIndex] === args[i]) {
				found = true;
				break;
			}
		}
		if (found) {
			return true;
		}
	}
	return false;
};