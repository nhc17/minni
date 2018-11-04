import { MatFileUploadModule } from './mat-file-upload.module';

describe('MatFileUploadModule', () => {
  let matFileUploadModule: MatFileUploadModule;

  beforeEach(() => {
    matFileUploadModule = new MatFileUploadModule();
  });

  it('should create an instance', () => {
    expect(matFileUploadModule).toBeTruthy();
  });
});
