window.onload = function () {

    let formulario = document.querySelector(".formulario");


    let formEmail = document.querySelector("#email")
    let formPassword = document.querySelector("#password")



    let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    let errorEmail = document.querySelector("#errorEmail")
    let errorPassword = document.querySelector("#errorPassword")


    let errores = []

    formEmail.addEventListener("blur", function () {
        if (validarEmail.test(formEmail.value)) {
            errorEmail.innerHTML = ""
            errores = errores.filter(error => error !== "errorEmail")
        } else {
            errorEmail.innerHTML = "El email ingresado tiene que ser válido";
            errorEmail.classList.add("error-front")
            errores.push("errorEmail")
        }
    })
    formPassword.addEventListener("blur", function () {
        if (formPassword.value.length === 0) {
            errorPassword.innerHTML = "El campo contraseña es obligatorio";
            errorPassword.classList.add("error-front");
            errores.push("errorPassword")
        } else {
            errorPassword.innerHTML = ""
            errores = errores.filter(error => error !== "errorPassword")
        }
    })

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            console.log(errores)
            e.preventDefault();
        }
    })

}