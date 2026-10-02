import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product-service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  const products = [
    { id: 1, title: 'Field Watch', image: '', description: 'Daily timepiece', category: 'Accessories', price: 149.99, categoryId: 2, quantity: 1 },
    { id: 2, title: 'Sun Frame', image: '', description: 'Bright days', category: 'Accessories', price: 39.99, categoryId: 2, quantity: 3 },
    { id: 3, title: 'Day Pack', image: '', description: 'Carry essentials', category: 'Travel', price: 49.99, categoryId: 7, quantity: 2 },
  ];
  const productInput = {
    title: 'New Tote',
    image: '/tote.jpg',
    description: 'A useful tote',
    category: 'Travel',
    price: 35,
    categoryId: 7,
    quantity: 4,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch all products when subscribed', () => {
    let result: typeof products = [];
    service.GetProducts().subscribe((value) => result = value);
    const response = products.map((product) => ({
      ...product,
      id: String(product.id),
      categoryId: String(product.categoryId),
    })) as unknown as typeof products;
    httpTestingController.expectOne('http://localhost:3000/products').flush(response);

    expect(service).toBeTruthy();
    expect(result).toEqual(products);
  });

  it('should fetch a product by its ID', () => {
    let result: (typeof products)[number] | null = null;
    service.GetProductById(2).subscribe((value) => result = value);
    httpTestingController.expectOne('http://localhost:3000/products/2').flush({ ...products[1], id: '2' });

    expect(result).toEqual(products[1]);
  });

  it('should create a product and normalize the returned values', () => {
    let result: (typeof products)[number] | undefined;
    service.addProduct(productInput).subscribe((value) => result = value);
    const request = httpTestingController.expectOne('http://localhost:3000/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(productInput);
    request.flush({ ...productInput, id: '4', price: '35', categoryId: '7', quantity: '4' });

    expect(result).toEqual({ ...productInput, id: 4 });
  });

  it('should update a product and normalize the returned values', () => {
    let result: (typeof products)[number] | undefined;
    service.updateProduct(2, productInput).subscribe((value) => result = value);
    const request = httpTestingController.expectOne('http://localhost:3000/products/2');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(productInput);
    request.flush({ ...productInput, id: '2', price: '35' });

    expect(result).toEqual({ ...productInput, id: 2 });
  });

  it('should delete a product', () => {
    let result: (typeof products)[number] | undefined;
    service.deleteProduct(2).subscribe((value) => result = value);
    const request = httpTestingController.expectOne('http://localhost:3000/products/2');
    expect(request.request.method).toBe('DELETE');
    request.flush({ ...products[1], id: '2' });

    expect(result).toEqual(products[1]);
  });

  it('should compose category, search, and sorting over one request', () => {
    let result: typeof products = [];
    const categoryProducts = service.GetProductsByCategory(2);
    const searchedProducts = service.GetProductsBySearchTerm('frame', categoryProducts);
    service.GetProductsBySortOption('price-asc', searchedProducts).subscribe((value) => result = value);
    httpTestingController.expectOne((request) =>
      request.url === 'http://localhost:3000/products' && request.params.get('categoryId') === '2',
    ).flush(products.slice(0, 2).map((product) => ({ ...product, id: String(product.id) })));

    expect(result.map((product) => product.title)).toEqual(['Sun Frame']);
  });

  it('should return next and previous product IDs from the fetched list', () => {
    let nextId: number | null = null;
    let previousId: number | null = null;
    service.GetTheNextProductID(1).subscribe((value) => nextId = value);
    service.GetThePreviousProductID(2).subscribe((value) => previousId = value);
    const requests = httpTestingController.match('http://localhost:3000/products');
    const response = products.map((product) => ({ ...product, id: String(product.id) }));
    requests[0].flush(response);
    requests[1].flush(response);

    expect(nextId).toBe(2);
    expect(previousId).toBe(1);
  });
});
