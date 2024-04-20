import { ReactNode, useState } from "react"
import "./dropDownModal.css";

export type DropDownModalProps<KeyType> = {
  candidates: Map<KeyType, ReactNode>

  onSelect: (selectedKey: KeyType) => void;
  onDismiss: () => void;
}

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
  <button className="DismissModal" onClick={ handleDismiss } />
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