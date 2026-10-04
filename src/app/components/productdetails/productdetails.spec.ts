import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Productdetails } from './productdetails';

describe('Productdetails', () => {
  let component: Productdetails;
  let fixture: ComponentFixture<Productdetails>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productdetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 'product-1' })) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Productdetails);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/products/product-1').flush({
      id: 'product-1',
      title: 'Sample product',
      image: '',
      description: '',
      category: 'Sample',
      price: 1,
      categoryId: 1,
      quantity: 1,
    });
    await fixture.whenStable();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
