axios({
    method: "get",
    url: "http://127.0.0.1:3000/history",
  })
  .then(function (response) {

    let headerTable = `
        <tr>
            <th class = 'history-name-column'>Name</th>
            <th class = 'history-transaction-column'>Transaction</th>
            <th class = 'history-amount-column'>Amount</th>
            <th class = 'history-date-column'>Date [DD-MM-YYYY]</th>
            <th class = 'history-time-column'>Time [HH:MM:SS]</th>
        </tr>`;

    for (let key in response.data) {
        headerTable += `
        <tr>
            <td class = 'history-name-column'>${response.data[key]['Name']}</td>
            <td class = 'history-transaction-column'>${response.data[key]['Transaction']}</td>
            <td class = 'history-amount-column'>${response.data[key]['Amount']}</td>
            <td class = 'history-date-column'>${response.data[key]['Date']}</td>
            <td class = 'history-time-column'>${response.data[key]['Time']}</td>
        </tr>`;
    }

    console.log(response.data);
    document.getElementById('list-table').innerHTML = headerTable;
  });