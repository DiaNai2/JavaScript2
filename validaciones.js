const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.(([a-z]{1,})([A-Z]{1,})([0-9]{1,}){1,10})$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[m]+[i]+[s]+[e]+[n]+[a]+\.[e]+[d]+[u]+\.[c]+[o]+$/,
	ndocumento: /^.{5,15}$/,
   // fecha: /^[ccttpp]+$/,
    //tdocumento: /^[ccttpp]+$/
}

const campos = {
	nombre: false,
    apellido: false,
	password: false, 
	correo: false,
	ndocumento: false,
    //fecha: false,
    //tdocumento: false
}


const validarFormulario = (e) => {
	switch (e.target.name) {

		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
        case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "ndocumento":
			validarCampo(expresiones.ndocumento, e.target, 'ndocumento');
		break;
        /*case "fecha":
            validarCampo(expresiones.fecha, e.target, 'fecha');
        break;
        case "tdocumento":
            validarCampo(expresiones.tdocumento, e.target, 'tdocumento');
        break; */ 
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('form-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('form-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .formularioinput-error`).classList.remove('form-input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('form-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('form-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .formularioinput-error`).classList.add('form-input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo_password2`).classList.add('form-incorrecto');
		document.getElementById(`grupo_password2`).classList.remove('form-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_password2 .formularioinput-error`).classList.add('form-input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo_password2`).classList.remove('form-incorrecto');
		document.getElementById(`grupo_password2`).classList.add('form-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_password2 .formularioinput-error`).classList.remove('form-input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();  

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido &&  campos.password && campos.correo && campos.ndocumento && terminos.checked  ){
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
        alert("si se pueden enviar el formulario")
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
        alert("No se puede enviar el formulario porque faltan aspectos ")
	}
});