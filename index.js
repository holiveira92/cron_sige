const cron = require("node-cron");
const express = require("express");

app = express();

cron.schedule("* * * * *", () => {
    console.log("Executando a tarefa a cada 1 minuto");
    get();
});

app.listen(1313);

function Post (){
    const axios = require('axios');
    const url = "https://webhook.site/97b731f0-81bd-4791-bc72-0a2ca25b4a39";
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

    var params = {
        spreadsheetId: 'xxx',  // TODO: Update placeholder value.
        range: 'Pedidos',  // TODO: Update placeholder value.
    };
    
    const axios = require('axios');
    const url = "https://sheets.googleapis.com/v4/spreadsheets/1xS2HaWzcSsRSWo1V96lcCde9CRhRZj904PHHX2Gb5OM/values/Pedidos?key=AIzaSyCvOKzgefAIc0k-HKPrZlrpE8KVeKAeWXo";
    var retorno;
    var str = "";
    try{
        axios.get(url, { headers: { "Authorization": "Bearer ya29.GlwaB1o18UJosF4NpF0Bbb8ASjnPK8KtlbylxHq8lsnOQZa-N_OMVA9kjhgwA5vpzsO7i5dWLkTAU2iwuz8CtYFdkevERBNLVXr6wCYkjRjM1FGVvTcBK1RwMKhubg" } })
        .then(response => {
            retorno = response.data;
            linhas = retorno.values;
            //retorno = JSON.parse(retorno);
            var count = linhas.length;
            console.log(count + " pedidos encontrados");
            for (var i in linhas){
                val = linhas[i].toString();
                str = val.split(",");
                //console.log("linha " + i.toString() + " "   + str);
            }
        })
        .catch((error) => {
            console.log('error ' + error);
        });

    }catch (error) {
        console.error(error);
    }    
}