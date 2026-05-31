import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('シードデータの投入を開始します...');

  // 1. テストユーザーの作成
  const user1 = await prisma.user.upsert({
    where: { email: 'test.user1@example.com' },
    update: {}, // 既に存在する場合は更新しない
    create: {
      email: 'test.user1@example.com',
      name: '山田 太郎',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test.user2@example.com' },
    update: {},
    create: {
      email: 'test.user2@example.com',
      name: '佐藤 次郎',
    },
  });

  // 2. リスティング（物件・商品など）データの作成
  // user1 に紐づくデータ
  await prisma.listing.upsert({
    where: { url: 'https://example.com/listing/1' },
    update: {},
    create: {
      title: '駅近 1K デザイナーズマンション',
      url: 'https://example.com/listing/1',
      imageUrl: 'https://example.com/images/room1.jpg',
      memo: '日当たり良好、家賃手頃で要検討。',
      source: '不動産ナビ',
      layout: '1K',
      price: '75,000円',
      address: '東京都渋谷区...',
      memberId: user1.id, // 山田太郎に紐付け
    },
  });

  // user2 に紐づくデータ
  await prisma.listing.upsert({
    where: { url: 'https://example.com/listing/2' },
    update: {},
    create: {
      title: '格安 2LDK ファミリー物件',
      url: 'https://example.com/listing/2',
      imageUrl: 'https://example.com/images/room2.jpg',
      memo: '駅から少し遠いが広い。',
      source: '街の不動産屋',
      layout: '2LDK',
      price: '120,000円',
      address: '神奈川県横浜市...',
      memberId: user2.id, // 佐藤次郎に紐付け
    },
  });

  // 誰にも紐づいていないデータ（memberId はオプショナルなので nullable）
  await prisma.listing.upsert({
    where: { url: 'https://example.com/listing/3' },
    update: {},
    create: {
      title: '気になる未割り当ての物件',
      url: 'https://example.com/listing/3',
      price: '90,000円',
      // memberId を指定しない
    },
  });

  console.log('シードデータの投入が完了しました！');
}

main()
  .catch((e) => {
    console.error('シードデータの投入中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });