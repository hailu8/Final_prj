function server_call(end_point){
    let url = new URL("http://localhost:8000/" + end_point);
    url.search = new URLSearchParams().toString();
    return fetch(url,{"credentials": "same-origin"})
        .then(response => response.json())
}


var dt_from = "1970/05/04";
var dt_to= "2015/12/01";

$('.slider-time').html(dt_from);
$('.slider-time2').html(dt_to);
var min_val = Date.parse(dt_from)/1000;
var max_val = Date.parse(dt_to)/1000;

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}
function formatDT(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+1, 2);
    var date = zeroPad(__dt.getDate(), 2);
    return year + '-' + month + '-' + date;
};


$("#slider-range").slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function (e, ui) {
        var dt_cur_from = new Date(ui.values[0]*1000); //.format("yyyy-mm-dd hh:ii:ss");
        var dt_cur_to = new Date(ui.values[1]*1000); //.format("yyyy-mm-dd hh:ii:ss");                
        $('.slider-time').html(formatDT(dt_cur_from));
        $('.slider-time2').html(formatDT(dt_cur_to));
        // server_call("get-date-range/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to))
        //     .then(UpdateScatterplot);
        let url = new URL("http://localhost:8000/get-date-range/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to));
        url.search = new URLSearchParams().toString();
        fetch(url,{"credentials": "same-origin"})
            .then(response => response.json())
            .then(Datas => {
                UpdateScatterplot(Datas);
            });
        }
});



function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}   

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1970,2015]).range([60,1250]);

var hrScale = d3.scaleLinear()
    .domain([0,2600]).range([740,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,750)')
    // .attr("width", w)
    // .attr("height", h)
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,890)')
    .text('MLB Season');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(40,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,250) rotate(90)')
    .text('Home Runs (HR)');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(460,30)')
    .text('Top 10 HR Leaders per MLB Season');

var tooltip = d3.select("#main")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");
var mouseover = function(d) {
    tooltip
        .style("opacity", 1)
    }

    var mousemove = function(d) {
        let url = new URL("http://localhost:8000/get-data/" +d.ide);
        url.search = new URLSearchParams().toString();
        fetch(url,{"credentials": "same-origin"})
        .then(response => response.json())
        .then(Data2 => {
            console.log(Data2.body);
            //need to fix
                // tooltip
                //     .html(Data2.body)
                //     .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                //     .style("top", (d3.mouse(this)[1]) + "px")
        })
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
       
// let url = new URL("http://localhost:8000/get-date-range/1970-05-04/2015-12-01");
// url.search = new URLSearchParams().toString();
// fetch(url,{"credentials": "same-origin"})
// .then(response => response.json())
// .then(Datas => {
//     UpdateScatterplot(Datas);
    
// });

function UpdateAxis(year){

}

function UpdateScatterplot(Data){
    d3.selectAll("#circ").remove();
    groups = svg.selectAll("circle")
    .data(Data)
    .enter()
    .append("g")
    .attr('id', 'circ')
    .attr('transform', function(d){
        return 'translate('+scaleYear(d.year) +','+ scaleHomeruns(d.word_count) +')'
    });
    groups.append('circle')
            .attr("r", 3)
            .attr("stroke-width", 0.2)
            .attr("stroke", "black");

    groups.on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave );

}

            