const express = require("express");
   
const app = express();


app.use(express.static(__dirname + '/public'));
   
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
  
app.post("/download", urlencodedParser, function (request, response) {

    console.log("приняли запрос");
    if(!request.body) {
        
        console.log("тело пустое");
        return response.sendStatus(400);
    
    }
    console.log("тело запроса");
    console.log(request.body);

	if(typeof request.body.userName != "string"){
        console.log("имя не строчка");     
    let json = {
        stattus: 'error',
        stattusnamber: '1',
        message: "Невирный тип данных"
    };
    response.end(JSON.stringify(json));
    return response.sendStatus(400);
    }

    if(typeof request.body.userShip != "string"){
        console.log("корабль не строчка");     
    let json = {
        stattus: 'error',
        stattusnamber: '2',
        message: "Невирный тип данных"
    };
    response.end(JSON.stringify(json));
    return response.sendStatus(400);
    }
    
    if(typeof Number(request.body.userNamber) != "number"){
        console.log("число не цифра");     
    let json = {
        stattus: 'error',
        stattusnamber: '3',
        message: "Невирный тип данных"
    };
    response.end(JSON.stringify(json));
    return response.sendStatus(400);
    }

    if((!request.body.userName) || (!request.body.userDate) || (!request.body.userNamber)){
        console.log("Не хватает данных");     
    let json = {
        stattus: 'error',
        stattusnamber: '3.2',
        message: "Не хватает данных"
    };
    response.end(JSON.stringify(json));
    return response.sendStatus(400);
    }

    console.log("нету ошибок типа данных");

    let json = {
        name: 'РосТуризм',
        userName: request.body.userName,
        userDate: request.body.userDate,
        userShip: request.body.userShip,
        userNamber: request.body.userNamber
    };
    console.log("Сформирован json");

    response.end(JSON.stringify(json));
    response.sendStatus(200);

    //response.send(`${request.body.userName} - ${request.body.userAge}`);
});
   
app.listen(5500, ()=>console.log("Сервер запущен..."));
