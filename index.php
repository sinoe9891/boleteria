<!DOCTYPE html>
<html lang="en">
<?php
// setlocale(LC_TIME, 'es_ES', 'Spanish_Spain', 'Spanish');
date_default_timezone_set('America/Tegucigalpa');
$timestap = time();
// $fecha = date("Y-m-d");
// $timestamp = strtotime($fecha);
// $fechacreado  = date("Y-m-d h:i:sa", $timestap)
?>

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>PLATAFORMA DE EVENTOS</title>
	<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css">
	<!-- Latest compiled and minified JavaScript -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script> -->


</head>

<body>
	<div class="container">
		<div class="opciones">
			<div class="botton">
				<a href="index.php"><button>Ver Eventos</button></a>
			</div>
			<div class="botton">
				<a href="crear-evento.php"><button>Crear Evento</button></a>
			</div>
			<div class="botton">
				<a href="tipoboletos.php"><button>Agregar Tipo de Boletos</button></a>
			</div>
			<div class="botton">
				<button>Agregar Plantilla</button>
			</div>
		</div>
		<div class="title">
			<h3>Eventos</h3>
		</div>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Nombre del Evento</th>
					<th scope="col">Fecha de Creación</th>
					<th scope="col">Fecha de Vencimiento</th>
					<th scope="col">Acciones</th>
				</tr>
			</thead>
			<tbody id="tabla">
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					<td><button class="btn btn-info" onclick="guardarEvento()">Editar</button><button class="btn btn-info" onclick="guardarEvento()">Eliminar</button></td>
				</tr>
			</tbody>
		</table>
	</div>
	<script src="app.js"></script>
</body>

</html>