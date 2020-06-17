///////////////////////////////////////////
///////////////////////////////////////////
const speed = 'fast';

$('html, body').hide();

$(document).ready(function() {
    $('html, body').fadeIn(speed, function() {
        $('a[href], button[href]').click(function(event) {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0 || url.indexOf('javascript:') == 0) return;
            event.preventDefault();
            $('html, body').fadeOut(speed, function() {
                window.location = url;
            });
        });
    });
});


// D3
var margin = {
    top:10, 
    right:30,
    bottom:60,
    left:60
  };
  
  var width = 500 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  
  // STATE variables for D3 unemployment graphs
  // u_$(country)Enabled indicates unemployment graph
  let u_japanEnabled = {
    "val" : false
  };
  let u_USAEnabled = {
    "val" : true
  };
  let u_franceEnabled = {
    "val": false
  };
  let u_germanyEnabled = {
    "val": false
  };
  let u_unitedkingdomEnabled = {
    "val": false
  };
  
  let u_clicked = 
  {
    usa: false,
    japan: false,
    unitedkingdom: false,
    germany: false,
    france: false
  }
  
  const countryIds = ["usa", "japan", "france", "germany", "unitedkingdom"];
  
  
  // objects that represent a country and their corresponding info
  let u_info = {
    default : "Click on a line in the graph to learn more about the country's labor statistics.",
  
  
  
    usa : "<h1 class = 'paragraph-size'>US Unemployment Information (<span class = 'triangle-top'></span>" + 
    "<span class = 'red-text'>+10%</span> from 2019)</h1>" +
    "<hr class = 'h-line'>" + "<br>" +
    "<p class = 'unemployment-paragraph'>" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" +
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?"+
    "</p>",
  
  
  
  
    japan : "<h1 class = 'paragraph-size'>Japan (<span class = 'triangle-top'></span>" + 
    "<span class = 'red-text'>+0.1%</span> from April 2020)</h1>" +
    "<hr class = 'h-line'>" + "<br>" +
    "<p class = 'unemployment-paragraph'>" +
    "Emerging from the Lost Decade of the 1990s-2000s and the Great Recession of 2008, Japan's economy" +
    " stabilized around an annual GDP growth rate of about <span class = 'triangle-top-small-green'></span><span class = 'green-text'>1.5%</span> in the 2010s. Due to the Abe administration's" +
    " policy of subsidizing employers, many Japanese have been able to nominally retain their jobs" +
    ", and Japan's unemployment rate is still one of the lowest in the world. Yet, unemployment in Japan" +
    " climbed to <span class = 'triangle-top-small-red'></span><span class = 'red-text'>2.6%</span> by May, the highest figure since late 2017, and Japan's GDP is also" +
    " <span class='linkcolor'><a href = 'https://www.statista.com/statistics/263607/gross-domestic-product-gdp-growth-rate-in-japan/' target='_blank' rel='noopener noreferrer'>projected</a></span> to shrink" +
    " by a colossal <span class = 'triangle-bottom-small-red'></span><span class = 'red-text'>5.2%</span> this year, as many workers in Japan hold jobs in name only. It remains to be seen if" +
    " the coronavirus will derail Japan's economic recovery. " +
    "</p>",
  
  
  
  
    germany :  "<h1 class = 'paragraph-size'>Germany (<span class = 'triangle-bottom'></span>" + 
    "<span class = 'green-text'>+0.1%</span> from April 2020)</h1>" +
    "<hr class = 'h-line'>" + "<br>" +
    "<p class = 'unemployment-paragraph'>" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" +
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?"+
    "</p>",
  
  
  
  
    unitedkingdom : "<h1 class = 'paragraph-size'>United Kingdom (<span class = 'triangle-bottom'></span>" + 
    "<span class = 'green-text'>+0.1%</span> from April 2020)</h1>" +
    "<hr class = 'h-line'>" + "<br>" +
    "<p class = 'unemployment-paragraph'>" +
    "Lorem ipsum a dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" +
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?"+
    "</p>",
  
  
  
  
    france : "<h1 class = 'paragraph-size'>France (<span class = 'triangle-bottom'></span>" + 
    "<span class = 'green-text'>+0.1%</span> from April 2020)</h1>" +
    "<hr class = 'h-line'>" + "<br>" +
    "<p class = 'unemployment-paragraph'>" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" +
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?" +
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo deserunt, neque veritatis totam non, sapiente" + 
    "distinctio amet beatae ipsa in adipisci magni facilis. Libero, animi dolore. Itaque veniam eveniet eos?"+
    "</p>",
  
  }
  
  let currentText = "default";
  
  
  // Data variables
  
  
  let overX = 0;
  let overY = 0;
  let overMax = 0;
  // ONLOAD actions
  ////////////////////////////////
  let usacsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_country/unemployment_1990_2020_bls_conv.csv";
  let japancsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_country/japan.csv";
  let francecsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_country/france.csv";
  let germanycsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_country/germany.csv";
  let unitedkingdomcsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_country/unitedkingdom.csv";
  
  
  ////////////////////////////////
  ////////////////////////////////
  // Load unemployment graph
  var svg = d3.select("#unemployment-graph")
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  ////////////////////////////////
  ////////////////////////////////
  // Load USA unemployment data (csv, default data)
  function loadUSA() {
    d3.csv(usacsv,
  
      function(d) {
        return {
          date: d3.timeParse("%Y-%m-%d")(d.date),
          value: d.value
        }
      },
  
      function(data) {
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) {return d.date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
  
        const max = d3.max(data, function(d) {return +d.value; })
        overMax = max;
  
        overX = x;
  
      // Y Axis
        var y = d3.scaleLinear()
          .domain([0, max])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));
  
        overY = y;
  
        svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                              (height + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .text("Date");
  
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Unemployment Rate");      
  
  
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(max))
          .selectAll("stop")
            .data([
                {offset: "0%", color: "blue"},
                {offset: "100%", color: "red"}
              ])
          .enter().append("stop")
              .attr("offset", function(d){ return d.offset;})
              .attr("stop-color", function(d) {return d.color;});
  
        svg.append("path")
          .datum(data)
          .attr("id", "usa-data")
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)")
          .attr("stroke-width", 2)
          .attr("d", d3.line()
                .x(function(d) {return x(d.date) })
                .y(function(d) {return y(d.value)})
                ) 
          .on("mouseover", function() {
                if(!u_clicked["usa"]) {
                  d3.select(this)
                    .attr("stroke", "red")
                }
              })
          .on("mouseout", function() {
              if(!u_clicked["usa"]) {
                d3.select(this)
                  .attr("stroke", "url(#line-gradient)")
              } // end if
            })
          .on("click", function() {
            if(!u_clicked["usa"]) {
              unclickAllOthers();
              d3.select(this)
                .attr("stroke", "red")
              u_clicked["usa"] = true;
              switchText("usa");
            } // end if
            else {
              d3.select(this)
              .attr("stroke", "url(#line-gradient)")
              u_clicked["usa"] = false;
              switchText("default");
            } // end else
          })
    }) 
  }
  
  function changeTo(country, csv, enabled, clickedval) {
    // Add data if it doesn't exist yet
    if(!enabled["val"]) {
      d3.csv(csv,
  
        function(d) {
          return {
            date: d3.timeParse("%Y-%m-%d")(d.date),
            value: d.value
          }
        },
  
        function(data) {
          var newx = overX;
          var newy = overY;    
  
          svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("id", country)
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                  .x(function(d) {return newx(d.date) })
                  .y(function(d) {return newy(d.value)})
                  ) 
            .on("mouseover", function() {
                if(!u_clicked[clickedval]) {
                  d3.select(this)
                    .attr("stroke", "red")
                } // end if
              })
            .on("mouseout", function() {
                if(!u_clicked[clickedval]) {
                  d3.select(this)
                    .attr("stroke", "url(#line-gradient)")
                }
              }) // end if
            .on("click", function() {
              if(!u_clicked[clickedval]) {
                unclickAllOthers();
                d3.select(this)
                .attr("stroke", "red")
                u_clicked[clickedval] = true;
                switchText(clickedval);
              } // end if
              else {
                d3.select(this)
                .attr("stroke", "url(#line-gradient)")
                u_clicked[clickedval] = false;
                switchText("default");
              }
            })
        }) 
      } // end if
  
      else {
        u_clicked[clickedval] = false;
        d3.select("#" + country).remove();
        if (currentText === clickedval) {
          switchText("default");
  
        }
      }
  
      enabled["val"] = !enabled["val"];
  } // end changeTo
  
  
  // unclicks all other currently selected paths
  function unclickAllOthers() {
    for(let i = 0; i < countryIds.length; i++) {
       if(u_clicked[countryIds[i]] === true) {
          d3.select("#" + countryIds[i] + "-data")
            .attr("stroke", "url(#line-gradient");
          u_clicked[countryIds[i]] = false;
       }
    } // end for i
  } // end unclickAllOthers
  
  // shows information for a country when the path is clicked
  function switchText(country) {
    currentText = country;
    document.getElementById('unemployment-paragraph').innerHTML = u_info[country];
  
  }
  
  
  