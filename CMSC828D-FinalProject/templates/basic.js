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
        server_call("get-date-range/" + formatDT(dt_cur_from) + "/" + formatDT(dt_cur_to))
            .then(drawGrid);
    }
});

const app = new PIXI.Application({
    width: 1000,
    height: 3700,
    backgroundColor: 0xfffaff,
    resolution: window.devicePixelRatio || 1,
    autoResize: true
});
document.getElementById('universe').appendChild(app.view);
const container = new PIXI.Container();
app.stage.addChild(container);

const texture = PIXI.Texture.from('/static/white_dot.png');


// starting with a square grid for now
function drawGrid(resp) {
    let width = app.screen.width;
    let height = app.screen.height;

    let bins = resp.bin_month;
    let inc_y = 4+2; //height / bins.length;
    let inc_x = 4+2; //width / Math.max(...bins.map(x => x.length))
    let start = resp.start_year;
    container.removeChildren()

    console.log(bins)
    for(let i = 0; i < bins.length; i++) {
        let curr_year = bins[i].year;
        let curr_month = bins[i].month;
        let bin = bins[i].data;

        for(let j = 0; j < bin.length; j++) {
            const square = new PIXI.Sprite(texture);
            square.tint = 0x1099bb;
            // square.tint = 0xff9933;
            square.x = 5 + (inc_x*j);
            square.y = 5 + (inc_y*i);
            square.width = 4; square.height = 4;
            square.interactive = true; square.buttonMode = true;
            square.on('pointerdown', 
                function(){
                    let obj = this;
                    let id = bin[j].id;
                    server_call("get-data/"+id).then(server_response => {
                        BootstrapDialog.show({
                            title: server_response["title"],
                            message: server_response["body"]
                            .concat(', ', server_response["id"])
                        });
                    })

                }
            );
            square.on('mouseover',
                function(event){
                    console.log(this);
                    let id = bin[j].id;
                    this.width = 8;
                    this.height = 8;
                    // this.tint = 0xff0033;
                    this.tint = 0xff9933;
                }

            );
            square.on('mouseout', function(event){
                this.tint = 0x1099bb;
                this.width = 4;
                this.height = 4;
            });
            container.addChild(square);
        }
    }
}

server_call("get-date-range/1970-05-04/2015-12-01")
    .then(drawGrid);
