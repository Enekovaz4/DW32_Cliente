//VARIABLES DE USO

	var libros = [];
	var libro;
	


	


function insertarLibro(){
	libro = new Object();

	libro.titulo = $("input[name=tituloInsertar]").val();
	libro.autor = $("input[name=autorInsertar]").val();
	libro.isbn = $("input[name=isbnInsertar]").val();
	libro.indice = libros.length;
	libro.prestado = false;
	var check = [];

		$("input:checkbox[name=generoInsertar]:checked").each(function(){
			check.push ($(this));
		});

		libro.generos = "<";

		if (check.length > 0){
			
			check.forEach(function(item){
				libro.generos = libro.generos + " " + item.val();
			});
			libro.generos = libro.generos + " >"
			libro.estado = "creado";
			
			quitarClase("creado");

			libros.push (libro);

			listar();
		} else { 
			alert("Inserta algun género");
		}
	listar();

}


function listar(){

	var divDisponibles = document.getElementById("listaDisponibles");
	var divPrestamos = document.getElementById("listaPrestados");

	divDisponibles.innerHTML = "";
	divPrestamos.innerHTML = "";

	libros.forEach(function(item){
		if (!item.prestado){
			divDisponibles.innerHTML = divDisponibles.innerHTML + "<p class='libro " + item.estado + "' onclick='consultar(" + item.indice + ");' >" + item.titulo + "</p>";
		} else {
			divPrestamos.innerHTML = divPrestamos.innerHTML + "<p class='libro " + item.estado + "' onclick='consultar(" + item.indice + ");' >" + item.titulo + "</p>";
		}

	});
	
}

function consultar(id){
	item = libros[id]
	$("input[name=titulo]").val(item.titulo);
	$("input[name=autor]").val(item.autor);
	$("input[name=isbn]").val(item.isbn);

	$("textarea[name=generos]").val(item.generos);
	$("input[name=prestadoa]").val(item.prestadoa);
	$("input[name=id]").val(item.indice);
	quitarClase ("seleccionado");
	item.estado = "seleccionado";

	libros[id] = item;
	listar();
}


function prestarLibro(){
	var id = $("input[name=id]").val();
	item = libros[id];

if (id != ""){
	item.prestado = true;
	item.prestadoa = $("input[name=prestadoa]").val();
	$("input[name=prestadoa]").val("");
	item.estado = "prestado";
	libros[id] = item;
	listar();
} else {
	alert ("No has seleccionado ningún libro.");
}
}

function devolverLibro(){
	var id = $("input[name=id]").val();
	item = libros[id];
	if (id != ""){
		if (item.prestado){
			quitarClase("devuelto");
			item.prestado = false;
			item.estado = "devuelto";
			libros[id] = item;

			listar();
		} else {
			alert ("No puedes devolver un libro Disponible.");
		}
	} else {
		alert ("No has seleccionado ningún libro.");
	}
}


function quitarClase (clase){
	var id;
	libros.forEach(function(item){
		if (item.estado == clase){
			id = item.indice;
			item.estado = "";
			libros[id] = item;
		}
	});

}