/*
	JavaScript for a modal window
	
	Source: http://www.w3schools.com/howto/howto_css_modals.asp
	Date: November 11, 2017
*/

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("shopStatus");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onmouseover = function() {
	// display the pop-up
    modal.style.display = "block";
	
	// this function exists in script.js and populates the pre-shopping cart pop-up where a user can remove items from their cart
	displayShoppingCart();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
