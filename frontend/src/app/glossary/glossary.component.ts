import {Component, OnInit} from '@angular/core';
import {HttpFacadeService} from "../http-facade.service";
import getAltLen from "@popperjs/core/lib/utils/getAltLen";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit{
  glossaryTerms: { term: string, definition: string, type: string }[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;
  // Assuming you have a property in your component like this
  types: string[] = [
    "Learning Package",
    "Learning Fact",
  ];
  selectedTypes: string[] = [];

  constructor(private httpFacadeService: HttpFacadeService) {
  }

  ngOnInit() {
    this.httpFacadeService.getAllLearningPackage().subscribe({
      next: (learningPackages: any[]) => {
        // Map Learning Package data to glossaryTerms
        this.glossaryTerms = learningPackages.map(learningPackage => ({
          term: learningPackage.title,
          definition: learningPackage.description,
          type: "Learning Package"
        }));

        // Now, fetch Learning Fact data and add it to glossaryTerms
        this.httpFacadeService.getAllLearningFact().subscribe((learningFacts: any[]) => {
          // Map Learning Fact data to glossaryTerms
          const learningFactTerms = learningFacts.map(learningFact => ({
            term: learningFact.front,
            definition: learningFact.back,
            type: "Learning Fact"
          }));

          // Concatenate Learning Fact terms with existing glossaryTerms
          this.glossaryTerms = this.glossaryTerms.concat(learningFactTerms);
          this.glossaryTerms.sort((a, b) => a.term.localeCompare(b.term));
        });
      },
    });
  }

  // Modify your method to filter glossary terms
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
