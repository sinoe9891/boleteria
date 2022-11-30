firebase.initializeApp({
	apiKey: "AIzaSyCkSqeaQZm4uGFyewFhX3lHQCRsdpnm8-0",
	authDomain: "boleteria-a815c.firebaseapp.com",
	databaseURL: "https://boleteria-a815c.firebaseio.com",
	projectId: "boleteria-a815c",
	storageBucket: "boleteria-a815c.appspot.com",
	messagingSenderId: "617973330455",
	appId: "1:617973330455:web:80d226230f25aca2432252",
	measurementId: "G-X0NKHHSSL3"
})

// var coleevento = "eventos";
// var coletipoboleto = "tipoboletos";
var coleevento = "prueba";
var coletipoboleto = "tipoboletosprueba";
var db = firebase.firestore();

// Agregar documento
function guardarEvento() {
	console.log("Guardar Evento");
	var nombreEvento = document.getElementById("nombreevento").value;
	var nombrecliente = document.getElementById("nombrecliente").value;
	var rtn = document.getElementById("rtn").value;
	var direccioncliente = document.getElementById("direccioncliente").value;
	var caicliente = document.getElementById("caicliente").value;
	var fechalimite = document.getElementById("fechalimite").value;
	var rangoinicio = document.getElementById("rangoinicio").value;
	var rangofinal = document.getElementById("rangofinal").value;
	var rangoinicialfactura = document.getElementById("rangoinicialfactura").value;
	var rangofinalfactura = document.getElementById("rangofinalfactura").value;
	var estado = document.getElementById("estado").value;
	var direccionenvento = document.getElementById("direccionenvento").value;
	var descripcionevento = document.getElementById("descripcionevento").value;
	var portada = '';
	var tipodeboletoutilizado = false;
	console.log(fechalimite);
	db.collection(coleevento).add({
		nombreevento: nombreEvento,
		fechacreacion: Date.now(),
		nombrecliente: nombrecliente,
		rtn: rtn,
		direccioncliente: direccioncliente,
		caicliente: caicliente,
		fechalimite: fechalimite,
		rangoinicial: rangoinicio,
		rangofinal: rangofinal,
		numfactura: rangoinicialfactura,
		rangoinicialfactura: rangoinicialfactura,
		rangofinalfactura: rangofinalfactura,
		estado: estado,
		direccionenvento: direccionenvento,
		descripcionevento: descripcionevento,
		portada: portada,
		tipodeboletoutilizado: tipodeboletoutilizado
	})
		.then(function (docRef) {
			console.log("ID de documento: ", docRef.id);
			document.getElementById("nombreevento").value = "";
			document.getElementById("nombrecliente").value = "";
			document.getElementById("rtn").value = "";
			document.getElementById("direccioncliente").value = "";
			document.getElementById("caicliente").value = "";
			document.getElementById("fechalimite").value = "";
			document.getElementById("rangoinicio").value = "";
			document.getElementById("rangofinal").value = "";
			document.getElementById("estado").value = "";
			document.getElementById("direccionenvento").value = "";
			document.getElementById("descripcionevento").value = "";
		})
		.catch(function (error) {
			console.log("Erro: ", docRef.id);
		})
}

//Leer Datos Eventos
var tabla = document.getElementById("tabla");
db.collection(coleevento).orderBy("fechacreacion", "desc").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
	contador = 1;
	querySnapshot.forEach((doc) => {
		var myDate = new Date(doc.data().fechacreacion);
		var limite = new Date(doc.data().fechalimite);
		console.log(myDate);
		fecha = myDate.toLocaleString('es-HN');
		fechalimite = limite.toLocaleString('es-HN');
		tabla.innerHTML += `<tr>
		<th scope="row">${contador++}</th>
		<td>${doc.data().nombreevento}</td>
		<td>${fecha}</td>
		<td>${fechalimite}</td>
		<td>
			<button class="btn btn-danger" id="borrar" onclick="borrarevento('${doc.id}')">Borrar</button>
			<button class="btn btn-warning" id="editar" onclick="editarevento('${doc.id}')">Editar</button></td>
		</tr>`;
	});
});

// Eventos Select Tipo Boleto con Condición
var eventosactive = document.getElementById("eventosactive");
if (eventosactive) {
	db.collection(coleevento).where("tipodeboletoutilizado", "==", false).orderBy("fechacreacion", "asc").get().then((querySnapshot) => {
		// db.collection(coleevento).where("tipodeboletoutilizado", "==", false).get().then((querySnapshot) => {
		eventosactive.innerHTML = '';
		contador = 1;
		querySnapshot.forEach((doc) => {
			eventosactive.innerHTML += `<option value="${doc.id}">${doc.data().nombreevento}</option>`;
		});
	})
		.catch((error) => {
			console.log("Error getting documents: ", error);
		});
}

// Generar Boletos
function generarTipoBoleto() {
	console.log("Guardar Evento");
	var eventosactive = document.getElementById("eventosactive").value;

	// Llamar datos del evento
	db.collection(coleevento).where(firebase.firestore.FieldPath.documentId(), "==", eventosactive).onSnapshot((querySnapshot) => {
		// db.collection(coleevento).where("tipodeboletoutilizado", "==", false).get().then((querySnapshot) => {
		console.log("Entró");
		eventosactive.innerHTML = '';
		contador = 1;
		querySnapshot.forEach((doc) => {
			eventosactive.innerHTML += `<option value="${doc.id}">${doc.data().nombreevento}</option>`;
			cantidadtipodeboleto = 0;
			fechacreacion = Date.now(),
				fechalimite = doc.data().fechalimite;
			ideventoseleccionado = doc.id;
			nombreeventoseleccionado = doc.data().nombreevento;
			tienemapa = true;
			tieneplantilla = false;
			rangofinal = doc.data().rangofinal;

			db.collection(coletipoboleto).add({
				cantidadtipodeboleto: "0",
				fechacreacion: Date.now(),
				fechalimite: fechalimite,
				ideventoseleccionado: ideventoseleccionado,
				nombreeventoseleccionado: nombreeventoseleccionado,
				tienemapa: tienemapa,
				tieneplantilla: tieneplantilla,
				tiposdeboleto: {
					0: {
						cantidadtipo: '' + rangofinal + '',
						mostrar: false,
						nombretipo: "unico"
					}
				}
			}).then(function (docRef) {
				console.log("ID de documento: ", docRef.id);
			}).catch(function (error) {
				console.log("Error: ", docRef.id);
			})
		});
	}).catch((error) => {
		console.log("Error getting documents: ", error);
	});

}


// Existe el elemento?
var borrar = document.getElementById("borrar");
// console.log(borrar.value);

function borrarevento(id) {

	if (id) {
		console.log("Entró");
		console.log(id);
		// Borrar documento
		db.collection(coleevento).doc(id).delete().then(() => {
			console.log("Document successfully deleted!");
		}).catch((error) => {
			console.error("Error removing document: ", error);
		});
	}
}

// Editar datos
var washingtonRef = db.collection(coleevento).doc(id);

// function editarevento(id) {
// 	// Set the "capital" field of the city 'DC'
// 	return washingtonRef.update({
// 		nombreevento: nombreEvento,
// 		fechacreacion: Date.now(),
// 		nombrecliente: nombrecliente,
// 		rtn: rtn,
// 		direccioncliente: direccioncliente,
// 		caicliente: caicliente,
// 		fechalimite: fechalimite,
// 		rangoinicial: rangoinicio,
// 		rangofinal: rangofinal,
// 		numfactura: rangoinicialfactura,
// 		rangoinicialfactura: rangoinicialfactura,
// 		rangofinalfactura: rangofinalfactura,
// 		estado: estado,
// 		direccionenvento: direccionenvento,
// 		descripcionevento: descripcionevento,
// 		portada: portada,
// 		tipodeboletoutilizado: tipodeboletoutilizado
// 	}).then(() => {
// 		console.log("Document successfully updated!");
// 	}).catch((error) => {
// 		// The document probably doesn't exist.
// 		console.error("Error updating document: ", error);
// 	});
// }



