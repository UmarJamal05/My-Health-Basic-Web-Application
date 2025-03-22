document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;

    if (!name || !email || !age || !gender) {
        alert('Please fill in all required fields.');
    } else {
        alert('Dear ' + name + ', thank you for signing up with us, the recommended results will be shown in a while.');
    }
});
