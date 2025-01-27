/*
    Project 4 Website
    Name: Shiqi Yu
    Date: November 19 2024
    Description: Project 4 Website Development & Deployment
*/


document.addEventListener("DOMContentLoaded", load);

function load(){
    document.getElementById("contactForm").addEventListener("submit", validate);
    document.getElementById("contactForm").addEventListener("reset", resetForm);
}

function resetForm(e){
    // Confirm that the user wants to reset the form.
    if ( confirm('Clear survey?') )
    {
        // Ensure all error fields are hidden
        hideAllErrors();
        
        // Set focus to the first text field on the page
        document.getElementById("name").focus();
        
        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();
    
    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;
}
function validate(e){
    
    hideAllErrors();

    //  Determine if the form has errors
    if(formHasErrors()){
        //  Prevents the form from submitting
        e.preventDefault();
        //  Returning false prevents the form from submitting
        return false;
    }
    return true;
}

/*  
    formHasErrors function
    returns a true if errors are discovered
    returns a false if there are no errors
*/
function formHasErrors(){

    let errorFlag = false;

    let requiredFields = ["name", "phone", "email"];

    for(let i=0; i<requiredFields.length; i++){
        let textField = document.getElementById(requiredFields[i])
        if(!formFieldHasInput(textField)){
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if(!errorFlag){
                textField.focus();
                textField.select();
            }

            // Raise the error flag
            errorFlag = true;
        }
    }

    let phoneValue = document.getElementById("phone").value;
    let emailValue = document.getElementById("email").value;
    
    //  Phone number pattern: Exactly 10 digits (no spaces, no special characters)
    let phonePattern = /^\d{10}$/;

    // Email pattern: Basic email format (e.g., user@example.com)
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //Test phone
    if (!phonePattern.test(phoneValue)){
        document.getElementById("phone_error").style.display = "block";

        if(!errorFlag){
            document.getElementById("phone").focus();
            document.getElementById("phone").select();
        }

        errorFlag = true;
    } 

    // Test Email
    if (!emailPattern.test(emailValue)) {
        document.getElementById("email_error").style.display = "block";

        if(!errorFlag){
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }
        errorFlag = true;
    } 


    //  Code above here!
    return errorFlag;

}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
    // Check if the text field has a value
    if ( fieldElement.value == null || trim(fieldElement.value) == "" )
    {
        // Invalid entry
        return false;
    }
    
    // Valid entry
    return true;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function hideAllErrors()
{
    //  Get an array of the error fields
    let errorFields = document.getElementsByClassName("error");

    //  Loop through each error field
    for(let i = 0;i < errorFields.length; i++){
        //  Hide the error field
        errorFields[i].style.display = "none";
    }
}