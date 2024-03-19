window.onload = function () {

    let formulario = document.querySelector(".formulario");
    console.log(formulario)

    let formNombre = document.querySelector("#nombre")
    let formUsuario = document.querySelector("#usuario")
    let formEmail = document.querySelector("#email")
    let formPassword = document.querySelector("#password")
    let formPassword2 = document.querySelector("#password2")

    let errorNombre = document.querySelector("#errorNombre")
    let errorUsuario = document.querySelector("#errorUsuario")
    let validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    let errorEmail = document.querySelector("#errorEmail")
    let errorPassword = document.querySelector("#errorPassword")
    let errorPassword2 = document.querySelector("#errorPassword2")

    let errores = ["errorNombre","errorUsuario","errorEmail","errorPassword","errorPassword2"]


    formNombre.addEventListener("blur", function () {
        if (formNombre.value.length === 0) {
            errorNombre.innerHTML = "El campo nombre no puede estar vacío y debe tener mas de 4 caracteres";
            errorNombre.classList.add("error-front")
        } else if (formNombre.value.length < 4) {
            errorNombre.innerHTML = "El campo nombre debe tener al menos 4 caracteres";
            errorNombre.classList.add("error-front")
        } else {
            errorNombre.innerHTML = "";
            errores = errores.filter(error =>  error !== "errorNombre" )
        }

    })
    formUsuario.addEventListener("blur", function () {
        if (formUsuario.value.length === 0) {
            errorUsuario.innerHTML = "El campo usuario no puede estar vacío y debe tener mas de 6 caracteres";
            errorUsuario.classList.add("error-front")
            errores.push("errorUsuario")
        } else if (formUsuario.value.length < 6) {
            errorUsuario.innerHTML = "El campo usuario debe tener al menos 6 caracteres";
            errorUsuario.classList.add("error-front")
            errores.push("errorUsuario")
        } else {
            errorUsuario.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorUsuario" )
        }
    })
    formEmail.addEventListener("blur", function () {
        if (validarEmail.test(formEmail.value)) {
            errorEmail.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorEmail" )
        } else {
            errorEmail.innerHTML = "El email ingresado es inválido";
            errorEmail.classList.add("error-front")
            errores.push("errorEmail")
        }
    })
    formPassword.addEventListener("blur", function () {
        if (formPassword.value.length === 0) {
            errorPassword.innerHTML = "El campo contraseña no puede estar vacío y debe tener mas de 6 caracteres";
            errorPassword.classList.add("error-front");
            errores.push("errorPassword")
        } else if (formPassword.value.length < 6) {
            errorPassword.innerHTML = "El campo contraseña debe tener al menos 6 caracteres";
            errorPassword.classList.add("error-front")
            errores.push("errorPassword")
        } else {
            errorPassword.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorPassword" )
        }
    })
    formPassword2.addEventListener("blur", function () {
        if (formPassword2.value.length === 0) {
            errorPassword2.innerHTML = "El campo contraseña no puede estar vacío y debe tener mas de 6 caracteres";
            errorPassword2.classList.add("error-front")
            errores.push("errorPassword2")
        } else if (formPassword2.value.length < 6) {
            errorPassword2.innerHTML = "El campo contraseña debe tener al menos 6 caracteres";
            errorPassword2.classList.add("error-front")
            errores.push("errorPassword2")
        } else if (formPassword.value !== formPassword2.value) {
            errorPassword2.innerHTML = "Las contraseñas deben coincidir";
            errorPassword2.classList.add("error-front")
            errores.push("errorPassword2")
        } else {
            errorPassword2.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorPassword2" )
        }
    })

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            console.log(errores)
            e.preventDefault();
        }
    })

}