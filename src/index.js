//danh gia nhanh
function getElementsByXPath(xpath) {
	let results = [];
	let query = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null,
	);
	for (let i = 0; i < query.snapshotLength; i++) {
		results.push(query.snapshotItem(i));
	}
	return results;
}

 function callOptionFull() {
	// XPath động với chỉ mục tbody
	let baseXPath1 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[2]/app-child-ksdg-thangdo/div[3]/div/table/tbody';

	for (let i = 1; i <= 3; i++) {
		let xpath = `${baseXPath1}[${i}]/tr/td[7]/input`;
		let inputs = getElementsByXPath(xpath);
		inputs.forEach((input) => {
			input.click();
			console.log(`Clicked input in tbody[${i}]`);
		});
	}

	let baseXPath2 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[3]/app-child-ksdg-thangdo/div[2]/div/table/tbody';

	for (let i = 1; i <= 3; i++) {
		let xpath = `${baseXPath2}[${i}]/tr/td[7]/input`;
		let inputs = getElementsByXPath(xpath);
		inputs.forEach((input) => {
			input.click();
			console.log(`Clicked input in tbody[${i}]`);
		});
	}

	let baseXPath3 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[4]/app-child-ksdg-thangdo/div[2]/div/table/tbody';

	for (let i = 1; i <= 4; i++) {
		let xpath = `${baseXPath3}[${i}]/tr/td[7]/input`;
		let inputs = getElementsByXPath(xpath);
		inputs.forEach((input) => {
			input.click();
			console.log(`Clicked input in tbody[${i}]`);
		});
	}
	let baseXPath4 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[5]/app-child-ksdg-thangdo/div[2]/div/table/tbody';

	// Tìm và click vào tất cả các input trong cột 7 của mỗi tbody
	for (let i = 1; i <= 2; i++) {
		// Giả sử có 2 tbody, bạn có thể thay đổi phạm vi này nếu cần
		let xpath = `${baseXPath4}[${i}]/tr/td[7]/input`;
		let inputs = getElementsByXPath(xpath);
		inputs.forEach((input) => {
			input.click();
			console.log(`Clicked input in tbody[${i}]`);
		});
	}
	let baseXPath5 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[6]/app-child-ksdg-thangdo/div[2]/div/table/tbody';

	for (let i = 1; i <= 6; i++) {
		let xpath = `${baseXPath5}[${i}]/tr/td[7]/input`;
		let inputs = getElementsByXPath(xpath);
		inputs.forEach((input) => {
			input.click();
			console.log(`Clicked input in tbody[${i}]`);
		});
	}

	let baseXPath6 =
		'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[7]/app-child-ksdg-thangdo/div[2]/div/table/tbody/tr/td[7]/input';
	let element = document.evaluate(
		baseXPath6,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue;
	element.click();

}








callOptionFull()