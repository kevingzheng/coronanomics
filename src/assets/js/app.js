// Smooth scroll placeholder -- change later, maybe don't use jquery
$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      let hash = this.hash;

      // jQuery:: animate used here
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    } // end if
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


// Data variables


let overX = 0;
let overY = 0;
let overMax = 0;
// ONLOAD actions
////////////////////////////////
let usacsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_1990_2020_bls_conv.csv?token=ALJ6WHKLK4NAO4JFSVLKKIS63AOE2";
let japancsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/japan.csv?token=ALJ6WHN4HCRS7TKEKG5XPZK63GLWK";
let francecsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/france.csv?token=ALJ6WHK2NHJMUS77I5KM2DS63GU2K";
let germanycsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/germany.csv?token=ALJ6WHOQJZC6NCJCZIUVTE263GWEE";
let unitedkingdomcsv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/unitedkingdom.csv?token=ALJ6WHIYEACX5IX24VP5TX263GWSQ";


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
  d3.csv("https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_1990_2020_bls_conv.csv?token=ALJ6WHKLK4NAO4JFSVLKKIS63AOE2",

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
          } // end if
          else {
            d3.select(this)
            .attr("stroke", "url(#line-gradient)")
            u_clicked["usa"] = false;
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
            } // end if
            else {
              d3.select(this)
              .attr("stroke", "url(#line-gradient)")
              u_clicked[clickedval] = false;
            }
          })
      }) 
    } // end if

    else {
      u_clicked[clickedval] = false;
      d3.select("#" + country).remove();
    }

    enabled["val"] = !enabled["val"];
} // end changeTo



function unclickAllOthers() {
  for(let i = 0; i < countryIds.length; i++) {
     if(u_clicked[countryIds[i]] == true) {
        d3.select("#" + countryIds[i] + "-data")
          .attr("stroke", "url(#line-gradient");
        u_clicked[countryIds[i]] = false;
     }
  } // end for i
} // end unclickAllOthers


