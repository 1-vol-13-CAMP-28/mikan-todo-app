import { ReactNode } from "react";

/**
 * DropDownModal の props
 *
 * @export
 * @typedef {DropDownModalProps}
 * @template KeyType
 */

export type DropDownModalProps<KeyType> = {
  /**
   * 選択肢(キーとNodeのペア, キーは onSelect に渡される)
   */
  candidates: Map<KeyType, ReactNode>;

  /**
   * 選択肢がひとつ選択されたときに Key を受け取るコールバック関数
   */
  onSelect: (selectedKey: KeyType) => void;
  /**
   * 選択されなかったときのコールバック関数
   */
  onDismiss: () => void;
};
