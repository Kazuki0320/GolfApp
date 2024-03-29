# 【ゴルフ日程調整アプリ⛳️】
*※作成途中での記載になりますのでご了承ください。*

*アンケート作成（メイン機能）*
 - アンケートを作成することで、各ユーザーに対して一斉送信できる。
 ※10MB以上の動画を記載することができなかったので、分割してあります。他動画は、スクロールで確認お願いします。

 
https://user-images.githubusercontent.com/107445735/216827294-a96d5751-35a9-4dc6-a3ff-bd6ca713873b.mov

## サービス概要
ゴルフの日程を決める際、主催者側の候補日をメンバーとなるユーザーに送信することで、LINEなどのやりとりを減らし、参加可否を回答するだけで、グループまで作成されチャットでのやり取りまでスムーズに行えるサービスです。

## 使用技術

<フロント>
- HTML/CSS/JavaScript(ES6)
- Vue:2.6.14
- Vuetify:2.6.0
- Vuex:3.6.2
- Vue-router:3.5.1
- 画面設計:Figma

<バックエンド>
- firebase:8.10.1
- firestore
- firebaseauth

<その他>
- エディタ:VScode
- OS:MacOS
- フォーマッターなど:/eslint/prettier
- 他ツール:vuedevtools/GitHub

## 工夫した点
 - チーム開発
 - DB設計
 - アンケート作成のフロー

## デモ動画※各機能毎
*チャット画面*
 - チャットに招待されているメンバーとチャットすることができます。 
 ※メールアドレスなどはテストアドレスになります。

https://user-images.githubusercontent.com/107445735/218771343-51245a0b-2a08-430f-a1b3-20aa6ae83b93.mov


*フレンド一覧＆フレンド検索*
 - フレンドのプロフィールを拝見でき、フレンドの追加も可能。

https://user-images.githubusercontent.com/107445735/218771398-d4fcf8f9-9cc1-43a9-b8d2-a2b900cb5534.mov


*アンケート回答*
 - アンケートに対して、参加可否を回答。

https://user-images.githubusercontent.com/107445735/216828694-b794e853-add6-45e3-8825-d08d495b1bcc.mov

*アンケート結果*
 - アンケート結果を集計。
 - アンケート結果に基づき、グループを作成することができる。
 
 https://user-images.githubusercontent.com/107445735/216828552-77fa6047-7464-4bad-852d-1d7deb1d7aa9.mov
 

## 実装した機能
1.ログイン機能
 - 新規登録
 - ログイン
 - ログアウト

2.チャットルームの作成機能
 
3.フレンド機能
 - メールアドレス検索
 - フレンド追加
 - フレンド表示
 
5.マイページ機能
 - マイページ表示
 - マイページ編集
 
6.アンケート機能
 - アンケート作成
 - アンケート回答
 - アンケート集計

## 開発の進め方
独学で開発を進めながらもメンターが１人、1月からチーム開発協力のためにコントリビューターが１名助っ人として開発に参加。
11月終わり頃から開発を本格的に開始。Figmaで、画面設計を行い、DBの設計も行なった。DBについては、理解が難しく、メンターからのアドバイスを頼りに作成。
1月からのチーム開発については、開発効率を上げる<チーム開発の経験を積むことを目的として友人が協力をしてくれた。
画面毎に実装が完了したタイミングで、PRを上げてエラーや修正箇所、他検討事項などを話し合いながら開発を進めていた。

## サービスを作成した背景
サービスを作成した背景としては、ゴルフ当日までに調整や確認することの手間の多さを感じたことがきっかけです。ゴルフは他のスポーツとは異なり、気軽に行ける場所にあるわけではないので、事前に車の手配やゴルフ場の手配が必要です。また、土日となると3B（3人）以上でないと割増料金が取られるorプレイ自体ができないなど、そもそもその日に行ける人を探す手間もあります。社会人にとって、貴重な土日休みをほぼ1日使うわけですから、当然日程も合わせづらかったりもします。ゴルフを確定するまでに不確定要素が多い中、友達1人1人にLINEなどで声をかける時間が本当にもったいないと思いました。その中で、思いついたのが今回のサービスになります。
このサービスでは、アンケートを主催者側が作成し、候補日や都道府県、金額からキャディの有無まで事前に決めなければいけない内容を一括して、メンバー側へ送ることで、主催者側のコミュニケーションコストを削減することを目的としたサービスになります。

## 今後の予定
- 削除機能追加
- UI/UXへの着手
- ER図作成
他、細かい部分についての修正
