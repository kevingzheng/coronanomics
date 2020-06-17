// Stocks.js


///////////////////////////////////////////
///////////////////////////////////////////
// Fade-in effect
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

// State variables for stock data display
let djia_loaded = true;
let gspc_loaded = false;
let ixic_loaded = false;


// CSV declarations
let djia_csv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/djia_new.csv";
let gspc_csv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/gspc_new.csv";
let ixic_csv = "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/ixic_new.csv";

////////////////////////////////
////////////////////////////////
// Load stocks graph
var svg = d3.select("#stocks-graph")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Onload - display indexes
function loadStockGraph() {
    d3.csv(djia_csv,

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
              .call(d3.axisBottom(x)
                      .ticks(d3.timeMonth, 1)
                      .tickFormat(d3.timeFormat('%b')));
            
      
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
              .text("Stock Price");      
      
      
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
              .attr("id", "djia-data")
              .attr("fill", "none")
              .attr("stroke", "url(#line-gradient)")
              .attr("stroke-width", 2)
              .attr("d", d3.line()
                    .x(function(d) {return x(d.date) })
                    .y(function(d) {return y(d.value) })
                    ) 
        })
}

// Loads stock index data if not already
function loadIndexes() {

}
