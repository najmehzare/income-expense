const labels = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
];
loadData();

let dataChart = {
    labels: labels,
    datasets: [{
        label: 'درآمد',
        backgroundColor: 'rgb(23,213,27)',
        borderColor: 'rgb(23,213,27)',
        data: [incomeArr[0], incomeArr[1], incomeArr[2], incomeArr[3], incomeArr[4], incomeArr[5], incomeArr[6], incomeArr[7], incomeArr[8], incomeArr[9], incomeArr[10], incomeArr[11]],
    },
        {
            label: 'هزینه',
            backgroundColor: 'rgb(241,76,76)',
            borderColor: 'rgb(241,76,76)',
            data: [expenseArr[0], expenseArr[1], expenseArr[2], expenseArr[3], expenseArr[4], expenseArr[5], expenseArr[6], expenseArr[7], expenseArr[8], expenseArr[9], expenseArr[10], expenseArr[11]],
        }]
};

const config = {
    type: 'line',
    data: dataChart,
    options: {}
};

const myChart = new Chart(
document.getElementById('myChart'),
config
);
