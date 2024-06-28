document.getElementById("button-employee").addEventListener("click", () => {
  // Obtener los valores de los inputs del formulario
  const usernameInput = document.getElementById("username")?.value;
  const lastnameInput = document.getElementById("lastname")?.value;
  const occupationInput = document.getElementById("occupation")?.value;

  // Enviar los datos del formulario al servidor
  postUserData("/addEmployee", {
    username: usernameInput,
    lastname: lastnameInput,
    occupation: occupationInput,
  }).then(() => {
    // Llenar el select y la tabla con los datos de la base de datos
    populateEmployeeSelect();
    populateEmployeeTable();
  });

  // Limpiar los campos del formulario después de enviar los datos al servidor
  document.getElementById("username").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("occupation").value = "";
});

document.getElementById("button-add-date-time").addEventListener("click", () => {
  const employeeIdSelect = document.getElementById("select-employee")?.value;
  const dateTimeEntry = document.getElementById("date-time-entry")?.value;
  const dateTimeExit = document.getElementById("date-time-exit")?.value;
  const formattedDateTimeEntry = dateTimeEntry.replace("T", " ");
  const formattedDateTimeExit = dateTimeExit.replace("T", " ");

  // console.log(employeeIdSelect, formattedDateTimeEntry, formattedDateTimeExit);

  // Enviar los datos del formulario al servidor
  postUserData("/addDateTime", {
    employeeId: employeeIdSelect,
    entry: formattedDateTimeEntry,
    exit: formattedDateTimeExit,
  }).then(() => {
    // Llenar la tabla con los datos de la base de datos después de enviar los datos al servidor
    populateDateTimeTable();
  });

  // Limpiar los campos del formulario
  document.getElementById("select-employee").value = "0";
  document.getElementById("date-time-entry").value = "";
  document.getElementById("date-time-exit").value = "";
});

async function postUserData(endpoint, userData) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    // Mostrar un mensaje en el frontend después de registrar los datos en la base de datos según el endpoint
    let message = endpoint === "/addEmployee" 
      ? document.getElementById("employee-message") 
      : document.getElementById("date-time-message");
      message.innerText = data?.message;
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      message.innerText = "";
    }, 3000);

    // console.log(data?.message);
  } catch (error) {
    console.error("Error al registrar:", error);
  }
}

// Llenar el select con los datos de los empleados de la base de datos
async function populateEmployeeSelect() {
  const response = await fetch("/getEmployees");
  const data = await response.json();
  const select = document.getElementById("select-employee");

  // Limpiar select antes de llenarlo
  select.innerHTML = '';  
  select.innerHTML = `<option value="0">Seleccionar empleado</option>`

  // Llenar el select con los datos de los empleados
  data.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee.id;
    option.text = `${employee.nombre} ${employee.apellido} - ${employee.cargo}`;
    select.appendChild(option);
  });
}

// Llenar la tabla con los datos de los empleados de la base de datos
async function populateEmployeeTable() {
  const response = await fetch("/getEmployees");
  const data = await response.json();
  const table = document.getElementById("employee-table").getElementsByTagName('tbody')[0];

  // Limpiar la tabla antes de llenarla
  table.innerHTML = '';

  // Llenar la tabla con los datos de los empleados
  data.forEach((employee) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerText = employee.nombre;
    cell2.innerText = employee.apellido;
    cell3.innerText = employee.cargo;
    row.innerHTML += `<button id="delete-button">Eliminar</button>`;
  });

  // Agregar un evento a cada botón de eliminar
  const deleteButtons = document.querySelectorAll("#delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteEmployee(data[index].id);
    });
  });
}

// Llenar la tabla de fecha y hora con los registros de la base de datos
async function populateDateTimeTable() {
  const response = await fetch("/getDateTime");
  const data = await response.json();
  const table = document.getElementById("date-time-table").getElementsByTagName('tbody')[0];
  table.innerHTML = '';  // Limpiar la tabla antes de llenarla

  // Llenar la tabla con los registros de la base de datos
  data.forEach((dateTime) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerText = `${dateTime.nombre} ${dateTime.apellido}`;

    // Formatear la fecha y hora en formato local
    cell2.innerText = new Date(dateTime.fecha_hora_ingreso).toLocaleString("es-CO");
    cell3.innerText = new Date(dateTime.fecha_hora_salida).toLocaleString("es-CO");
  });
}

async function deleteEmployee(employeeId) {
  try {
    const response = await fetch(`/deleteEmployee/${employeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const deleteMessage = document.getElementById("delete-message");
    deleteMessage.innerText = data.message;

    setTimeout(() => {
      deleteMessage.innerText = "";
    }, 3000);

    // console.log(data.message);

    // Actualizar el select y las tablas después de eliminar un empleado
    populateEmployeeSelect();
    populateEmployeeTable();
    populateDateTimeTable();
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
  }
}

// Ejecutar las funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  populateEmployeeSelect();
  populateEmployeeTable();
  populateDateTimeTable();
});

