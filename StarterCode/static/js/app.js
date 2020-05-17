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
        all_samples       = unpack(rows.samples, 'sample_values'),
        allOTU_ids        = unpack(rows.samples, 'otu_ids'),
        allOTU_labels     = unpack(rows.samples,'otu_labels'),
        listofPeople      = [],
        currentPerson,
        current_sample    = [],
        current_otu_id    = [], 
        current_otu_label = [];

    // console.log (all_samples)
    // console.log (allOTU_ids)
    // console.log (allOTU_labels)
    // console.log (people)


    var metadata         = unpack(rows.metadata, 'id'), 
        allEthnicity     = unpack(rows.metadata, 'ethnicity'), 
        allGender        = unpack(rows.metadata, 'gender'),
        allAges          = unpack(rows.metadata, 'age'),
        allLocations     = unpack(rows.metadata, 'location'),
        allBBType        = unpack(rows.metadata, 'bbtype'),
        allWashFrequency = unpack(rows.metadata, 'wfreq');

    console.log(allEthnicity);
    console.log(allGender);
    console.log(allAges);
    console.log(allLocations);
    console.log(allBBType);
    console.log(allWashFrequency);
    console.log(metadata);


    for (var i = 0; i < people.length; i++ ){
        if (listofPeople.indexOf(people[i]) === -1 ){
            listofPeople.push(people[i]);
        }
    }

    function getPersonData(chosenPerson) {
        current_sample      = [];
        current_otu_id      = [];
        current_otu_label   = [];
        demographicInfo     = [];
        for (var i = 0 ; i < people.length ; i++){
            //console.log(people[i] + "===" + chosenPerson)
            if ( people[i] === chosenPerson ) {
                //console.log("true");
                current_sample.push(all_samples[i]);
                current_otu_id.push(allOTU_ids[i]);
                current_otu_label.push(allOTU_labels[i]);

                var demographicInfo= {"id"        :chosenPerson,
                                      "ethnicity" :allEthnicity[i],
                                      "gender"    :allGender[i],
                                      "age"       :allAges[i], 
                                      "location"  :allLocations[i], 
                                      "bbType"    :allBBType[i], 
                                      "washFreq"  :allWashFrequency[i]};

                console.log("ID",        demographicInfo.id);
                console.log("Ethnicity", demographicInfo.ethnicity);
                console.log("Gender",    demographicInfo.gender);
                console.log("Age",       demographicInfo.age);
                console.log("Location",  demographicInfo.location);
                console.log("BBType",    demographicInfo.bbType);
                console.log("WashFreq",  demographicInfo.washFreq);



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

        text_labels = current_otu_label[0].filter(function(d,i) {return i<10;});
        text_labels.reverse();
        console.log(text_labels)
        y.reverse();
        y = y.map(function(d, i) {return ("OTU "+d)});

        console.log("y_samples: ", y_samples);
        console.log("y:, ", y);
        y_samples.sort(d3.ascending);
        x_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


        //TODO
        //GET LABELS WORKING 

        var trace1 = {
            x: y_samples,
            y: y,
            type: 'bar',
            mode: 'bar+text',
            text: text_labels,
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

        x_values     = current_otu_id[0];
        //console.log(x_values);
        y_values     = current_sample[0];
        marker_size  = current_sample[0];
        marker_color = current_otu_id[0];
        text_values  = current_otu_label[0]

        var trace2 = {
            x: x_values,
            y: y_values,
            text: text_values,
            mode: 'markers',
            marker: {
              color: marker_color,
              size: marker_size
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            xaxis:{title:{text:'OTU ID'}},
            height: 600,
            width: 600
          };
                    
          
          Plotly.newPlot('bubble_plot', data, layout);

          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 9,
              title: { text: "Scrubs per week" },
              type: "indicator",
              mode: "gauge",
              delta: { reference: 1 },
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 1], color: "BlanchedAlmond" },
                  { range: [1, 2], color: "Bisque" },
                  { range: [2, 3], color: "Beige" },
                  { range: [3, 4], color: "LemonChiffon" },
                  { range: [4, 5], color: "Khaki" },
                  { range: [5, 6], color: "DarkKhaki" },
                  { range: [6, 7], color: "DarkSeaGreen" },
                  { range: [7, 8], color: "DarkOliveGreen" },
                  { range: [8, 9], color: "DarkGreen" }
                ],
                // threshold: {
                //   line: { color: "red", width: 4 },
                //   thickness: 0.75,
                //   value: 8
                // }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('guage-chart', data, layout);

// var traceA = {
//   type: "pie",
//   showlegend: false,
//   hole: 0.4,
//   rotation: 90,
//   values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
//   text: ["Very Low", "Low", "Average", "Good", "Excellent", ""],
//   direction: "clockwise",
//   textinfo: "text",
//   textposition: "inside",
//   marker: {
//     colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
//   },
//   labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
//   hoverinfo: "label"
// };

// var degrees = 115, radius = .6;
// var radians = degrees * Math.PI / 180;
// var x = -1 * radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// var layout = {
//   shapes:[{
//       type: 'line',
//       x0: 0,
//       y0: 0,
//       x1: x,
//       y1: 0.5,
//       line: {
//         color: 'black',
//         width: 8
//       }
//     }],
//   title: 'Number of Printers Sold in a Week',
//   xaxis: {visible: false, range: [-1, 1]},
//   yaxis: {visible: false, range: [-1, 1]}
// };

// var data = [traceA];






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