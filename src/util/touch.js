export function isTouchDevice() {
	// Get device info
	const userAgent = navigator.userAgent.toLowerCase();

	// Check if device is mobile
	const isTouchDevice =
		userAgent.match(/(iphone|ipod|ipad)/) ||
		userAgent.match(/(iPhone)/) ||
		userAgent.match(/(iemobile)/) ||
		userAgent.match(/iphone/i) ||
		userAgent.match(/ipad/i) ||
		userAgent.match(/ipod/i) ||
		userAgent.match(/blackberry/i) ||
		userAgent.match(/bada/i);

	// Return boolean
	return Boolean(isTouchDevice);
}
