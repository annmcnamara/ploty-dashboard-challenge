// // // Load and munge data, then make the visualization.
// // var fileName = "./cereal-detailed.csv";

// // var nutritionFields = ["calories", "protein", "fat", "sodium", "fiber",
// //                                    "carbs", "sugars", "potassium", "vitamins"];

// // var demographicFields = ["id", "ethnicity", "gender", "age", "location", "bbtype", "wfreq"];
// // var sampleFields = ["id", "otu_ids", "sample_values", "otu_labels"];

// // var samples = "./samples.json";
// // d3.json("./samples.json", function (error, data) {
// //     console.log("data", data);
// //     var sampleMap = {};
    
// //     data.samples.forEach(function(d) {
// //         var id = d.id;
// //         sampleMap[id] = [];

// //     // { id: [ bar1Val, bar2Val, ... ] }
// //         d.sample_values.forEach(function(field) {
// //             console.log(field);
// //             sampleMap[id].push( field );
// //         });

// //         // sampleFields.forEach(function(field) {
// //         //         if(field.length > 1) { console.log(field, +d[field])} ;
// //         //         sampleMap[id].push( +d[field] );
// //         // });
// //     });
// //     console.log("MAP", sampleMap);
// //     makeVis(sampleMap);

// //   });

// // d3.json("./samples.jsaon").then(function(error, data){
// //     var sampleMap  = {};
// //     data.forEach(function(d){
// //         console.log(d);
// //         // var sample = d.id;
// //         // sampleMap[sample] = [];
// //         // sampleFields.forEach(function(field){
// //         //     sampleMap[sample].push( +d[field] );
// //         // })
// //     })
// //     console.log(sampleMap) 
// // });
// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv').then(
// function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

//     var allCountryNames = unpack(rows, 'country'),
//         allYear = unpack(rows, 'year'),
//         allGdp = unpack(rows, 'gdpPercap'),
//         listofCountries = [],
//         currentCountry,
//         currentGdp = [],
//         currentYear = [];

//     for (var i = 0; i < allCountryNames.length; i++ ){
//         if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//             listofCountries.push(allCountryNames[i]);
//         }
//     }

//     function getCountryData(chosenCountry) {
//         currentGdp = [];
//         currentYear = [];
//         for (var i = 0 ; i < allCountryNames.length ; i++){
//             if ( allCountryNames[i] === chosenCountry ) {
//                 currentGdp.push(allGdp[i]);
//                 currentYear.push(allYear[i]);
//             }
//         }
//     };

//     // Default Country Data
//     setBubblePlot('Afghanistan');

//     function setBubblePlot(chosenCountry) {
//         getCountryData(chosenCountry);

//         var trace1 = {
//             x: currentYear,
//             y: currentGdp,
//             mode: 'lines+markers',
//             marker: {
//                 size: 12,
//                 opacity: 0.5
//             }
//         };

//         var data = [trace1];

//         var layout = {
//             title:'Line and Scatter Plot',
//             height: 400,
//             width: 480
//         };

//         Plotly.newPlot('myDiv', data, layout);
//     };

//     var innerContainer = document.querySelector('[data-num="0"'),
//         plotEl = innerContainer.querySelector('.plot'),
//         countrySelector = innerContainer.querySelector('.countrydata');

//     function assignOptions(textArray, selector) {
//         for (var i = 0; i < textArray.length;  i++) {
//             var currentOption = document.createElement('option');
//             currentOption.text = textArray[i];
//             selector.appendChild(currentOption);
//         }
//     }

//     assignOptions(listofCountries, countrySelector);

//     function updateCountry(){
//         setBubblePlot(countrySelector.value);
//     }

//     countrySelector.addEventListener('change', updateCountry, false);
// });

// Initializes the page with a default plot
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   init();

Plotly.d3.json("./samples.json", function (error, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
// // var sampleFields = ["id", "otu_ids", "sample_values", "otu_labels"];

    var people = unpack(rows.samples, 'id'),
        all_samples      = unpack(rows.samples, 'sample_values'),
        allOTU_ids       = unpack(rows.samples, 'otu_ids'),
        allOTU_labels    = unpack(rows.samples,'otu_labels'),
        listofPeople  = [],
        currentPerson,
        current_sample       = [],
        current_otu_id = [], 
        current_otu_label = [];

    console.log (all_samples)
    console.log (allOTU_ids)
    console.log (allOTU_labels)
    console.log (people)


    for (var i = 0; i < people.length; i++ ){
        if (listofPeople.indexOf(people[i]) === -1 ){
            listofPeople.push(people[i]);
        }
    }

    function getPersonData(chosenPerson) {
        current_sample      = [];
        current_otu_id      = [];
        current_otu_label   = [];
        for (var i = 0 ; i < people.length ; i++){
            console.log(people[i] + "===" + chosenPerson)
            if ( people[i] === chosenPerson ) {
                console.log("true");
                current_sample.push(all_samples[i]);
                current_otu_id.push(allOTU_ids[i]);
                current_otu_label.push(allOTU_labels[i]);
            }
        }
    };

    // var trythis = getPersonData("940");
    // console.log(current_sample)

    //set the default
    setBubblePlot('940');

    function setBubblePlot(chosenPerson) {
        getPersonData(chosenPerson);
        console.log(current_sample[0]);
        console.log(current_otu_id[0]);

        //x_otu = current_otu_id[0].sort(d3.descending);
        //console.log("SORTED: ", x_otu);
        y_samples = current_sample[0].filter(function(d, i) {return i < 10;});
        y = current_otu_id[0].filter(function(d,i) {return i<10;});
        console.log(y_samples);
        console.log(y);

        y_samples.sort(d3.ascending);
        x_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


        //TODO
        //GET LABELS WORKING 
        
        var trace1 = {
            x: y_samples,
            y: (d,i)=>y[i],
            type: 'bar',
            mode: 'bar+text',
            text: (d, i)=>(y[i]),
            orientation: 'h',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'',
            height: 400,
            width: 480,
            // range: [0, 20],
            // domain: [0, 2000],

        };

        Plotly.newPlot('plot', data, layout);
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        personSelector = innerContainer.querySelector('.persondata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(people, personSelector);

    function updatePerson(){
        setBubblePlot(personSelector.value);
    }

    personSelector.addEventListener('change', updatePerson, false);
});


// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

//     var allCountryNames = unpack(rows, 'country'),
//         allYear = unpack(rows, 'year'),
//         allGdp = unpack(rows, 'gdpPercap'),
//         listofCountries = [],
//         currentCountry,
//         currentGdp = [],
//         currentYear = [];

//     for (var i = 0; i < allCountryNames.length; i++ ){
//         if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//             listofCountries.push(allCountryNames[i]);
//         }
//     }

//     function getCountryData(chosenCountry) {
//         currentGdp = [];
//         currentYear = [];
//         for (var i = 0 ; i < allCountryNames.length ; i++){
//             if ( allCountryNames[i] === chosenCountry ) {
//                 currentGdp.push(allGdp[i]);
//                 currentYear.push(allYear[i]);
//             }
//         }
//     };

//     // Default Country Data
//     setBubblePlot('Afghanistan');

//     function setBubblePlot(chosenCountry) {
//         getCountryData(chosenCountry);

//         var trace1 = {
//             x: currentYear,
//             y: currentGdp,
//             mode: 'bar',
//             marker: {
//                 size: 12,
//                 opacity: 0.5
//             }
//         };

//         var data = [trace1];

//         var layout = {
//             title:'Line and Scatter Plot',
//             height: 400,
//             width: 480
//         };

//         Plotly.newPlot('plot', data, layout);
//     };

//     var innerContainer = document.querySelector('[data-num="0"'),
//         plotEl = innerContainer.querySelector('.plot'),
//         countrySelector = innerContainer.querySelector('.countrydata');

//     function assignOptions(textArray, selector) {
//         for (var i = 0; i < textArray.length;  i++) {
//             var currentOption = document.createElement('option');
//             currentOption.text = textArray[i];
//             selector.appendChild(currentOption);
//         }
//     }

//     assignOptions(listofCountries, countrySelector);

//     function updateCountry(){
//         setBubblePlot(countrySelector.value);
//     }

//     countrySelector.addEventListener('change', updateCountry, false);
// });