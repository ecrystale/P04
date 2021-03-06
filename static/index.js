var width = 1250, height = 500;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height)

// add title of graph
chart.append("text")
    .attr("fill","white")
    .attr("font-size","32px")
    .attr("font-family", "Tahoma, sans-serif")
    .attr("font-weight","bold")
    .html("NinTimeDo — Nintendo Game Timeline")
    .attr("transform","translate(350,25)");

// Get the correctly organized data from python
var all_data = JSON.parse(document.getElementsByClassName("bar_data")[0].innerHTML);

// For yearly scale
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

// For monthly scale
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

var prevAxis = "m"; // Either "y" for year or "m" for month
var prevColHeight = -1; // Max height of the previous graph for knowing if we should change y axis

/**
Takes in an array of JSON objects and the string "y" or "m" for axis to know how to format
the x axis and column width.
Displays the columns and axis with transitions.
*/
var xmy
var display = (data, axis) => {
    xmy=axis
    var x_scale;
    var x_axis;
    var y_scale;
    var y_axis;

    // display axes on chart, adjust axes based on the filtering by year
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
        var x_scale = d3.scalePoint()
        .domain(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan "])
        .range([0,1210])
        .padding(.3);

        x_axis = d3.axisBottom()
                   .scale(x_scale);
    }

    // Selects all of the boxes and gives them each a unique identifier
    var bar = chart.selectAll(".box").data(data, function(e){return e.front_box_art+e.title+e.release_date+e.system});

    // Used for determining how many boxes are in each column
    var colSpace = [];
    var i;
    for (i=0; i<90; i++){
        colSpace.push(0);
    }

    // Determines the width of each column and how high up each box is
    for (i=0; i<data.length; i++){
        var date = data[i].release_date.split(" ");
        var month = date[0];
        if (axis === "y"){
            var colIndex = parseInt(month_dict[month]) + 6*(parseInt(date[2]) - 2006);
            var heightOffset = colSpace[colIndex];
            colSpace[colIndex]++;
            data[i].colIndex = 43+colIndex*13.09524;
            data[i].heightOffset = heightOffset;
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
            data[i].colIndex = 60+colIndex*32.01058;
            data[i].heightOffset = heightOffset;
        }
    }

    // Use the maximum column height to scale y axis
    var maxColHeight = 0;
    for (i=0; i<colSpace.length; i++){
        if (colSpace[i] > maxColHeight){
            maxColHeight = colSpace[i];
        }
    }
    maxColHeight = Math.round(1.2*maxColHeight)+1;
    y_scale = d3.scaleLinear()
        .domain([0,maxColHeight])
        .range([475,0]);

    if (maxColHeight < 20){
        y_axis = d3.axisLeft()
        .scale(y_scale).ticks(maxColHeight+1);
    }
    else {
        y_axis = d3.axisLeft()
        .scale(y_scale);
    }

    var rectHeight = 475 / maxColHeight;
    var trans_time = 1500; //transition time

    // Remove all of the boxes that are in the exit selection
    bar.exit()
      .transition()
      .delay(function(d, i) { return i*2; })
      .duration(trans_time)
      .attr("transform","translate(0,550)")
      .style("fill-opacity", 1e-6)
      .style("stroke-opacity", 1e-6)
      .remove();

    // Move all of the boxes that are still in the chart
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
    	.attr("height",rectHeight)
    	.attr("transform", function(d) {
                return "translate(" + d.colIndex + "," + (height - 20-rectHeight - (d.heightOffset*rectHeight)) +")";
    	});

    // add boxes on the bar graph, colored a shade of red based on the price of the game that the box represents
    bar.enter().append("g")
       .attr("class","box")
       .append("rect")
       .on("click", function(d) {
           handleModal(d);
       })
	.on("mouseover", handleHover)
       .on("mouseout", handleUnhover)
       .attr("height",rectHeight)
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
               return "white" // no price data available
           }
       })
       .attr("fill-opacity",0.9)
       .attr("stroke","grey")
       .attr("stroke-width",1)
       .attr("transform", function(d){
           return "translate(" + d.colIndex + ","+(height+20)+")";
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
            return "translate(" + d.colIndex + "," + (height - 20-rectHeight - (d.heightOffset*rectHeight)) +")";
        });

    // For transitioning x axis
    if (prevAxis === axis){
        chart.selectAll(".x").remove();
        chart.append('g')
            .attr("class","x axis")
            .attr("transform","translate (25,480)")
            .call(x_axis);
    }
    else {
        chart.selectAll(".x").transition().duration(trans_time+1500)
            .attr("transform","translate(1300,480)").remove();
        chart.append('g')
            .attr("transform","translate(-1300,480)")
            .attr("class","x axis").transition().duration(trans_time+1500)
            .attr("transform","translate (25,480)")
            .call(x_axis)
    }

    // For transitioning y axis
    if (prevColHeight === maxColHeight){
        chart.selectAll(".y").remove();
        chart.append('g')
            .attr("transform","translate (25,5)")
            .attr("class","y axis")
            .call(y_axis);
    }
    else {
        chart.selectAll(".y").transition().duration(trans_time+1500)
            .attr("transform","translate(25,-530)").remove();
        chart.append('g')
            .attr("transform","translate(25,600)")
            .attr("class","y axis").transition().duration(trans_time+1500)
            .attr("transform","translate (25,5)")
            .call(y_axis);
    }

    prevAxis = axis;
    prevColHeight = maxColHeight;
}

// display data about the game when user hovers on a box in the bar graph, including
// title, system, release date, and front box art
function handleHover(d,i) {
    var yt="";
    if (xmy=="y"){
        yt=d.release_date.split(" ")[2];
    }
    else if (xmy=="m"){
        yt=d.release_date.split(" ")[0];
    }
    chart.select("#showyear")
         .attr("fill","grey")
         .attr("font-size","180px")
         .attr("font-family", "Tahoma, sans-serif")
         .attr("font-weight","bold")
         .html(yt)
         .lower()
         .attr("transform","translate(450,300)")
         .transition().duration(100)
         .attr("fill-opacity",0.5);

    var titleText = createText(18, d.title);
    var offset = (titleText.length-1) * 20;

    // Gets the x and y value of the "transform" attribute
    var transformVal = d3.select(this)["_groups"][0][0].attributes[5].nodeValue;
    var x_col = transformVal.split("(")[1].split(",")[0];
    var inner_x = d3.mouse(this)[0];
    var x_result = parseInt(x_col) + parseInt(inner_x) + 25;
    var changeSide = false;
    if (x_result > 1040){
        x_result -= 260;
        changeSide = true;
    }
    var y_col = transformVal.split(",")[1].split(")")[0];
    var inner_y = d3.mouse(this)[1];
    var y_result = parseInt(y_col) + parseInt(inner_y) - 60;
    if (y_result > 250-offset){
        y_result = 250-offset;
    }
    else if (y_result < 160){
        y_result = 160;
    }

    d3.select(this)
      .attr("stroke","turquoise")
      .attr("stroke-width",2);
    chart.append("polygon") // add triangle that sticks out to show which box you are hovering on
        .attr("id","popup")
        .attr("fill","white")
        .attr("points", function(d){
            var rectHeight = 475 / prevColHeight;
            if (prevAxis === "y"){
                var offset1 = 0;
                var offset2 = 0;
                if (changeSide){
                    offset1 = -16;
                    offset2 = -100;
                }
                var tri = (parseInt(x_col)+13+offset1) + "," + (parseInt(y_col)+(rectHeight/2)) + " " +
                    (parseInt(x_col)+50+offset2) + "," + (parseInt(y_col)+(rectHeight/2)+40)+ " " +
                    (parseInt(x_col)+50+offset2) + "," + (parseInt(y_col)+(rectHeight/2)-40);
                return tri
            }
            else {
                var offset1 = 0;
                var offset2 = 0;
                if (changeSide){
                    offset1 = -26;
                    offset2 = -90;
                }
                var tri = (parseInt(x_col)+24+offset1) + "," + (parseInt(y_col)+(rectHeight/2)) + " " +
                    (parseInt(x_col)+50+offset2) + "," + (parseInt(y_col)+(rectHeight/2)+40)+ " " +
                    (parseInt(x_col)+50+offset2) + "," + (parseInt(y_col)+(rectHeight/2)-40);
		return tri
            }
        });
    chart.append("rect")
        .attr("id", "border")
        .attr("transform","translate("+x_result+","+(y_result-130)+")")
        .attr("height", 380+offset)
        .attr("width", 210 )
        .style("fill", "white")
        .style("stroke-width", border);
    addText(chart,titleText,x_result+5,y_result+200)
    chart.append("text")
        .attr("id","system")
        .attr("font-size","15px")
        .attr("font-family", "LatoBlack, sans-serif")
        .attr("transform", function (d){
            return "translate(" + (x_result+5) + "," + (y_result+offset+220) + ")";
        })
        .html(d.system)
    chart.append("text")
        .attr("id","release")
        .attr("fill","#707070")
        .attr("font-size","15px")
        .attr("font-family", "LatoBlack, sans-serif")
        .attr("font-weight","bold")
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

// removes pop-up box with data when the user stops hovering over the box
function handleUnhover(d,i) {
    d3.select("#showyear")
      .attr("fill-opacity",0.5)
      .transition().duration(1000)
      .attr("fill-opacity",0);
    d3.select(this)
    	.attr("stroke","gray")
    	.attr("stroke-width",1);
    d3.selectAll("#title").remove();
    d3.select("#popup").remove();
    d3.select("#img").remove();
    d3.select("#border").remove();
    d3.select("#system").remove();
    d3.select("#release").remove();
}

// Returns a list of list of words so that each sublist contains words that do
// not exceed the maxLength. Used for keeping words within boxes when hovering
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

// Takes the output from createText and puts it on the popup box
var addText = (chart, outputText, x, y) => {
    for (i=0; i<outputText.length; i++){
        var j;
        var line = "";
        for (j=0; j<outputText[i].length; j++){
            line += outputText[i][j] + " ";
        }
        chart.append("text")
             .attr("id","title")
             .attr("fill","black")
             .attr("font-size","15px")
             .attr("font-family", "LatoBlack, sans-serif")
             .attr("font-weight","bold")
             .attr("transform", function (data){
                 return "translate(" + x + "," + (y+i*20) + ")";
             })
             .html(line)
    }
}

// filtering by year, system, price, category, and title
var yearInput = document.getElementById("year_filter");
var systemInput = document.getElementById("system_filter");
var priceInput = document.getElementById("price_filter");
var categoryInput = document.getElementById("category_filter");
var titleInput = document.getElementById("search");

var filter = () => {
    var yearFilter = yearInput.value;
    var systemFilter = systemInput.value;
    var priceFilter = priceInput.value;
    var categoryFilter = categoryInput.value;
    var titleFilter = titleInput.value;
    var temp_data = []
    var i;
    for (i=0; i<all_data.length; i++){
        var curGame = all_data[i];
        var curYear = curGame.release_date.split(" ")[2];
        var curSystem = curGame.system;
        var curPrice = Number(curGame.eshop_price);
        var curCategories = curGame.categories.category;
        var curTitle = curGame.title;
        if (typeof(curCategories) === "string"){
            curCategories = [curCategories]; // turn into list if category is a string
        }
        if ((curYear == yearFilter || yearFilter === "ally") &&
        (curSystem == systemFilter || systemFilter === "alls") &&
        ((Number(priceFilter) === 100 && curPrice > 90) ||
        (Number(priceFilter) !== 100 && curPrice <=  Number(priceFilter)) ||
        priceFilter === "allp") &&
        (curCategories.includes(categoryFilter)|| categoryFilter === "allc" ) &&
        (curTitle.toLowerCase().includes(titleFilter.toLowerCase()) || titleFilter.trim() === "")) { // case insensitive search
            temp_data.push(curGame); // add game to list of what boxes will be displayed
        }
    }
    if (yearFilter !== "ally"){
        display(temp_data,"m"); // display months on axes
    }
    else {
        display(temp_data,"y"); // display years between 2006 and 2021
    }
}

// When user changes the filter, automatically changes graph
yearInput.onchange = filter;
systemInput.onchange = filter;
priceInput.onchange = filter;
categoryInput.onchange = filter;

// Gives user time to type search term in before filtering
var searchTimer;
titleInput.addEventListener('keyup', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(filter,1500);
})

// handles what will be displayed when the user clicks on the boxes in the graph
var handleModal = (d) => {
    var modal_duration = 500;
    var originalHeight = -999;
    var otherOffset = 100;
    chart.append("rect")
        .attr("id","modal_stuff")
        .attr("width",width)
        .attr("height",height)
        .attr("fill","black")
        .attr("fill-opacity",0.6)
        .on("click",removeModal);
    d3.select("#modal")
	.style("display","block")
	.on("click",removeModal);
    d3.select("#border")
	.attr("id","modal_stuff")
	.raise()
	.transition().duration(modal_duration)
	.attr("transform","translate(350,35)")
	.attr("width",620)
	.attr("height",425)
	.attr("stroke","#e60012")
	.attr("stroke-width","3");
    d3.selectAll("#title")
	.attr("id","modal_stuff")
	.raise()
	.transition().duration(modal_duration)
	.attr("transform", function() {
            var transformVal = this.attributes[5].nodeValue;
            if (originalHeight === -999){
		originalHeight = transformVal.split(",")[1].split(")")[0];
		otherOffset += 22.39;
		return "translate(675,100)";
            }
            else {
		var titleOffset= transformVal.split(",")[1].split(")")[0] - originalHeight;
		otherOffset += 22.39;
		return "translate(675,"+(titleOffset+100)+")";
            }
	})
	.attr("font-size","20px")
    chart.append("rect")
         .attr("id","modal_stuff")
         .attr("transform","translate(675,50)")
         .attr("fill","#e60012")
         .attr("width",function(){
             var systemWidth = 8;
             if (typeof (InstallTrigger) !== 'undefined'){ // For firefox
                 systemWidth = 9.5;
             }
             return d.system.length*systemWidth+10;
         })
         .attr("height",20)
         .attr("fill-opacity",1e-6)
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);
    d3.select("#system")
	  .attr("id","modal_stuff")
      .raise()
      .transition().duration(modal_duration)
      .attr("transform","translate(680,65)")
      .attr("fill","white")
      .attr("font-weight","bold");
    d3.select("#release")
	  .attr("id","modal_stuff")
      .raise()
      .transition().duration(modal_duration)
      .attr("fill","#808080")
      .attr("font-size","13px")
      .attr("font-weight","bold")
      .attr("transform",function (){
          return "translate(675,"+otherOffset+")";
      });
    var priceText;
    if (!d.eshop_price){
        priceText = "No Price Data";
    }
    else if (d.eshop_price == "0.00"){
        priceText = "Free";
    }
    else {
        priceText = "$" + d.eshop_price;
    }
    chart.append("text")
         .attr("id","modal_stuff")
         .attr("transform",function() {
             otherOffset += 35;
             return "translate(675,"+otherOffset+")";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","black")
         .attr("font-size","25px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .html(priceText)
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);

    // display all the genres of the game
    var genres = d.categories.category;
    if (typeof(genres) === "string"){
        genres = [genres];
    }
    chart.append("text")
         .attr("id","modal_stuff")
         .attr("transform",function() {
             otherOffset += 35;
             return "translate(675,"+otherOffset+")";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","black")
         .attr("font-size","20px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .html(function() {
             if (genres.length == 1){
                 return "Genre:";
             }
             else {
                 return "Genres:";
             }
         })
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);
    var i;
    for (i=0; i<genres.length; i++){
        chart.append("text")
             .attr("id","modal_stuff")
             .attr("transform",function() {
                 otherOffset += 20;
                 return "translate(700,"+otherOffset+")";
             })
             .attr("fill-opacity",1e-6)
             .attr("fill","#8f908f")
             .attr("font-size","16px")
             .attr("font-family", "LatoBlack, sans-serif")
             .attr("font-weight","bold")
             .html(genres[i])
             .transition().duration(modal_duration+1700)
             .attr("fill-opacity",1);
    }
    // display number of players required
    chart.append("text")
         .attr("id","modal_stuff")
         .attr("transform",function() {
             otherOffset += 30;
             return "translate(675,"+otherOffset+")";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","black")
         .attr("font-size","20px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .html("Number of Players:")
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);
    chart.append("text")
         .attr("id","modal_stuff")
         .attr("transform",function() {
             otherOffset += 20;
             return "translate(700,"+otherOffset+")";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","#8f908f")
         .attr("font-size","16px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .html(d.number_of_players)
         .transition().duration(modal_duration+1700)
         .attr("fill-opacity",1);
    // Links to nintendo detail page if there is a link, else a google search
    chart.append("a")
         .attr("id","modal_stuff")
         .attr("xlink:href", function(){
             if (d.slug){
                 return "https://www.nintendo.com/games/detail/"+d.slug;
             }
             else {
                 return "https://www.google.com/search?q="+d.title+" nintendo";
             }
         })
         .attr("target","_blank")
         .append("rect")
         .attr("transform", function () {
             if (otherOffset < 370){
                 return "translate(700,380)";
             }
             otherOffset += 10;
             return "translate(700,"+otherOffset+")";
         })
         .attr("fill","#f8b050")
         .attr("width",220)
         .attr("height",50)
         .attr("fill-opacity",1e-6)
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);
    chart.append("a")
         .attr("id","modal_stuff")
         .attr("xlink:href", function(){
             if (d.slug){
                 return "https://www.nintendo.com/games/detail/"+d.slug;
             }
             else {
                 return "https://www.google.com/search?q="+d.title+" nintendo";
             }
         })
         .attr("target","_blank")
         .append("text")
         .attr("transform", function () {
             var x_cor = 730;
             if (typeof (InstallTrigger) !== 'undefined'){ // For firefox
                 x_cor = 715;
             }
             if (otherOffset < 380){
                 return "translate("+x_cor+",415)";
             }
             return "translate("+x_cor+","+(otherOffset+35)+")";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","white")
         .attr("font-size","30px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .html("Learn More")
         .transition().duration(modal_duration+1700)
         .attr("fill-opacity",1);
    d3.select("#img")
	.attr("id","modal_stuff")
	.raise()
	.transition().duration(modal_duration)
	.attr("transform","translate(360,45)")
	.attr("width",300)
	.attr("height",405);
    chart.append("text")
         .attr("id","modal_stuff")
         .attr("transform", function() {
             var x_pos = 938;
             if (typeof (InstallTrigger) !== 'undefined') { // For firefox
                 x_pos = 930
             }
             return "translate("+x_pos+",70)";
         })
         .attr("fill-opacity",1e-6)
         .attr("fill","grey")
         .attr("font-size","40px")
         .attr("font-family", "LatoBlack, sans-serif")
         .attr("font-weight","bold")
         .attr("cursor","pointer")
         .html("&times;")
         .on("click",removeModal)
         .transition().duration(modal_duration+1300)
         .attr("fill-opacity",1);
}

// Removes the popup modal
var removeModal = () => {
    d3.selectAll("#modal_stuff").remove();
    d3.select("#modal").style("display","none");
}

display(all_data,"y");
