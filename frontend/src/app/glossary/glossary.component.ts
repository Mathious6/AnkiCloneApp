import {Component, OnInit} from '@angular/core';
import {HttpFacadeService} from "../http-facade.service";
import getAltLen from "@popperjs/core/lib/utils/getAltLen";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit{
  glossaryTerms: { term: string, definition: string }[] = [
    { term: 'Angular', definition: 'A platform and framework for building client-side applications with HTML, CSS, and JavaScript/TypeScript.' },
    { term: 'Bngular', definition: 'A platform and framework for building client-side applications with HTML, CSS, and JavaScript/TypeScript.' },
    { term: 'Cngular', definition: 'A platform and framework for building client-side applications with HTML, CSS, and JavaScript/TypeScript.' },
  ];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;

  constructor(private httpFacadeService: HttpFacadeService) {
  }
  ngOnInit() {
    /*
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
     */
  }
  selectLetter(letter: string) {
    this.selectedLetter = letter;
  }

  clearSelection() {
    this.selectedLetter = null;
  }
}
