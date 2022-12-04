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

    console.log(response.data);
    document.getElementById('list-table').innerHTML = headerTable;
  });