const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const requests = require('requests')

// ports
const port = process.env.PORT || 3000;

// paths { templatePath, partialPath }
const staticPath = path.join(__dirname, "../public")
app.use(express.static(staticPath))

const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setting the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/service', (req, res) => {
    res.render("service");
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/contact', (req, res) => {
    res.send("contact");
})

app.get('/weather', (req, res) => {
    res.render("weather")
})

// app.get('/weather', (req, res) => {
//     requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=20b0d5ac931fc213cb0f8c4df4d4d08d`)
//         .on("data", (chunk) => {
//             const objData = JSON.parse(chunk); // converting json to object data
//             const arrData = [objData]          // converting obj data to array of objects
//             console.log(`Location: ${arrData[0].name} temperature: ${arrData[0].main.temp}`)
//             res.send(`Location: ${arrData[0].name} temperature: ${arrData[0].main.temp}`);
//         });
// });

app.get('*', (req, res) => {
    res.render("404", {
        errorMsg: "Oops Page not found. Dont Cry !"
    });
})


app.listen(port, '127.0.0.1', () => {
    console.log(`Server Listening in http://localhost:${port}`);
})