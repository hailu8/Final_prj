function server_call(end_point){
    let url = new URL("http://localhost:8000/" + end_point);
    url.search = new URLSearchParams().toString();
    return fetch(url,{"credentials": "same-origin"})
        .then(response => response.json())
}

var Paper = 'all';
var dt_from = "1970/05/04";
var dt_to= "2015/12/01";
// var dt_from;
// var dt_to;

$('.slider-time').html(dt_from);
$('.slider-time2').html(dt_to);
var min_val = Date.parse(dt_from)/1000;
var max_val = Date.parse(dt_to)/1000;
// var min_val;
// var max_val;

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


//default show 1970 - 2015
let url_dif = new URL("http://localhost:8000/get-paper-date-range/all/1970-05-04/2015-12-01" );
url_dif.search = new URLSearchParams().toString();
        fetch(url_dif,{"credentials": "same-origin"})
            .then(response => response.json())
            .then(Datas => {
                d1= Datas;
                console.log(d1);
                UpdateScatterplot(d1,1970,2015);

});

$("#slider-range").slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function (e, ui) {
        console.log(min_val,max_val);
        dt_cur_from = new Date(ui.values[0]*1000); //.format("yyyy-mm-dd hh:ii:ss");
        dt_cur_to = new Date(ui.values[1]*1000); //.format("yyyy-mm-dd hh:ii:ss");                
        $('.slider-time').html(formatDT(dt_cur_from));
        $('.slider-time2').html(formatDT(dt_cur_to));
        // var All = "all";
        console.log(Paper);
        let url = new URL("http://localhost:8000/get-paper-date-range/"+ Paper  + "/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to));
        url.search = new URLSearchParams().toString();
        fetch(url,{"credentials": "same-origin"})
            .then(response => response.json())
            .then(Datas => {
                d1= Datas;
                let mn = dt_cur_from.getFullYear();
                let mx = dt_cur_to.getFullYear();
                // console.log(mn);
                // console.log(mx);
                 UpdateScatterplot(d1,mn, mx);
})
        

        }
});




SelectPaperBtn = document.querySelector("#Radio_Type").Paper_type_radio;
//take the radio button value
for (var i = 0; i < SelectPaperBtn.length; i++) {
    SelectPaperBtn[i].addEventListener('change', function() {
        console.log(this.value);
        SelectPaper = this.value;

        if (SelectPaper === 'All') {
            
            Paper = "all"
            console.log('All');
            console.log(Paper);
            time_from = document.getElementById('ranges');
            var spans = time_from.getElementsByTagName("span");
            dt_cur_from = spans[0].innerHTML;
            dt_cur_to = spans[1].innerHTML;
            // console.log(dt_cur_from);
            dt_cur_from = new Date (dt_cur_from);
            dt_cur_to  = new Date (dt_cur_to);
            // console.log(typeof dt_cur_from);
            // console.log(dt_cur_from);

            let url = new URL("http://localhost:8000/get-paper-date-range/"+ Paper  + "/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to));
            url.search = new URLSearchParams().toString();
            fetch(url,{"credentials": "same-origin"})
                .then(response => response.json())
                .then(Datas => {
                    d1= Datas;
                    let mn = dt_cur_from.getFullYear();
                    let mx = dt_cur_to.getFullYear(); 
                    console.log(mn);
                    console.log(mx);
                    // let mn = 1970;
                    // let mx = 2015;
                    // console.log(d1);
                    UpdateScatterplot(d1,mn, mx);
            })
        
                    
            
        }
          
            
        else if (SelectPaper === 'Black_Explosion') {
           
            Paper = "black_explosion";
            console.log('Black_Explosion');
            console.log(Paper);

            time_from = document.getElementById('ranges');
            var spans = time_from.getElementsByTagName("span");
            
            dt_cur_from = spans[0].innerHTML;
            dt_cur_to = spans[1].innerHTML;
            
            dt_cur_from = new Date (dt_cur_from);
            dt_cur_to  = new Date (dt_cur_to);

            let url = new URL("http://localhost:8000/get-paper-date-range/"+ Paper  + "/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to));
            url.search = new URLSearchParams().toString();
            fetch(url,{"credentials": "same-origin"})
                .then(response => response.json())
                .then(Datas => {
                    d1= Datas;
                    //console.log(d1);
                    // let mn = 1970;
                    // let mx = 2015;
                    let mn = dt_cur_from.getFullYear();
                    let mx = dt_cur_to.getFullYear(); 
                    console.log(mn);
                    console.log(mx);
                    // console.log(mn);
                    // console.log(mx);
                UpdateScatterplot(d1,mn, mx);
            })
        
            
        } else {
            var dt_from = "1983/09/01";
            var dt_to= "2015/11/05";

            $('.slider-time').html(dt_from);
            $('.slider-time2').html(dt_to);
            min_val = Date.parse(dt_from)/1000;
            max_val = Date.parse(dt_to)/1000;

            // time_from = document.getElementById('ranges');
            // var spans = time_from.getElementsByTagName("span");
            
            // dt_cur_from = spans[0].innerHTML;
            // dt_cur_to = spans[1].innerHTML;
            
            // dt_cur_from = new Date (dt_cur_from);
            // dt_cur_to  = new Date (dt_cur_to);

            Paper = "mitzpeh";
            console.log('Mitzpeh');
            console.log(Paper);
            // let url = new URL("http://localhost:8000/get-paper-date-range/"+ Paper  + "/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to));
            let url = new URL("http://localhost:8000/get-paper-date-range/" + Paper  + "/" +"2011-11-01/2015-11-05");
            url.search = new URLSearchParams().toString();
            fetch(url,{"credentials": "same-origin"})
                .then(response => response.json())
                .then(Datas => {
                    d1= Datas;
                    //console.log(d1);
                    let mn = 2011;
                    let mx = 2015;
                    // console.log(mn);
                    // console.log(mx);
                    UpdateScatterplot(d1,mn, mx);
            })
        
            
                    }
            });
            
        }
    
function UpdateScatterplot(Data, mn, mx){
    d3.selectAll("#circ").remove();
    d3.selectAll("#x_axis").remove();
    //  var w = 1290;
    //  var h = 1000;

     var margin = {top: 40, right: 30, bottom: 100, left: 100},
     w = 1290 - margin.left - margin.right,
     h = 1000 - margin.top - margin.bottom;

    var yearScale = d3.scaleLinear()
    .domain([mn,mx]).range([90,w]);

    var hrScale = d3.scaleLinear()
    .domain([0,2600]).range([h,20]);
    
    var xAxis = d3.axisBottom().scale(yearScale).ticks(20);
		
    var yAxis = d3.axisLeft().scale(hrScale).ticks(20);

    function scaleYear(year) {
        return yearScale(year);
    }
    
    function scaleHomeruns(homeruns) {
        return hrScale(homeruns);
    }   
    // **** Code for creating scales, axes and labels ****
    
    
    var svg = d3.select('svg');
    svg.append('g').attr('id', 'x_axis')
        .attr('transform', 'translate(0,950)')
        .attr("width", w)
        .attr("height", h)
        .call(xAxis);
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(360,1010)')
        .text('Year');
    
    svg.append('g').attr('id', 'y_axis')
        .attr('transform', 'translate(50,0)')
        .call(yAxis);
    
    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate(0,450) rotate(90)')
        .text('Word Count');
        // let urls = new URL("http://localhost:8000/get-data/" + 10);
        // urls.search = new URLSearchParams().toString();
        // fetch(urls,{"credentials": "same-origin"})
        // .then(response => response.json())
        // .then(Data2 => {
        //     d2 = Data2
    // svg.append('text')
    //     .attr('class', 'title')
    //     .attr('transform','translate(460,30)')
    //     .text('Student-newspaper');

    var tooltip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, -10])
    groups = svg.selectAll("circle")
    .data(Data)
    .enter()
    .append("g")
    .attr('id', 'circ')
    .attr('transform', function(d){
        return 'translate('+scaleYear(d.year) +','+ scaleHomeruns(d.word_count) +')'
    });
    svg.call(tooltip);
    groups.append('circle')
            .attr("cx", function(d) {
                return d.yearScale;
            })
            .attr("cy", function(d) {
                return d.hrScale;
            })
            .attr("r", 2.5)
            .attr("stroke-width", 0.2)
            .attr("stroke", "blue")
            .on('click', function(d){
                console.log(d.id);
                let urls = new URL("http://localhost:8000/get-data/" + d.id);
                urls.search = new URLSearchParams().toString();
                fetch(urls,{"credentials": "same-origin"})
                .then(response => response.json())
                .then(Data2 => {
                    d2 = Data2
                    $('.title_div').html(d2.title);
                    $('.body_div').html(d2.body);
                    $('.paper_div').html(d2.paper);
                    // console.log('d2');
                    // console.log(d2);
                    // console.log(d2.id);
                    // tooltip
                    // .html(function(d) {
                    //     return "<div style='background-color:steelblue; color:white; width:1100px; height: 700px';> Title: "+d2.title +"<br>Body: "+d2.body + "<br>Paper: "+d2.paper;
                    // });
                    
                    // tooltip.show;
                })
            });
            // .on("mouseout", tooltip.hide);


}

            
            