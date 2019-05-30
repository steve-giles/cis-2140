<!DOCTYPE html>
<html>
	<head lang="en">
		<title>eCommerce Website Template</title>
		<link rel="stylesheet" type="text/css" href="styles/style.css">
		<link rel="stylesheet" type="text/css" href="styles/menu.css">
		<script src="scripts/script.js"></script>	
		</head>
	<body>
		<header>
			<div id="shopStatus">
				<span>Products:</span><span id="productsInCart"></span>
			</div>
			<h1>CSI-2140 eCommerce Template</h1>
			<h2>
				<span>Message Sent</span>
			</h2>
		</header>
		<nav>
			<ul>
				<li><a href="index6.html">Home</a></li>
				<li><a href="shop.html">Shop</a></li>
				<li><a href="checkout.html">Checkout</a></li>
				<li><a href="login.html">Login</a></li>
				<li><a href="register.html">Register</a></li>		
				<li class="searchButton"><a href="search.html">Search</a></li>	
			</ul>			
		</nav>
		<main>
			<?php
				$firstName = $_POST["firstName"];
				$lastName = $_POST["lastName"];
				$email = $_POST["email"];
				$phone = $_POST["phone"];
				$reason = $_POST["reason"];
				$comments = $_POST["comments"];
				
				echo '<h3>Your message was sent</h3>';
				
				echo '<div>';
				echo "First Name: $firstName <br>";
				echo "Last Name: $lastName <br>";
				echo "Email: $email <br>";
				echo "Phone: $phone <br>";
				echo "Reason for contact: $reason <br>";
				echo "Comments: $comments <br>";
				echo '</div>';				
			?>
		</main>
		<footer>
			<span>CSI-2140 eCommerce Template</span>
			<div>
				<a href="productlist.html" alt="Listing of products" title="Product Listing">Product List</a>&nbsp;|&nbsp;
				<a href="#" alt="Privacy policy not yet completed" title="View our Privacy Policy">Privacy Policy</a>&nbsp;|&nbsp;
				<a href="#" alt="Contact Us not yet completed" title="Contact Us">Contact Us</a>
			</div>
		</footer>
	</body>
</html>
