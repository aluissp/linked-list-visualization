export default class HtmlNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.htmlNode = null;

		this.createHtml(data);
	}

	createHtml(data) {
		this.htmlNode = document.createElement('div');
		this.htmlNode.className = 'node';
		const paragraph = document.createElement('p');
		paragraph.innerText = data;
		this.htmlNode.appendChild(paragraph);
	}

	getHtml() {
		return this.htmlNode;
	}
}
