import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Toast } from '../app/components/toast/toast';
import { RouterTestingModule } from '@angular/router/testing';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Toast, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the App component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component['title']).toBe('expense-chart-dashboard-angular');
  });
});
