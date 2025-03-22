// Function to open the popup
function openPopup() {
    // Getting the popup element by its ID
    var popup = document.getElementById("popup");
    // The popup display style is set to "block" which makes it visible
    popup.style.display = "block";
    // Getting the overlay element by its ID
    let overlay = document.getElementById("overlay");
    // The overlay display style is set to 'block' which makes it visible
    overlay.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    // Getting the popup element by its ID
    var popup = document.getElementById("popup");
    // The popup display style is set to "none" which hides it
    popup.style.display = "none";
    // Getting the overlay element by its ID
    let overlay = document.getElementById("overlay");
    // The overlay display style is set to 'none' which hides it
    overlay.style.display = 'none';
}

// Function to validate the Sign-In form
function validateSignIn() {
    // Getting the value entered in the name field of the form
    var fullName = document.forms["subscribe"]["name"].value;
    // Getting the value entered in the email field of the form
    var email = document.forms["subscribe"]["email"].value;
    // The regular expression to validate the email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Checks if the name or email is not filled or checks if email is invalid
    if (fullName == "" || email == "" || !emailRegex.test(email)) {
        alert("Both the name and email must be filled out.");
        return false; // Return false if validation fails
    } else {
        alert("Dear " + fullName + ", you have successfully subscribed for a personalized newsletter");
        return true; // Return true if validation succeeds
    }
}

// Waiting for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Getting the references to HTML elements
    const backgroundColorSelector = document.getElementById('background-color');
    const textColorSelector = document.getElementById("text-color");
    const resetButton = document.getElementById('reset-button');

    // Set the initial background and text colors
    document.body.style.backgroundColor = backgroundColorSelector.value;
    document.body.style.color = textColorSelector.value;

    // Listen for changes to the background color selector
    backgroundColorSelector.addEventListener('change', (event) => {
        document.body.style.backgroundColor = event.target.value;
    });

    // Listen for changes to the text color selector
    textColorSelector.addEventListener('change', (event) => {
        document.body.style.color = event.target.value;
    });

    // Listen for clicks on the reset button
    resetButton.addEventListener('click', () => {
        // Both the selectors and body colours are resetted to the default values
        backgroundColorSelector.value = 'white';
        textColorSelector.value = 'black';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    });
});    

// The 'review.xml' file is fetched
fetch('review.xml')
    .then(response => response.text()) // Extracting the text content from the response
    .then(xml => {
        // Parse the XML content into an XML document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');

        // Getting all the review nodes from the XML document
        const reviews = xmlDoc.getElementsByTagName('review');

        // Getting the container element where the reviews will be displayed
        const container = document.getElementById('reviews-container');

        // Iterate over each review and display it on the page
        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];

            // The review details are extracted from the XML nodes
            const profileImage = review.getElementsByTagName('profile_image')[0].textContent;
            const name = review.getElementsByTagName('name')[0].textContent;
            const stars = review.getElementsByTagName('stars')[0].textContent;
            const date = review.getElementsByTagName('date')[0].textContent;
            const comment = review.getElementsByTagName('comment')[0].textContent;

            // To display the review details HTML elements are created
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <div class="review-details">
                    <img src="${profileImage}" alt="Profile Image">
                    <div class="info">
						<br>
                        <h2>${name}</h2>
                        <div>${stars}</div>
                        <div>${date}</div>
                    </div>
                </div>
                <p>${comment}</p>
				<br>
				<br>
				<br>
            `;

            // Appending the review element to the container
            container.appendChild(reviewElement);
        }
    })
    .catch(error => {
        // Errors that occur during fetching and parsing are handled
        console.error('Error fetching XML:', error);
    });