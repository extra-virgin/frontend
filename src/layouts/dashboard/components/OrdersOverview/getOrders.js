const FIGI_API_ENDPOINT = "https://api.openfigi.com/v3/mapping"//process.env.FIGI_API_ENDPOINT;//https://api.openfigi.com/v3/mapping or "http://localhost:8010/proxy"; for local
const ORDERS_ENDPOINT = "https://apimocha.com/stocks-orders/orders"//process.env.ORDERS_ENDPOINT//"https://apimocha.com/stocks-orders/orders";

const getOrders = async () => {	
	return new Promise((resolve, reject) => {
		getOrdersFromService()
		.then(orders => {
			let body = orders.map(order => ({"idType":"ID_ISIN","idValue":order.figi}));
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Access-Control-Allow-Origin", "*");
			
			fetch(FIGI_API_ENDPOINT, {
				method: 'POST',
				headers: headers, 
				body: JSON.stringify(body)
			})
			.then((fullInfoResponse) => {
				fullInfoResponse.json()
				.then(result => {
					const fullInfo = result[0].data;
					const stocks = orders.map((order, index) => {
						return {
							...order,
							title: fullInfo[index].name
						}
					})
					resolve(stocks)
				})
				
			})
		})
	});
}

const getOrdersFromService = () => {
	return new Promise((resolve) => {
		fetch(ORDERS_ENDPOINT, {
			method: 'GET'
		})
		.then((response) => {
			return response.json()
		})
		.then((orders) => {
			resolve(orders)
		})
	});
}

export default getOrders