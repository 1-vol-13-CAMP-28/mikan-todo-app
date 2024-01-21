// pages/api/writeFile.js
import fs from 'fs/promises';
import path from 'path';

// ロック用の変数
let isWriting = false;
export default async function handler(req, res) {
    
try {

    const {furniture} = req.query;
    console.log("sub5: "+furniture);

    switch (furniture){
        case white-cat:
            src =`/furnitures/${furniture}.png`;
    }

    // 書き込むJSONデータ
    const jsonData = { "furnitured": furniture, "src": src };

    if(id === "undefined"){
        res.status(500).json({ error: 'Not Found ID' });
        return;
    }
    
    
    // ファイルのパス
    const filePath = '/public/userfurniture.json';
    // ファイルを非同期で読み込み
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // JSONに変換
    const jsonreadfile = JSON.parse(fileContent);
    // 各オブジェクトのidとstumpを取得して配列にまとめる 今回は、タスクなのでここの変数を増やせばいい（ここの変数はjsondataに依存）
    const UserFurniture = jsonreadfile.map(({ furniture, src }) => ({ furniture, src }));

    //既に同じスタンプがないかの確認
    for(let i=0; i<UserFurniture.length; i++){
        if(UserFurniture[i].furniture == furniture&&UserFurniture[i].src == src){
            res.status(500).json({ message: 'File has already same things',status:409 });
            return;
        }
    }
    // データを配列に追加
    UserFurniture.push(jsonData);
    
    // ロック中の場合は処理を中断
    if (isWriting) {
        res.status(500).json({ message: 'File write in progress, please try again later', status: 419 });
        return;
    }

    // ロックをかける
    isWriting = true;
    console.log("idWriting: "+isWriting);

    // JSONデータを文字列に変換
    //const jsonString = JSON.stringify(jsonData);

    // ファイルに書き込み
    console.log("jsonString: "+UserFurniture);
    await fs.writeFile(filePath, JSON.stringify(UserFurniture,null,UserFurniture.length), 'utf-8');
    // ロック用の変数
    isWriting = false;
    res.status(200).json({ message: 'File written successfully' });


} catch (error) {
    console.error('ファイルの書き込みエラー:', error);
    res.status(500).json({ error: 'Internal Server Error'+ error});
}
}