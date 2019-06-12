/*
     Global Variables
*/

// Create an array named shoppingCart to store products added to the users cart
var shoppingCart = new Array(0);

/**
 * @script.js
 * Provides features for the eCommerce template.
 *
 * This file contains example functions for the eCommerce website template.
 */
 
/**
 * @desc This example demonstrates how to define a custom JavaScript object
 * @param userId The users login id
 * @param password The users password
 * @param password The users first name
 * @param password The users last name
 * @param password The users email address 
 * @return void
 */
function user(userId, password, firstName, lastName, eMailAddress) {
	this.userId = userId;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.eMailAddress = eMailAddress;
	
	// this function returns the users id
	this.getUserName = function() {
		return this.userId;
	}

	// this function returns the users password
	this.getUserPassword = function() {
		return this.password;
	}	
	
	// this function returns the users full name (first name concatenated with lastName
	this.fullName = function() {
		// returns the users first name (this.firstName concatenated with a space, and then concatenated with the // users last name (this.lastName).
		return this.firstName + " " + this.lastName;
	}
}

/**
 * @desc Product object
 * @param productId product identifier
 * @param description Description of the product
 * @param price Price of the product
 * @return void
 */
function product(productId, description, price, quantity) {
	this.productId = productId;
	this.description = description;
	this.price = price;
	this.quantity = quantity;
	
	this.getProductId = function() {
		return this.productId;
	}

	this.getProductDescription = function() {
		return this.description;
	}	

	this.getProductPrice = function() {
		return this.price;
	}	

	this.getProductQuantity = function() {
		return this.quantity;
	}	
	
}
 
/**
 * @desc This example demonstrates how to implement the onload event and have the event call a function
 * @param void
 * @return void
 */
function homePageLoaded() {
	// If the user previously logged in and enabled "remember me" then get the user id and previous login date/time
	// from the previously saved cookies and display a message in the top right corner of the screen such as
	// "Welcome back [userid]. Previous login at [previousDateTimeLogin]"
	
	var userId = getCookie("userid");
	if (userId != "") {
		var loginDateTime = getCookie("loginDateTime");
		var userName = document.getElementById("shopStatus");
		userName.innerHTML = "Welcome back " + userId + ". Previous login at " + loginDateTime;
	}
}

/**
 * @desc This function is called when the detailed product page is loaded
 * @param void
 * @return void
 */
function productDetailsPageLoaded() {
	// Using the Windows Object location property, get the url which is currently displayed in your 
	// browser and set this to the variable named url;
	var url = window.location;

	// Using the Windows Object method alert, display a pop-up with the contents of the url.	
	alert(url);
}


/**
 * @desc Called when the login page loaded
 * @param void
 * @return void
 */
function loginPageLoaded() {
	// Get the user id login cookie, and check if the cookie exists.  If so, get the user id from the cookie, populate the user id
	// input element with the user id, and check the remember me check box.
	
	var userId = getCookie("userid");
	if (userId != "") {
		document.getElementById('userId').value = userId;
		document.getElementById("chkRememberMe").checked = true;
	}
}

/**
 * @desc This function is called when the shop page is loaded
 * @param void
 * @return void
 */
function shopPageLoaded() {
	var x;

	// this is an example of using the DOM to get every HTML element with a name of productImage
	x = document.getElementsByName("productImage");

	// for every element, attach the mouseover and mouseout event
	for(i = 0;i < x.length; i++)
	{
		x[i].addEventListener('mouseover',highlightProduct, false);
		x[i].addEventListener('mouseout',unhighlightProduct, false);
	}
	
	x = document.getElementsByName("phoneButton");
	for(i = 0;i < x.length; i++)
	{
		x[i].addEventListener('click',productAdded, false);
	}
	
	// set the number of products in the cart to zero
	document.getElementById("productsInCart").innerHTML = 0;
}

/**
 * @desc This function dynamically loads product data and dynamically builds the HTML using JavaScript
 * @param void
 * @return void
 */
function loadPageData()
{
	var product = document.getElementById("products");
	var productDescriptionText;
	var productPriceText;
		
	// load all the product dynamically
	for (x = 1; x <= 4; x++) {
		//NOTE - Normally we would load this data using a server side programming language such
		//       as PHP, Java, or C# and a database such as MySql or SQL however for simulation
		//       purposes we are using JavaScript
		switch (x) {
			case 1:
				productDescriptionText = "VTech DS6151 2-Line Expandable Cordless Phone";
				productPriceText = "$142.49";			
				break;
			case 2:
				productDescriptionText = "Panasonic KX-TGE233B 3 Handset Cordless Phone";
				productPriceText = "$65.29";			
				break;
			case 3:
				productDescriptionText = "Advanced American Telephone CRL32102 At&T Crl32102";
				productPriceText = "$48.25";			
				break;
			case 4:
				productDescriptionText = "Corded Telephone With Caller ID, Call Waiting";
				productPriceText = "$32.44";			
				break;
				
		}
		
		var span;
		
		// create the main div for a product
		var node = document.createElement("div");
		node.className = "col-1-4";
		node.setAttribute("id", "product" + x);
		
		// create the container for the product image
		var productImageContainer = document.createElement("div");
		productImageContainer.className = "productImage";
		
		// create the image
		var productImage = document.createElement("img");
		productImage.setAttribute("id", "image" + x);
		productImage.setAttribute("name", "productImage");
		productImage.setAttribute("alt", "phone " + x);
		productImage.setAttribute("title", productDescriptionText);
		productImage.setAttribute("src", "images/product" + x +".jpg");
		productImage.setAttribute("class", "productNoHighlight");
		productImageContainer.appendChild(productImage);

		// create the title
		var productDescription = document.createElement("div");
		productDescription.setAttribute("class", "productDescription");
		var hyperlink = document.createElement("a");
		hyperlink.setAttribute("href", "productdetails.html?productId=phone" + x);
		hyperlink.innerHTML = productDescriptionText;	
		productDescription.appendChild(hyperlink);	
		productImageContainer.appendChild(productDescription);	
		node.appendChild(productImageContainer);

		// create the price
		var productPrice = document.createElement("div");
		span = document.createElement("span"); 
		span.setAttribute("id", "price" + x);		
		var price = document.createTextNode(productPriceText);
		span.appendChild(price); 
		productPrice.appendChild(span);
		productPrice.className = "productPrice";	
		node.appendChild(productPrice);
		
		// create the quantity
		span = document.createElement("span");
		var quantity = document.createTextNode("Qty");
		span.appendChild(quantity);
		node.appendChild(span);
		
		var select = document.createElement("select");
		select.setAttribute("id", "quantity" + x);		
		var option1 = document.createElement("option");
		option1.value=1;
		option1.selected="";
		option1.innerHTML= "1";
		var option2 = document.createElement("option");
		option2.value=2;
		option2.innerHTML= "2";
		var option3 = document.createElement("option");
		option3.value=3;
		option3.innerHTML= "3";
		select.appendChild(option1);
		select.appendChild(option2);
		select.appendChild(option3);
		node.appendChild(select);
		
		// create the button
		var productButton = document.createElement("input");
		productButton.setAttribute("id", x);
		productButton.setAttribute("type", "button");
		productButton.setAttribute("value", "Add to Cart");	
		productButton.setAttribute("name", "phoneButton");	
		productButton.style.marginLeft = "5px";
		node.appendChild(productButton);
		
		product.appendChild(node);
	}
}

/**
 * @desc Process user login request
 * @param void
 * @return void
 */
function userLogin() {
	// this line of code is using the DOM to get the value of the user id entered - we will cover this concept next week
	var userId = document.getElementById('userId').value;
	// this line of code is using the DOM to get the value of the password id entered - we will cover this concept next week
	var password = document.getElementById('passwordId').value;

	//check if userId is empty.  If empty, then alert the user "User id required" and have the function return false;
	if (userId == '') {
		alert('User Id required');
		return false;
	}

	//check if password is empty.  If empty, then alert the user "Password required" and have the function return false;
	if (password == '') {
		alert('Password required');
		return false;
	}

	// This is an example where we create an instance of the user object
	var localUser = new user(userId, password);
	
	// In the top right corner of the screen, using the div with an id of shopStatus, display
	// the text "Welcome [userId]"
	var userName = document.getElementById("shopStatus");
	userName.innerHTML = "Welcome " + userId;
	
	// Check if the user wants to be remembered
	// If the user wants to be remembered, then save the user id to a cookie
	// set the cookie to expire one year from today
	chkRememberMe = document.getElementById("chkRememberMe");
	if (chkRememberMe.checked) {
		var CookieDate = new Date;
		//var currentDateTime = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear() +1);

		document.cookie = "userid=" + userId + ";expires=" + CookieDate.toGMTString() + "; path=/";		
		document.cookie = "loginDateTime=" + Date().toLocaleString() + ";expires=" + CookieDate.toGMTString() + "; path=/";		
	}
	else {
		// Delete the cookie.  You can accomplish this by creating a cookie with an expiration date that any date prior to today
		document.cookie = "userid=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	}
}

/**
 * @desc Users bumits a form to contact us
 * @param void
 * @return void
 */
function contactUs()
{

}

/**
 * @desc This would process a user registration
 * @param void
 * @return void
 */
function registerUser()
{
	// The following lines of code get the data from the form using the DOM
	// For now, don't worry about how this works.  We'll cover this concept next week
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var password = document.getElementById('password').value;
	var confirmPassword = document.getElementById('confirmPassword').value;
	var userId = document.getElementById('userId').value;
	var email = document.getElementById('email').value;

	// verify the passwords match.  If they don't match, alert the user "Passwords do not match" and return false
	if (password != confirmPassword) {
		alert("Passwords must match.");
		return false;
	}
	
	// create a new user - uncomment this line once you've added the three new properties in your user object
	var localUser = new user(userId, password, firstName, lastName, email)
	
	return true;
}
				
/**
 * @desc This function changes the class name for the object 
 * @param void
 * @return void
 */
function highlightProduct() {
	this.className = "productHighlight";
}

/**
 * @desc This function changes the class name for the object passed 
 * @param void
 * @return void
 */
function unhighlightProduct() {
	this.className = "productNoHighlight";
}

/**
 * @desc Add a product to the users shopping cart
 * @param void
 * @return void
 */
function productAdded() {
	// Using the DOM, set the class name for the element with an id of productAdded to "visible"
	document.getElementById("productAdded").className = "visible";		
	
	// using the DOM, in the top left corner of the screen, notify the user that the 
	// product was added to their cart by displaying the text "[productId] was added to your cart" and replace
	// [productId of the id of myObject
	document.getElementById("productAdded").innerHTML = this.id + " was added to your cart ";
	
	// Using the DOM, disable the button that was just clicked so it's not clicked again
	// The user has already added the item to the cart, so we don't want them clicking the button again
	this.disabled = true;
	
	// Using the DOM, in the top right corner of the screen, increment the number of products in the card
	// The number of products is contained in a span element with an id of productsInCart	
	//document.getElementById("productsInCart").innerHTML++;	
	
	// After five seconds, change the class name for the element with an id of productAdded
	// from "visible" to "hidden"	
	window.setTimeout(function() { 
		document.getElementById("productAdded").className = "hidden";
	}, 5000);
	
	// create a product for the shopping cart
	var price = document.getElementById("price" + this.id);
	var description = document.getElementById("image" + this.id);
	var quantity = document.getElementById("quantity" + this.id).selectedIndex + 1;
		
	var Product = new product(this.id, description.title, price.innerHTML, quantity);
	
	// Add this item to your shopping cart
	shoppingCart.push(Product);

	// Loop shopping cart array and get number of products in cart	
	updateProductQuantity();
}

/**
 * @desc Updates the UI with the number of products in the users shopping cart
 * @param void
 * @return void
 */
function updateProductQuantity() {
	var totalQuantity = 0;
	for (var x=0; x <= shoppingCart.length-1; x++) {
		var myproduct = shoppingCart[x];
		totalQuantity += myproduct.getProductQuantity();
	}
	document.getElementById("productsInCart").innerHTML = totalQuantity;
}

/**
 * @desc Displays a pop-up with the contents of the users cart and allows the user to remove items from their cart
 * @param void
 * @return void
 */
function displayShoppingCart() {
	var container;
	var Product = new product();
	container = document.getElementById("shoppingCartPreview");
	container.innerHTML = "";
	var td;
	var productId;
	var productDescriptionText;
	
	if (shoppingCart.length == 0) {
		container.innerHTML = "There are no items in your cart.";
	}
	else {
		var tableRow = document.createElement("tr");
		for (x = 0; x <= shoppingCart.length - 1; x++) {
			Product = shoppingCart[x];
			productId = Product.getProductId();
			productDescriptionText = Product.getProductDescription()
			productQuantity = Product.getProductQuantity();
			
			td = document.createElement("td");
					
			// create the image
			var productImage = document.createElement("img");
			productImage.setAttribute("src", "images/product" + productId +".jpg");	
			td.appendChild(productImage);
		
			// create the title
			var productDescription = document.createElement("div");
			productDescription.setAttribute("class", "productDescription");
			var span = document.createElement("span");
			span.innerHTML = productDescriptionText;
			productDescription.appendChild(span);	
			td.appendChild(productDescription);	

			// display the remove button
			var productButton = document.createElement("input");
			productButton.setAttribute("id", productId);
			productButton.setAttribute("type", "button");
			productButton.setAttribute("value", "Remove from Cart (" + productQuantity + ")");	
			productButton.addEventListener('click',removeFromCart, false);
			td.appendChild(productButton);
		
			// add the td to the table row
			tableRow.appendChild(td);
		}
		// add the row to the container
		container.appendChild(tableRow);
	}
}

/**
 * @desc Removes the current item from the users shopping cart
 * @param void
 * @return void
 */
function removeFromCart() {
	var productId;

	// iterate over all items in the cart
	for (x = 0; x <= shoppingCart.length - 1; x++) {
		Product = shoppingCart[x];
		productId = Product.getProductId();
		// check if this is the product which we want to delete
		if (this.id == productId) {
			shoppingCart.splice(x, 1);
			break;
		}
	}
	
	updateProductQuantity();
	
	// this variable is defined in modal.js
	modal.style.display = "none";
}

/**
 * @desc Gets a cookie
 * @param cookieName - name of cookie
 * @return cookie data
 */
function getCookie(cookieName) {
    var name = cookieName + "=";
	// data for every cookie saved from this domain
    var cookieArray = document.cookie.split(';');
	
	// iterate over every cookie, searching for the cookieName
    for(var i = 0; i <cookieArray.length; i++) {
        var c = cookieArray[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
		// cookie name was afound
        if (c.indexOf(name) == 0) {
			// return the data for this cookie
            return c.substring(name.length,c.length);
        }
    }
	
    return "";
}

/**
 * @desc Add a product to the users shopping cart
 * @param status HTTP status - 200 is success.
 * @param response Full response object returned from the payment gateway.
 * @return void
 */
function creditCardResponseHandler(status, response) {
	if (response.error) {
		alert(response.error.message);
	} else {
		alert('Success! Your Authentication token is: ' + response.id + '. This would then automatically be submitted to your server for processing.');	
		
		// To process your data requires Server Side code like Java, PHP, ASP, ASP.NET...		
		// For an example of PHP see http://wiki.wsmoak.net/cgi-bin/wiki.pl?StripeCustomForm
		
		// Call your server to process the data, for example email the customer and update your database (i.e. reduce product quantity).
	}
}

/**
 * @desc Called when the credit card processing form is submitted to get a security token from the payment gateway
 * @param void
 * @return false - prevent the form from submitting
 */
function onPaymentSumbit () {     
	Stripe.card.createToken(document.getElementById('payment-form'), creditCardResponseHandler);
	return false;
};		

