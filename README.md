# mikan-todo-app

**未完**を食べるToDoアプリ。

## 開発環境
- node ``20.11.0``
- next ``14.0.4``
  - tsじゃなくてjavascriptです

## 実行

```bash
npm run dev
```

して [http://localhost:3000](http://localhost:3000) を開くと実行されます

## ブランチの命名規則

基本的には、
```text
大ジャンル/実装する機能名/YYYYMMDD
```
で作成するといいと思っています; issue 立てるので話し合おう

### 機能追加: feature

```text
feature/機能名/YYYYMMDD
```

機能名の例:
- todo関連のコンポーネントを追加したなら ``add_todo_component``
- 未完に物理演算を適用したなら ``mikan_physics``

### 機能の変更: enhancement

```text
enhancement/機能名/YYYYMMDD
```

> [!IMPORTANT]
> feature の機能名と必ずしも一致する必要はありません。

機能名の例:
- 物理演算を効率化したなら ``optimize_physics``
- todoを保存する機能の誤りを修正したなら ``fix_todo_saving``

### バグの修正: bugfix

特定の機能について修正を行うとき
```text
bugfix/修正した機能名/YYYYMMDD
```

issue に対して修正を行うとき
```text
bugfix/#xxx_機能名/YYYYMMDD
```
- ``xxx`` はissueの番号にしてね

例:
- 未完がすり抜けるバグ、衝突検知の修正なら ``bugfix/fix_mikan_collision/YYYYMMDD``
- issue #82 の修正なら ``bugfix/#82/YYYYMMDD``
- 「未完のサイズが大きすぎる」とかいう issue #83 の修正なら ``bugfix/#83_fix_mikan_size/YYYYMMDD``

