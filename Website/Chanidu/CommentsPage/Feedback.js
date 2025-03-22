document.getElementById("form1").addEventListener('submit', function(event) { // adding eventlistener to submit the form
	event.preventDefault(); // preventing default behaviour of the form
	
	// getting the inouts
	let fName = document.getElementById("fName").value;
	let lName = document.getElementById("lName").value;
	let email = document.getElementById("email").value;
	let test;
	
	// validating the inputs
	if (fName.trim() === "") {
		alert("First Name must be filled out");
		return;
	} else if (lName.trim() === "") {
		alert("Last Name must be filled out");
		return;
	} else if (email.trim() === "") {
		alert("Email must be filled out");
		return;
	} else {
		const regex = /@/;
		test = regex.test(email); // check if email has an @ sign
		if (!test) { 
			// if no @ sign is present
			alert("Enter a valid email address");
			return;
		}
	}

	// setting the data in the popup
	let popup = document.getElementById("popup");
	let overlay = document.getElementById("popOverlay");
	document.getElementById("popName").innerHTML = "Name:  " + fName + " " + lName;
	document.getElementById("popEmail").innerHTML = "Email:  " + email;
	document.getElementById("popSubject").innerHTML = "Subject:  " + document.getElementById("theme").value;
	document.getElementById("popDetails").innerHTML = "Details:  " + document.getElementById("querydetail").value;
	// displaying data in the summary popup if data is valid
	overlay.style.display = 'block';
	popup.style.display = 'block';
	
	// reloading page to refresh the form
	document.getElementById('popButton').onclick = function() {
		location.reload();
	};
});