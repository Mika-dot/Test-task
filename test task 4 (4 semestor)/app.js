const express = require("express");
const fs = require("fs");
supb = require('@supabase/supabase-js');

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

GetCardsByAuthor = async function (id) {
    let { data: Card, error } = await supabase
        .from('User')
        .select('id, name, age')
        .eq('id', id);
    console.log(Card);
    return Card;
}

GetCards = async function () {
    let { data: Card, error } = await supabase
        .from('User')
        .select('*');
    console.log(Card);
    return Card;
}

AddCard = async function (name, age) {
    let { data: Card, error } = await supabase
        .from('User')
        .insert([{ name: name, age: age }]);
}

DeleteCard = async function (id) {
    let { data: Card, error } = await supabase
        .from('User')
        .delete()
        .eq('id', id);
}

UpdateCard = async function (id, name, age) {
    let { data: Card, error } = await supabase
        .from('User')
        .update({ name: name, age: age })
        .eq('id', id);
}

const supabaseUrl = "https://tpnlbbhcykwpilaopyvg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbmxiYmhjeWt3cGlsYW9weXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY0MzgwNTIsImV4cCI6MTk3MjAxNDA1Mn0.2SBB1FNr29uyLmmxfFvshVa4pUYfIMvS54pFM9lcHHY";

const supabase = supb.createClient(supabaseUrl, supabaseKey)

app.get("/api/users", function (req, res) {  // запрос базы от пользователя 

    let r = GetCards();
    r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных

});
// получение одного пользователя по id
app.get("/api/users/:id", function (req, res) {

    const id = req.params.id; // получаем id

    let r = GetCardsByAuthor(id);
    r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных


    // отправляем пользователя
});

// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;

    let r = AddCard(userName, userAge);
    r.then(resss => {
        res.send(`{"status":` + 0 + "}")
    }); // отправка данных


});
// удаление пользователя по id
app.delete("/api/users/:id", function (req, res) {

    const id = req.params.id;

    let r = DeleteCard(id);
    r.then(resss => {
        res.send(`{"status":` + 0 + "}")
    }); // отправка данных

});
// изменение пользователя
app.put("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;


    let r = UpdateCard(userId, userName, userAge);
    r.then(resss => {
        res.send(`{"status":` + 0 + "}")
    }); // отправка данных

});

app.listen(5500, function () {
    console.log("Сервер ожидает подключения...");
});
