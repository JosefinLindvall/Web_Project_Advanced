const express = require('express')

const app = express()

app.get('/', function(request, response){
    response.send('Hello Wooooooorld you are amazzzzing, no uyou are pooop i pie :)')
})

app.listen(8080, function(){
    console.log('Web application listening on port 8080')
})