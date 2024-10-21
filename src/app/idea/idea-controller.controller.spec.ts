import { Test, TestingModule } from '@nestjs/testing';
import { IdeaController } from './idea-controller.controller';
import { IdeaServiceService } from './idea-service.service';

describe('IdeaController', () => {
  let controller: IdeaController;
  let ideaServiceMock: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaController],
      providers: [{provide: IdeaServiceService, useValue: ideaServiceMock}]
    }).compile();

    controller = module.get<IdeaController>(IdeaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
