// Stocks.js

///////////////////////////////////////////
///////////////////////////////////////////
// Fade-in effect (jQuery)
const speed = "fast";

$("html, body").hide();

$(document).ready(function () {
  $("html, body").fadeIn(speed, function () {
    $("a[href], button[href]").click(function (event) {
      var url = $(this).attr("href");
      if (url.indexOf("#") == 0 || url.indexOf("javascript:") == 0) return;
      event.preventDefault();
      $("html, body").fadeOut(speed, function () {
        window.location = url;
      });
    });
  });
});

// D3
var margin = {
  top: 10,
  right: 30,
  bottom: 60,
  left: 60,
};

var width = 500 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Store overall graph sizing for layering additional data on same graph
let indexX = 0;
let indexY = 0;
let indexMax = 0;

// State variables for stock data display
// By default on page load, index data is displayed
let index_loaded = false;
let tech_loaded = false;

// CSV declarations
let csvStruct = {
  djia_csv:
    "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/djia_new.csv",
  gspc_csv:
    "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/gspc_new.csv",
  ixic_csv:
    "https://raw.githubusercontent.com/kevingzheng/coronanomics/dev/src/assets/data/stockprices/ixic_new.csv",
};

// JSON objects that represent the hover effects
const default_text = "Hover over a dataset <br> for more information.";
let hoverText = {
  djia:
    "DJI^(<span class = 'triangle-top'></span>" +
    "<span class = 'red-text'>+10%</span> from 2019)</h1>",
  gspc:
    "GSPC^(<span class = 'triangle-top'></span>" +
    "<span class = 'red-text'>+10%</span> from 2019)</h1>",
  ixic:
    "IXIC^(<span class = 'triangle-top'></span>" +
    "<span class = 'red-text'>+10%</span> from 2019)</h1>",
};

////////////////////////////////
////////////////////////////////
// Load stocks graph
var svg = d3
  .select("#stocks-graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

////////////////////////////////
// Build graph with the input data
function buildStockGraph(csv_in) {
  d3.csv(
    csvStruct[csv_in],

    function (d) {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date),
        value: d.value,
      };
    },

    function (data) {
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeMonth, 1)
            .tickFormat(d3.timeFormat("%b"))
        );

      const max = d3.max(data, function (d) {
        return +d.value;
      });

      indexMax = max;

      indexX = x;

      // Y Axis
      var y = d3.scaleLinear().domain([0, max]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      indexY = y;

      svg
        .append("text")
        .attr(
          "transform",
          "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
        )
        .style("text-anchor", "middle")
        .text("Date");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Stock Price");

      svg
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
        .data([
          { offset: "0%", color: "blue" },
          { offset: "100%", color: "red" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
          return d.offset;
        })
        .attr("stop-color", function (d) {
          return d.color;
        });

      svg
        .append("path")
        .datum(data)
        .attr("id", csv_in)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        )
        //hover effects
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "red");
          loadText(hoverText[csv_in.substring(0, csv_in.length - 4)]);
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", "url(#line-gradient)");
          loadText(default_text);
        });
    }
  );
}

////////////////////////////////
// Add input index csv data to graph
function loadIndex(index_csv) {
  // Load gspc and ixic data on same graph
  d3.csv(
    csvStruct[index_csv],

    function (d) {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date),
        value: d.value,
      };
    },

    function (data) {
      var newx = indexX;

      var newy = indexY;

      svg
        .append("path")
        .datum(data)
        .attr("id", index_csv)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return newx(d.date);
            })
            .y(function (d) {
              return newy(d.value);
            })
        ) //hover effects
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "red");
          loadText(hoverText[index_csv.substring(0, index_csv.length - 4)]);
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", "url(#line-gradient)");
          loadText(default_text);
        });
    }
  );
}

////////////////////////////////
// Add all indices to graph
function loadAllIndices() {
  if (!index_loaded) {
    index_loaded = true;
    buildStockGraph("djia_csv");
    loadIndex("gspc_csv");
    loadIndex("ixic_csv");
  } else {
    index_loaded = false;
    for (const csv_id in csvStruct) {
      svg.select("#" + csv_id).remove();
    }
  }
}

////////////////////////////////
// Add all tech stocks to graph
function loadTechStocks() {
  if(!tech_loaded) {
    tech_loaded = true;
  }
  else {
    tech_loaded = false;

  }
}




////////////////////////////////
// Add all indices to graph
function loadText(m) {
  document.getElementById("stock-paragraph").innerHTML = m;
}
