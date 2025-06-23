import { fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null message', () => {
    expect(service.message()).toBeNull();
  });

  it('should set a toast message when show() is called', () => {
    service.show('Test message');
    expect(service.message()).toBe('Test message');
  });

  it('should clear the message after the default duration (3000ms)', fakeAsync(() => {
    service.show('Test message');
    expect(service.message()).toBe('Test message');

    tick(3000);
    expect(service.message()).toBeNull();
  }));

  it('should clear the message after a custom duration', fakeAsync(() => {
    service.show('Another message', 1000);
    expect(service.message()).toBe('Another message');

    tick(1000);
    expect(service.message()).toBeNull();
  }));

  it('should overwrite previous message if show is called again before timeout', fakeAsync(() => {
    service.show('First message', 3000);
    expect(service.message()).toBe('First message');

    tick(1000);

    service.show('Second message', 2000);
    expect(service.message()).toBe('Second message');

    tick(2000);
    expect(service.message()).toBeNull();
  }));
});
