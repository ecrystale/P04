var width = 1250, height = 550;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

// Get the correctly organized data from python
var all_data = JSON.parse(document.getElementsByClassName("bar_data")[0].innerHTML);
// console.log(data)
var cur_data = all_data;
/**
   Some Notes:
   X-Axis will go from January 1, 2011 to December 31, 2020
   Each bar will take up 2 or 3 months (Ex. One bar can be Jan-March 2011, next one can be April-June 2011)
   User can narrow down on time, console, genre, ...
   Overall, there will be 40 bars (We can change it later if we want)
*/

var display = (data) => {
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
    // d3.select(".chart").innerHTML = "";
    var bar = chart.selectAll("g")
        .remove()
        .exit()
        .data(data)
        .enter().append("g")
        .attr("transform", function(d,i) {
            return "translate(" + (43+i*13.09524) + ",0)";
        })
        .selectAll("g")
        .data( function(d) {return d;})
        .enter().append("g")
    // console.log(bar);

    var bar2 = bar.append("rect")
        .attr("width",8.667)
        .attr("height",6)
        .attr("fill", function(d){
        if (d.eshop_price > 80){
          return "#000000"
  	    }
        else if (d.eshop_price > 80){
          return "#330000"
  	    }
        else if (Number(d.eshop_price) > 70){
          return "#660000"
  	    }
        else if (Number(d.eshop_price) > 60){
          return "#990000"
  	    }
        else if (Number(d.eshop_price) > 50){
          return "#cc0000"
  	    }
        else if (Number(d.eshop_price) > 40){
          return "#ff0000"
  	    }
        else if (Number(d.eshop_price) > 30){
          return "#ff3333"
  	    }
  	    else if (Number(d.eshop_price)> 20){
          return "#ff6666"
  	    }
        else if (Number(d.eshop_price) > 10) {
          return "#ff9999"
        }
  	    else if (Number(d.eshop_price) > 0){
  		     return "#ffcccc"
  	    }
        else {
            return "white"
        }
	})
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

    chart.append('g')
        .attr("transform","translate (25,530)")
        .call(x_axis)

    chart.append('g')
        .attr("transform","translate (25,5)")
        .call(y_axis)
}

function handleHover(d,i) {
    var titleText = createText(18, d.title);
    var offset = (titleText.length-1) * 20;

    var x_col = d3.select(this.parentNode.parentNode).attr("transform").split("(")[1].split(",")[0];
    var inner_x = d3.mouse(this)[0];
    var x_result = parseInt(x_col) + parseInt(inner_x) + 25;
    if (x_result > 1040){
        x_result -= 260;
    }
    var y_col = d3.select(this).attr("transform").split(",")[1].split(")")[0];//.attr("transform").split(",")[1].split(")")[0];
    var inner_y = d3.mouse(this)[1];
    var y_result = parseInt(y_col) + parseInt(inner_y) - 60;
    if (y_result > 270-offset){
        y_result = 270-offset;
    }
    else if (y_result < 135){
        y_result = 135;
    }
    d3.select(this)
	.attr("stroke","turquoise")
	.attr("stroke-width",2);
    chart.append("rect")
        .attr("id", "border")
        .attr("x", x_result)
        .attr("y", y_result-130)
        .attr("height", 380+offset)
        .attr("width", 210 )
        .style("stroke", 'black')
        .style("fill", "white")
        .style("stroke-width", border);
    addText(chart,titleText,x_result+5,y_result+200)
    chart.append("text")
        .attr("id","popup")
        .attr("transform", function (d){
            return "translate(" + (x_result+5) + "," + (y_result+offset+220) + ")";
        })
        .html(d.system)
    chart.append("text")
        .attr("id","popup")
        .attr("transform", function (d){
            return "translate(" + (x_result+5) + "," + (y_result+offset+240) + ")";
        })
        .html(d.release_date)
    chart.append("svg:image")
        .attr("id", "img")
        .attr("transform","translate(" + (x_result+5) + "," + (y_result-125) + ")")
        .attr("xlink:href", d.front_box_art)
        .attr("width", 200)
        .attr("height", 300)
        .attr("preserveAspectRatio","none");


}

function handleUnhover(d,i) {
    d3.select(this)
	.attr("stroke","gray")
	.attr("stroke-width",1);
    d3.selectAll("#popup").remove();
    d3.select("#img").remove();
    d3.select("#border").remove();
}

var createText = (maxLength,text) => {
    var words = text.split(" ");
    var outputText = [];
    var curLine = [];
    var i;
    var lineLength = 0;
    for (i=0; i<words.length; i++){
        if (lineLength + words[i].length > maxLength){
            outputText.push(curLine);
            curLine = [];
            lineLength = 0;
        }
        curLine.push(words[i]);
        lineLength += words[i].length;
    }
    outputText.push(curLine);
    return outputText;
}

var addText = (chart, outputText, x, y) => {
    for (i=0; i<outputText.length; i++){
        var j;
        var line = "";
        for (j=0; j<outputText[i].length; j++){
            line += outputText[i][j] + " ";
        }
        chart.append("text")
            .attr("id","popup")
            .attr("transform", function (data){
                return "translate(" + x + "," + (y+i*20) + ")";
            })
            .html(line)
    }
}
display(cur_data);

document.getElementById("filter").addEventListener("click",(e)=>{
    var yearFilter = document.getElementById("year").value;
    if (yearFilter == "ally"){
        display(all_data);
    }
    else {
        var temp_data = []
        var i;
        for (i=0; i<cur_data.length; i++){
            filteredCol = [];
            for (j=0; j<cur_data[i].length; j++){
                curGame = cur_data[i][j]
                curYear = curGame.release_date.split(" ")[2];
                if (curYear == yearFilter){
                    filteredCol.push(curGame);
                }
            }
            temp_data.push(filteredCol);
        }
        cur_data = temp_data;
        console.log(cur_data);
        display(cur_data)
    }
});

document.getElementById("system_filter").addEventListener("click",(e)=>{
    var systemFilter = document.getElementById("system").value;
    if (systemFilter == "alls"){
        display(all_data);
    }
    else {
        temp_data = []
        var i;
        for (i=0; i<cur_data.length; i++){
            filteredCol = [];
            for (j=0; j<cur_data[i].length; j++){
                curGame = cur_data[i][j]
                curSystem = curGame.system;
                if (curSystem == systemFilter){
                    filteredCol.push(curGame);
                }
            }
            temp_data.push(filteredCol);
        }
        cur_data = temp_data;
        console.log(cur_data);
        display(cur_data)
    }
});
