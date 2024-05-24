import { ReactNode } from "react";
import { DropDownModal } from "./DropDownModal";
import "./selectStringModal.css";
import PropTypes from 'prop-types';
import { SelectStringModalProps } from "../app/types/SelectStringModalProps";

/**
 * DropDownModalに渡しやすいように、文字列の選択肢を表現するノードを作成します
 * この返り値を DropDownModal.candidates の値に渡せばよいです
 * 
 * @export
 * @param {string} value 選択肢とする文字列
 * @param {?string} [iconLetter] アイコンとして使いたい文字 (1文字を推奨)
 * @returns {ReactNode} モーダルに渡せるように加工されたノード
 */
export function GetStringModalElement(value: string, iconLetter?: string): ReactNode {
  return <p className="SelectStringModalWrapper">
    {iconLetter ? <span className="DropDownIcon DropDownIconText">{iconLetter}</span> : null}
    <span className="SelectStringModalText">{value}</span>
  </p>
}

/**
 * 文字列を選択できるモーダル
 *
 * @param {SelectStringModalProps} param0 この props
 * @param {Array<string>} param0.candidates 選択肢(文字列のみ)
 * @param {(selectedKey: string) => void} param0.onSelect 選択されたときのコールバック関数、選ばれた選択肢をそのまま受け取る
 * @param {() => void} param0.onDismiss 選択されなかったときのコールバック関数
 * @param {boolean} param0.useFirstLetterAsIcon 選択肢の先頭文字をアイコンとして表示するかどうか
 * @returns {React.JSX.Element}
 */
export const SelectStringModal = ({ candidates, onSelect, onDismiss, useFirstLetterAsIcon }: SelectStringModalProps): React.JSX.Element => {
  const getClickHandler = (selectedKey: string): void => {
    onSelect(selectedKey);
  }

  const candidateMap = new Map<KeyType, ReactNode>(
    candidates.map((value) => {
      if (useFirstLetterAsIcon) {
        // Unicode のサロゲートペアを考慮して、1文字目だけを取り出す
        var splitValue = Array.from(value);
        var iconLetter = splitValue.shift();
        var displayName = splitValue.join("");
        return [value, GetStringModalElement(displayName, iconLetter)] as [KeyType, ReactNode];
      } else {
        return [value, GetStringModalElement(value)] as [KeyType, ReactNode];
      }
    })
  );

  return (
    <DropDownModal
      candidates={candidateMap}
      onSelect={(key: string) => getClickHandler(key)}
      onDismiss={onDismiss}
    />
  );
}

SelectStringModal.PropTypes = {
  /**
   * 選択肢(文字列のみ)
   * */
  candidates: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * 選択されたときのコールバック関数、選ばれた選択肢をそのまま受け取る
   * */
  onSelect: PropTypes.func.isRequired,
  /**
   * 選択されなかったときのコールバック関数
   * */
  onDismiss: PropTypes.func.isRequired,
  /**
   * 選択肢の先頭文字をアイコンとして表示するかどうか
   * */
  useFirstLetterAsIcon: PropTypes.bool
}