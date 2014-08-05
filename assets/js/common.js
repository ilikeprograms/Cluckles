$(function () {
	// Find all links with have a _blank target
	var externalLinks = document.querySelectorAll('a[target="_blank"]'),
		superText = document.createElement('sup'),
		extIcon = document.createElement('i'),
		spacer = document.createTextNode(String.fromCharCode(160)); // 160 = &nbsp;

	// Wrap the Icon in <sup></sup>
	superText.appendChild(extIcon);

	// Create an external-link FontAwesome icon
	extIcon.classList.add('fa');
	extIcon.classList.add('fa-external-link');

	// Itterate over each of the externalLinks found (slice to turn from Array-like object to Array)
	Array.prototype.forEach.call(Array.prototype.slice.call(externalLinks), function (link) {
		link.appendChild(spacer.cloneNode(true)); // Append an &nbsp;
		link.appendChild(superText.cloneNode(true)); // Append the <sup>{fa icon}</sup>
	});
});