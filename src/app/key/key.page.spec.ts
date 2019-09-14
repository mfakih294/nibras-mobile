import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPage } from './key.page';

describe('KeyPage', () => {
  let component: KeyPage;
  let fixture: ComponentFixture<KeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
