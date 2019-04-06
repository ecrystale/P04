var width = 1250, height = 550;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

// Get the correctly organized data from python
var all_data = JSON.parse(document.getElementsByClassName("bar_data")[0].innerHTML);

var month_dict = {
    "Jan": 0,
    "Feb": 0,
    "Mar": 1,
    "Apr": 1,
    "May": 2,
    "Jun": 2,
    "Jul": 3,
    "Aug": 3,
    "Sep": 4,
    "Oct": 4,
    "Nov": 5,
    "Dec": 5
};

var month_dict2 = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11
};

var prevAxis = "m";

var display = (data, axis) => {
    var x_scale;
    var x_axis;
    var y_scale;
    var y_axis;

    if (axis === "y"){
        x_scale = d3.scaleLinear()
                    .domain([2005.8,2021.2])
                    .range([0, 1210]);

        x_axis = d3.axisBottom()
                   .scale(x_scale)
                   .tickFormat(d3.format("d"))
                   .ticks(17)
    }
    else {
        var o =d3.scalePoint()
        .domain(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan "])
        .range([0,1210])
        .padding(.3);

        x_scale = d3.scaleTime()
                    .domain([123232323, 12])
                    .range([0, 1210]);

        x_axis = d3.axisBottom()
                   .scale(o);
    }

    y_scale = d3.scaleLinear()
        .domain([0,85])
        .range([525,0]);

    y_axis = d3.axisLeft()
        .scale(y_scale)


    var bar = chart.selectAll(".box").data(data, function(e){return e.front_box_art+e.title+e.release_date+e.system});
    var colSpace = [];

    var i;
    var trans_time = 1500;
    for (i=0; i<90; i++){
        colSpace.push(0);
    }

    bar.exit()
       .transition()
       .delay(function(d, i) { return i*2; })
       .duration(trans_time)
       .attr("transform", function(d) {
           var date = d.release_date.split(" ");
           var month = date[0];
           var colIndex = parseInt(month_dict[month]) + 6*(parseInt(date[2]) - 2006);
           return "translate(0,550)";
       })
       .style("fill-opacity", 1e-6)
       .style("stroke-opacity", 1e-6)
       .remove();

    bar.select("rect").transition()
       .delay(function(d, i) { return i*3; })
       .duration(trans_time)
       .attr("width", function(d){
           if (axis === "y"){
               return 8.73;
           }
           else {
               return 21.34038;
           }
       })
       .attr("transform", function(d) {
           var date = d.release_date.split(" ");
           var month = date[0];
           if (axis === "y"){
               var colIndex = parseInt(month_dict[month]) + 6*(parseInt(date[2]) - 2006);
               var heightOffset = colSpace[colIndex];
               colSpace[colIndex]++;
               return "translate(" + (43+colIndex*13.09524) + "," + (height - 26 - (heightOffset*6)) +")";
           }
           else {
               var dayOffset = 0;
               var date = parseInt(date[1].split(",")[0]);
               if (date > 20){
                   dayOffset = 2;
               }
               else if (date > 10){
                   dayOffset = 1;
               }
               var colIndex = dayOffset + 3*month_dict2[month];
               var heightOffset = colSpace[colIndex];
               colSpace[colIndex]++;
               return "translate(" + (60+colIndex*32.01058) + "," + (height - 26 - (heightOffset*6)) +")";
           }
       });

    bar.enter().append("g")
       .attr("class","box")
       .append("rect")
       .on("click", function(d) {
           console.log(d);
       })
       .on("mouseover", handleHover)
       .on("mouseout", handleUnhover)
       .attr("height",6)
       .attr("fill", function(d){
           if (d.eshop_price > 90){
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
           else if (Number(d.eshop_price) == 0){
               return "#ffe6e6"
           }
           else {
               return "white"
           }
       })
       .attr("stroke","grey")
       .attr("stroke-width",1)

       .attr("transform", function(d){
           var date = d.release_date.split(" ");
           var month = date[0];
           var colIndex = parseInt(month_dict[month]) + 6*(parseInt(date[2]) - 2006);
           return "translate(" + (43+colIndex*13.09524) + ","+(height+20)+")";
        })
        .transition().delay(function(d, i) { return i*3; })
        .duration(trans_time)
        .attr("width", function(d){
            if (axis === "y"){
                return 8.73;
            }
            else {
                return 21.34038;
            }
        })
        .attr("transform", function(d) {
            var date = d.release_date.split(" ");
            var month = date[0];
            if (axis === "y"){
                var colIndex = parseInt(month_dict[month]) + 6*(parseInt(date[2]) - 2006);
                var heightOffset = colSpace[colIndex];
                colSpace[colIndex]++;
                return "translate(" + (43+colIndex*13.09524) + "," + (height - 26 - (heightOffset*6)) +")";
            }
            else {
                var dayOffset = 0;
                var date = parseInt(date[1].split(",")[0]);
                if (date > 20){
                    dayOffset = 2;
                }
                else if (date > 10){
                    dayOffset = 1;
                }
                var colIndex = dayOffset + 3*month_dict2[month];
                var heightOffset = colSpace[colIndex];
                colSpace[colIndex]++;
                return "translate(" + (60+colIndex*32.01058) + "," + (height - 26 - (heightOffset*6)) +")";
            }
        });

    chart.select(".x").remove();
    chart.select(".y").remove();

    if (prevAxis === axis){
        chart.append('g')
            .attr("class","x axis")
            .attr("transform","translate (25,530)")
            .call(x_axis.bind(this))
    }
    else {
        chart.append('g')
            .attr("transform","translate(-1300,530)")
            .attr("class","x axis").transition().duration(5000)
            .attr("transform","translate (25,530)")
            .call(x_axis.bind(this))
    }

    chart.append('g')
        .attr("transform","translate (25,5)")
        .attr("class","y axis")
        .call(y_axis)

    prevAxis = axis;
}

function handleHover(d,i) {
    var titleText = createText(18, d.title);
    var offset = (titleText.length-1) * 20;

    var transformVal = d3.select(this)["_groups"][0][0].attributes[4].nodeValue;
    var x_col = transformVal.split("(")[1].split(",")[0];
    var inner_x = d3.mouse(this)[0];
    var x_result = parseInt(x_col) + parseInt(inner_x) + 25;
    if (x_result > 1040){
        x_result -= 260;
    }
    var y_col = transformVal.split(",")[1].split(")")[0];//.attr("transform").split(",")[1].split(")")[0];
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

document.getElementById("filter").addEventListener("click",(e)=>{
    var yearFilter = document.getElementById("year").value;
    var systemFilter = document.getElementById("system").value;
    var priceFilter = document.getElementById("price").value;
    var categoryFilter = document.getElementById("category").value;
    var temp_data = []
    var i;
    for (i=0; i<all_data.length; i++){
        var curGame = all_data[i];
        var curYear = curGame.release_date.split(" ")[2];
        var curSystem = curGame.system;
        var curPrice = Number(curGame.eshop_price);
        var curCategories = curGame.categories.category;
        if (typeof(curCategories) === "string"){
            curCategories = [curCategories];

        }
        if ((curYear == yearFilter || yearFilter === "ally") &&
        (curSystem == systemFilter || systemFilter === "alls") &&
        ((Number(priceFilter) === 100 && curPrice > 90) ||
        (Number(priceFilter) !== 100 && curPrice <=  Number(priceFilter)) ||
        priceFilter === "allp") &&
        (curCategories.includes(categoryFilter)|| categoryFilter === "allc" )) {
            temp_data.push(curGame);
        }
    }
    if (yearFilter !== "ally"){
        display(temp_data,"m");
    }
    else {
        display(temp_data,"y");
    }
});

display(all_data,"y");
