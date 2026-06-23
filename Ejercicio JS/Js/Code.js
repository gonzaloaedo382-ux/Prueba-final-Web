
//Se estan asignado ante cualquier evento cada uno de los parametros que contiene el formulario 
document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let correo = document.getElementById("correo").value.trim();
  let edad = document.getElementById("edad").value.trim();
  let valido = true;

  //aqui se ejecuta la validacion de cada uno de los parametros del formulario Nombre correo y edad 
  if (nombre.length < 3) {
    document.getElementById("errorNombre").textContent = "El nombre debe tener al menos 3 caracteres.";
    valido = false;
  } else {
    document.getElementById("errorNombre").textContent = "";
  }

  if (!correo.includes("@") || !correo.includes(".")) {
    document.getElementById("errorCorreo").textContent = "Correo inválido.";
    valido = false;
  } else {
    document.getElementById("errorCorreo").textContent = "";
  }

  if (isNaN(edad) || edad <= 0) {
    document.getElementById("errorEdad").textContent = "Edad inválida.";
    valido = false;
  } else {
    document.getElementById("errorEdad").textContent = "";
  }

  if (!valido) return;

  // por aqui se envian los datos hacia el servidor
  const response = await fetch("/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, edad })
  });

  const data = await response.json();
  document.getElementById("resultado").textContent = data.mensaje;
});

// aqui se carcar los ultimos datos en el registro despues de hacer click en el button 
document.getElementById("cargar").addEventListener("click", async () => {
  const response = await fetch("/ultimo");
  const data = await response.json();

  if (data) {
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("correo").value = data.correo;
    document.getElementById("edad").value = data.edad;
    document.getElementById("resultado").textContent = "Último registro cargado.";
  }
});
