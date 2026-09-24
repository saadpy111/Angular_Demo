import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contactusdetails } from './contactusdetails';

describe('Contactusdetails', () => {
  let component: Contactusdetails;
  let fixture: ComponentFixture<Contactusdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contactusdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Contactusdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
