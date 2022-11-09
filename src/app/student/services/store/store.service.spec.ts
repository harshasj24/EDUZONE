import { TestBed } from "@angular/core/testing";

import { StudentStoreService } from "./store.service";

describe("StudentStoreService", () => {
  let service: StudentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentStoreService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
