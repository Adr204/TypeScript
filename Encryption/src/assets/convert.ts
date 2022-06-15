class Convert {
	list: string[] = [];
	constructor() {
		const A = 'A'.charCodeAt(0);
		const a = 'a'.charCodeAt(0);
		// @todo ここのコードの整形
		for(let i = 0; i < 64; i++) {
			if(i < 10) this.list[i] = i.toString();
			if(i == 10) this.list[i] = '_';
			if(i == 11) this.list[i] = '@';
			if(12 <= i && i < 38) this.list[i] = String.fromCharCode(A + i - 12); // [A-Z]
			if(38 <= i && i < 64) this.list[i] = String.fromCharCode(a + i - 38); // [a-z]
		}
	}
	encryption(value: string, key: string) {
		const valB = this.ctob(value);
		const keyB = this.ctob(key);
		return this.btoc(valB ^ keyB);
	}
	btoc(bit: number) {
		return this.list[bit];
	}
	ctob(char: string) {
		if(this.list.indexOf(char) == -1) char = '0';
		return this.list.indexOf(char);
	}
}
export default new Convert()