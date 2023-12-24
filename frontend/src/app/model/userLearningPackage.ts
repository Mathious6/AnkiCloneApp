export class userLearningPackage{
  private userPackageLearningId!: number;
  private startDate!: Date;
  private expectedEndDate: Date;
  private minutesPerDayObjective: number;
  private progress!: number;
  private disable!: boolean;
  private userId!: number;
  private learningPackageId!: number;

  constructor(userPackageLearningId: number, startDate: Date, expectedEndDate: Date,
    minutesPerDayObjective: number, progress: number, disable: boolean, userId: number,
    learningPackageId: number) {
    this.userPackageLearningId = userPackageLearningId;
    this.startDate = startDate;
    this.expectedEndDate = expectedEndDate;
    this.minutesPerDayObjective = minutesPerDayObjective;
    this.progress = progress;
    this.disable = disable;
    this.userId = userId;
    this.learningPackageId = learningPackageId;
  }

  // Getters
  getUserPackageLearningId(): number {
    return this.userPackageLearningId;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getExpectedEndDate(): Date {
    return this.expectedEndDate;
  }

  getMinutesPerDayObjective(): number {
    return this.minutesPerDayObjective;
  }

  getProgress(): number {
    return this.progress;
  }

  getDisable(): boolean {
    return this.disable;
  }

  getUserId(): number {
    return this.userId;
  }

  getLearningPackageId(): number {
    return this.learningPackageId;
  }

  // Setters
  setUserPackageLearningId(userPackageLearningId: number): void {
    this.userPackageLearningId = userPackageLearningId;
  }

  setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  setExpectedEndDate(expectedEndDate: Date): void {
    this.expectedEndDate = expectedEndDate;
  }

  setMinutesPerDayObjective(minutesPerDayObjective: number): void {
    this.minutesPerDayObjective = minutesPerDayObjective;
  }

  setProgress(progress: number): void {
    this.progress = progress;
  }

  setDisable(disable: boolean): void {
    this.disable = disable;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  setLearningPackageId(learningPackageId: number): void {
    this.learningPackageId = learningPackageId;
  }

}
