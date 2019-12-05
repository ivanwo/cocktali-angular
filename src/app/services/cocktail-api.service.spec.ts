import { TestBed } from '@angular/core/testing';

import { CocktailAPIService } from './cocktail-api.service';

describe('CocktailAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CocktailAPIService = TestBed.get(CocktailAPIService);
    expect(service).toBeTruthy();
  });
});
