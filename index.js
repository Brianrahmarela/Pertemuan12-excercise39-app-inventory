let displayListInventory = document.querySelector('#inventory');
console.log(displayListInventory);

const getData = async () => {
  const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';
  let response = await fetch(url);
  let result = await response.json();
  console.log(result);
  
  displayListInventory.innerHTML = "";
  result.map((item) => {
    // document.write(`${item.name}<br>`)
    let cardDisplay = document.createElement("div");
    cardDisplay.innerHTML = `<p>${item.name}</p>`;

    displayListInventory.appendChild(cardDisplay);
    
    //button Delete
    let cardDelete = document.createElement('button');
    let cardDeleteText = document.createTextNode('Delete');
    cardDelete.appendChild(cardDeleteText);
    // cardDelete.setAttribute("click", deleteData(`${item.id}`));

    // .bind(this, item.id) adalah mau mengikat sebuah data
    // cardDelete.addEventListener("click", deleteData.bind(this, item.id));
    //atau bisa pake arrow function
    cardDelete.addEventListener("click", () => {
      deleteData(item.id);
    });

    displayListInventory.appendChild(cardDelete);
    // console.log("id", item.id);

    //button Update
    let cardUpdate = document.createElement('button');
    let cardUpdateText = document.createTextNode('Update');
    cardUpdate.appendChild(cardUpdateText);

    cardUpdate.addEventListener("click", () => {
      updateData(item.id);
    });

    displayListInventory.appendChild(cardUpdate);

  });
};
getData();

//buat add data
let addInventorySubmit = document.querySelector('#add-inventory-btn');
console.log(addInventorySubmit);

const addData = async (event) => {
  // console.log('ok');

  // supaya web browser tidak refresh halaman
  event.preventDefault();
  
  // Mengambil data dari form
  let dataForm = document.querySelector("#inventory-form").value;
  console.log(dataForm);
  
  // Merubah data dari form yang string menjadi object
  let dataObj = {
    name: dataForm
  };
  console.log("value form jd object", dataObj);
  
  // Merubah data objek menjadi JSON supaya bisa dikirim lewat post
  let dataJSON = JSON.stringify(dataObj);
  console.log("value obj jd json", dataJSON);

  // mengepost data ke mock api
  const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
  body: dataJSON
  };
  console.log("options", options);

  //proses post data dgn error handling
  try{
    // mengirimkan post data
    const fetchResponse = await fetch(url, options);
    console.log("fetchResponse", fetchResponse);

    // mendapatkan hasil response dari server setelah mengirim data
    const dataResponse = await fetchResponse.json();
    console.log('data response',dataResponse);

    // ambil data yang paling baru dari server setelah di add
    getData();
    // console.log(dataForm);

    // kosongkan form setelah submit berhasil
    document.querySelector("#inventory-form").value = "";
    return dataResponse;
  }catch(error){
    console.log(error);
    alert("Server error");
  }
};
addInventorySubmit.addEventListener("click", addData);


const deleteData = async (id) => {
  console.log('ok',id);
  const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';
  // console.log(url);
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
  }
  };

  console.log("options", options);
  let fetchResponse = await fetch(`${url}/${id}`, options);
  console.log("fetchResponse", fetchResponse);

  let dataResponse = await fetchResponse.json();
  console.log('data response',dataResponse);

  getData();
  document.querySelector("#inventory-form").value = "";

};

const updateData = async (id) => {
  console.log('ok',id);
  const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';

  let dataUpdate = prompt("Please update New item : ");
  let dataObj = {
    name: dataUpdate
  };
  let dataJSON = JSON.stringify(dataObj)
  console.log(dataJSON)

  let options = {
    method: "PUT",
    headers: {
      "Content-Type":"application/json",
    },
    body: dataJSON
  };
  console.log("options", options);
  let fetchResponse = await fetch(`${url}/${id}`, options);
  console.log("fetchResponse", fetchResponse);

  let dataResponse = await fetchResponse.json();
  console.log('data response',dataResponse);

  getData();
  document.querySelector("#inventory-form").value = "";
};