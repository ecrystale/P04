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
        return "translate(" + (25+i*30) + ",0)";
    })
    .selectAll("g")
    .data( function(d,i) {return d;})
    .enter().append("g")
    .append("rect")
    .attr("width",20)
    .attr("height",20)
    .attr("fill","white")
    .attr("stroke","black")
    .attr("stroke-width",1)
    .attr("transform", function(d,i) {
        return "translate(0," + (height-60-(i*20)) +")";
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
    var x = parseInt(x_col) + parseInt(inner_x) + 25;
    d3.select(this)
      .attr("stroke","blue")
      .attr("stroke-width",3);
    // Maybe use a function
    chart.append("text")
         .attr("id",d.game_code)
         .attr("transform", function (d){
             return "translate(" + x + "," + (height/2) + ")";
         })
         .html(d.title + " | " + d.system + " | " + d.release_date);
}

<<<<<<< HEAD
function handleUnhover(d,i) {
    d3.select(this)
      .attr("stroke","black")
      .attr("stroke-width",1);
    d3.select("#" + d.game_code).remove();
}
=======
chart.append('g')
    .attr("transform","translate (50,420)")
    .call(x_axis)

chart.append('g')
    .attr("transform","translate (50,70)")
    .call(y_axis)

console.log(bar);
>>>>>>> e35b49d4e4beda4bc3741eb83bb24cc94510d4cc
