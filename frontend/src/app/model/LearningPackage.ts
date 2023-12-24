// learning-package.model.ts
export interface LearningPackage {
  packageId : number;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  duration: number;
  creationDate: Date;
  creatorId: number;
}

export class LearningPackage implements LearningPackage {
  constructor(
    public packageId: number,
    public title: string,
    public description: string,
    public category: string,
    public targetAudience: string,
    public duration: number,
    public creationDate: Date,
    public creatorId : number
  ) {}

  // Getters
  getpackageId(): number {
    return this.packageId;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return this.category;
  }

  getTargetAudience(): string {
    return this.targetAudience;
  }

  getDuration(): number {
    return this.duration;
  }

  getCreationDate(): Date {
    return this.creationDate;
  }

  getcreatorId(): number {
    return this.creatorId;
  }

  // Setters
  setpackageId(packageId: number): void {
    this.packageId = packageId;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  setTargetAudience(targetAudience: string): void {
    this.targetAudience = targetAudience;
  }

  setDuration(duration: number): void {
    this.duration = duration;
  }

  setCreationDate(creationDate: Date): void {
    this.creationDate = creationDate;
  }

  setcreatorId(creatorId: number): void {
    this.creatorId = creatorId;
  }
}
