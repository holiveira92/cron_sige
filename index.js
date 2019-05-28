const cron = require("node-cron");
const express = require("express");

app = express();

function Post (){
    const axios = require('axios');
    const url = "http://webhook.site/530644ba-59ac-49fa-b97f-55ec89bd8a8e";
    axios.post(url, {
        todo: 'Buy the milk'
    })
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
    })
    .catch((error) => {
        console.error(error)
    });

}

function get(){
    const axios = require('axios');
    const url = "http://webhook.site/530644ba-59ac-49fa-b97f-55ec89bd8a8e";
    try{
        console.log(axios.get(url));
    }catch (error) {
        console.error(error);
    }    
}

function readExcel(){
    var XLSX = require('xlsx')
    var workbook = XLSX.readFile('ListaPedidosVenda-Grupo Restaurante.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //console.log(xlData);
    for (var i in xlData) {
        val = xlData[i];
        if(val.Número != ''){
            console.log(val.Número);
        }
      }
}

cron.schedule("* * * * *", () => {
    console.log("Executando a tarefa a cada 1 minuto");
    readExcel();
    //Post();
    //get();
});

app.listen(1313);