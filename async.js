// 1. ambil elemen yg akan ditampilkan
let displayListInventory = document.querySelector('#inventory');
// console.log(displayListInventory);

// 2. ambil data dari api
const getData = async () => {
  const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';
  // 3. dptkan responsenya
  let response = await fetch(url);
  // console.log(response);
  // 5. ubah response jd data json & akan dpt hasil
  let data = await response.json();
  // console.log(data);

  // 31. kosongkan kembali value2 tag div dgn id inventory yg digunakan utk menampilkan, setelah kosong akan diisi dgn data terbaru dari api sehingga tdk dobel data
  displayListInventory.innerHTML = "";

  // 6. looping data utk mendapatkan 1 persatu data, param item adalah data
  data.map(item => {
    // 7. cek apakah data berhasil di looping
    // console.log(item);
    // 8. buat elemen yg akan ditampilkan
    let cardDisplay = document.createElement("div");
    // console.log(cardDisplay);
    // 9. masukan value atribut data api ke elemen yg akan ditampilkan
    cardDisplay.innerHTML = `<p>${item.name}</p>`;

    // 10. append child(jadikan data sbg child dgn cara ditambah) dari elemen dom yg dituju. maka data akan tampil di dom sbg child dari parent id yg dituju
    displayListInventory.appendChild(cardDisplay);

    // TOMBOL DELETE
    // 34. Buat tombol delete dengan create element button di tiap looping item
    let cardDelete = document.createElement('button');
    // console.log(cardDelete);
    
    // 35. Buat text delete di tiap button looping
    let cardDeleteText = document.createTextNode('Delete');
    // console.log(cardDeleteText);
    
    // 36. buat child/ tempelkan text dgn appendChild elemen button dgn value textnode 'Delete' tsb
    cardDelete.appendChild(cardDeleteText);
    // console.log(cardDelete);
    
    // 37. buat child dgn appendChild/tempelkan button beserta text ke id element div container/inventory dgn value cardDelete dan akan muncul tombol delete
    displayListInventory.appendChild(cardDelete);
    // console.log("id", item.id);
    
    // 38. tambahkan event listener onclick di element button delete
    cardDelete.addEventListener("click", () => {
      // 39. jalankan fungsi delete data yg blm dibuat dgn mengirim parameter berupa properti id data dari api
      deleteData(item.id);
    });

    // TOMBOL UPDATE
    // 49. Buat tombol update dengan create element button di tiap looping item
    let cardUpdate = document.createElement('button');
    // console.log(cardUpdate);
    
    // 50. Buat text update di tiap button looping
    let cardUpdateText = document.createTextNode('Update');
    // console.log(cardUpdateText);

    // 51. buat child/ tempelkan text dgn appendChild elemen button dgn value textnode 'Update' tsb
    cardUpdate.appendChild(cardUpdateText);
    // console.log("id", item.id);

    // 52. buat child dgn appendChild/tempelkan button beserta text ke id element div container/inventory dgn value cardUpdate dan akan muncul tombol update
    displayListInventory.appendChild(cardUpdate);

    // 53. tambahkan event listener onclick di element button update
    cardUpdate.addEventListener("click", () => {
      // 54. jalankan fungsi update data yg blm dibuat dgn mengirim parameter berupa properti id data dari api
      updateData(item.id);
    });
  })
}
// 4. jalankan fungsi utk cek response
getData();

// 11. MEMBUAT FUNGSI CREATE(tambah data baru)

// 12. ambil id element button yg nanti akan digunakan utk submit data baru
let addInventorySubmit = document.querySelector("#add-inventory-btn");
// console.log(addInventorySubmit);

// 13. kemudian buat fungsi addnya
const addData = async () => {
    console.log('ok');

    // 16. tmbhkan preventDefault supaya web browser tidak refresh halaman
    event.preventDefault();
    
    // 14. ambil id tag inputan yg diketik user dan ambil jg valuenya dgn .value
    let dataForm = document.querySelector("#inventory-form").value;
    console.log(dataForm);

    // 17. tambahkan data yg ingin ditambah, ubah value data dari form yang string menjadi object, buat var baru & assign value ke property sesuai di api.
    let dataObj = {
      name: dataForm
    };
    console.log("value form jd object", dataObj);

    // 18. Ubah data objek tsb menjadi data JSON agar bisa dikirim lewat method POST dgn JSON.stringify(var yg diubah)
    let dataJSON = JSON.stringify(dataObj);
    console.log("value obj jd json", dataJSON);

    // 19. kirim data ke mock api 
    const url = 'https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory';
    let options = {
      // 20. gunakan method POST utk menambahkan data di api
      method: "POST",
      // 21. kirim conten type di header
      headers: {
        "Content-Type": "application/json",
      },
      // 22. kirim variable dgn value data yg udh jd JSON di body
      body: dataJSON
    };
    console.log("options", options);

    // 23. lakukan handling jika berhasil atau gagal dgn try catch
    // 24. try akan menangkap ketika post berhasil
    try{
      // 26. kirimkan post data, fetch lagi dgn param1 url tujuan, param2 berisi method, headers dan body
      const fetchResponse = await fetch(url, options);
      console.log("fetchResponse", fetchResponse);

      // 27. ubah hasil response dari server setelah mengirim data ke JSON
      const dataResponse = await fetchResponse.json();
      // 28. cek dataResponse di console. jika berhasil akan muncul properti id auto increment beserta properti name dgn val yg dikirim/ditambahkan
      console.log('data response',dataResponse);
      
      // 29. ambil data yang paling baru dari server dgn fungsi getData() setelah di add. agar otomatis ter refresh data baru
      getData();
      // 30. cek id parent yaitu value displayListInventory utk melihat apakah data child terbaru yg terakhir berhasil diambah
      console.log(displayListInventory);

      // 32. kosongkan tag input form setelah submit berhasil
      document.querySelector("#inventory-form").value = "";
      // return tdk dipake krn masih jalan & ok hingga input data baru
      // return dataResponse;

    // 25. catch akan menangkap ketika post gagal
    }catch(error){
      // 33. buat alert error jika add data tdk berhasil
      console.log(error);
      alert("Server error");
    }
}

// 15. tambahkan eventlistener click di button submit dgn param ke 2 jalankan function addData
addInventorySubmit.addEventListener("click", addData);

// FUNGSI DELETE
// 40. buat fungsi delete dgn param yg direpresentasikan dgn nama id utk menangkap argumen id dari properti api yg dilempar dari button delete
const deleteData = async (id) => {
  // 41. cek apakah id dari elemen yg di klik tombol delete dpt idnya
  console.log(id);

  // 42. buat param1 var url link url api yg akan dikirim method delete beserta isi idnya yg ingin di delete dgn backtick
  const url = `https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory/${id}`;
    console.log(url);

  // 43. siapkan var sebagai param options ke 2 utk fetch yg berisi method DELETE beserta header tanpa body
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };

  // 44. cek hasil param options
  console.log("options", options);

  // 45. fetch url sbg param1 dan options sbg param2
  let fetchResponse = await fetch(url, options);
  console.log("fetchResponse", fetchResponse);

  // 46. ubah respon fetchnya menjadi data JSON
  let dataResponse = await fetchResponse.json();

  // 47. cek data responsenya jika data JSON ada properti id dan properti lainnya seperti name maka proses delete berhasil
  console.log('data response',dataResponse);

  // 48. ambil lg data terbaru yg sdh terdelete dari api dgn fungsi getData() agar otomatis & tdk harus refresh halaman
  getData();
  // document.querySelector("#inventory-form").value = "";
}

// FUNGSI UPDATE
// 55. buat fungsi update dgn param yg direpresentasikan dgn nama id utk menangkap argumen id dari properti api yg dilempar dari button update.gunakan async
let updateData = async (id) => {
  // 56. cek apakah id dari elemen yg di klik tombol update dpt idnya
  console.log(id);
  
  // 57. buat param1 var url link url api yg akan dikirim method PUT atau PATCH beserta isi idnya yg ingin di update dgn backtick
  const url = `https://6023a8ba6bf3e6001766b52c.mockapi.io/Inventory/${id}`;
  console.log(url);

  // 58. buat prompt utk meminta inputan ketika tombol update di klik
  let dataUpdate = prompt("Please update New item : ");
  console.log(dataUpdate);
  
  // 59. buat var objek dgn nama property yg ingin diupdate. beserta valuenya diisi dgn var hasil inputan prompt sebelumnya
  let dataObj = {
    name: dataUpdate
  };
  console.log(dataObj);

  // 60. ubah respon fetchnya menjadi data JSON
  let dataJSON = JSON.stringify(dataObj)
  console.log(dataJSON)

  // 61. siapkan var sebagai param options ke 2 utk fetch yg berisi method PUT beserta header dan body
  let options = {
    method: "PUT",
    headers: {
      "Content-Type":"application/json",
    },
    // 62. di body, valuenya adalah dataJSON yg berisi inputan prompt utk update
    body: dataJSON
  };
  console.log("options", options);

  // 63. fetch url sbg param1 dan options sbg param2
  let fetchResponse = await fetch(url,options);
  console.log("fetchResponse", fetchResponse);

  // 64. ubah respon fetchnya menjadi data JSON
  let dataResponse = await fetchResponse.json();

  // 65. cek data responsenya jika data JSON ada properti id dan properti lainnya seperti name maka proses delete berhasil
  console.log('data response',dataResponse);

 // 66. ambil lg data terbaru yg sdh terdelete dari api dgn fungsi getData() agar otomatis & tdk harus refresh halaman
 getData();
//  document.querySelector("#inventory-form").value = "";
}