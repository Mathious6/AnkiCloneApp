export class LearningPackageTag{
  private learningPackageTagId!: number;
  private packageId!: number;
  private tagId!: number;

  constructor(learningPackageTagId: number, packageId: number, tagId: number) {
    this.learningPackageTagId = learningPackageTagId;
    this.packageId = packageId;
    this.tagId = tagId;
  }

  // Getters
  getLearningPackageTagId(): number {
    return this.learningPackageTagId;
  }

  getPackageId(): number {
    return this.packageId;
  }

  getTagId(): number {
    return this.tagId;
  }

  // Setters
  setLearningPackageTagId(learningPackageTagId: number): void {
    this.learningPackageTagId = learningPackageTagId;
  }

  setPackageId(packageId: number): void {
    this.packageId = packageId;
  }

  setTagId(tagId: number): void {
    this.tagId = tagId;
  }

}
