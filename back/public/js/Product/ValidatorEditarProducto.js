window.onload = function () {

    let formulario = document.querySelector(".form-editar");
    console.log(formulario)

    let formNombre = document.querySelector("#nombre")
    let formIngredientes = document.querySelector("#ingredientes")
    let formCategoria = document.querySelector("#categoria")
    let formPrecio = document.querySelector("#precio")

    let errorNombre = document.querySelector("#errorNombre")
    let errorIngredientes = document.querySelector("#errorIngredientes")
    let errorCategoria = document.querySelector("#errorCategoria")
    let errorPrecio = document.querySelector("#errorPrecio")

    let errores = []

    formNombre.focus()

    formNombre.addEventListener("blur", function () {
        if (formNombre.value.length === 0) {
            errorNombre.innerHTML = "El campo nombre no puede estar vacío y debe tener al menos 5 caracteres";
            errorNombre.classList.add("error-front")
            errores.push("errorNombre")
        } else if (formNombre.value.length < 5) {
            errorNombre.innerHTML = "El campo nombre debe tener al menos 5 caracteres";
            errorNombre.classList.add("error-front")
            errores.push("errorNombre")
        } else {
            errorNombre.innerHTML = "";
            errores = errores.filter(error =>  error !== "errorNombre" );
        }

    })
    formIngredientes.addEventListener("blur", function () {
        if (formIngredientes.value.length === 0) {
            errorIngredientes.innerHTML = "El campo ingredientes no puede estar vacío y debe tener al menos 20 caracteres";
            errorIngredientes.classList.add("error-front")
            errores.push("errorIngredientes")
        } else if (formIngredientes.value.length < 20) {
            errorIngredientes.innerHTML = "El campo ingredientes debe tener al menos 20 caracteres";
            errorIngredientes.classList.add("error-front")
            errores.push("errorIngredientes")
        } else {
            errorIngredientes.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorIngredientes" );
        }
    })
    formCategoria.addEventListener("blur", function () {
        if (formCategoria.value > 5 || formCategoria.value == 0) {
            errorCategoria.innerHTML = "El campo categoria debe ser un número entre 1 y 5";
            errorCategoria.classList.add("error-front");
            errores.push("errorCategoria")
        }else {
            errorCategoria.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorCategoria" );
        }
    })
    formPrecio.addEventListener("blur", function () {
        if (formPrecio.value.length === 0) {
            errorPrecio.innerHTML = "El campo precio es obligatorio";
            errorPrecio.classList.add("error-front")
            errores.push("errorPrecio")
        } else {
            errorPrecio.innerHTML = ""
            errores = errores.filter(error =>  error !== "errorPrecio" );
        }
    })

    formulario.addEventListener("submit", function (e) {
        if (errores.length > 0) {
            console.log(errores)
            e.preventDefault();
        }
    })
}