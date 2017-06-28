/// <reference path="JavaScript.js" />


(function () {

    

    'use strict';
 

    if ('serviceWorker' in navigator) {
        try {
        
            navigator.serviceWorker
             .register('../sw2.js')
             .then(function () { console.log('Service Worker Registered'); });
        }

        catch (Exception) {
            console.log(Exception);
        }
    }




    var initialWeatherForecast = {
        key: 'None',
        Name: 'None',
        Sallary:0,
        Comment:'None'
 
    };   //checked

    var app = {
        hasRequestPending: false,
        isLoading: true,
        visibleCards: {},
        Loddeddata: [],
        spinner: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.update2'),
        container: document.querySelector('.template'),
        addDialog: document.querySelector('.dialog-container'),
       
    };  //checked


    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('butRefresh').addEventListener('click', function () {
        // Refresh all of the forecasts
       // app.updateForecasts();
    });  // checked

    document.getElementById('btnSubmit').addEventListener('click', function () {
        // Open/show the add new city dialog
        //app.toggleAddDialog(true);
        app.loadrequest();

    });   // checked




    app.loadrequest =function()
    {
        //{ 'Name': 'Jon Smith', 'Address': { 'City': 'New York', 'State': 'NY' }, 'Age': 42 };
       
        if (document.getElementById('txtname').value.trim != "")
        {
            var yourObject = { 'key': '' + document.getElementById('txtname').value + '', value: { 'Name': '' + document.getElementById('txtname').value + '', 'Comment': '' + document.getElementById('txtcomment').value + '', 'Sallary': '' + document.getElementById('txtsallary').value + '' } }

            // loaddata("http://localhost:33688/Home/AjaxMethod", JSON.stringify(yourObject));

            var url = 'http://localhost:33688/Home/AjaxMethod';
            url += '?data=' + JSON.stringify(yourObject)
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {

                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                       
                        var response = JSON.parse(request.response);
                       
                        //response.key = key;
                        //response.label = label;
                        app.hasRequestPending = false;
                        app.updateForecastCard(response);
                    }
                }
            };

            //var data = JSON.stringify(yourObject);
            request.open('POST', url, true);
            request.send();
        }
    }


    app.saveSelectedCities = function (yourObject) {
        debugger;
        var selectedCities = JSON.stringify(yourObject);
        localStorage.selectedCities = selectedCities;
    };



    app.updateForecastCard = function (data) {
        var j = 0;
     
        var card = app.visibleCards[data.Name];
        var HH = undefined;
        if (!card) {
           
            var el = document.getElementById('parent');

            while (el.firstChild) el.removeChild(el.firstChild);

            app.saveSelectedCities(data);

            for (var i = data.length - 1; i >= 0; i--)
            {
                card = app.cardTemplate.cloneNode(true);
               // card.remove('cardTemplate');
                card.classList.remove('cardTemplate');
                card.querySelector('.valueName').textContent = data[i].value.Name;
                card.querySelector('.valueSallary').textContent = data[i].value.Sallary;
                card.querySelector('.valueComment').textContent = data[i].value.Comment;
                card.removeAttribute('hidden');
                app.container.appendChild(card);
                //app.visibleCards[data.Name] = card;
                j = 1;
            }
    
        }

    }


    //function remove(i)
    //{
    //    if (i == 1) {
    //        var elem = (document.querySelector('.template').firstElementChild);
    //        return elem.parentNode.removeChild(elem);
    //    }
    //}

    ///*****************************************************************************
    // *
    // * Methods to update/refresh the UI
    // *
    // ****************************************************************************/

    //// Toggles the visibility of the add new city dialog.


    //app.toggleAddDialog = function (visible) {
    //    if (visible) {
    //        app.addDialog.classList.add('dialog-container--visible');
    //    } else {
    //        app.addDialog.classList.remove('dialog-container--visible');
    //    }
    //};

    //// Updates a weather card with the latest weather forecast. If the card
    //// doesn't already exist, it's cloned from the template.

    //app.updateForecastCard = function (data) {
    //    debugger ;
    //    var card = app.visibleCards[data.key];
    //    if (!card) {
    //        card = app.cardTemplate.cloneNode(true);
    //        //card.classList.remove('cardTemplate');
    //        card.querySelector('.name').textContent = data.Name;
    //        card.querySelector('.sallary').textContent = data.Sallary;
    //        card.querySelector('.comm').textContent = data.Comment;
    //        card.removeAttribute('hidden');
    //        app.container.appendChild(card);
    //        app.visibleCards[data.key] = card;
    //    }
  
    //    if (app.isLoading)
    //    {
    //        //app.spinner.setAttribute('hidden', true);
    //        //app.container.removeAttribute('hidden');
    //        app.isLoading = false;
    //    }
    //};


    ///*****************************************************************************
    // *
    // * Methods for dealing with the model
    // *
    // ****************************************************************************/

    //// Gets a forecast for a specific city and update the card with the data

    //app.getForecast = function (key, label) {
    //    ;

    //    var url = 'http://localhost:33688/Home/AjaxMethod';
    //    //url += key + '.json';

        


    //    if ('caches' in window) {
    //        caches.match(url).then(function (response) {
    //            if (response) {
    //                response.json().then(function (json) {
    //                    // Only update if the XHR is still pending, otherwise the XHR
    //                    // has already returned and provided the latest data.
    //                    if (app.hasRequestPending) {
    //                        console.log('updated from cache');
    //                        json.key = key;
    //                        json.label = label;
    //                        app.updateForecastCard(json);
    //                    }
    //                });
    //            }
    //        });
    //    }
    //    // Make the XHR to get the data, then update the card
    //    app.hasRequestPending = true;

    //    var request = new XMLHttpRequest();
    //    request.onreadystatechange = function () {
    //        ;
    //        if (request.readyState === XMLHttpRequest.DONE) {
    //            if (request.status === 200) {
    //                var response = JSON.parse(request.response);
    //                response.key = key;
    //                response.label = label;
    //                app.hasRequestPending = false;
    //                app.updateForecastCard(response);
    //            }
    //        }
    //    };
    //    request.open('POST', url,true);
    //    request.send();
    //};

    //// Iterate all of the cards and attempt to get the latest forecast data

    //app.updateForecasts = function () {
    //    ;
    //    var keys = Object.keys(app.visibleCards);
    //    keys.forEach(function (key) {
    //        app.getForecast(key);
    //    });
    //};

    //var fakeForecast = {
    //    key: 'newyork',
    //    label: 'New York, NY',
    //    currently: {
    //        time: 1453489481,
    //        summary: 'Clear',
    //        icon: 'partly-cloudy-day',
    //        temperature: 30,
    //        apparentTemperature: 21,
    //        precipProbability: 0.80,
    //        humidity: 0.17,
    //        windBearing: 125,
    //        windSpeed: 1.52
    //    },
    //    daily: {
    //        data: [
    //          { icon: 'clear-day', temperatureMax: 36, temperatureMin: 31 },
    //          { icon: 'rain', temperatureMax: 34, temperatureMin: 28 },
    //          { icon: 'snow', temperatureMax: 31, temperatureMin: 17 },
    //          { icon: 'sleet', temperatureMax: 38, temperatureMin: 31 },
    //          { icon: 'fog', temperatureMax: 40, temperatureMin: 36 },
    //          { icon: 'wind', temperatureMax: 35, temperatureMin: 29 },
    //          { icon: 'partly-cloudy-day', temperatureMax: 42, temperatureMin: 40 }
    //        ]
    //    }
    //};

    //// Uncomment the line below to test with the provided fake data

    //app.updateForecastCard(fakeForecast);



               
                //app.selectedCities = localStorage.selectedCities;

                //if (app.selectedCities) {
     
                //    app.selectedCities = JSON.parse(app.selectedCities);
                //    app.selectedCities.forEach(function (city) {
                //        app.getForecast(city.Name, city.Name);
                //    });
                //} else {
                //    app.updateForecastCard(initialWeatherForecast);
                //    app.selectedCities = [
                //      { key: initialWeatherForecast.key, label: initialWeatherForecast.Name }
                //    ];
                //    app.saveSelectedCities();
                //}

 


    //function loaddata(url,data)
    //{
    //    $.ajax({
    //        type: "POST",
    //        url: "http://localhost:33688/Home/AjaxMethod",
    //        data: JSON.stringify(yourObject),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (response) {
              
    //            alert("Hello: " + response.Name + " .\nCurrent Date and Time: " + response.DateTime);
    //        },
    //        failure: function (response) {
    //            alert(response.responseText);
    //        },
    //        error: function (response) {
    //            alert(response.responseText);
    //        }
    //    });

       
    //}


})();