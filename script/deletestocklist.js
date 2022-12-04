axios({
    method: "get",
    url: "http://127.0.0.1:3000/data",
  })
  .then(function (response) {

    let selectName = '<option selected disabled>Select Items</option>';

    let getName = [];
    let getDescription = [];
    let getAmount = [];
    let getPrice = [];
    let getDate = [];
    let getTime = [];

    let headerTable = `
        <tr>
            <th class = 'name-column'>Name</th>
            <th class = 'description-column'>Description</th>
            <th class = 'amount-column'>Amount</th>
            <th class = 'price-column'>Price</th>
            <th class = 'date-column'>Date [DD-MM-YYYY]</th>
            <th class = 'time-column'>Time [HH:MM:SS]</th>
        </tr>`;

    for (let key in response.data) {
        headerTable += `
        <tr>
            <td class = 'name-column'>${response.data[key]['Name']}</td>
            <td class = 'description-column'>${response.data[key]['Description']}</td>
            <td class = 'amount-column'>${response.data[key]['Amount']}</td>
            <td class = 'price-column'>${response.data[key]['Price']}</td>
            <td class = 'date-column'>${response.data[key]['Date']}</td>
            <td class = 'time-column'>${response.data[key]['Time']}</td>
        </tr>`;
        
        selectName += `
        <option value = '${key}'>
            ${response.data[key]['Name']}
        </option>`;

        getName.push(response.data[key]['Name']);
        getDescription.push(response.data[key]['Description']);
        getAmount.push(response.data[key]['Amount']);
        getPrice.push(response.data[key]['Price']);
        getDate.push(response.data[key]['Date']);
        getTime.push(response.data[key]['Time']);
    }

    headerTable += `
        <tr>
            <td class = 'name-column'>
                <input class = 'delete-data' type = 'text' name = 'name' id = 'edit-name' required readonly>
            </td>
            <td class = 'description-column'>
                <input class = 'delete-data' type = 'text' name = 'description' id = 'edit-description' required readonly>
            </td>
            <td class = 'amount-column'>
                <input class = 'delete-data' type = 'text' name = 'amount' id = 'edit-amount' required readonly>
            </td>
            <td class = 'price-column'>
                <input class = 'delete-data' type = 'text' name = 'price' id = 'edit-price' required readonly>
            </td>
            <td class = 'date-column'>
                <input class = 'delete-data' type = 'text' name = 'date' id = 'edit-date' required readonly>
            </td>
            <td class = 'time-column'>
                <input class = 'delete-data' type = 'text' name = 'time' id = 'edit-time' required readonly>
            </td>
        </tr>`;

    console.log(response.data);

    document.getElementById('list-table').innerHTML = headerTable;
    document.getElementById('select-name').innerHTML = selectName;

    document.getElementById('select-name').addEventListener('change', () => {
        let selectName = document.getElementById('select-name');
        let name = document.getElementById('edit-name');
        let description = document.getElementById('edit-description');
        let amount = document.getElementById('edit-amount');
        let price = document.getElementById('edit-price');
        let date = document.getElementById('edit-date');
        let time = document.getElementById('edit-time');

        name.value = getName[selectName.value];
        description.value = getDescription[selectName.value];
        amount.value = getAmount[selectName.value];
        price.value = getPrice[selectName.value];
        date.value = getDate[selectName.value];
        time.value = getTime[selectName.value];
    });
  });

function getData(form) {
    var formData = new FormData(form);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    console.log(Object.fromEntries(formData));
    return Object.fromEntries(formData);
}

document.getElementById('list-data').addEventListener('submit', (event) => {
    event.preventDefault();
    let listData = getData(event.target);

    axios({
        method: "delete",
        url: "http://127.0.0.1:3000/data",
        data: {
            listData
          }
        })
        .then(function (response) {
            console.log(response);
            })
        .catch(function (error) {
            console.log(error);
            });

    window.location.replace("/deletestocklist");
});