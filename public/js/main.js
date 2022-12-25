const submitButton = document.getElementById('submitBtn');

const cityName = document.getElementById('cityName');

const city_name = document.getElementById('city_name');

const temp = document.getElementById("temp")

const temp_status = document.getElementById('temp_status')

const datahide = document.querySelector('.middle_layer')

const temp_real_value = document.getElementById('temp_real_value');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Please Enter City Name before You search"
        datahide.classList.add('data_hide')
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=20b0d5ac931fc213cb0f8c4df4d4d08d`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            
            // condition to check sunny or cloud
            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>";
            } else if(tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6'></i>";
            } else if(tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>";
            }

            datahide.classList.remove('data_hide')

        } catch (error) {
            city_name.innerText = "Please Enter City Name Properly"
            datahide.classList.add('data_hide')
        }

    }

}

submitBtn.addEventListener('click', getInfo);

