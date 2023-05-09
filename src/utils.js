function poll(fn, timeout, interval) {
	const now = Date.now();
	let endTime = now + (timeout || 2000);
	interval = interval || 1;

	let checkCondition = function (resolve, reject) {
		// If the condition is met, we're done!
		let result = fn();
		if (result) {
			resolve(result);
		}
		// If the condition isn't met but the timeout hasn't elapsed, go again
		else if (Date.now() < endTime) {
			setTimeout(checkCondition, interval, resolve, reject);
		}
		// Didn't match and too much time, reject!
		else {
			reject(new Error("timed out for " + fn + ": " + arguments));
		}
	};

	return new Promise(checkCondition);
}

module.exports = { poll };
