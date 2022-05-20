const GOODS_ENDPOINT = "https://apimocha.com/stocks-orders/goods";//process.env.GOODS_ENDPOINT//"https://apimocha.com/stocks-orders/goods";
const FIGI_API_ENDPOINT = "https://api.openfigi.com/v3/mapping"; //process.env.FIGI_API_ENDPOINT;//https://api.openfigi.com/v3/mapping or "http://localhost:8010/proxy"; for local

const getGoodsFromService = async () => {
	return new Promise((resolve) => {
		fetch(GOODS_ENDPOINT, {
			method: 'GET'
		})
		.then((response) => {
			return response.json()
		})
		.then((goods) => {
			resolve(goods)
		})
	});
};

const getGoods = async () => {	
	return new Promise((resolve, reject) => {
		getGoodsFromService()
		.then(orders => {
			let body = orders.map(order => ({"idType":"ID_ISIN","idValue":order.figi}));
			console.error(body)
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
					const stocks = orders.map((order, index) => {
						const fullInfo = result[index].data;
						return {
							...order,
							title: fullInfo[0].name
						}
					})
					
					resolve(stocks)
				})
				
			})
		})
	});
}

export default getGoods