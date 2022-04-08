
// localStorage.clear();

// loadData();

function loadData(){

    let allData = getAllData();

    let tableTd = "tableData";
    let row,cell1,cell2,cell3,cell4,cell5,data;
    let sumIncome = 0,sumExpense = 0 ;
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
            sumIncome = sumIncome + parseInt(data['amount']);
        }else{
            cell4.innerHTML = 'هزینه';
            cell4.style.color = "red";
            sumExpense = sumExpense + parseInt(data['amount']);
        }

        cell5.innerHTML = '<button class="btn btn-primary" type="button" onclick="deleteModal('+c+')" ' +
            'style="background: rgb(255,255,255);border-color: rgb(255,25,25);color: rgb(203,17,17);">حذف</button>'+
            '<button class="btn btn-primary" type="button" onclick="showDescription('+c+')"' +
            '>نمایش</button>';
    }

    document.getElementById('sumIncome').innerHTML = sumIncome;
    document.getElementById('sumExpense').innerHTML = sumExpense;
}

function createHeaderTable(tableId) {
    let table = document.getElementById(tableId);
    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell = row.insertCell(0);
    cell.innerHTML ="<b>" + "ردیف" + "</b>";
    cell = row.insertCell(1);
    cell.innerHTML ="<b>" +  "مبلغ" + "</b>";
    cell = row.insertCell(2);
    cell.innerHTML ="<b>" +  "تاریخ" + "</b>";
    cell = row.insertCell(3);
    cell.innerHTML ="<b>" +  "نوع هزینه" + "</b>";
    cell = row.insertCell(4);
    cell.innerHTML ="<b>" +  "توضیحات" + "</b>";

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

function showDescription(item){
    let allData = getAllData();
    let data = JSON.parse(allData[item]);

    document.getElementById("myModal").style.display = "block";
    document.getElementById("modalBody").innerHTML = data['description'];
}

function deleteModal(item){
    document.getElementById("modalDelete").style.display = "block";

    let button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'حذف';
    button.className = 'btn btn-danger';
    button.style.width = '100px';

    button.onclick = function() {
        deleteRow(item);
        document.getElementById('modalDelete').style.display = 'none';
    };

    let deleteDiv = document.getElementById('deleteDiv');
    deleteDiv.removeChild(deleteDiv.firstChild);
    deleteDiv.appendChild(button);
}

function deleteRow(item){
    let allData = this.getAllData();

    allData.splice(item, 1);

    allData = JSON.stringify(allData);
    localStorage.setItem('allRecords', allData);

    this.loadData();
}

