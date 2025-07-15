(async function () {
	addonModules.morefilter = true;

	let itemFilterShow = true;

	this.itemFilterState = (state = !itemFilterShow) => {
		itemFilterShow = state;
		$("#itemfiltermenu")[state ? "show" : "hide"]();
	};

	this.ItemLayer = () => {
		if ($("#itemwindow").length) return LayerActive($("#itemwindow"));
		let tag =
			'<p style="font-size:75%;color:#666;">3DSではタグ機能が使えません</p>';
		if (!dsflg) {
			tag = '<select id="itemtag_select" onchange="ItemTagSelect(this)">';
			for (var i = 0; i < item_tag.length; i++)
				tag +=
					"<option value=" +
					i +
					">" +
					item_tag[i].name +
					"</option>";
			tag +=
				'</select><button onclick="ItemTagEdit(this.parentNode.parentNode);">タグ名変更</button>';
		}
		const options = `
			<option value="all"${filterOption.op == "all" ? " selected" : ""}>全て</option>
			<option value="0"${filterOption.op == 0 ? " selected" : ""}>なし</option>
			<option value="1"${filterOption.op == 1 ? " selected" : ""}>攻撃</option>
			<option value="6"${filterOption.op == 6 ? " selected" : ""}>防御</option>
			<option value="11"${filterOption.op == 11 ? " selected" : ""}>技術</option>
			<option value="16"${filterOption.op == 16 ? " selected" : ""}>最大SP</option>
			<option value="21"${filterOption.op == 21 ? " selected" : ""}>TP獲得</option>
			<option value="30"${filterOption.op == 30 ? " selected" : ""}>物理攻撃</option>
			<option value="35"${filterOption.op == 35 ? " selected" : ""}>魔法攻撃</option>
			<option value="40"${filterOption.op == 40 ? " selected" : ""}>物理抵抗</option>
			<option value="45"${filterOption.op == 45 ? " selected" : ""}>魔法抵抗</option>
			<option value="50"${filterOption.op == 50 ? " selected" : ""}>薬学</option>
			<option value="55"${filterOption.op == 55 ? " selected" : ""}>攻撃速度</option>
			<option value="60"${filterOption.op == 60 ? " selected" : ""}>移動</option>`
		$("#layerroot").append(
			`<div class="layer" id="itemwindow">
				<style>
					#itemfiltermenu input[type=number]{
						width: 50px;
					}
					#itemfiltermenu label.radiobtn {
						width: 75px;
						background-color: #aaaaaa;
						display: inline-block;
						margin: 3px 0;
						padding: 3px;
						border: 1px solid #000000;
						text-align: center;
						cursor: pointer;
						margin-right: -1px;
					}
					#itemfiltermenu label.radiobtn:has(input:checked) {
						background-color: #ffff99;
					}
					#itemfiltermenu label.radiobtn input[type=radio] {
						display: none;
					}
					#itemfiltermenu label img {
						height: 15px;
						vertical-align: middle;
					}
				</style>
				<div class="itemwindow_weaponbtn" onclick="myclose(this.parentNode,'#sozaigamen');myopen(this.parentNode,'#weapongamen');">装備品</div>
				<div class="itemwindow_sozaibtn" onclick="myclose(this.parentNode,'#weapongamen');myopen(this.parentNode,'#sozaigamen');myclose(this.parentNode,'.sozaiul_toggle');myclose(this.parentNode,'.sozaiul_selldiv');myopen(this.parentNode,'.sozaiul_sellbtn');">素材</div>
				<div class="clear"></div>
				<div id="weapongamen">
					<span id="weaponcountspan">${weaponcount}</span>／<small id="weaponcapaspan">${weaponcapa}</small>
					<div>
						<div class="sw1">${tag}</div>
						<div class="sw2">
							<input type="text" id="itemtag_input"><input type="hidden" id="itemtag_bangou" value=0>
							<button onclick="ItemTagEdited()">変更する</button>
							<button onclick="swtoggle(this.parentNode.parentNode,1);">取消</button>
						</div>
					</div>
					<button onclick="ItemSort(0);">ソート</button>
					<button onclick="ItemSort(1);">スロット1</button>
					<button onclick="ItemSort(2);">スロット2</button>
					<button onclick="ItemSort(3);">スロット3</button>
					<a href="javascript:void(0)" style="text-decoration:none; margin:0 5px;" onclick="itemFilterState();">
						<img src="https://addon.pjeita.top/files/filter.png" style="height: 20px" />
					</a>
					<a href="javascript:void(0);" class="itemui_bunkaibtns" onclick="CheckBunkaiAll();">全て分解</a>
					<div id="itemfiltermenu" style="margin: 5px;${itemFilterShow ? "" : "display:none"}">
						<h1>アイテムフィルター</h1>
						<div id="itemfilter_type">
							種類：
							<label class="radiobtn"><input type="radio" name="itemfilter_type" value="0"${item_hyouzi == 0 ? " checked" : ""} />全て</label><label class="radiobtn"><input type="radio" name="itemfilter_type" value="1"${item_hyouzi == 1 ? " checked" : ""} />武器</label><label class="radiobtn"><input type="radio" name="itemfilter_type" value="2"${item_hyouzi == 2 ? " checked" : ""} />護石</label>
						</div>
						<div id="itemfilter_rental">
							レンタル：
							<label class="radiobtn"><input type="radio" name="itemfilter_rental" value="all"${filterOption.rental == "all" ? " checked" : ""} />全て</label><label class="radiobtn"><input type="radio" name="itemfilter_rental" value="yes"${filterOption.rental == "yes" ? " checked" : ""} />⭕️</label><label class="radiobtn"><input type="radio" name="itemfilter_rental" value="no"${filterOption.rental == "no" ? " checked" : ""} />❌️</label>
						</div>
						<div id="itemfilter_range">
							<label>
								鍛冶：
								<input type="number" id="itemfilter_range_min" value="0" min="0" max="99" value="${filterOption.range_min}" /> 〜 <input type="number" id="itemfilter_range_max" value="99" min="0" max="99" value="${filterOption.range_max}" />
							</label>
						</div>
						<div id="itemfilter_star">
							お気に入り：
							<label class="radiobtn"><input type="radio" name="itemfilter_star" value="all" ${filterOption.star == "all" ? " checked" : ""} />全て</label><label class="radiobtn"><input type="radio" name="itemfilter_star" value="yes"${filterOption.star == "yes" ? " checked" : ""} /><img src="picts/okini1.png" /></label><label class="radiobtn"><input type="radio" name="itemfilter_star" value="no" ${filterOption.star == "no" ? " checked" : ""} /><img src="picts/okini0.png" /></label>
						</div>
						<div id="itemfilter_name">
							武器種：
							<select id="itemfilter_weaponname">
								<option value="all"${filterOption.name == "all" ? " selected" : ""}>全て</option>
								<option value="102"${filterOption.name == 101 ? " selected" : ""}>木の剣</option>
								<option value="102"${filterOption.name == 102 ? " selected" : ""}>木の斧</option>
								<option value="103"${filterOption.name == 103 ? " selected" : ""}>木の杖</option>
								<option value="107"${filterOption.name == 107 ? " selected" : ""}>革の手甲</option>
								<option value="104"${filterOption.name == 104 ? " selected" : ""}>鉄の剣</option>
								<option value="105"${filterOption.name == 105 ? " selected" : ""}>鉄の斧</option>
								<option value="108"${filterOption.name == 108 ? " selected" : ""}>鉄の手甲</option>
								<option value="106"${filterOption.name == 106 ? " selected" : ""}>鉄の杖</option>
								<option value="116"${filterOption.name == 116 ? " selected" : ""}>鋼の剣</option>
								<option value="123"${filterOption.name == 123 ? " selected" : ""}>鋼の斧</option>
								<option value="109"${filterOption.name == 109 ? " selected" : ""}>鋼の手甲</option>
								<option value="130"${filterOption.name == 130 ? " selected" : ""}>鋼の杖</option>
								<option value="117"${filterOption.name == 117 ? " selected" : ""}>アルミの剣</option>
								<option value="124"${filterOption.name == 124 ? " selected" : ""}>アルミの斧</option>
								<option value="110"${filterOption.name == 110 ? " selected" : ""}>アルミの手甲</option>
								<option value="131"${filterOption.name == 131 ? " selected" : ""}>アルミの杖</option>
								<option value="118"${filterOption.name == 118 ? " selected" : ""}>銀の剣</option>
								<option value="125"${filterOption.name == 125 ? " selected" : ""}>銀の斧</option>
								<option value="111"${filterOption.name == 111 ? " selected" : ""}>銀の手甲</option>
								<option value="132"${filterOption.name == 132 ? " selected" : ""}>銀の杖</option>
								<option value="119"${filterOption.name == 119 ? " selected" : ""}>金の剣</option>
								<option value="126"${filterOption.name == 126 ? " selected" : ""}>金の斧</option>
								<option value="112"${filterOption.name == 112 ? " selected" : ""}>金の手甲</option>
								<option value="133"${filterOption.name == 133 ? " selected" : ""}>金の杖</option>
								<option value="120"${filterOption.name == 120 ? " selected" : ""}>プラチナの剣</option>
								<option value="127"${filterOption.name == 127 ? " selected" : ""}>プラチナの斧</option>
								<option value="113"${filterOption.name == 113 ? " selected" : ""}>プラチナの手甲</option>
								<option value="134"${filterOption.name == 134 ? " selected" : ""}>プラチナの杖</option>
								<option value="121"${filterOption.name == 121 ? " selected" : ""}>ダイヤモンド剣</option>
								<option value="128"${filterOption.name == 128 ? " selected" : ""}>ダイヤモンド斧</option>
								<option value="114"${filterOption.name == 114 ? " selected" : ""}>ダイヤモンド手甲</option>
								<option value="135"${filterOption.name == 135 ? " selected" : ""}>ダイヤモンド杖</option>
								<option value="122"${filterOption.name == 122 ? " selected" : ""}>伝説の剣</option>
								<option value="129"${filterOption.name == 129 ? " selected" : ""}>伝説の斧</option>
								<option value="115"${filterOption.name == 115 ? " selected" : ""}>伝説の手甲</option>
								<option value="136"${filterOption.name == 136 ? " selected" : ""}>伝説の杖</option>
								<option value="138"${filterOption.name == 138 ? " selected" : ""}>御神木の剣</option>
								<option value="137"${filterOption.name == 137 ? " selected" : ""}>最強の剣</option>
								<option value="1000"${filterOption.name == 1000 ? " selected" : ""}>冒険家セット</option>
								<option value="1002"${filterOption.name == 1002 ? " selected" : ""}>勇者の剣</option>
								<option value="1003"${filterOption.name == 1003 ? " selected" : ""}>魔法の本</option>
								<option value="1009"${filterOption.name == 1009 ? " selected" : ""}>ペットフード</option>
								<option value="1004"${filterOption.name == 1004 ? " selected" : ""}>エアエンジン</option>
								<option value="1005"${filterOption.name == 1005 ? " selected" : ""}>古代神の魔石</option>
								<option value="1007"${filterOption.name == 1007 ? " selected" : ""}>家宝の手裏剣</option>
								<option value="1006"${filterOption.name == 1006 ? " selected" : ""}>天照の後光</option>
								<option value="1008"${filterOption.name == 1008 ? " selected" : ""}>フローラルオーブ</option>
							</select>
						</div>
						<div>
							オプション：
							<select id="itemfilter_op1">${options}</select><select id="itemfilter_op2">${options}</select><select id="itemfilter_op3">${options}</select>
						</div>				
						<br />
						<button onclick="applyItemFilter()">適用</button>
						<button onclick="resetItemFilter()">リセット</button>
						<button onclick="itemFilterState(0)">閉じる</button>
					</div>
					<div id="weaponbox">取得中...</div>
				</div>
				<div id="sozaigamen" style="display:none">
					<div id="sozaibox"></div>
				</div>
				<button class="layerclosebtn" onclick="myremove(this.parentNode)">×</button>
			</div>`
		)
		$("#itemfilter_type input[type=radio]")
			.on("change", (e) => {
				$("#itemfilter_range")[e.target.value == 2 ? "hide" : "show"]();
				$("#itemfilter_name")[e.target.value == 2 ? "hide" : "show"]();
			});
		$("#itemwindow").find('input[name="itemhyouzi"]').val(item_hyouzi)
		$("#itemtag_select").val(item_nowtag)
		ItemHtml(0);
	}

	this.resetItemFilter = () => {
		item_hyouzi = 0;
		$("#itemfiltermenu input[type=radio]").prop("checked", false);
		$("#itemfilter_type input[type=radio][value=0]").prop("checked", true);
		$("#itemfilter_rental input[type=radio][value=all]").prop("checked", true);
		$("#itemfilter_range_min").val(0);
		$("#itemfilter_range_max").val(99);
		$("#itemfilter_star input[type=radio][value=all]").prop("checked", true);
		$("#itemfilter_weaponname").val("all");
		$("#itemfilter_op1").val("all");
		$("#itemfilter_op2").val("all");
		$("#itemfilter_op3").val("all");
		ItemHtml(0, {rental: "all", range_min: 0, range_max: 99, star: "all", name: "all", op: "all"});
	};

	this.applyItemFilter = () => {
		item_hyouzi = parseInt($("#itemfilter_type input[type=radio]:checked").val());
		const rental = $("#itemfilter_rental input[type=radio]:checked").val();
		if (($("#itemfilter_range_min").val() ?? -1) < 0) $("#itemfilter_range_min").val(0);
		if (($("#itemfilter_range_max").val() ?? 100) > 99) $("#itemfilter_range_min").val(99);
		const range_min = parseInt($("#itemfilter_range_min").val());
		const range_max = parseInt($("#itemfilter_range_max").val());
		const star = $("#itemfilter_star input[type=radio]:checked").val();
		const name = $("#itemfilter_weaponname").val();
		const op1 = $("#itemfilter_op1").val();
		const op2 = $("#itemfilter_op2").val();
		const op3 = $("#itemfilter_op3").val();
		ItemHtml(0, {rental, range_min, range_max, star, name, op1, op2, op3});
	};
})()
