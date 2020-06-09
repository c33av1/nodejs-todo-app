$(document).ready(function() {
    $("form#register-form").on("submit", function(e) {
        e.preventDefault();
        loading();

        let errormsg = "";
        const l_email = $("form#register-form input[name=email]").val().trim();
        const l_password = $("form#register-form input[name=psw]").val().trim();
        const l_password_repeat = $("form#register-form input[name=psw-repeat]")
            .val()
            .trim();

        if (l_email.length === 0) errormsg += "Invalid email!\n";
        if (l_password !== l_password_repeat) {
            errormsg += "Passwords do not match!\n";
        }

        if (errormsg.length) {
            alert(errormsg);
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/register",
            data: { email: l_email, password: l_password },
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert(!response.message ?
                        "An error occurred while registering your account!" :
                        response.message
                    );
                    return false;
                }

                $("form input").val("");
                $("#successRegisterMsg").show();
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred.");
            },
        });
    });

    $("form#login-form").on("submit", function(e) {
        e.preventDefault();
        loading();

        let errormsg = "";
        const l_email = $("form#login-form input[name=email]").val().trim();
        const l_password = $("form#login-form input[name=psw]").val().trim();

        if (l_email.length === 0) errormsg += "Invalid email!\n";

        if (errormsg.length) {
            alert(errormsg);
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/login",
            data: { email: l_email, password: l_password },
            success: function(response) {
                if (response.success !== true) {
                    console.log("error:", response);
                    alert("Invalid email or password!");
                    return false;
                }

                $("form input").val("");
                loaded();
            },
            error: function(err) {
                console.log("error:", err);
                loaded();
                alert("An error occurred.");
            },
        });
    });
});