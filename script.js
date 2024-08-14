// 料理リストを格納するオブジェクト
let dishes = {
    'L': [], // ランチ用の料理リスト
    'D': []  // ディナー用の料理リスト
};

// dishes.csvファイルを読み込む関数
function loadDishes() {
    fetch('dishes.csv')  // fetch APIを使って外部のCSVファイルを読み込む
        .then(response => response.text())  // ファイルをテキスト形式で取得
        .then(data => {
            // 取得したデータを行ごとに分割
            const lines = data.split('\n');
            // 各行を処理
            lines.forEach(line => {
                // 各行をカンマで分割して、最初の部分をmealType（LまたはD）とする
                const parts = line.split(',');
                const mealType = parts[0];
                // 残りの部分を料理名として取得
                const dishName = parts.slice(1).join(',').trim();
                // mealTypeがLまたはDであれば、対応するリストに料理名を追加
                if (mealType === 'L' || mealType === 'D') {
                    dishes[mealType].push(dishName);
                }
            });
        })
        .catch(error => console.error('Error loading dishes:', error)); // エラーハンドリング
}

// ユーザーがボタンをクリックした際にランダムで料理を選ぶ関数
function selectRandomDish(mealType) {
    const selectedDishes = dishes[mealType]; // mealTypeに対応する料理リストを取得
    // 料理リストが空でない場合
    if (selectedDishes.length > 0) {
        // リストからランダムで1つの料理を選択
        const randomDish = selectedDishes[Math.floor(Math.random() * selectedDishes.length)];
        // 選択された料理を結果表示部分に表示
        document.getElementById('result').textContent = randomDish;
    } else {
        // 料理リストがロードされていない場合のメッセージ
        document.getElementById('result').textContent = '料理リストがロードされていません。';
    }
}

// ページが読み込まれたときに料理リストを読み込む
window.onload = loadDishes;
