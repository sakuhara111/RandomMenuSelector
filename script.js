/*
loadDishes関数:

line.split(',')でCSVの各行をカンマで分割し、1列目をmealType、2列目をdishName、3列目をdishURLとして取得します。
dishes[mealType].push({ name: dishName, url: dishURL });で、料理名とURLをオブジェクトとしてランチまたはディナーリストに追加します。
selectRandomDish関数:

selectedDishes[Math.floor(Math.random() * selectedDishes.length)]でランダムに料理を選択し、randomDishに格納します。
document.getElementById('result').innerHTMLで、選択された料理名をハイパーリンクとして表示します。このハイパーリンクは、クリックすると新しいタブで指定されたURLを開くように設定されています（target="_blank"）。
*/
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
                // 2列目は料理名、3列目はURLとして取得
                const dishName = parts[1].trim();
                const dishURL = parts[2].trim();
                // mealTypeがLまたはDであれば、対応するリストに料理名とURLをオブジェクトとして追加
                if (mealType === 'L' || mealType === 'D') {
                    dishes[mealType].push({ name: dishName, url: dishURL });
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
        // 選択された料理をハイパーリンクとして結果表示部分に表示
        document.getElementById('result').innerHTML = `<a href="${randomDish.url}" target="_blank">${randomDish.name}</a>`;
    } else {
        // 料理リストがロードされていない場合のメッセージ
        document.getElementById('result').textContent = '料理リストがロードされていません。';
    }
}

// ページが読み込まれたときに料理リストを読み込む
window.onload = loadDishes;
