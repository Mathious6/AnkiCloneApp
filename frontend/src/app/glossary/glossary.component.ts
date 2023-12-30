import {Component, OnInit} from '@angular/core';
import {HttpFacadeService} from "../http-facade.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit{
  glossaryTerms: { term: string, definition: string, type: string }[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;
  types: string[] = [
    "Learning Package",
    "Learning Fact",
  ];
  selectedTypes: string[] = [];
  constructor(private httpFacadeService: HttpFacadeService) {
  }
  ngOnInit() {
    forkJoin([
      this.httpFacadeService.getAllLearningPackage(),
      this.httpFacadeService.getAllLearningFact()
    ]).subscribe({
      next: ([learningPackages, learningFacts]) => {
        const glossaryTerms = [
          ...learningPackages.map(learningPackage => ({
            term: learningPackage.title,
            definition: learningPackage.description,
            type: "Learning Package"
          })),
          ...learningFacts.map(learningFact => ({
            term: learningFact.front,
            definition: learningFact.back,
            type: "Learning Fact"
          }))
        ];
        this.glossaryTerms = glossaryTerms.sort((a, b) => a.term.localeCompare(b.term));
      },
    });
  }
  getFilteredTerms() {
    return this.glossaryTerms.filter(term => {
      return (!this.selectedLetter || term.term.startsWith(this.selectedLetter)) &&
        (!this.selectedTypes.length || this.selectedTypes.includes(term.type));
    });
  }
  selectLetter(letter: string) {
    this.selectedLetter = letter;
  }
  clearSelection() {
    this.selectedLetter = null;
  }
  onCheckboxChange(event: any, type: string) {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      const index = this.selectedTypes.indexOf(type);
      if (index !== -1) {
        this.selectedTypes.splice(index, 1);
      }
    }
  }
}
