export interface LearningFact {
    userLearningFactId : number;
    reviewCount: number;
    confidenceLevel: string;
    lastReviewed: Date;
    nextReviewDate: Date;
    userPackageLearningId: number;
    factId: number;
    userId: number;
}

export class UserLearningFact implements LearningFact {
    constructor(
        public userLearningFactId: number,
        public reviewCount: number,
        public confidenceLevel: string,
        public lastReviewed: Date,
        public nextReviewDate: Date,
        public userPackageLearningId: number,
        public factId: number,
        public userId: number
    ) {}

    // Getters
    getuserLearningFactId(): number {
        return this.userLearningFactId;
    }

    getReviewCount(): number {
        return this.reviewCount;
    }

    getConfidenceLevel(): string {
        return this.confidenceLevel;
    }

    getLastReviewed(): Date {
        return this.lastReviewed;
    }

    getNextReviewDate(): Date {
        return this.nextReviewDate;
    }

    getUserPackageLearningId(): number {
      return this.userPackageLearningId;
    }
    getFactId(): number {
      return this.factId;
    }
    getUserId(): number {
      return this.userId;
    }

    // Setters
    setuserLearningFactId(userLearningFactId: number): void {
        this.userLearningFactId = userLearningFactId;
    }

    setReviewCount(reviewCount: number): void {
        this.reviewCount = reviewCount;
    }

    setConfidenceLevel(confidenceLevel: string): void {
        this.confidenceLevel = confidenceLevel;
    }

    setLastReviewed(lastReviewed: Date): void {
        this.lastReviewed = lastReviewed;
    }

    setNextReviewDate(nextReviewDate: Date): void {
        this.nextReviewDate = nextReviewDate;
    }

    setUserPackageLearningId(userPackageLearningId: number): void {
      this.userPackageLearningId = userPackageLearningId;
    }

    setFactId(factId: number): void {
      this.factId = factId;
    }

    setUserId(userId: number): void {
      this.userId = userId;
    }
}
