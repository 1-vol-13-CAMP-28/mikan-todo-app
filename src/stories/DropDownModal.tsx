import { ReactNode, useState } from "react"
import "./dropDownModal.css";
import PropTypes from 'prop-types';

/**
 * DropDownModal の props
 *
 * @export
 * @typedef {DropDownModalProps}
 * @template KeyType
 */
export type DropDownModalProps<KeyType> = {
  candidates: Map<KeyType, ReactNode>

  onSelect: (selectedKey: KeyType) => void;
  onDismiss: () => void;
}

/**
 * 複数の選択肢を提示してそれらからひとつ選択させるモーダル
 * 選択肢が選ばれる、あるいは dismiss されると非表示になるが、この要素自体が消えるわけではないので注意
 *
 * @param {DropDownModalProps<KeyType>} param0 この props
 * @param {Map<KeyType, ReactNode>} param0.candidates 選択肢(キーとNodeのペア, キーは onSelect に渡される)
 * @param {(selectedKey: KeyType) => void} param0.onSelect 選択肢がひとつ選択されたときに Key を受け取るコールバック関数
 * @param {() => void} param0.onDismiss 選択されなかったときのコールバック関数
 * @returns {React.JSX.Element}
 */
export const DropDownModal = ({ candidates, onSelect, onDismiss }: DropDownModalProps<KeyType>): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const getClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedKey: any): void => {
    e.stopPropagation();
    onSelect(selectedKey);
  }

  const handleDismiss = () => {
    onDismiss();
    setIsOpen(false);

    console.info("bye!");
  }

  return isOpen ?
    <>
      <button className="DismissModal" onClick={handleDismiss} />
      <ol className="DropDownModal">
        {
          Array.from(candidates.entries()).map(([key, value]) => {
            return <button key={key} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => getClickHandler(event, key)} className="DropDownCandidate">
              <li>{value}</li>
            </button>
          })
        }
      </ol>
    </>
    : <></>
}

DropDownModal.propTypes = {
  /**
   * 選択肢(キーとNodeのペア, キーは onSelect に渡される)
   * */
  candidates: PropTypes.instanceOf(Map<KeyType, ReactNode>).isRequired,
  /**
   * 選択肢がひとつ選択されたときに Key を受け取るコールバック関数
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * 選択されなかったときのコールバック関数
   */
  onDismiss: PropTypes.func.isRequired
}