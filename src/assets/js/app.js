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
  bottom:30,
  left:60
};

var width = 460 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#unemployment-graph")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/unemployment_1990_2020_bls_conv.csv?token=ALJ6WHIA3HDDQ4RIEJYGEPC6236KU",

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

  // Y Axis
    var y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));


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
       .attr("fill", "none")
       .attr("stroke", "url(#line-gradient)")
       .attr("stroke-width", 2)
       .attr("d", d3.line()
             .x(function(d) {return x(d.date) })
             .y(function(d) {return y(d.value)})
             ) 

}) 
