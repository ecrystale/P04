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
.domain([2005.8,2021.2])
    .range([0, 1210]);

var y_scale = d3.scaleLinear()
    .domain([0,85])
    .range([525,0]);

var x_axis = d3.axisBottom()
    .scale(x_scale).tickFormat(d3.format("d")).ticks(17)

var y_axis = d3.axisLeft()
    .scale(y_scale)

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d,i) {
        return "translate(" + (42+i*13.09524) + ",0)";
    })
    .selectAll("g")
    .data( function(d) {return d;})
    .enter().append("g")
// console.log(bar);

var bar2 = bar.append("rect")
    .attr("width",11)
    .attr("height",6)
    .attr("fill","white")
    .attr("stroke","grey")
    .attr("stroke-width",1)
    .attr("transform", function(d,i) {
        return "translate(0," + (height-29-(i*6)) +")";
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
    if (x_result > 1040){
        x_result -= 260;
    }
    var y_col = d3.select(this).attr("transform").split(",")[1].split(")")[0];//.attr("transform").split(",")[1].split(")")[0];
    var inner_y = d3.mouse(this)[1];
    var y_result = parseInt(y_col) + parseInt(inner_y) - 60;
    if (y_result > 140){
        y_result = 140;
    }
    else if (y_result < 1){
        y_result = 1;
    }
    d3.select(this)
      .attr("stroke","blue")
      .attr("stroke-width",2);
    chart.append("rect")
            .attr("id", "border")
       			.attr("x", x_result)
            .attr("y", y_result)
       			.attr("height", 380)
       			.attr("width", 210 )
       			.style("stroke", 'black')
       			.style("fill", "white")
       			.style("stroke-width", border);
    if (!d.game_code){
        chart.append("text")
             .attr("id","weirdo")
             .attr("transform", function (d){
                 return "translate(" + x_result + "," + (height/2) + ")";
             })
             .html(d.title + "<br><br>" + d.system + "<br><br>" + d.release_date);
    }
    else {
        chart.append("text")
             .attr("id",d.game_code)
             .attr("transform", function (d){
                 return "translate(" + x_result + "," + (y_result+330) + ")";
             })
             .html(d.title)
        chart.append("text")
             .attr("id",d.game_code)
             .attr("transform", function (d){
                 return "translate(" + x_result + "," + (y_result+350) + ")";
             })
             .html(d.system)
        chart.append("text")
             .attr("id",d.game_code)
             .attr("transform", function (d){
                  return "translate(" + x_result + "," + (y_result+370) + ")";
             })
             .html(d.release_date)
    }
    chart.append("svg:image")
        .attr("id", "img")
        .attr("transform","translate(" + (x_result+5) + "," + (y_result+5) + ")")
        .attr("xlink:href", d.front_box_art)
        .attr("width", 200)
        .attr("height", 300)
        .attr("preserveAspectRatio","none");
}

function handleUnhover(d,i) {
    d3.select(this)
      .attr("stroke","gray")
      .attr("stroke-width",1);
    if (!d.game_code){
        d3.selectAll("#weirdo").remove();
    }
    else {
        d3.selectAll("#" + d.game_code).remove();
    }
    d3.select("#img").remove();
    d3.select("#border").remove();
}

chart.append('g')
    .attr("transform","translate (25,530)")
    .call(x_axis)

chart.append('g')
    .attr("transform","translate (25,5)")
    .call(y_axis)
