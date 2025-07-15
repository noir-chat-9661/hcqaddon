import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

function App() {
	const [curerntTab, setCurrentTab] = useState("content");
	const [copied, setCopied] = useState(0);
	const [count, setCount] = useState(0);
	const [link, setLink] = useState("");
	const [description, setDescription] = useState("");
	const [isPC, setIsPC] = useState(false);

	useEffect(() => {
		const setLinks = async () => {
			const data = await fetch("https://api.github.com/repos/noir-chat-9661/himaque-application/releases/latest").then(res => res.json());

			const userAgent = window.navigator.userAgent;
			const platform = window.navigator.platform;

			if (userAgent.includes('Win') || platform.includes('Win')) {
				setIsPC(true);
				setLink(data.assets.find(asset => asset.name.match(/\.exe$/)).browser_download_url);
				setDescription("Windows 10/11 64bit");
			} else if (userAgent.includes('Mac') || platform.includes('Mac')) {
				setIsPC(true);
				setLink(data.assets.find(asset => asset.name.match(/\.dmg$/)).browser_download_url);
				setDescription("macOS 10.15 Catalina 以降");
			} else if (userAgent.includes('Linux') || platform.includes('Linux')) {
				setIsPC(true);
				setLink(data.assets.find(asset => asset.name.match(/\.AppImage$/)).browser_download_url);
				setDescription("Linux 64bit");
			};
		};
		setLinks();
	}, []);

	return (
		<div className="flex items-center justify-center h-screen bg-cyan-600">
			<h1 className="absolute top-4 text-3xl font-bold text-white">
				ヒマクエ アドオンページ
			</h1>
			<Tabs defaultValue="content" className="absolute top-20" onValueChange={setCurrentTab}>
				<TabsList className="bg-blue-100">
					<TabsTrigger className="m-2" value="content">主要機能</TabsTrigger>
					<TabsTrigger className="m-2" value="install">導入方法</TabsTrigger>
				</TabsList>
			</Tabs>
			{
				curerntTab === "content"
				? (
					<Card className="absolute top-35 w-7/8 bg-blue-50 shadow-lg">
						<CardHeader className="text-center">
							<h2 className="text-2xl font-bold">主要機能</h2>
						</CardHeader>
						<CardContent className="space-y-4 p-3">
							<p className="text-center text-gray-700">ステータス関連(ステ振り・鍛冶)の最適化</p>
							<p className="text-center text-gray-700">冒険エリア・帰宅画面のアイテム表示強化(資材順並び替え等)</p>
							<p className="text-center text-gray-700">武具合成の機能改善(装備済みやお気に入りの解除機能)</p>
							<p className="text-center text-gray-700">奥義のプリセット機能(※拡張)</p>
							<p className="text-center text-gray-700">アイテムのフィルター機能(※拡張)</p>
							<p className="text-center text-gray-700">ヒマクエ上の軽微な不具合の対応</p>
						</CardContent>
					</Card>
				)
				: curerntTab === "install"
				? (
					<Card className="absolute top-35 w-7/8 bg-blue-50 shadow-lg">
						<CardHeader className="text-center">
							<h2 className="text-2xl font-bold">導入方法</h2>
						</CardHeader>
						<CardContent className="space-y-4 p-3 text-center">
							<h2 className="text-xl font-bold">Chrome等で使用する場合</h2>
							<p className="text-gray-700">1. 以下のボタンからブックマークレットをコピーして登録してください。</p>
							<Button
								className={"w-30" + (copied ? " bg-green-500 hover:bg-green-600" : " bg-blue-500 hover:bg-blue-600")}
								onClick={() => {
									navigator.clipboard.writeText(
										`javascript:(()=>{if (document.getElementById('addonwindow')?.innerHTML) return;if(this.LoadedAddonPage)return $().append(2);layercount++;$("#layerroot").append(%60<div class='layer' id='layer\${layercount}'><h2 class='sourcespace'>読み込み中</h2><button class='layerclosebtn' id='addonwindow' style='display:none' onclick='myremove(this.parentNode)'>×</button></div>%60);fetch("https://addon.pjeita.top/code.js",{cache:'no-store'}).then(n=>n.text()).then(n=>eval(n))})()`
									);
									setTimeout(() => {
										if (copied != count) return;
										setCopied(0)
									}, 2500)
									setCopied(count + 1);
									setCount(count + 1);
								}}
							>
								{copied ? "✔ コピー" : "📎 コピー"}
							</Button>
							<p className="text-gray-700">2. ヒマクエのページを開き、登録したブックマークレットを実行してください。</p>
							{
								isPC
									? <>
										<Separator className="my-4 bg-blue-200" />
										<h2 className="text-xl font-bold">専用ブラウザを使用する場合</h2>
										<p className="text-gray-700">以下のリンクから専用ブラウザをダウンロードしてください。</p>
										<Button
											className="w-30 bg-blue-500 hover:bg-blue-600 m-1"
											onClick={() => {
												window.open(link, "_blank");
											}}
										>
											📥 ダウンロード
										</Button>
										<p className="text-s text-gray-500">{description}</p>
									</>
									: <></>
							}
						</CardContent>
					</Card>
				) : (<></>)
			}
		</div>
	)
}

export default App;
