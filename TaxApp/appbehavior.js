//JS file for events & behavior in TaxApp solution, Kellan Nealy, 3/11/2015
	
	//-----TO IMPLEMENT
	//scanning, scanned, item info injected w/ big X button so user can rescan, "add to cart" button change

"use strict";

(function(){

	//-Application Labels- can be thought of as chosen titles of different "pages" in an asynchronous front-end app
	var APP_LABELS = ["input", "scan", "cart"];
	var APP_ID = "app";
	var curLabel = "";
	
	//separate module vars for TaxApp
	//-----USER INFO FORMAT: City, State, Zip, Name, Age
	var userinfo = ["", "", "", "", ""];
	var thisCart = [];
	var possibleItems = ["Chicken Breast", "Planters' Peanuts", "Fruit Roll-ups",
		"Neopolitan Ice-Cream", "BBQ Pringles"];
	
	/* Different HTML structural data can be stored for dynamic application re-population */
	
	var INPUT =
				"<h1 class=\"e\">TaxApp</h1>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h3 class=\"e\">Enter some information to get started!</h3>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h2 class=\"e\">Location:</h2>" +
				"<ul class=\"e\">" +
					"<li>City (<em>ex. Seattle</em>): <input name=\"city\" type=\"text\" size=\"12\"/></li>" +
					"<li>State (<em>ex. WA</em>): <input name=\"state\" type=\"text\" size=\"12\"/></li>" +
					"<li>Zip Code (<em>ex. 98105</em>): <input name=\"zip\" type=\"text\" size=\"8\"/></li>" +
				"</ul>" +
				"<h2 class=\"e\">Personal:</h2>" +
				"<ul class=\"e\">" +
					"<li>Name (<em>ex. Chris</em>): <input name=\"name\" type=\"text\" size=\"12\"/></li>" +
					"<li>Age (<em>ex. 12</em>): <input name=\"age\" type=\"text\" size=\"8\"/></li>" +
				"</ul>" +
				"<span>$</span>" +
				"<div class=\"e\" id=\"button\">Submit!</div>";
	
	var SCAN =
				"<h1 class=\"e\">TaxApp</h1>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h3 class=\"e\">Scan barcode or input any store item!</h3>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h2 class=\"e\">Camera Scanner:</h2>" +
				"<img src=\"https://image.flaticon.com/icons/svg/263/263108.svg\" alt=\"camera\" id=\"camera\" />" +
				"<ul><li>Item (scan/input): <input name=\"item\" type=\"text\" size=\"12\" /></li></ul>" +
				"<span>$</span>" +
				"<div class=\"e\" id=\"button\">Scan!</div>";
				
	var CART =
				"<h1 class=\"e\">TaxApp</h1>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h3 class=\"e\">Welcome to your cart!</h3>" +
				"<div class=\"e\" id=\"bar\"></div>" +
				"<h2 class=\"e\">Cart:</h2>" +
				"<img src=\"https://image.flaticon.com/icons/svg/204/204283.svg\" alt=\"cart\" id=\"cart\" />" +
				"<ul><li>State Sales Tax: WA <strong>6.5%</strong></li></ul>" +
				"<span>$</span>" +
				"<div class=\"e\" id=\"button\">Scan Again!</div>" +
				"</div>";
				
	window.onload = function() {
		changeTo("input"); //start TaxApp with "input" label
	};
	
	//changes the current load of TaxApp with label parameter
	function changeTo(label) {
		curLabel = label;
		populate();
		setEvents();
	}
	
	function parseInput() {
		//Info to be outputted to scan/cart
		var inputs = document.querySelectorAll("li input"); //CSS selector for inputs
		var len = inputs.length;
		
		for (var i = 0; i < len; i++) {
			var info = inputs[i].value;
			if (info.length > 0) {
				//make first letter of name capitalized, should be done when OUTPUTTING
				if (i == 3) {
					info = info.replace(info.charAt(0), info.charAt(0).toUpperCase());
				}
				//store user info in module variable
				userinfo[i] = info;
			} else {
				userinfo[i] = "None";
			}
		}
		changeTo("scan");
	}	
	
	function populate() {
		var element = get(APP_ID);
		
		if (curLabel === "input") {
			element.innerHTML = INPUT;
			
		} else if (curLabel === "scan") {
			element.innerHTML = SCAN;
			document.querySelector("h1").innerHTML += " USER: " + userinfo[3] + ", " + userinfo[0];
			
		} else if (curLabel === "cart") {
			element.innerHTML = CART;
			document.querySelector("h1").innerHTML += " USER: " + userinfo[3] + ", " + userinfo[0];
			
		}
	}
	
	//sets event handlers from certain page-loads of TaxApp
	//-----NOTE: each event handler function MUST NOT have parameters, and MUST call changeTo()
	function setEvents(label) {
		//events for input page
		if (curLabel === "input") {
			get("button").onclick = parseInput;
			
		//events for scan page
		} else if (curLabel === "scan") {
			get("button").onclick = scan;
		
		/*-----implement constant check for manual item input
			while (true) {
				var item = getInput("item");
				if (item.length > 0)
					scan(item);
		}*/
		
		//events for cart page
		} else if (curLabel === "cart") {
			get("button").onclick = scanAnother;
		}
	}
	
	function scan() {
		var area = document.querySelector("li");
		var input = getInput("item")[0];
		var manualItem = input.value;
		
		area.removeChild(input);
		
		var toAdd = (manualItem.length == 0 ? "Chicken" : manualItem);
		document.querySelector("li").innerHTML += toAdd + " : $8.99";
		get("button").innerHTML = "Go to cart!";
		get("button").onclick = goToCart;
	}
	
	function scanAnother() {
		changeTo("scan");
	}
	
	function goToCart() {
		changeTo("cart");
	}
	
	function get(id) {
		return document.getElementById(id);
	}
	
	function classes(className) {
		return document.querySelectorAll("." + className);
	}
	
	function getInput(name) {
		return document.getElementsByName(name);
	}
	
	function clear() {
		get(APP_ID).innerHTML = "";
	}
	
	function working() {
		var working = document.createElement("p");
		working.innerHTML = "Working<br />.....";
		var app = get("app");
		app.appendChild(working);
		setTimeout(function(){}, 2000);
	}
	
})();