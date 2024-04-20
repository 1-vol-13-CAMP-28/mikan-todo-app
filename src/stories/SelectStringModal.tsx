import { ReactNode } from "react";
import { DropDownModal } from "./DropDownModal";
import "./selectStringModal.css";

export type SelectStringModalProps = {
  candidates: Array<string>;

  onSelect: (selectedKey: string) => void;
  onDismiss: () => void;

  useFirstLetterAsIcon?: boolean;
}

export function GetStringModalElement(value: string, iconLetter?: string): ReactNode {
  return <p className="SelectStringModalWrapper">
    {iconLetter ? <span className="DropDownIcon DropDownIconText">{iconLetter}</span> : null}
    <span className="SelectStringModalText">{value}</span>
  </p>
}

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