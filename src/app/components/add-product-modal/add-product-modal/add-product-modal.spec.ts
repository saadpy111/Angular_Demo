import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductModal } from './add-product-modal';

describe('AddProductModal', () => {
  let component: AddProductModal;
  let fixture: ComponentFixture<AddProductModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
