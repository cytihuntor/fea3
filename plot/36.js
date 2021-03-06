//多线心电图
function draw36(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
	if(legends == 'left'){
    var legendss=true;
    var orients='vertical';
    var lefts='left';
    var tops='top';
  }
  if(legends == 'right'){
    var legendss=true;
    var orients='vertical';
    var lefts='right';
    var tops='top';
  }
  if(legends == 'top'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='top';
  }
  if(legends == 'bottom'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
  if(legends == 'false'){
    var legendss=false;
		var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
	var x=[];
	var str=[];
	var tl=[];
	var value = [];
	var values = []; //  二维度，存放流数据
	var once=true;
  var option={
        // backgroundColor:e_back_color,
        color:e_angle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip:{
            trigger:'axis',
        },
        animation: false,
        legend: {
					show:legendss,
					orient:orients,
					top:tops,
					left:lefts,
            textStyle:e_legend_textstyle,
            data:[]
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLine:{
                onZero:false
            },
            boundaryGap : false,
            splitLine:e_19_splitLine,
            axisLabel:{textStyle:e_bar_textstyle}
        },
        yAxis: {
            type: 'value',
            splitLine:e_19_splitLine,
            axisLabel:{textStyle:e_bar_textstyle},
            axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    //getData(myChart,ckey,div);
    function getData(myChart,ckey){
    var ws=null;
        var ip_addr = document.location.hostname;
        var mq_topic = ckey;
        var url = "ws://"+ip_addr+":8998/"+mq_topic;

        if (ws !=null && ws.url !=url){
            ws.close();
            ws =null;
        }

        if (ws==null){
            ws = new WebSocket(url);
            /*
            ws.onopen = function() {
                ws.send(mq_topic);
            };
            */
            ws.onmessage = function (evt) {
                //console.log(evt.data);
                update(myChart,evt.data);

            };
            ws.onclose = function(){
                //alert("Connection is closed");
                ws=null;
            };
            ws.error = function()
            {
                //alert("Error Happended");
                ws.close();
                ws=null;
            };

        }//end if

		}

	function doPaint(myChart){
	      for(var j=0;j<50;j++){
	          value.push(0);
	      }
	      for(var j=0;j<50;j++){
	          x.push(j);
	      }
	        var o={
	                type:'line',
	                smooth:true,
	                data:value
	        };
	    str.push(o);
	    option.xAxis.data=x;
	    option.legend.data=tl;
	    option.series=str;
	    myChart.setOption(option,true);
	    //mychart.refresh();

	}
	function update(myChart,raw_data){
	    var datas=JSON.parse(raw_data);
	    var name=datas.columns;
	    var data=datas.data;
	    for (var i=0; i< datas.index.length;i++){
	        x.shift();
	        x.push(datas.index[i]);
	    }

			//第一次，初始化数值0
			if (once==true){
				for(var i=0;i<name.length;i++){
					values[i] =new Array(50);
					for (var j=0;j<50;j++){
						values[i][j] = 0;
					}
					tl.push(name[i]);
				}
				once = false;
			}
			str=[];
			for(var i=0;i<name.length;i++){
	        for(var j=0;j<data.length;j++){
	            var valueAll=data[j];
	            values[i].shift();
	            values[i].push(valueAll[i]);
	        }
	        var o={
	                name:name[i],
	                showSymbol: false,
	                hoverAnimation: false,
	                smooth:true,
	                type:'line',
	                data:values[i]
	        };
	        str.push(o);
					//console.log(str);
	    }//end for

	    //console.log(name)


	    option.xAxis.data=x;
	    option.series=str;
	    option.legend.data=tl;
	    //option.series=o;
	    myChart.setOption(option,true);
	}
	doPaint(myChart);
    getData(myChart,ckey);

};








/*
mychart=echarts.init(document.getElementById("main"));
option={
    title:{
        text:getCookie("cur_df")
    },
    legend: {
        data:[]
    },
    axisLabel : {
        show:true,
        interval: 'auto',    // {number}
    },
    xAxis : {

                  type : 'category',
                  name:'',
                  splitLine:{show:false},
                  axisLine:{show:true},
                    'axisLabel':{'interval':0},
                    data:[]
              },
    yAxis : {
               type : 'value',
               axisLine:{show:false},
               splitLine:{show:true,
                   lineStyle: {
                        type: 'dashed'
                    } }
    },
    grid:{borderWidth:0},
    calculable:true,
    series:[]
}
*/

//doPaint();

//getDa-ta();
