function initialize(){
	var arr = [];
	for (let i = 1; i <= 365; i++){
		arr.push(i);
	}

	return arr;
}

function average(arr, days){
	let total = arr.reduce( (sum, current) => sum + current);
	let newArr = arr.map( x => total / arr.length);

	return newArr;
}

function period(days){
	let newArr = []
	let arr = initialize();
	let arrSize = 7;
	let timeUnit = 1;
	let sum, j = 0;

	// change array size depending on period
	switch (days){
		case 7:
			arrSize = 7;
			timeUnit = 1;
			break;
		case 30:
			arrSize = 4;
			timeUnit = 7;
			break;
		case 180:
			arrSize = 6;
			timeUnit = 30;
			break;
		case 365:
			arrSize = 12;
			timeUnit = 30;
			break;
		default:
			console.log("default");
			break;
	}

	for(let i = 0; i < arrSize; i++) {
		sum = 0;

		//fix to sum totals based on period
		for(; j < (i + 1) * timeUnit; j++){
			sum += arr[j];
		}

		newArr.push(sum);
	}

	return newArr;
}

function graph(arr, avg, days){
	document.getElementById("myChart").remove();
	$("#graph-container").append('<canvas id="myChart"></canvas>');
	var ctx = document.getElementById("myChart");

	let labels = [""];
	let title = ""

	// change labels and colors depending on size of data
	switch (days){
		case 7:
			labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
			title = "Week View";
			break;
		case 30:
			labels = ["Week 1","Week 2","Week 3","Week 4"]
			title = "Month View";
			break;
		case 180:
			labels = ["April","May","June","July","August","September"]
			title = "6-Month View";
			break;
		case 365:
			labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
			title = "Year View";
			break;
	}

	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: labels,
	        datasets: [{
	            label: 'Volume',
	            data: arr,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)',
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)',
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        },{
	        	label: "average",
	        	data: avg,
	        	type: 'line',
	        	fill: false
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        },
	        title: {
	        	display: true,
	        	text: title
	        }
	    }
	});
}