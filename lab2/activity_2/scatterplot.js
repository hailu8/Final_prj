function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}   

// **** Code for creating scales, axes and labels ****

var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('MLB Season');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('Home Runs (HR)');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Top 10 HR Leaders per MLB Season');

var dataset = d3.csv('baseball_hr_leaders.csv').then(function(d){
    
    var group = svg.selectAll("circle")
            .data(d)
            .enter()
            .append("g")
            .attr('transform', function(d){
                return 'translate('+scaleYear(d.year) +','+ scaleHomeruns(d.homeruns) +')'
            });
            
        
            group.append('circle')
            .attr("r", 2)
            .style('fill', function(d) {
                if(d.rank <= 3) {
                    return 'orange';
            }       else {
                    return 'black';
                }
            })
            .attr("stroke-width", 0.2)
            .attr("stroke", "black");
            
            
            group.append('text')
            // .text(function(d){ return d.name; })
            .style('opacity', 0.002)
            .on('mouseover', function(d){
                d3.select(this).style('opacity', 1)
            })
            
            .on('mouseout', function(d){
                d3.select(this).style('opacity', 0.15)});
    });