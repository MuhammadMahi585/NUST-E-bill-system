// Add event listeners
addOption.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default action
    window.location.href = "addCustomerPage.html";
});

updateOption.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default action
    window.location.href = "updateCustomerPage.html";
});

deleteOption.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default action
    window.location.href = "deleteCustomerPage.html";
});
