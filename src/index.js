var table = document.getElementsByTagName("table")[0];
var textarea = document.getElementsByTagName("textarea")[0];
var div = document.getElementById("data");
var btn = document.getElementsByTagName("button")[0];
var checkboxes = document.getElementById("columns");
var inputs = [], visible = [], hidden = [];

var datatable = new DataTable(table, {
	perPage: 5,
});

function updateColumns() {
	try {
		datatable.columns().show(visible);
		datatable.columns().hide(hidden);	
	} catch(e) {
		console.log(e);
	}
}

document.querySelectorAll(".export").forEach(function(el) {
	el.addEventListener("click", function(e) {
		var type = el.dataset.type;
		
		var data = {
			type: type,
			filename: "my-" + type,
		};
		
		if ( type === "csv" ) {
			data.columnDelimiter = "|";
		}
		
		datatable.export(data);
	});
});

document.querySelectorAll(".main").forEach(function(el) {
	el.addEventListener("click", e => {
		datatable[el.id]();
		setTimeout(function() {
			document.getElementById("hide").classList.toggle("hidden", !datatable.initialized);
			table.classList.toggle("table", !datatable.initialized);
		}, 10);
	});
});

document.querySelectorAll(".import").forEach(function(el) {
	el.addEventListener("click", e => {
		var type = el.dataset.type;
		
		var data = {
			type: type,
			data: textarea.value
		};
		
		textarea.parentNode.classList.remove("error");
		
		if ( !data.data.length ) {
			textarea.parentNode.classList.add("error");
			return false;
		}
		
		datatable.import(data);
	});
});