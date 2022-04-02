
// localStorage.clear();

loadData();

function loadData(){

    let allData = getAllData();

    let tableTd = "tableData";
    let row,cell1,cell2,cell3,cell4,cell5,data;
    let table = document.getElementById(tableTd);

    //delete last data of table
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }

    for (let c = 0; c < allData.length; c++) {
        if( c === 0 ){
            this.createHeaderTable(tableTd)
        }
        row = table.insertRow(c+1);

        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        cell5 = row.insertCell(4);

        data = JSON.parse(allData[c]);

        cell1.innerHTML = String(c + 1);
        cell2.innerHTML = data['amount'] + ' تومان ';
        cell3.innerHTML = data['date'];

        if(data['type_amount']==='income'){
            cell4.innerHTML = 'درآمد';
            cell4.style.color = "green";
        }else{
            cell4.innerHTML = 'هزینه';
            cell4.style.color = "red";
        }

        cell5.innerHTML = '';
    }

}

function createHeaderTable(tableId) {
    let table = document.getElementById(tableId);
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML = "ردیف";
    cell = row.insertCell(1);
    cell.innerHTML = "مبلغ";
    cell = row.insertCell(2);
    cell.innerHTML = "تاریخ";
    cell = row.insertCell(3);
    cell.innerHTML = "نوع هزینه";
    cell = row.insertCell(4);
    cell.innerHTML = "توضیحات";

}

function saveData(){

    let allData = this.getAllData() || [] ;

    let newData = this.getNewDataForm();

    newData = JSON.parse(newData)

    if (!newData['amount']){
        alert('لطفا مبلغ را وارد کنید');
    }else if (!newData['date']){
        alert('لطفا تاریخ را وارد کنید');
    }else{
        allData.push(JSON.stringify(newData));
        allData = JSON.stringify(allData);
        localStorage.setItem('allRecords', allData);

        this.clearForm();
        this.loadData();
    }
}

function getNewDataForm() {
    let type_amount = getRadioValue('type_amount');
    let amount = document.getElementsByName('amount')[0].value;
    let date = document.getElementsByName('date')[0].value;
    let description = document.getElementsByName('description')[0].value;

    let newData = {type_amount :type_amount , amount:amount , date:date , description : description };
    newData = JSON.stringify(newData);
    return newData;
}

function clearForm(){
    document.getElementsByName('amount')[0].value = null;
    document.getElementsByName('description')[0].value = null;

    document.getElementById('saveBtn').innerHTML = 'ثبت شد. ';
    document.getElementById("saveBtn").disabled = true;
    document.getElementById("saveBtn").style.backgroundColor = 'red';

    setTimeout(() => {
        document.getElementById('saveBtn').innerHTML = 'ثبت دخل و خرج ';
        document.getElementById("saveBtn").disabled = false;
        document.getElementById("saveBtn").style.backgroundColor = 'green';
    }, 3000);
}

function getRadioValue(theRadioGroup)
{
    let elements = document.getElementsByName(theRadioGroup);
    for (let i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}

function getAllData(){
    let allRecords = localStorage.getItem('allRecords');
    allRecords = JSON.parse(allRecords);
    return allRecords;

}
//
// function removeData(item){
//     localStorage.removeItem('item');
//     console.log(localStorage.getItem('item')); // null
// }
