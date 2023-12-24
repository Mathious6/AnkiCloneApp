export interface LearningFact {
  factId : number;
  front: string;
  back: string;
  source: string;
  relatedimages: string;
  relatedlinks: number;
  isActive: boolean;
  packageId: number;
  userId: number;
}

export class LearningFact implements LearningFact {
    constructor(
        public factId: number,
        public front: string,
        public back: string,
        public source: string,
        public relatedimages: string,
        public relatedlinks: number,
        public isActive: boolean,
        public packageId: number,
        public userId: number
    ) {}

    // Getters
    getFactId(): number {
        return this.factId;
    }

    getFront(): string {
        return this.front;
    }

    getBack(): string {
        return this.back;
    }

    getSource(): string {
        return this.source;
    }

    getRelatedImages(): string {
        return this.relatedimages;
    }

    getRelatedLinks(): number {
        return this.relatedlinks;
    }

    getDisable(): boolean {
        return this.isActive;
    }

    getPackageId(): number {
      return this.packageId;
    }

    getUserId(): number {
      return this.userId;
    }

    // Setters
    setFactId(factid: number): void {
        this.factId = factid;
    }

    setFront(front: string): void {
        this.front = front;
    }

    setBack(back: string): void {
        this.back = back;
    }

    setSource(source: string): void {
        this.source = source;
    }

    setRelatedImages(relatedimages: string): void {
        this.relatedimages = relatedimages;
    }

    setRelatedLinks(relatedlinks: number): void {
        this.relatedlinks = relatedlinks;
    }

    setDisable(disable: boolean): void {
        this.isActive = disable;
    }

    setPackageId(packageId: number): void {
      this.packageId = packageId;
    }

    setUserId(userId: number): void {
      this.userId = userId;
    }

}
