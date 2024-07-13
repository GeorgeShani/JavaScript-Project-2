// Form functions
function toggleForm() {
    const overlay = document.getElementById("overlay-container");
    overlay.classList.toggle("show");
    document.body.classList.toggle("no-scroll");
}

const userIcon = document.getElementById("user-icon");
userIcon.addEventListener('click', function() {
    createAuthorizationForm();
    toggleForm();
});

function createRegistrationForm() {
    const overlayContainer = document.getElementById("overlay-container");
    overlayContainer.innerHTML = `
        <form id="filling-form">
            <div class="form-header">
                <div class="form-title">
                    <p>რეგისტრაცია</p>
                </div>
                <button onclick="toggleForm()"  type="button" id="form-close-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="form-body">
                <div class="registration-instructions">
                    <p>რეგისტრაციის დამადასტურებელი ბმული გამოიგზავნება თქვენ მიერ მითითებულ ელ-ფოსტაზე</p>
                </div>
                <div class="email-input-container">
                    <input type="email" id="email-input" placeholder="ელ-ფოსტა" required>
                </div>
                <div class="error-message-container">
                    <p id="error-message"></p>
                </div>
                <div class="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions-check">
                    <p><a target="_blank" href="https://tkt.ge/terms-conditions">ვეთანხმები წესებს და პირობებს</a></p>
                </div>
                <div class="registration-button-container">
                    <button type="button" onclick="checkCredentialsInRegistration()" id="registration-btn">რეგისტრაცია</button>
                </div>
            </div>
            <div class="login-link">
                <button type="button" onclick="createAuthorizationForm()" id="login">უკვე მაქვს ანგარიში</button>
            </div>
        </form>
    `;
}

function createResetPasswordForm() {
    const overlayContainer = document.getElementById("overlay-container");
    overlayContainer.innerHTML = `
        <form id="filling-form">
            <div class="form-header">
                <div class="form-title">
                    <p>პაროლის აღდგენა</p>
                </div>
                <button onclick="toggleForm()"  type="button" id="form-close-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="form-body">
                <div class="reset-password-instructions">
                    <p>პაროლის აღსადგენად, გთხოვთ მიუთითოთ თქვენი ელ-ფოსტა, სადაც გამოგიგზავნით ახალ პაროლს</p>
                </div>
                <div class="email-input-container">
                    <input type="email" id="email-input" placeholder="ელ-ფოსტა" required>
                </div>
                <div class="error-message-container">
                    <p id="error-message"></p>
                </div>
                <div class="reset-password-button-container">
                    <button type="button" onclick="checkCredentialsInPasswordResetting()" id="reset-password-btn">პაროლის აღდგენა</button>
                </div>
            </div> 
        </form>
    `;
}

function createAuthorizationForm() {
    const overlayContainer = document.getElementById("overlay-container");
    overlayContainer.innerHTML = `
        <form id="filling-form">
            <div class="form-header">
                <div class="form-title">
                    <p>ავტორიზაცია</p>
                </div>
                <button onclick="toggleForm()"  type="button" id="form-close-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="authorization-choices">
                <div class="auth-with-facebook">
                    <button type="button" id="auth-with-facebook-btn">
                        <i class="fa-brands fa-facebook"></i> Facebook-ით შესვლა
                    </button>
                </div>
                <div class="division-line">
                    <div class="line-1"></div>
                    <p>ან</p>
                    <div class="line-2"></div>
                </div>
                <div class="filling-form-inputs">
                    <input type="email" id="email-input" placeholder="ელ-ფოსტა" required>
                    <input type="password" id="password-input" placeholder="პაროლი" required>
                    <div class="error-message-container">
                        <p id="error-message"></p>
                    </div>
                    <div class="buttons">
                        <p>დაგავიწყდათ პაროლი? <button type="button" onclick="createResetPasswordForm()" id="reset-password">აღდგენა</button></p>
                        <button type="button" onclick="checkCredentialsInAuthorization()" id="form-submit-btn">შესვლა</button>
                    </div>
                </div>
            </div>
            <div class="registration-link">
                <p>არ გაქვთ მომხმარებელი? <button type="button" onclick="createRegistrationForm()" id="registrate">რეგისტრაცია</button></p>
            </div>
        </form>
    `;
}

const authorizeBtn = document.getElementById("authorize-btn");
authorizeBtn.addEventListener("click", function(){
    toggleForm();
    createAuthorizationForm();
});

// Credentials validation using regex
function validateEmail(email) {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return passwordRegex.test(password);
}


function checkCredentialsInAuthorization() {
    const userEmail = document.getElementById("email-input").value;
    const userPassword = document.getElementById("password-input").value;

    if (userEmail === "" && userPassword === "") {
        alert("გთხოვთ შეავსოთ საჭირო ველები");
        return;
    }

    if (userEmail === "") {
        showError("email-input", "error-message", "The field is required. Please fill it first!");
        return;
    } else if (!validateEmail(userEmail)) {
        showError("email-input", "error-message", "Email must contain an '@' symbol!");
        return;
    } else {
        hideError("email-input", "error-message");
    }

    if (userPassword === "") {
        showError("password-input", "error-message", "The field is required. Please fill it first!");
        return;
    } else if (!validatePassword(userPassword)) {
        showError("password-input", "error-message", "Password must contain special characters, lowercase and capital letters!");
        return;
    } else {
        hideError("password-input", "error-message");
    }

    if ((userEmail !== "" && userPassword !== "") && (validateEmail(userEmail) && validatePassword(userPassword))) {
        alert("You are authorized { not really ;) }");
        document.getElementById("email-input").value = "";
        document.getElementById("password-input").value = "";
    }
}

function checkCredentialsInRegistration() {
    const userEmail = document.getElementById("email-input").value;
    const userConfirmAcceptance = document.getElementById("terms-and-conditions-check");

    if (userEmail === "") {
        showError("email-input", "error-message", "The field is required. Please fill it first!");
        return;
    } else if (!validateEmail(userEmail)) {
        showError("email-input", "error-message", "Email must contain an '@' symbol!");
        return;
    } else {
        hideError("email-input", "error-message");
    }

    let termsAccepted = false;
    if (userConfirmAcceptance.checked) {
        termsAccepted = true;
    }

    if(!termsAccepted) {
        alert("Confirm that you accept terms and conditions")
    } else if (termsAccepted && validateEmail(userEmail)){
        alert("An email will be sent where you must confirm your registration.");
        userConfirmAcceptance.checked = false;
        document.getElementById("email-input").value = "";
    }
}

function checkCredentialsInPasswordResetting() {
    const userEmail = document.getElementById("email-input").value;

    if (userEmail === "") {
        showError("email-input", "error-message", "The field is required. Please fill it first!");
        return;
    } else if (!validateEmail(userEmail)) {
        showError("email-input", "error-message", "Email must contain an '@' symbol!");
        return;
    } else {
        hideError("email-input", "error-message");
    }

    if (userEmail !== "" && validateEmail(userEmail)) {
        alert("An email will be sent where you'll receive your new password.");
        document.getElementById("email-input").value = "";
    }
}

function showError(inputID, errorID, errorMessage) {
    const input = document.getElementById(inputID);
    const error = document.getElementById(errorID);
    input.style.borderColor = "red";
    error.innerText = errorMessage;
}

function hideError(inputID, errorID) {
    const input = document.getElementById(inputID);
    const error = document.getElementById(errorID);
    input.style.borderColor = "#707070";
    error.innerText = "";
}