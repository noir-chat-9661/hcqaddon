(function () {
	const id = "layer" + layercount;
	if (this.addonApp) {
		document.title += "※更新が必要です";
	} else if (!this.addonVersion) {
		if (!$().jquery.startsWith("3.")) {
			const jQuery = document.createElement("script");
			jQuery.src = "https://code.jquery.com/jquery-3.6.0.min.js";
			document.head.appendChild(jQuery);
			const jQueryUI = document.createElement("script");
			jQueryUI.src = "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js";
			document.head.appendChild(jQueryUI);
			const jQueryUICSS = document.createElement("link");
			jQueryUICSS.rel = "stylesheet";
			jQueryUICSS.href = "https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css";
			document.head.appendChild(jQueryUICSS);
			jQueryUI.onload = () => {
				const touchPunch = document.createElement("script")
				touchPunch.src = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"
				document.head.appendChild(touchPunch);
			}
		}
		if (document.getElementsByName("pluginlist").length) return myremove(`#${id}`);
		globalThis.addonWindowId = id;
		$(`#${id} .sourcespace:eq(0)`).html(`
			<h2>使用するアドオンを選択してください。</h2>
			<br />
			<span name="pluginlist">
				<label>
					<input type="checkbox" id="addonload_main" checked disabled />&emsp;メインアドオン
				</label>
				<br />
				<label>
					<input type="checkbox" id="addonload_multilinechat" />&emsp;複数行チャットアドオン
				</label>
				<br />
				<label>
					<input type="checkbox" id="addonload_chatmaxup" />&emsp;チャット表示上限数変更アドオン
				</label>
				<br />
				<label>
					<input type="checkbox" id="addonload_displaystatus" />&emsp;ステータス別枠表示アドオン
				</label>
				<br />
				<label>
					<input type="checkbox" id="addonload_morepresets" />&emsp;拡張プリセットアドオン
				</label>
				<br />
				<label>
					<input type="checkbox" id="addonload_morefilter" />&emsp;拡張フィルターアドオン
				</label>
				<br /><br />
				<hr style="border-color: #32a3c4;" /><br />
				<div style="text-align: center">
					<button onclick="loadAddon()">起動する</button> <button onclick="myremove('#${id}')">キャンセル</button>
				</div>
			</span>`);
		this.loadAddon = async () => {
			this.addonModules = {
				multilinechat: false,
				chatmaxup: false,
				displaystatus: false,
				morepresets: false,
				morefilter: false
			}
			const loadAddons = {
				multilinechat: document.getElementById("addonload_multilinechat").checked,
				chatmaxup: document.getElementById("addonload_chatmaxup").checked,
				displaystatus: document.getElementById("addonload_displaystatus").checked,
				morepresets: document.getElementById("addonload_morepresets").checked,
				morefilter: document.getElementById("addonload_morefilter").checked
			}
			if (loadAddons.multilinechat)
				await fetch("https://addon.pjeita.top/module/multilinechat.js", {cache: "no-store"})
					.then((n) => n.text())
					.then(eval);
			await fetch("https://addon.pjeita.top/module/main.js", {cache: "no-store"})
				.then((n) => n.text())
				.then(eval);
			if (loadAddons.chatmaxup)
				await fetch("https://addon.pjeita.top/module/chatmaxup.js", {cache: "no-store"})
					.then((n) => n.text())
					.then(eval);
			if (loadAddons.displaystatus)
				await fetch("https://addon.pjeita.top/module/displaystatus.js", {cache: "no-store"})
					.then((n) => n.text())
					.then(eval);
			if (loadAddons.morepresets)
				await fetch("https://addon.pjeita.top/module/morepresets.js", {cache: "no-store"})
					.then((n) => n.text())
					.then(eval);
			if (loadAddons.morefilter)
				await fetch("https://addon.pjeita.top/module/morefilter.js", {cache: "no-store"})
					.then((n) => n.text())
					.then(eval);
			delete this.loadAddon;
		};
	} else {
		document.getElementById("addonwindow").style.display = "";
		return (document
			.getElementById(id)
			.getElementsByClassName("sourcespace")[0].innerHTML =
			"すでに起動済です。");
	}
}).call();
