(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "E1LbM7RL3OzmdAh_2",
    });
})();

cjContactForm = document.getElementById("cj-contact-form");
cjContactFormAlert = document.querySelector(".contact-btn-alert");

cjContactForm.addEventListener('submit', function(event) {
    event.preventDefault();
                // these IDs from the previous steps
        emailjs.sendForm('service_vtgpq2c', 'template_wte5cgn', '#cj-contact-form')
            .then(() => {
                // console.log('SUCCESS!');
                cjContactFormAlert.innerHTML = "<span>Your message sent successfully!</span><i class='fa-solid fa-circle-check'></i>";
                cjContactForm.reset()

                setTimeout(() => {
                    cjContactFormAlert.innerHTML = "";
                }, 5000);
            }, (error) => {
                    // console.log('FAILED...', error);
                    cjContactFormAlert.innerHTML = "<span>Message not sent successfully!</span><i class='fa-solid fa-circle-exclamation'></i>";
                    cjContactFormAlert.title = error;
                });
});