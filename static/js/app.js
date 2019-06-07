// function buildCharts(missions) {

var url = "/Data";
d3.json(url).then(function(charts) {

    var trace1 = {
        type: 'bar',
        orientation: 'h',
        marker: {color: 'rgb(66,179,0)'},
        y: charts.map(row => row.AIRCRAFT_NAME),
        x: charts.map(row => row.MISSION_ID),
        transforms: [{
            type: 'aggregate',
            groups: charts.map(row => row.MISSION_ID),
            aggregations: [
                {target: 'x', func: 'count', enabled: true},
            ]
        }],
        transforms: [{
            type: 'sort',
            target: 'x',
            order: 'descending'
          }],
        hoverinfo: [{
            type: 'aggregate',
            groups: charts.map(row => row.MISSION_ID),
            aggregations: [
                {target: 'x', func: 'count', enabled: true},
            ]
        }]
    }
    // console.log(trace1)
    var planes = [trace1];

    var layout1 = {
        plot_bgcolor: '#1B191F',
        name: 'Flight Missions for Each Aircraft'
    }

    Plotly.plot('plot1', planes, layout1);

    var trace2 = {
        type: 'bar',
        orientation: 'h',
        marker: {color: 'rgb(199,43,43)'},
        y: charts.map(row => row.TGT_COUNTRY),
        x: charts.map(row => row.MISSION_ID),
        transforms: [{
            type: 'aggregate',
            groups: charts.map(row => row.MISSION_ID),
            aggregations: [
                {target: 'x', func: 'count', enabled: true},
            ]
        }],
        transforms: [{
            type: 'sort',
            target: 'x',
            order: 'descending'
          }]
    }
    // console.log(trace1)
    var countries = [trace2];

    var layout2 = {
        plot_bgcolor: '#1B191F',
        name: 'Number of Attacks Against Each Country'
    }

    Plotly.plot('plot2', countries, layout2);

    // var trace3 = {
    //     type: 'bar',
    //     orientation: 'h',
    //     marker: {color: 'rgb(199,43,43)'},
    //     y: charts.map(row => row.COUNTRY_FLYING_MISSION),
    //     x: charts.map(row => row.MISSION_ID),
    //     transforms: [{
    //         type: 'aggregate',
    //         groups: charts.map(row => row.MISSION_ID),
    //         aggregations: [
    //             {target: 'x', func: 'count', enabled: true},
    //         ]
    //     }],
    //     transforms: [{
    //         type: 'sort',
    //         target: 'x',
    //         order: 'descending'
    //       }]
    // }
    // // console.log(trace1)
    // var attack = [trace3];

    // var layout3 = {
    //     plot_bgcolor: '#1B191F',
    //     name: 'Number of Attacks Against Each Country'
    // }

    // Plotly.plot('plot3', attack, layout3);
});

// Plotly.d3.csv('new_wwii_flights.csv', function (err, data) {
//   // Create a lookup table to sort and regroup the columns of data,
//   // first by year, then by continent:
//   var lookup = {};
//   function getData(YEAR, TGT_COUNTRY) {
//     var byYear, trace;
//     if (!(byYear = lookup[YEAR])) {;
//       byYear = lookup[YEAR] = {};
//     }
// 	 // If a container for this year + continent doesn't exist yet,
// 	 // then create one:
//     if (!(trace = byYear[TGT_COUNTRY])) {
//       trace = byYear[TGT_COUNTRY] = {
//         x: [],
//         y: [],
//         id: [],
//         text: [],
//         marker: {size: []}
//       };
//     }
//     return trace;
//   }

//   // Go through each row, get the right trace, and append the data:
//   for (var i = 0; i < data.length; i++) {
//     var datum = data[i];
//     var trace = getData(datum.YEAR, datum.TGT_COUNTRY);
//     trace.text.push(datum.TGT_COUNTRY);
//     trace.id.push(datum.AIRCRAFT_NAME);
//     trace.x.push(datum.COUNTRY_FLYING_MISSION);
//     trace.y.push(datum.MISSION_ID);
//     trace.marker.size.push(datum.TONS_OF_HE);
//   }

//   // Get the group names:
//   var years = Object.keys(lookup);
//   // In this case, every year includes every continent, so we
//   // can just infer the continents from the *first* year:
//   var firstYear = lookup[years[0]];
//   var countries = Object.keys(firstYear);

//   // Create the main traces, one for each continent:
//   var traces = [];
//   for (i = 0; i < countries.length; i++) {
//     var data = firstYear[countries[i]];
// 	 // One small note. We're creating a single trace here, to which
// 	 // the frames will pass data for the different years. It's
// 	 // subtle, but to avoid data reference problems, we'll slice
// 	 // the arrays to ensure we never write any new data into our
// 	 // lookup table:
//     traces.push({
//       name: countries[i],
//       x: data.x.slice(),
//       y: data.y.slice(),
//       id: data.id.slice(),
//       text: data.text.slice(),
//       mode: 'markers',
//       marker: {
//         size: data.marker.size.slice(),
//         sizemode: 'area',
//         sizeref: 200000
//       }
//     });
//   }

//   // Create a frame for each year. Frames are effectively just
//   // traces, except they don't need to contain the *full* trace
//   // definition (for example, appearance). The frames just need
//   // the parts the traces that change (here, the data).
//   var frames = [];
//   for (i = 0; i < years.length; i++) {
//     frames.push({
//       name: years[i],
//       data: countries.map(function (country) {
//         return getData(years[i], country);
//       })
//     })
//   }

//   // Now create slider steps, one for each frame. The slider
//   // executes a plotly.js API command (here, Plotly.animate).
//   // In this example, we'll animate to one of the named frames
//   // created in the above loop.
//   var sliderSteps = [];
//   for (i = 0; i < years.length; i++) {
//     sliderSteps.push({
//       method: 'animate',
//       label: years[i],
//       args: [[years[i]], {
//         mode: 'immediate',
//         transition: {duration: 300},
//         frame: {duration: 300, redraw: false},
//       }]
//     });
//   }

//   var layout = {
//     xaxis: {
//       title: 'Country',
//     //   range: [30, 85]
//     },
//     yaxis: {
//       title: 'Number of Missions',
//     //   type: 'log'
//     },
//     hovermode: 'closest',
// 	 // We'll use updatemenus (whose functionality includes menus as
// 	 // well as buttons) to create a play button and a pause button.
// 	 // The play button works by passing `null`, which indicates that
// 	 // Plotly should animate all frames. The pause button works by
// 	 // passing `[null]`, which indicates we'd like to interrupt any
// 	 // currently running animations with a new list of frames. Here
// 	 // The new list of frames is empty, so it halts the animation.
//     updatemenus: [{
//       x: 0,
//       y: 0,
//       yanchor: 'top',
//       xanchor: 'left',
//       showactive: false,
//       direction: 'left',
//       type: 'buttons',
//       pad: {t: 87, r: 10},
//       buttons: [{
//         method: 'animate',
//         args: [null, {
//           mode: 'immediate',
//           fromcurrent: true,
//           transition: {duration: 300},
//           frame: {duration: 500, redraw: false}
//         }],
//         label: 'Play'
//       }, {
//         method: 'animate',
//         args: [[null], {
//           mode: 'immediate',
//           transition: {duration: 0},
//           frame: {duration: 0, redraw: false}
//         }],
//         label: 'Pause'
//       }]
//     }],
// 	 // Finally, add the slider and use `pad` to position it
// 	 // nicely next to the buttons.
//     sliders: [{
//       pad: {l: 130, t: 55},
//       currentvalue: {
//         visible: true,
//         prefix: 'Year:',
//         xanchor: 'right',
//         font: {size: 20, color: '#666'}
//       },
//       steps: sliderSteps
//     }]
//   };

//   // Create the plot:
//   Plotly.plot('plot4', {
//     data: traces,
//     layout: layout,
//     frames: frames,
//   });
// });
