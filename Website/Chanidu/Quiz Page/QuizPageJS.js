document.getElementById("button").addEventListener("click", function(){ //adding eventlistener to button to start quiz

	const timeoutDuration = 120 * 1000; // Timeout duration: 120 seconds
    let endTime = Date.now() + timeoutDuration; // Calculate end time

    // Function to check if time has expired
    function isTimeExpired() {
        return Date.now() >= endTime;
    }

	let totPoints = 0;
	const points = [];	// store points for each question
	const usedValues = []; // add used random values 
	const realAnswers = ["bacteria", "body mass index", "stroke", "viruses", "migraine", "heart", "melanin", "appendicitis"];
	const questions = ["What is the primary cause of cavities in teeth?", "What does BMI stand for?"
	,"What is the term for a sudden interruption of blood flow to the brain?","What is the primary cause of the common cold?"
	,"What is another term for a headache?", "What is the organ responsible for pumping blood throughout the body?"
	, "What is the name of the pigment responsible for the color of human skin?", "What is the medical term for inflammation of the appendix?"];
	
	for(let i = 0; i < 5; i++){ // looping 5 times to choose 5 questions
		let value;
		do{
			value = Math.floor(Math.random()*7 + 1); // generate random number between 0 and 7
		}
		while(usedValues.includes(value)); // check if value is in usedValues
		usedValues[i] = value; // add value to usedValues
		
		let remainingTime = Math.ceil((endTime - Date.now()) / 1000); // Remaining time in seconds
        let promptMessage = `Time Remaining: ${remainingTime} seconds\n\n${questions[value]}`;

        let ans = prompt(promptMessage);
		
		if (isTimeExpired()) { // check loop terminating condition
			alert("You ran out of time.");
			document.getElementById("button").innerHTML = "Try Again";
            break;
        }
		
		if(ans.toLowerCase() == realAnswers[value]){ // check if answer is correct
			totPoints = totPoints + 2; // increase total points
			points[i] = 2; // add points to array
		}
		else{
			totPoints = totPoints - 1; // decrease total points
			points[i] = -1; // add points to array
		}
	}
	
	for (let i = 0; i < points.length; i++) {
        document.getElementById("score" + (i + 1)).innerHTML = points[i]; //displaying points in web page
    }

	
	if(totPoints <= 0){ // conerting negative points to 0
		totPoints = 0;
	}
	// displaying total points and message regarding discount
	document.getElementById("totalScore").innerHTML = "Total Score = " + totPoints;
	document.getElementById("message").innerHTML = "You have earned "+totPoints+ " points, please claim the points in your next purchase.";
	
	// Set the value in LocalStorage to send to shopping page
	localStorage.setItem('score', totPoints);
	
});