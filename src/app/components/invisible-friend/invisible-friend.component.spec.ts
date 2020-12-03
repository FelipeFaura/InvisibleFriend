import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvisibleFriendComponent } from './invisible-friend.component';

describe('InvisibleFriendComponent', () => {
  let component: InvisibleFriendComponent;
  let fixture: ComponentFixture<InvisibleFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvisibleFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvisibleFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
