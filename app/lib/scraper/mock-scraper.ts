/**
 * このファイルは、実際のスクレイピング処理を模倣するためのモック実装です。
 * ネットワーク遅延をシミュレートし、固定のデータを返すことで、フロントエンドの開発やテストを容易にします。
 * 将来的には、実際のスクレイピングロジックをこの関数に実装することができます。
 */

export interface ScrapedResult {
  title: string;
  url: string;
  imageUrl: string;
  price?: string;
  address?: string;
  layout?: string;
}

export async function scrapeMockUrl(url: string): Promise<ScrapedResult> {
  // 疑似的なネットワーク遅延
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    title: "【モックデータ】理想の1LDKリノベ物件",
    url: url,
    imageUrl: "https://images.unsplash.com/photo-1545464693-f1798a373343?q=80&w=600", // ダミーの間取り/部屋画像
    price: "12.5万円",
    address: "東京都杉並区高円寺",
    layout: "1LDK (45㎡)",
  };
}