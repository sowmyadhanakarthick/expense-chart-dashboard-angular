import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Toast } from './toast';
import { ToastService } from '../../services/toast.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Toast', () => {
  let fixture: ComponentFixture<Toast>;
  let component: Toast;

  const mockMessage = signal('');

  const mockToastService = {
    message: () => mockMessage(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toast],
      providers: [{ provide: ToastService, useValue: mockToastService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Toast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a toast message when message is set', fakeAsync(() => {
    mockMessage.set('Success');
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    const toastEl = fixture.debugElement.query(By.css('.toast'));
    expect(toastEl.nativeElement.textContent.trim()).toContain('Success');
  }));
  it('should not render toast when message is empty', () => {
    mockMessage.set('');
    fixture.detectChanges();

    const toastEl = fixture.debugElement.query(By.css('.toast'));
    expect(toastEl).toBeNull();
  });
});
