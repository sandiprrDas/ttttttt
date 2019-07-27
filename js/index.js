var dictOneObj = [];
var employee_list = [];
$(document).ready(function() {
	var temp_url = 'https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI';
	renderTable(temp_url);
	var dataTable;

	function renderTable(temp_url) {
		dataTable = $('#example').DataTable({
			processing: false,
			bFilter: false,
			retrieve: true,
			bSortable: false,
			oLanguage: {
				sLengthMenu: 'Show _MENU_ '
			},
			// "ordering": false,
			bSort: false,
			dom: '<"top"i>rt<"bottom"flp><"clear">',

			ajax: {
				url: temp_url,
				dataSrc: ''
			},
			columns: [
				{
					data: 'bank_id'
				},
				{
					data: 'ifsc'
				},
				{
					data: 'branch'
				},
				{
					data: 'address'
				},
				{
					data: 'city'
				},
				{
					data: 'district'
				},
				{
					data: 'state'
				},
				{
					data: 'bank_name'
				}
			]
		});
	}

	$.ajax({
		url: 'https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI',
		dataType: 'json',
		success: function(data) {
			var counter = 0;
			for (var k = 0; k < data.length; k++) {
				dictOneObj[counter] = {};
				dictOneObj[counter] = {
					setUUid: data[k].bank_id,
					setName: data[k].bank_name,
					ifsc: data[k].ifsc,
					state: data[k].state,
					city: data[k].city,
					address: data[k].address,
					branch: data[k].branch,
					district: data[k].district
				};
				counter = counter + 1;
			}
			console.log('dictOneObj', dictOneObj);
			// $.each(data,function(index,item){
			//     var temp
			//     dictOneObj.push(item.bank_name);
			// });
			$.each(dictOneObj, function(i, o) {
				var temp = {};
				temp['id'] = o.setUUid;
				temp['name'] = o.setName;
				(temp['ifsc'] = o.ifsc),
					(temp['state'] = o.state),
					(temp['city'] = o.city),
					(temp['address'] = o.address),
					(temp['branch'] = o.branch),
					(temp['district'] = o.district);
				employee_list.push(temp);
			});
			var $hr_input = $('.search_by_name');
			$hr_input.typeahead({
				items: 10,
				autoSelect: true,
				minLength: 2,
				source: employee_list,
				autoSelect: true,
				afterSelect: function(data) {
					debugger;
					$('.typeahead li').attr('data_emp_uuid', data.id);
					var active_attr = $('.typeahead li.active').attr('data_emp_uuid');
					var emplNameurl = 'https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI?bank_id=' + active_attr;
					// getMonthlyLog(emplNameurl);
					renderTable(emplNameurl);
					// dataTable.clear().draw();
					// dataTable.rows.add(data); // Add new data
					dataTable.clear().rows.add(data).draw();
					// var table = $('#example').DataTable();
					// table.rows.add(data).draw();
					var table = $('#example').DataTable();
					table.rows
						.add(
							$(
								'<tr>' +
									'  <td>' +
									data.id +
									'</td>' +
									'  <td>' +
									data.ifsc +
									'</td>' +
									'  <td>' +
									data.branch +
									'</td>' +
									'  <td>' +
									data.address +
									'</td>' +
									'  <td>' +
									data.city +
									'</td>' +
									'  <td>' +
									data.district +
									'</td>' +
									'  <td>' +
									data.state +
									'</td>' +
									'  <td>' +
									data.name +
									'</td>' +
									'</tr>'
							)
						)
						.draw();
				}
			});
		},
		type: 'GET'
	});
});
