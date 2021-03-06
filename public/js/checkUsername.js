$(function () {
    $("#email").blur(function () {
        let email = this.value;
        $.ajax({
            url: "/register/check",
            type: 'POST',
            data: { email: email },
            dataType: 'json', // added data type
            success: function (res) {
                $("#checkUsername").attr({ type: "text" }).val("Invalid email. Email already exists");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#checkUsername").attr({ type: "textarea" }).val("");
            }
        });
    });
});