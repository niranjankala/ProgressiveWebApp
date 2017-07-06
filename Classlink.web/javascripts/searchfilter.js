// JavaScript Document

(function($){
	//Variables
	var $search_field = '#Search',
	$search_button = '#SearchFilter',
	$search_table = '#userList',
	$search_error = '<h2>We were unable to find the Record you were looking for!</h2> <p>Check for spelling error(s) or try again.</p>',
	$paging_rows = 5;
	//Table Filter
	function fnSearchFilter(inputIdParam, tblIdParam){
		var $input_value = $(inputIdParam).val(),$count = 0,$table = $(tblIdParam),$td,$input_check,$rowlength,$found_value,$error_data = $('.no-table-data'),$searchbox = $(inputIdParam).parents('.search-box'),$searchclose = $searchbox.siblings('.btn-danger');
		$searchclose.addClass('hide');
		if($error_data.hasClass('active')) {
			$($error_data).removeClass('active');
			$searchclose.addClass('hide');
		}
		if($input_value) {
			$searchclose.removeClass('hide');
		} else {
			$searchclose.addClass('hide');
		}
		//console.log();
		$table.find('tr').each(function(index, row){
			var $td = $(row).find('td');
			if($td && $td.text()){
				$found_value = false;
				$td.each(function(index, td){
					$input_check = new RegExp($input_value, 'i');
					if($input_check.test($(td).text())) //True or false value output condition with number of rows
					{
						$found_value = true;
						$count++;
						return $count;
					}
				});
				$found_value == true ? $(row).show() : $(row).hide();
			}
		});
		$count ? '' : fnErrorTableData();
	}
	//Pagination
	function fnPagination(tblIdParam){
		var $count = 0,$table = $(tblIdParam),$tr = $table.find('tbody tr'),$td = $tr.eq(0).children('td'),$rowlength,$found_value, $paging_data, $paging_body, $current_item;
		$tr_length = $tr.length,
		$td_length = $td.length;
		$paging_body = $tr_length > $paging_rows ? Math.ceil($tr_length / $paging_rows) : '';
		$current_item = 0;
		$paging_data ='<tfoot class="pagination-scope">'+'<tr>'+'<td colspan="'+ $td_length +'" class="mydata"></td>'+'</tr>'+'</tfoot>';
		$table.append($paging_data);
		var  html;
		html = '';
		for(var i = 0; i < $paging_body; i++){
			html += '<span id="paging'+(i+1)+'">' + (i+1) + '</span>';
		}
		$('.mydata').append(html);
	}
	//Reset Table Data
	function fnErrorTableData(){
		$('<div class="no-table-data active">'+ $search_error +'</div>').insertAfter($search_table);
	}
	//Reset Data Button
	$($search_field).parents('.search-box').siblings('.btn-danger').click(function(){
		var tr = $($search_table).find('tr');
		tr.show();
		$(this).addClass('hide');
		$($search_field).val('');
		$($search_table).siblings('.no-table-data').addClass('hide');
	});
	fnPagination('#userList');
	//Search Btn and table names
	$($search_button).click(function(){
		//Call Function
		fnSearchFilter($search_field, $search_table); //Enter first Input box id name and then table id
	});
	$($search_field).keypress(function(e){
		e.which == 13 ? $($search_button).click() : ''; //Enter Search button name
	});
}(jQuery));