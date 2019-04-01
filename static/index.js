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
.domain([2008.9,2021.1])
    .range([0, 1210]);

var y_scale = d3.scaleLinear()
    .domain([0,100])
    .range([500,0]);

var x_axis = d3.axisBottom()
    .scale(x_scale).tickFormat(d3.format("d"))

var y_axis = d3.axisLeft()
    .scale(y_scale)

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d,i) {
        return "translate(" + (40+i*19.7717) + ",0)";
    })
    .selectAll("g")
    .data( function(d) {return d;})
    .enter().append("g")
// console.log(bar);

var bar2 = bar.append("rect")
    .attr("width",15)
    .attr("height",15)
    .attr("fill","white")
    .attr("stroke","grey")
    .attr("stroke-width",1)
    .attr("transform", function(d,i) {
        return "translate(0," + (height-60-(i*15)) +")";
    })
    .on("mouseover", handleHover)
    .on("mouseout", handleUnhover)
    .on("click", function(d) {
         console.log(d);
    });
//&#13;&#10;
function handleHover(d,i) {
    var x_col = d3.select(this.parentNode.parentNode).attr("transform").split("(")[1].split(",")[0];
    var inner_x = d3.mouse(this)[0];
    var x_result = parseInt(x_col) + parseInt(inner_x) + 25;
    if (x_result > 900){
        x_result -= 300;
    }
    d3.select(this)
      .attr("stroke","blue")
      .attr("stroke-width",2);
    // Maybe use a function
    chart.append("text")
         .attr("id",d.game_code)
         .attr("transform", function (d){
             return "translate(" + x_result + "," + (height/2) + ")";
         })
         .html(d.title + "<br><br>" + d.system + "<br><br>" + d.release_date);
    chart.append("svg:image")
        .attr("id", "img")
        .attr("transform", function (d){
            return "translate(" + x_result + "," + (height/2) + ")";
        })
        .attr("xlink:href", d.front_box_art)
        .attr("width", 100)
        .attr("height", 200);
}

function handleUnhover(d,i) {
    d3.select(this)
      .attr("stroke","gray")
      .attr("stroke-width",1);
    d3.select("#" + d.game_code).remove();
    d3.select("#img").remove();
}

chart.append('g')
    .attr("transform","translate (25,530)")
    .call(x_axis)

chart.append('g')
    .attr("transform","translate (25,30)")
    .call(y_axis)
