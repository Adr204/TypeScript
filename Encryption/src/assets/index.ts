import conv from "./convert.js";

type elemDiv = HTMLDivElement | null;
type elemInput = HTMLInputElement | null;
interface DOM {
	key: elemInput,
	conv: elemInput,
	input: elemInput,
	output: elemDiv
}

const Doc: DOM = {
	key: null,
	conv: null,
	input: null,
	output: null
};

//DOMツリーが出来上がったら実行
document.addEventListener('DOMContentLoaded', function() {
	Doc.key = document.getElementById("key") as elemInput;
	Doc.conv = document.getElementById("conv") as elemInput;
	Doc.input = document.getElementById("input") as elemInput;
	Doc.output = document.getElementById("output") as elemDiv;
	for(const [key, val] of Object.entries(Doc)) if(val == null) throw new Error(`DOMに指定IDの要素が存在しない,または取得できませんでした。<id="${key}"> `);
	Doc.conv!.addEventListener("click", () => {
		const result = xor(Doc.input!.value as string, Doc.key!.value as string);
		Doc.output!.innerHTML = result;
	});
	console.log("DOMContent Loaded.");
});

function xor(input: string, key: string) {
	interface elem { val: string, key: string }
	console.groupCollapsed(`input: {text: ${input}, key: ${key}}`);
	console.log("対応していない文字もしくはスペースが入力されていた場合、keyがそのまま出力されます");
	const pairArr = [...input].reduce((prev: elem[], c, i) => [...prev, {val: c, key: key[i % key.length]}], []);
	const result = pairArr.reduce((prev, c, i) => {
		const cipher = conv.encryption(c.val, c.key);
		console.log(`[${i}] ${c.val},${c.key} => ${cipher}`);

		return prev + cipher;	
	}, '')
	console.groupEnd();
	console.log(`output: ${result}`);
	return result;
}