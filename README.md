概要
dishes.csvファイルからランチとディナーの料理リストを読み込み、ユーザーがランチまたはディナーを選択したときに、対応するリストからランダムに料理を選択して表示

全体の流れ
ページが読み込まれると、window.onloadイベントがトリガーされ、loadDishes関数が実行されます。これにより、dishes.txtファイルから料理リストが読み込まれ、dishesオブジェクトに格納されます。

ユーザーがボタンをクリックすると、selectRandomDish関数が実行され、対応する料理リスト（ランチまたはディナー）からランダムに料理が選ばれます。

選ばれた料理が、#result要素に表示され、ユーザーに結果がフィードバックされます。

ファイル構成
最終的なファイル構成は以下のようになります。
/project-folder/
  ├── index.html
  ├── script.js
  └── dishes.csv
