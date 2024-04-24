/**
 * SelectStringModalの props
 *
 * @export
 * @typedef {SelectStringModalProps}
 */

export type SelectStringModalProps = {
  candidates: Array<string>; // 選択肢として表示する文字列の配列

  onSelect: (selectedKey: string) => void; // 選択肢がひとつ選択されたときに呼ばれるコールバック関数 (引数: 選択された文字列) 
  onDismiss: () => void; // 選択肢を選ばずにモーダルを閉じたときに呼ばれるコールバック関数

  useFirstLetterAsIcon?: boolean; // 選択肢の先頭文字をアイコンとして表示する (onSelect のコールバック関数に渡される引数は変えない)
};
