window.onload = function () {
    init();
   
};




function init() {
    console.log('init fired');
 
}

$(window).scroll(function() {
    if ($(this).scrollTop()>500){
        $('.foreground-video').fadeOut();
        
    }
    else 
        {
            $('.foreground-video').fadeIn();
        }
 });
$(function(){
    $(".flip").flip({
        trigger: 'hover'
    });
});
var data = {"total":0,"rows":[]};
		var totalCost = 0;
		
		$(function(){
            
            if(localStorage && window.localStorage.length != 0){
                
                var test1 = localStorage.getItem('data');
                var test2 = localStorage.getItem('tdata');
            
                var testparse = JSON.parse(test1);
                
            }
                
                else{
                    
                console.log("NO  STORAGE");    
                }
            
			$('#cartcontent').datagrid({
				singleSelect:true
			});
			$('.item').draggable({
				revert:true,
				proxy:'clone',
				onStartDrag:function(){
					$(this).draggable('options').cursor = 'not-allowed';
					$(this).draggable('proxy').css('z-index',10);
				},
				onStopDrag:function(){
					$(this).draggable('options').cursor='move';
				}
			});
			$('.cart').droppable({
				onDragEnter:function(e,source){
					$(source).draggable('options').cursor='auto';
				},
				onDragLeave:function(e,source){
					$(source).draggable('options').cursor='not-allowed';
				},
				onDrop:function(e,source){
					var name = $(source).find('p:eq(0)').html();
					var price = $(source).find('p:eq(1)').html();
					addProduct(name, parseFloat(price.split('£')[1]));
				}
			});
		});
		
		function addProduct(name,price){
			function add(){
				for(var i=0; i<data.total; i++){
					var row = data.rows[i];
					if (row.name == name){
						row.quantity += 1;
						return;
					}
                    
                
                    
                    
				}
				data.total += 1;
				data.rows.push({
					name:name,
					quantity:1,
					price:price
				});
                
                var jsonstring = JSON.stringify(data);
                
                console.log(data);
                
                localStorage.setItem('data', jsonstring);
                
                
			}
			add();
			totalCost += price;
			$('#cartcontent').datagrid('loadData', data);
			$('div.cart .total').html('Total: £'+totalCost);
            
            var jsonstring = JSON.stringify(data);
                
            console.log(data);
                
            localStorage.setItem('data', jsonstring);
            localStorage.setItem('tdata', totalCost);
		}



$(function  (){
    
    var getjson = localStorage.getItem('data');
    var totjson = localStorage.getItem('tdata');
    
   var parsejson = JSON.parse(getjson);
    
    console.log(getjson);
    console.log(parsejson);
    
    $('#cartcontent').datagrid('loadData', parsejson);
    $('div.cart .total').html('Total: £'+totjson);
    

        
});
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

