$(document).ready(function () {
    GetCityNames();
    $("#searchbtn").click(function () {
        var inputValue = $("#search").val();
        GetInfo(inputValue, true);
    });
});


function GetInfo(cityName, add) {
    console.log("🚀 ~ file: script.js:11 ~ GetInfo ~ newName", cityName)
    $.get("https://api.openweathermap.org/data/2.5/forecast", {
        q: cityName,
        cnt: 56,
        appid: "5d656e8a55e800d71db7685281f31fcb"
    }, function (data) {
        console.log("🚀 ~ file: script.js:17 ~ GetInfo ~ data", data)
        if (add == true) {
            var cityNames = [];
            var lcl = localStorage.getItem("cityNames"); // get the stored array from local storage
            if (lcl) {
                cityNames = JSON.parse(lcl); // parse the stored array string into a JavaScript array
            }
            cityNames.push(cityName);
            localStorage.setItem('cityNames', JSON.stringify(cityNames));
            GetCityNames();
            console.log("🚀 ~ file: script.js:12 ~ GetInfo ~ data", data)
            // data contains the weather data for the specified city and number of days
            // you can access the data and display it on your page
        }


        $("#cityName").text(cityName);
        let count = 0;
        for (let i = 0; i <= data.list.length; i++) {
            if (i % 8 == 0) {
                if (i == 0) {
                    const element = data.list[i];
                    let src = 'http://openweathermap.org/img/wn/' + element.weather[0].icon + '.png?appid=5d656e8a55e800d71db7685281f31fcb';

                    $(".day" + count + "Date").text(element.dt_txt);
                    $(".day" + count + "temp").text(element.main.temp + ' °F');
                    $(".day" + count + "Wind").text(element.wind.speed + ' MPH');
                    $(".day" + count + "Humidity").text(element.main.humidity + ' %');
                    $(".img" + count).attr('src', src);
                }
                else {
                    const element = data.list[i];
                    let src = 'http://openweathermap.org/img/wn/' + element.weather[0].icon + '.png?appid=5d656e8a55e800d71db7685281f31fcb';
                    $("#day" + count + "Date").text(element.dt_txt);
                    $("#day" + count + "temp").text(element.main.temp + ' °F');
                    $("#day" + count + "Wind").text(element.wind.speed + ' MPH');
                    $("#day" + count + "Humidity").text(element.main.humidity + ' %');
                    $("#img" + count).attr('src', src);

                }
                count++;
            }

        }
    });
}

function GetCityNames() {
    cityNames = [];
    var lcl = localStorage.getItem("cityNames"); // get the stored array from local storage
    if (lcl) {
        var cityNames = JSON.parse(lcl); // parse the stored array string into a JavaScript array
        if (cityNames && cityNames.length > 0) {
            var innerHtml = "";
            for (let i = 0; i < cityNames.length; i++) {
                const element = cityNames[i];
                innerHtml += '<button type="button" class="btn cityBtn btn-block"><b>' + element + '</b></button>'
            }
            $("#cities").html(innerHtml);
        }
    }

    $(".cityBtn").click(function () {
        var buttonText = $(this).text(); // get the text of the button
        GetInfo(buttonText, false);
    });


}