<!DOCTYPE html>
<html>
	<head lang="en">
		<title>eCommerce Website Template</title>
		<link rel="stylesheet" type="text/css" href="styles/style.css">
		<link rel="stylesheet" type="text/css" href="styles/layout.css">
		<link rel="stylesheet" type="text/css" href="styles/menu.css">		
		<link rel="stylesheet" type="text/css" href="styles/modal.css">		
		<script src="scripts/script.js"></script>
	</head>
	<body onload="shopPageLoaded()">
		<header>
			<div id="productAdded">				
			</div>
			<div id="shopStatus">
				<img src="images/cart.jpg" alt="Shopping Cart" title="view shopping cart" >
				<span id="productsInCart"></span>
			</div>			
			<h1>CSI-2140 eCommerce Template</h1>
			<h2>
				<span>My Account</span>
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
				$page_name = basename($_SERVER['HTTP_REFERER']);
				$userInfo = explode(";", getUser());
				$file = "users.txt";
				$success = False;
								
				$user = "";
				$password = "";
				
				// parse user information from the database
				if (count($userInfo) > 1) {
					$user = $userInfo[0];
					$password = $userInfo[1];			
				}
				
				// check calling page
				if ($page_name == "login.html")
				{
					if (count($userInfo) > 1) {
						$passwordEntered = $_POST["passwordId"];
						if ($password == $passwordEntered) {
							echo "<h3>Manage My Account</h3>";
							echo "You have been authenticated and granted access to the web site <br />";
							$success = True;
						} else {
							echo "Invalid password";
						}
					} else {
						echo "User not found.";					
					}
				} elseif ($page_name == "register.html") {
					if (count($userInfo) > 1) {
						echo "User already exists. Please choose a different user id. <br />";
					} else {
						$firstName = $_POST["firstName"];
						$lastName = $_POST["lastName"];
						$email = $_POST["email"];
						$userId = $_POST["userId"];
						$password = $_POST["password"];
					
						$txt = "$userId;$password;$firstName;$lastName;$email;".PHP_EOL;
						$append_response = file_put_contents($file, $txt, FILE_APPEND | LOCK_EX);
						if (($append_response === false) || ($append_response == 0)) {
							print "Couldn't update user file: $file";
						} else {						
							echo "<h3>Manage My Account</h3>";
							echo "You have been registered and granted access to the web site <br />";
							$success = True;
						}
					}
				}
				
				if ($success) {
					displayUserInfo();
				}
				
				// get user information from the database
				function getUser() {
					$userId = $_POST["userId"];
					$file = "users.txt";
				
					$source_file = fopen( $file, "r" ) or die("Couldn't open $file");

					while(!feof($source_file))
					{				
						$stringRead = fgets($source_file);
						$parsedString = explode(";", $stringRead);
						if ($parsedString[0] == $userId) {
							fclose($file);
							return $stringRead;
						}
					}			
				
					fclose($file);
					return NULL;
				}
				
				// displays all user info 
				function displayUserInfo() {
					$userId = $_POST["userId"];
					
					$file = "users.txt";
				
					$source_file = fopen( $file, "r" ) or die("Couldn't open $file");

					while(!feof($source_file))
					{				
						$stringRead = fgets($source_file);
						$parsedString = explode(";", $stringRead);
						if ($parsedString[0] == $userId) {
							echo "<div><br />";
							echo "User Id: $parsedString[0]<br />";					
							echo "First name: $parsedString[2]<br />";					
							echo "Last name: $parsedString[3]<br />";					
							echo "Email: $parsedString[4]<br />";					
							echo "</div>";
							fclose($file);
							return "";
						}
					}			
				
					fclose($file);			
				}
			?>
		</main>
		<footer>
			<span>CSI-2140 eCommerce Template</span>			
			<div>
				<a href="productlist.html" alt="Listing of products" title="Product Listing">Product List</a>&nbsp;|&nbsp;
				<a href="#" alt="Privacy policy not yet completed" title="View our Privacy Policy">Privacy Policy</a>&nbsp;|&nbsp;
				<a href="contactus.html" alt="Contact Us" title="Contact Us">Contact Us</a>
			</div>
		</footer>
	</body>
</html>