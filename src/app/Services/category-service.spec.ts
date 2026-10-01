import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category-service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should fetch categories when subscribed', () => {
    const categories = [{ id: 1, name: 'Footwear' }];
    let result: typeof categories = [];
    service.GetCategories().subscribe((value) => result = value);
    httpTestingController.expectOne('http://localhost:3000/categories').flush([
      { id: '1', name: 'Footwear' },
    ]);

    expect(result).toEqual(categories);
  });

  it('should fetch a category by ID', () => {
    const category = { id: 1, name: 'Footwear' };
    let result: typeof category | null = null;
    service.GetCategoryById(1).subscribe((value) => result = value);
    httpTestingController.expectOne('http://localhost:3000/categories/1').flush({ id: '1', name: 'Footwear' });

    expect(result).toEqual(category);
  });
});
