/*lista de teste e demonstração*/
var list = [
    {
        "desc": "rice",
        "amount": "1",
        "value": "5.40"
    },

    {
        "desc": "beer",
        "amount": "12",
        "value": "1.99"
    },

    {
        "desc": "meat",
        "amount": "1",
        "value": "15.40"
    }

];

/*retorna uma somatória dos valores cadastrados na lista*/
function getTotal() {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }

    return total;
}

function showTotal() {
    document.getElementById("totalValue").innerHTML = formatValue(getTotal());
}

/*cria a tabela*/
function setList(list) {
    var table = '<thead>' +
        '<tr>' +
        '<td>Description</td>' +
        '<td>Amount</td>' +
        '<td>Value</td>' +
        '<td>Action</td>' +
        '</tr>' +
        '</thead>' +
        '<tbody>'
    ;

    for (var key in list) {
        table += '<tr>' +
            '<td>' + formatDesc(list[key].desc) + '</td>' +
            '<td>' + formatAmount(list[key].amount) + '</td>' +
            '<td>' + formatValue(list[key].value) + '</td>' +
            '<td>' +
            '<button class="btn btn-default" onclick="setUpdate(' + key + ');">Edit</button>' +
            '<button class="btn btn-default" onclick="deleteData(' + key + ');">Delete</button>' +
            '</td>' +
            '</tr>'
        ;
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    saveListStorage(list);
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    console.log(str);
    //deixa a string em letra minuscula
    //deixa a peimeira letra maiuscula e concatena com o restante da palavra a partir da posição 1
    str = str.charAt(0).toUpperCase() + str.slice(1)
    return str;
}

/*formata o valor e nome dos produtos*/
function formatValue(value) {
    //pega a string, converte pra float com apenas duas casas decimais, e transformo pra string dnv
    var str = parseFloat(value).toFixed(2);
    +"";
    //troca o ponto por virgula na exibição
    str = str.replace('.', ',');
    str = "$ " + str;
    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}


/*add um alemento na lista*/
function addData() {
    if (!validation()) {
        return;
    }

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    //add um elemento por primeiro na lista
    list.unshift(
        {
            "desc": desc,
            "amount": amount,
            "value": value
        }
    );
    setList(list);
    showTotal();
}

/*seta os valores cadastrados no formulário*/
function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    /*oculta botão de add e mostra botão de salvar ou cancelar*/
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';


}

/*reseta formulário ao clicar em cancelar*/
function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";

    document.getElementById("errors").style.display = "none";


}

/*atualiza valores ao clicar em salvar*/
function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {
        "desc": desc,
        "amount": amount,
        "value": value
    };
    resetForm();
    setList(list);
    showTotal();

}

/*deletar elemento da lista*/
function deleteData(id) {

    if (confirm("Delete this item?")) {
        list.splice(id, 1);
    }
    setList(list);
    showTotal();
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";

    if (desc === "") {
        errors += '<p>fill out description</p>'
    }
    if (amount === "") {
        errors += '<p>fill out a quantity</p>'
    } else if (amount != parseInt(amount)) {
        errors += '<p>fill out a valid amount</p>'
    }

    if (value === "") {
        errors += '<p>fill out a value</p>'
    } else if (value != parseFloat(value)) {
        errors += '<p>fill out a valid value</p>'
    }

    if (errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "#ff000080";
        document.getElementById("errors").style.color = "#fff";
        document.getElementById("errors").style.paddingLeft = "15px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "10px";


        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;

        return 0;
    } else {
        return 1;
    }


}

/*deleta lista*/
function deleteList() {
    if (confirm("Delete this list?")) {
        list = [];
        setList(list);
        showTotal();
    }
}

/*salva lista no local storage do navegador*/
function saveListStorage(list) {
    /*transforma o array em string de formato json*/
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("listItens", jsonStr);
}

/*recupera lista q está no local storage*/
function initListStorage() {
    var testList = localStorage.getItem("listItens");
    if (testList) {
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();
showTotal();
