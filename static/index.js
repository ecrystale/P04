var width = 1250, height = 550;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height",height)

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

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d,i) {
        
        return "translate(" + (100+i*10) + "," + "200" +")";
    });

bar.append("rect")
   .attr("width",4)
   .attr("height",4);
