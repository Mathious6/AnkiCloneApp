export class Tag{
  private tagId!: number;
  private englishKeyword!: string;
  private frenchTranslation: string;

  constructor(tagId: number, englishKeyword: string, frenchTranslation: string) {
    this.tagId = tagId;
    this.englishKeyword = englishKeyword;
    this.frenchTranslation = frenchTranslation;
  }

  // Getters
  getTagId(): number {
    return this.tagId;
  }

  getEnglishKeyword(): string {
    return this.englishKeyword;
  }

  getFrenchTranslation(): string {
    return this.frenchTranslation;
  }

  // Setters
  setTagId(tagId: number): void {
    this.tagId = tagId;
  }

  setEnglishKeyword(englishKeyword: string): void {
    this.englishKeyword = englishKeyword;
  }

  setFrenchTranslation(frenchTranslation: string): void {
    this.frenchTranslation = frenchTranslation;
  }

}
