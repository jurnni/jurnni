$(document).ready(function() {
	var dayNavBar = document.getElementById("dayNavBarList");
	adjustDayButtons(dayNavBar);
	$(window).resize(function() {
		adjustDayButtons(dayNavBar);
	});
});



function adjustDayButtons(dayNavBar)
{
	var children = dayNavBar.childNodes;
	var parentWidth = dayNavBar.parentElement.scrollWidth;
	var moveRightWidth = 0;
	var moveLeftWidth = 0;
	var totalDayTabWidth = 0
	var childrenSize = children.length;
	for (var i = 0; i < childrenSize; i++) {
		var child = children[i];
		if (!(child.tagName == "li" || child.tagName == "LI")) continue;
		child.style.display = "block";
		if (child.id == "moveRight") {
			moveRightWidth = child.scrollWidth;
			child.style.display = "block";
			continue;
		} else if (child.id == "moveLeft") {
			moveLeftWidth = child.scrollWidth;
		} else {
			totalDayTabWidth += child.scrollWidth;
		}
		child.style.display = "none";		
	}
	
	var totalAvailWidth = parentWidth;
	totalAvailWidth = totalAvailWidth - moveRightWidth;
	var childrenSize = children.length;
	for (var i = 0; i < childrenSize; i++) {
		var child = children[i];
		if (!(child.tagName == "li" || child.tagName == "LI")) continue;
		child.style.display = "block";
		if (child.scrollWidth < totalAvailWidth) {
			child.style.display = "block";
			totalAvailWidth = totalAvailWidth - child.scrollWidth;
			continue;
		} else {
			child.style.display = "none";
		}
		break;
	}
}