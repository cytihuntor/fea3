function draw03(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
	if(legends == 'true'){
    var legendss=true;
  }
  if(legends == 'false'){
    var legendss=false;
  }
	option={
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
		   		axisPointer:{
		        show:true,
		        type:'cross',
		        lineStyle: {
		            type:'dashed',
		            width:1
		        }
		    }

	    },
	    animation: false,
	    xAxis: {
	        type: 'value',
	        name:xname,
	        axisLine:{
	            onZero:false
	        },
	        axisLabel:{textStyle:e_bar_textstyle},
	        nameTextStyle:e_scatter_textstyle
	    },
	    yAxis: {
	        type: 'value',
	        name:yname,
	        axisLabel:{textStyle:e_bar_textstyle},
	        axisTick:{show:false},
	        nameTextStyle:e_scatter_textstyle
	    },
	    dataZoom: [{
	        type: 'inside'
	    }],
	    series: []
	};
	getData(myChart,ckey);
	function getData(myChart,ckey){
		$.ajax({
	        type : 'get',
	        url:'/db/jsonp/ssdb0/'+ckey,
	        cache : false,
	        dataType : 'jsonp',
	        //async : false,
	        success:function (dataAll){
	        	//dataAll=eval("(" + dataAll + ")");
				var name=dataAll.columns;
				data=dataAll.data;
				num=dataAll.index;
				var str=[];
				for(var i=0;i<data.length;i++){
					var obj=data[i];//��ȡdata���ÿһ������
					str.push(obj[2]);//��ȡk������ֵ
				}
				var n = [];
				for(var i = 0; i < str.length; i++){
					if (n.indexOf(str[i]) == -1){
						n.push(str[i]);
					}
				}
				var o1=[];
				for(var i=0;i<n.length;i++){
					var x=n[i];
					var ss=[];
				 	for(var k=0;k<data.length;k++){
						var dar=data[k];
						if(x==dar[2]){
							var xx=[];
							xx.push(dar[0]);
							xx.push(dar[1]);
							ss.push(xx);
						}
					}
					var o={
							name:x,
							type:'scatter',
						    data:ss
					}
					o1.push(o);
				};

				var q={
					trigger:'axis',
 		   		axisPointer:{
 		        show:true,
 		        type:'cross',
 		        lineStyle: {
 		            type:'dashed',
 		            width:1
 		        }
 		    	},
					formatter:function(params){
						// console.log(params);
		    		var x=params[0].value[0];
	    	   	var y=params[0].value[1];
	    	  	var result="";
	    	   	for(var i=0;i<data.length;i++){
	    		   	valuearr=data[i];
	    		   	var name=dataAll.columns;
	    		   	if(x==valuearr[0]&&y==valuearr[1]){
	    			   	result="index:"+num[i]+"</br>"+name[0]+":"+x+"</br>"+name[1]+":"+y;
	    			   	return result;
	    		   	}
	    	   	}
			    }
				}

		    // myChart.setOption({
		    // 	tooltip:{
				// 		formatter:function(params){
		    // 		var x=params.value[0];
		    // 	   	var y=params.value[1];
		    // 	  	var result="";
		    // 	   	for(var i=0;i<data.length;i++){
		    // 		   	valuearr=data[i];
		    // 		   	var name=dataAll.columns;
		    // 		   	if(x==valuearr[0]&&y==valuearr[1]){
		    // 			   	result="index:"+num[i]+"</br>"+name[0]+":"+x+"</br>"+name[1]+":"+y;
		    // 			   	return result;
		    // 		   	}
		    // 	   	}
			  //   	}
				// 	}
		    // });

				option.tooltip=q;
				option.series=o1;
			    myChart.setOption(option);
	        }
	    });

	}
}
