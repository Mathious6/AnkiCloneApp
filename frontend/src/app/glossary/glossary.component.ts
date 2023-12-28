import {Component, OnInit} from '@angular/core';
import {HttpFacadeService} from "../http-facade.service";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit{
  glossaryTerms: { term: string, definition: string }[] = [];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;

  constructor(private httpFacadeService: HttpFacadeService) {
  }
  ngOnInit() {
    this.httpFacadeService.getAllLearningPackage().subscribe(
      {
        next: (learningPackages: any[]) => {
          this.glossaryTerms = learningPackages.map(learningPackage => ({
            term: learningPackage.title,
            definition: learningPackage.description
          }));
        },
      }
    );
  }
  selectLetter(letter: string) {
    this.selectedLetter = letter;
  }

  clearSelection() {
    this.selectedLetter = null;
  }
}
