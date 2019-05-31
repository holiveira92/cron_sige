const cron = require("node-cron");
const express = require("express");

app = express();

cron.schedule("* * * * *", () => {
    console.log("Executando a tarefa a cada 1 minuto");
    get();
});

app.listen(1314);

function Post ($json){
    const axios = require('axios');
    const url = "URL_RECEBIMENTO";
    axios.post(url,$json)
    .then((res) => {
        //console.log(`statusCode: ${res.statusCode}`);
        //console.log(res);
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
        //trocar o token abaixo pegando nesse link: https://holiveiratestes.com.br/google_api/
        //inspecionar -> network -> oauth2 google terá o access_token para usar abaixo
        axios.get(url, { headers: { "Authorization": "Bearer ya29.GlwaB1o18UJosF4NpF0Bbb8ASjnPK8KtlbylxHq8lsnOQZa-N_OMVA9kjhgwA5vpzsO7i5dWLkTAU2iwuz8CtYFdkevERBNLVXr6wCYkjRjM1FGVvTcBK1RwMKhubg" } })
        .then(response => {
            retorno = response.data;
            linhas = retorno.values;
            Post(linhas);
            return true;
            /*
            //retorno = JSON.parse(retorno);
            var count = linhas.length;
            for (var i in linhas){
                val = linhas[i].toString();
                str = val.split(",");
                var num_pedido = str[0].toString();
                if(num_pedido.trim() !== '' || num_pedido.length !== 0){
                    console.log(num_pedido);
                }
            }
            */
        })
        .catch((error) => {
            console.log('error ' + error);
        });

    }catch (error) {
        console.error(error);
    }    
}