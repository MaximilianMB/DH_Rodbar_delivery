window.onload = function(){

    //Validacion para el registro
    let formulario = document.querySelector(".formulario");
    console.log(formulario)

    let formNombre = document.querySelector("#nombre")
    let formUsuario = document.querySelector("#usuario")
    let formEmail = document.querySelector("#email")
    let formPassword = document.querySelector("#password")
    let formPassword2 = document.querySelector("#password2")
    let formImagen = document.querySelector("#imagen")
    let formEnviar = document.querySelector("#enviar")
    
let errores = [erorrNombre, errorUsuario, errorEmail]

console.log(formNombre)

let  patron = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    formNombre.addEventListener("blur",function(){
        if(formNombre.value.length === 0){
            errores.errorNombre.push("El campo nombre no debe estar vacío")
        }
    })

    formUsuario.addEventListener("blur", function(){
        if(formUsuario.value.length === 0){
            errores.errorUsuario.push("El campo usuario no debe estar vacío")
        }
    })
        
    formEmail.addEventListener("blur", function(){
        if(formEmail.value.length === 0){
            errores.errorEmail.push("El campo email no debe estar vacío")
        }
    })
    formEmail.addEventListener("key", function(){

    })
    }