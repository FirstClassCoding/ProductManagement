axios({
    method: "get",
    url: "http://127.0.0.1:3000/data",
  })
  .then(function (response) {

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
    }

    headerTable += `
        <tr>
            <td class = 'name-column'>
                <input class = 'enter-data' type = 'text' name = 'name' required>
            </td>
            <td class = 'description-column'>
                <input class = 'enter-data' type = 'text' name = 'description' required>
            </td>
            <td class = 'amount-column'>
                <input class = 'enter-data' type = 'text' name = 'amount'>
            </td>
            <td class = 'price-column'>
                <input class = 'enter-data' type = 'text' name = 'price' required>
            </td>
            <td class = 'date-column'></td>
            <td class = 'time-column'></td>
        </tr>`;

    console.log(response.data);
    document.getElementById('list-table').innerHTML = headerTable;
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
        method: "post",
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

    window.location.replace("/addstocklist");
});