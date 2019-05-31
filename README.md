trocar o no código gerando a partir desse link: https://holiveiratestes.com.br/google_api/
Para capturar veja abaixo
inspecionar -> network -> oauth2 google terá o access_token para usar abaixo
trocar o token na linha 35 , e sempre dar refresh quando parar, pois o google só gera tokens que expiram em 1 hora.
Ajustar URL de recebimento na linha 15.
