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
let u_japanEnabled = false;
let u_USAEnabled = true;

// // Enum class for unemployment graph state
// const ugraphEnum = {
//   "USA": 1,
//   "JAPAN": 2,
//   "FRANCE": 3,
//   "CHINA": 4,
//   "GERMANY": 5
// }

// By default graph displays USA data
// let ugraphState = ugraphEnum.USA;

let overX = 0;
let overY = 0;
let overMax = 0;

var svg = d3.select("#unemployment-graph")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
  }) 
}
///////////////////////////////////////////////
///////////////////////////////////////////////
// Change graph data to Japan
function changeToJapan() {
  // Add data if it doesn't exist yet
  if(!u_japanEnabled) {
    //JAPANESE DATA
    d3.csv("https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/japan.csv?token=ALJ6WHN4HCRS7TKEKG5XPZK63GLWK",

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
          .attr("id", "japan-data")
          .attr("stroke", "url(#line-gradient)")
          .attr("stroke-width", 2)
          .attr("d", d3.line()
                .x(function(d) {return newx(d.date) })
                .y(function(d) {return newy(d.value)})
                ) 
      }) 
    } // end if

    else {
      d3.select("#japan-data").remove();
    }

    u_japanEnabled = !u_japanEnabled;
}

///////////////////////////////////////////////
///////////////////////////////////////////////
// Change graph data to USA
function changeToUSA() {
  // Add data if it doesn't exist yet
  if(!u_USAEnabled) {
    //JAPANESE DATA
    d3.csv("https://raw.githubusercontent.com/kevingzheng/coronanomics/master/src/assets/data/unemployment_1990_2020_bls_conv.csv?token=ALJ6WHKLK4NAO4JFSVLKKIS63AOE2",

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
          .attr("id", "usa-data")
          .attr("stroke", "url(#line-gradient)")
          .attr("stroke-width", 2)
          .attr("d", d3.line()
                .x(function(d) {return newx(d.date) })
                .y(function(d) {return newy(d.value)})
                ) 
      }) 
    } // end if

    else {
      d3.select("#usa-data").remove();
    }

    u_USAEnabled = !u_USAEnabled;
}



