Plotly.d3.json("./samples.json", function (error, rows) {

    //a general function to unpack data structures
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    // VARIABLE DECLARATION

    // Unpack all the data related to each person

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

    // unpack all the meta data
    var metadata         = unpack(rows.metadata, 'id'), 
        allEthnicity     = unpack(rows.metadata, 'ethnicity'), 
        allGender        = unpack(rows.metadata, 'gender'),
        allAges          = unpack(rows.metadata, 'age'),
        allLocations     = unpack(rows.metadata, 'location'),
        allBBType        = unpack(rows.metadata, 'bbtype'),
        allWashFrequency = unpack(rows.metadata, 'wfreq'), 
        currentDemographics = [];

    // console.log(allEthnicity);
    // console.log(allGender);
    // console.log(allAges);
    // console.log(allLocations);
    // console.log(allBBType);
    // console.log(allWashFrequency);
    // console.log(metadata);


    //create a list of people 
    for (var i = 0; i < people.length; i++ ){
        if (listofPeople.indexOf(people[i]) === -1 ){
            listofPeople.push(people[i]);
        }
    }

    // a function to get the data for the selected sample(person)
    function getPersonData(chosenPerson) {
        //clear the arrays
        current_sample      = [];
        current_otu_id      = [];
        current_otu_label   = [];
        currentDemographics     = [];
        for (var i = 0 ; i < people.length ; i++){
            //console.log(people[i] + "===" + chosenPerson)
            if ( people[i] === chosenPerson ) {
                //console.log("true");
                current_sample.push(all_samples[i]);
                current_otu_id.push(allOTU_ids[i]);
                current_otu_label.push(allOTU_labels[i]);

                var demographicInfo= {"id"        :chosenPerson,  //or could use metadata[i] here
                                      "ethnicity" :allEthnicity[i],
                                      "gender"    :allGender[i].toUpperCase(),
                                      "age"       :allAges[i], 
                                      "location"  :allLocations[i], 
                                      "bbType"    :allBBType[i].toUpperCase(), 
                                      "washFreq"  :allWashFrequency[i]};

                // console.log("ID",        demographicInfo.id);
                // console.log("Ethnicity", demographicInfo.ethnicity);
                // console.log("Gender",    demographicInfo.gender);
                // console.log("Age",       demographicInfo.age);
                // console.log("Location",  demographicInfo.location);
                // console.log("BBType",    demographicInfo.bbType);
                // console.log("WashFreq",  demographicInfo.washFreq);

                currentDemographics.push(demographicInfo);

            }
        }
    };


    //set the default
    setBubblePlot('940');


    // populate the charts and the card data. 
    function setBubblePlot(chosenPerson) {
        getPersonData(chosenPerson);
        console.log(current_sample[0]);
        console.log(current_otu_id[0]);
        console.log(currentDemographics[0]);

        y_samples = current_sample[0].filter(function(d, i) {return i < 10;});
        y = current_otu_id[0].filter(function(d,i) {return i<10;});

        text_labels = current_otu_label[0].filter(function(d,i) {return i<10;});
        text_labels.reverse();
        console.log("TEXT LABELS " + text_labels)
        y.reverse();
        y = y.map(function(d, i) {return ("OTU "+d)});

        console.log("y_samples: ", y_samples);
        console.log("y:, ", y);
        y_samples.sort(d3.ascending);
        x_values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Clear the panel
        d3.select("#sample-metadata").html("");
        // Update the panel
        d3.select("#sample-metadata").append("p").text("ID: "        + currentDemographics[0].id);
        d3.select("#sample-metadata").append("p").text("Ethnicity: " + currentDemographics[0].ethnicity);
        d3.select("#sample-metadata").append("p").text("Gender: "    + currentDemographics[0].gender);
        d3.select("#sample-metadata").append("p").text("Age: "       + currentDemographics[0].age);
        d3.select("#sample-metadata").append("p").text("Location: "  + currentDemographics[0].location);
        d3.select("#sample-metadata").append("p").text("BB Type: "   + currentDemographics[0].bbType);
        d3.select("#sample-metadata").append("p").text("Wash Freq: " + currentDemographics[0].washFreq);

        // BAR CHART

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

        // SCATTER CHART

        x_values     = current_otu_id[0];
        y_values     = current_sample[0];
        marker_size  = current_sample[0];
        marker_color = current_otu_id[0];
        text_values  = current_otu_label[0];
        //text_values = current_otu_label[0].map(d=>d);

        var trace2 = {
            x: x_values,
            y: y_values,
            text: text_values,
            mode: 'markers',
            marker: {
              color: marker_color,
              size : marker_size
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: '',  
            showlegend: false,
            xaxis:{title:{text:'OTU ID'}},
            // height: 800,  //take full extent of space
            // width: 1000
          };
                    
          
          Plotly.newPlot('bubble_plot', data, layout);


          // GAUGE CHART
           // Element inside which you want to see the chart
          var element = document.querySelector('#guage-chart')
          d3.select("#guage-chart").html("");


          // Properties of the gauge
          var gaugeOptions = {
            outerNeedle: false,
            hasNeedle: true,
            needleColor: '#860000',
            needleUpdateSpeed: 1000,
            arcColors: ['#F7F3EC', '#F3F1E4', '#E8E7C9', '#E5E9B1', '#D5E595', '#B7CD8B', '#87C180', '#85BD8B' ,'#85BD8B', '#80B587'],
            arcDelimiters: [11,22,33,44,55,66,77,88],
            arcLabels: ['1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','8-9'],
            arcOverEffect: true, 
            rangeLabel: ['0', '9'],
            //centralLabel: '.2',
          }

          // Drawing and updating the chart
          // element, chartwidth )(height is always 0.5 * chartWidth), options, value
          // needle value is a number from 0 to 100.
          // console.log(currentDemographics[0].washFreq);
          needle = currentDemographics[0].washFreq * (100.0/9.0);
          GaugeChart.gaugeChart(element, 400, gaugeOptions).updateNeedle(needle);
    };

    var innerContainer = document.querySelector('[data-num="1"'),
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
// ann mcnamara 2020