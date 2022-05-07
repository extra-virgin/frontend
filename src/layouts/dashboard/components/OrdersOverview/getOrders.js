
const figiApi = "http://localhost:8010/proxy";

const getOrders = async () => {	
	return new Promise((resolve, reject) => {
		getOrdersFromService()
		.then(orders => {
			const completeOrders = [];
			let body = orders.map(order => ({"idType":"ID_ISIN","idValue":order.figi}));
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Access-Control-Allow-Origin", "*");
			
			fetch(figiApi, {
				method: 'POST',
				headers: headers, 
				body: JSON.stringify(body)
			})
			.then((fullInfoResponse) => {
				fullInfoResponse.json()
				.then(result => {
					///console.error(result)
					const fullInfo = result[0].data;
					const stocks = orders.map((order, index) => {
						return {
							...order,
							title: fullInfo[index].name
						}
					})
					//console.error(fullInfo)
					// completeOrders.push({
					// 	...orders[0],
						
					// })
					resolve(stocks)
				})
				
			})
		})
	});
}

const getOrdersFromService = () => {
	//TODO fetch
	return new Promise((resolve) => {
		resolve([
			{
				figi: 'US9598021098',
				time: '2018-12-19 09:26:03.478039',
				price: 123.3,
				buy: true
			},
			{
				figi: 'US5949181045',
				time: '2018-12-19 09:26:03.478039',
				price: 123.3,
				buy: true
			},
			{
				figi: 'US0231351067',
				time: '2018-12-19 09:26:03.478039',
				price: 123.3,
				buy: true
			},
			{
				figi: 'US17275R1023',
				time: '2018-12-19 09:26:03.478039',
				price: 123.3,
				buy: true
			},
			{
				figi: 'RU000A0J2Q06',
				time: '2018-12-19 09:26:03.478039',
				price: 123.3,
				buy: true
			},
		])
	});
}

export default getOrders