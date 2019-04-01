var width = 1250, height = 550;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

// Get the correctly organized data from python
var data = JSON.parse(document.getElementsByClassName("bar_data")[0].innerHTML);
// console.log(data)

/**
Some Notes:
X-Axis will go from January 1, 2011 to December 31, 2020
Each bar will take up 2 or 3 months (Ex. One bar can be Jan-March 2011, next one can be April-June 2011)
User can narrow down on time, console, genre, ...
Overall, there will be 40 bars (We can change it later if we want)
*/

var x_scale = d3.scaleLinear()
    .domain([0,40])
    .range([0, 1000]);

var y_scale = d3.scaleLinear()
    .domain([0,100])
    .range([350,0]);

var x_axis = d3.axisBottom()
    .scale(x_scale)

var y_axis = d3.axisLeft()
    .scale(y_scale)

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d,i) {
        console.log("i",i);
        return "translate(" + (100+i*10) + ",0)";
    })
    .selectAll("g")
    .data( function(d,i) {return d;})
    .enter().append("g")
    .append("rect")
    .attr("width",4)
    .attr("height",4)
    .attr("transform", function(d,i) {
        console.log("j",i);
        return "translate(0," + (200+i*10) +")";
    })
    .on("click", function(d) {
         console.log(d);
    });

chart.append('g')
    .attr("transform","translate (50,420)")
    .call(x_axis)

chart.append('g')
    .attr("transform","translate (50,70)")
    .call(y_axis)

console.log(bar);
