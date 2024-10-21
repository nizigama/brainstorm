import { Test, TestingModule } from '@nestjs/testing';
import { IdeaControllerController } from './idea-controller.controller';

describe('IdeaControllerController', () => {
  let controller: IdeaControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaControllerController],
    }).compile();

    controller = module.get<IdeaControllerController>(IdeaControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
