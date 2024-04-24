import { ReactNode } from "react";

/**
 * DropDownModal の props
 *
 * @export
 * @typedef {DropDownModalProps}
 * @template KeyType
 */

export type DropDownModalProps<KeyType> = {
  candidates: Map<KeyType, ReactNode>;

  onSelect: (selectedKey: KeyType) => void;
  onDismiss: () => void;
};
