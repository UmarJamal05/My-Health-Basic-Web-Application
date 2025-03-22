	
	//To validate the form
	  function validateForm() {
		var name = document.getElementById('name').value.trim();
		var number = document.getElementById('number').value.trim();
		var email = document.getElementById('email').value.trim();
		var address = document.getElementById('address').value.trim();

		// Check if any of the fields are empty
		if (name === '' || number === '' || email === '' || address === '') {
		  alert('Please fill in all the fields');
		  return false; // Prevent form submission
		}
		
		// Check email format using a simple regex
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
		  alert('Please enter a valid email address.');
		  return false; // Prevent form submission
		}

		// If all validations pass, allow form submission
		return true;
	  }
	  
	 
	//To calculate discount from quiz marks
	function calculateDiscount() {
    // Retrieve the total marks from localStorage
    var score = parseInt(localStorage.getItem('score'));
    
    // Check if the score is NaN
    if (isNaN(score)) {
        score = 0; // Set score to 0 if NaN
    }
    
    // Calculate the discount percentage based on the total marks
    var discountPercentage = score ; 

    // Update the discount percentage display
    document.querySelector('.discount_percentage').textContent = 'Discount (' + score + ' scores): ' + discountPercentage.toFixed(2) + '%';

    // Update the bill summary
    updateBillSummary();
	}


	  
		// Function to handle adding a product to the cart
		function addToCart(productName, quantity, price) {

        // Create a new cart item element
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
		
		// Construct the HTML for the cart item using string concatenation
cartItem.innerHTML = '<span class="item-name">' + productName + '</span> - <span class="quantity">' + quantity + '</span> x <span class="price">' + price + '</span> <button class="remove-btn" onclick="removeItem(event)">remove</button>';

        // Append the cart item to the cart section
        document.querySelector('.cart-items').appendChild(cartItem);
        
        // Update the bill summary
        updateBillSummary();
		
		// Update the quantity available for the product
    updateQuantityAvailable(productName, quantity);
		
		// Increment cart count
        updateCartCount(1);
    } 
	
	
	// Function to update the quantity available for the product
	function updateQuantityAvailable(productName, quantity) {
		var products = document.querySelectorAll('.product');
		products.forEach(function(product) {
			var productNameElement = product.querySelector('.product-name');
			if (productNameElement.textContent === productName) {
				var quantityAvailableElement = product.querySelector('.quantity-available');
				var currentQuantityAvailable = parseInt(quantityAvailableElement.textContent);
				var newQuantityAvailable = currentQuantityAvailable - quantity;
				quantityAvailableElement.textContent = newQuantityAvailable;
			}
		});
	}
		
	// Function to update the cart count
    function updateCartCount(count) {
        var cartCount = document.getElementById('cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + count;
    }


		// Function to update the bill summary
		function updateBillSummary() {
        var subtotal = 0;
        var cartItems = document.querySelectorAll('.cart-item');

        // Calculate subtotal
        cartItems.forEach(function(item) {
            var price = parseFloat(item.querySelector('.price').textContent);
            var quantity = parseInt(item.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });
		
		// Calculate total after discount
        var score = parseInt(localStorage.getItem('score'));
		// Check if the score is NaN
		if (isNaN(score)) {
			score = 0; // Set score to 0 if NaN
		}
		// Calculate the discount percentage based on the total marks
		var discountPercentage = score ; 
        var discountAmount = subtotal * (discountPercentage / 100);
        var total = subtotal - discountAmount;

        // Update subtotal display
        document.querySelector('.subtotal').textContent = 'Subtotal: $' + subtotal.toFixed(2);

		// Update discount display
        document.querySelector('.discount_percentage').textContent = 'Discount (' + score + ' scores): ' + discountPercentage.toFixed(2) + '%';
		
        // Calculate and update total
        document.querySelector('.total').textContent = 'Total: $' + total.toFixed(2);
    }

	//Disabling the place order button before any selection of product
    function updatePlaceOrderButton() {
        var placeOrderBtn = document.getElementById('place-order-btn');
        var cartItems = document.querySelectorAll('.cart-item');
        
        if (cartItems.length > 0) {
            placeOrderBtn.disabled = false; // Enable the button
        } else {
            placeOrderBtn.disabled = true; // Disable the button
        }
    }
    
    // Call the updatePlaceOrderButton function initially
    updatePlaceOrderButton();

    // Add event listener to all "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var productContainer = button.closest('.product');
            var productName = productContainer.querySelector('.product-name').textContent;
            var price = parseFloat(productContainer.querySelector('.product-price').textContent.replace('$', ''));
            var quantity = parseInt(productContainer.querySelector('.quantity-input').value);
            
            // Call addToCart function to add the product to the cart
            addToCart(productName, quantity, price);

            // Reset the quantity input to 1
            productContainer.querySelector('.quantity-input').value = 1;
			
			// Update the "Place Order" button
            updatePlaceOrderButton();

            event.preventDefault(); // Prevent default form submission
        });
    });
	
	
	/// Function to handle removal of an item from the cart
function removeItem(event) {
    // Get the parent element (cart item) of the clicked remove button
    var cartItem = event.target.closest('.cart-item');
    
    // Remove the cart item from the cart section
    cartItem.remove();
    
    // Update the bill summary after removing the item
    updateBillSummary();
}

// Add event listener to all "Remove" buttons
var removeButtons = document.querySelectorAll('.remove-btn');
removeButtons.forEach(function(button) {
    button.addEventListener('click', removeItem);
});


    
    // Function to open the popup and display order summary
    function openPopup(orderSummary) {
        var popupOverlay = document.getElementById('popupOverlay');
        var popupContainer = document.getElementById('orderSummaryPopup');
        var orderSummaryContent = document.getElementById('orderSummaryContent');
        
        // Populate order summary content
        orderSummaryContent.innerHTML = orderSummary;

        // Display the popup
        popupOverlay.style.display = 'block';
        popupContainer.style.display = 'block';
    }
	
	// Add event listener to the "Close" button
    document.getElementById('closeButton').addEventListener('click', closePopup);

    // Function to handle closing the popup
    function closePopup() {
        var popupOverlay = document.getElementById('popupOverlay');
        var popupContainer = document.getElementById('orderSummaryPopup');

        // Hide the popup
        popupOverlay.style.display = 'none';
        popupContainer.style.display = 'none';
		
		location.reload();
    }
	
		
    
    // Function to handle placing an order
    function placeOrder() {
        // Validate the form fields
        if (!validateForm()) {
            return; // Exit the function if the form is not valid
        }

        // Retrieve customer details
        var name = document.getElementById('name').value.trim();
        var number = document.getElementById('number').value.trim();
        var email = document.getElementById('email').value.trim();
        var address = document.getElementById('address').value.trim();

        // Generate order summary
        var orderSummary = "Dear " + name + ", you have ordered:\n";
        var cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            var productName = item.querySelector('.item-name').textContent;
            var quantity = parseInt(item.querySelector('.quantity').textContent);
            var price = parseFloat(item.querySelector('.price').textContent);
            orderSummary += quantity + " " + productName + " at a cost of $" + (quantity * price).toFixed(2) +", " + "\n";
        });

        // Calculate total bill from the bill summary
        var total = parseFloat(document.querySelector('.total').textContent.replace('Total: $', ''));

        // Display order summary in a popup window
        orderSummary += "Your total bill is $" + total.toFixed(2);
        openPopup(orderSummary);
		localStorage.removeItem('score');
		return false;	
    }
