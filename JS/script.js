window.onload = function () {
    init();
   
};




function init() {
    console.log('init working');
 
}

$(window).scroll(function() {
    if ($(this).scrollTop()>500){
        $('.foregroundvideo').fadeOut();
        
    }
    else 
        {
            $('.foregroundvideo').fadeIn();
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
            
			$('#cartitems').datagrid({
				singleSelect:true
			});
			$('.product').draggable({
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
			$('#cartitems').datagrid('loadData', data);
			$('div.cart .total').html('Total: £'+totalCost);
            
            var jsonstring = JSON.stringify(data);
                
            console.log(data);
                
            localStorage.setItem('tdata1', jsonstring);
            localStorage.setItem('tdata2', totalCost);
		}



$(function  (){
    
    var getjson = localStorage.getItem('tdata1');
    var totjson = localStorage.getItem('tdata2');
    
   var parsejson = JSON.parse(getjson);
    
    console.log(getjson);
    console.log(parsejson);
    
    $('#cartitems').datagrid('loadData', parsejson);
    $('div.cart .total').html('Total: £'+totjson);
    

        
});
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

