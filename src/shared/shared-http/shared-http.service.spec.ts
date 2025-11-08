import { Test, TestingModule } from '@nestjs/testing';
import { SharedHttpService } from './shared-http.service';

describe('SharedHttpService', () => {
  let service: SharedHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedHttpService],
    }).compile();

    service = module.get<SharedHttpService>(SharedHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
