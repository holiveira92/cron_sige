const cron = require("node-cron");
const express = require("express");

app = express();

cron.schedule("* * * * *", () => {
    console.log("Atualizando a cada 1 minuto " + getDateTime());
    get();
});

app.listen(1314);

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

function Post ($json){
    const axios = require('axios');
    const url = "http://localhost/delivery/admin_deliveries/enviar_entrega/";
    axios.post(url,$json)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });

}

function get(){
    const axios = require('axios');
    const url = "https://sheets.googleapis.com/v4/spreadsheets/1xS2HaWzcSsRSWo1V96lcCde9CRhRZj904PHHX2Gb5OM/values/Pedidos?key=AIzaSyCvOKzgefAIc0k-HKPrZlrpE8KVeKAeWXo";
    var retorno;
    var str = "";
    var arr = [];
    try{
        //trocar o token abaixo pegando nesse link: https://holiveiratestes.com.br/google_api/
        //inspecionar -> network -> oauth2 google terá o access_token para usar abaixo
        axios.get(url, {headers: { "Authorization": "Bearer ya29.GlwbB8R5JzQtdx_OFLOku1mawAFr30GzR-02dUk3PNh88lRx6UZwKDtIvOM5PGyZZMUsnAEuvRRaBKps8Pwwlu1B6avhjvEiu5Wv6Zavmp9ZPJYrWZtJZzH9i-ar6A" } })
        .then(response => {
            retorno = response.data;
            linhas = retorno.values;
            for (var i in linhas){
                val = linhas[i].toString();
                str = val.split(",");
                var num_pedido = str[0].toString();
                if(num_pedido.trim() !== '' || num_pedido.length !== 0){
                    arr.push(str);
                }
            }
            //console.log(JSON.stringify(arr));
            Post(JSON.stringify(arr));
            return true;
        })
        .catch((error) => {
            console.log('error ' + error);
        });

    }catch (error) {
        console.error(error);
    }
    
}