export class furnitureInfo {
    constructor(displayName, price, targetComponentId, description) {
        this.displayName = displayName;
        this.price = price;
        this.imagePath = `/furnitures/${targetComponentId}.png`;
        this.targetComponentId = targetComponentId;
        this.description = description;
    }
}