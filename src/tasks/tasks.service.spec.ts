import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { User } from '../auth/auth.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';

const mockDataSource = () => ({
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn(({ where: { id, user } }) => {
      if (id === mockTask.id && user.id === mockUser.id) {
        return mockTask;
      }
      return undefined;
    }),
    delete: jest.fn((data) => {
      const { id, user } = data;
      if (id === mockTask.id && user.id === mockUser.id) {
        return { affected: 1 };
      }
      return { affected: 0 };
    }),
  }),
});

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
  status: TaskStatus.OPEN,
};

const mockUser = {
  id: '1',
  username: 'Test User',
  password: 'password',
  tasks: [],
};

const mockTaskRepository = () => ({
  findOne: jest.fn((id: string, user: User) => {
    if (id === mockTask.id && user.id === mockUser.id) {
      return mockTask;
    }
    return undefined;
  }),
  createTask: jest.fn((createTaskDto: CreateTaskDto, user: User) => {
    return { ...mockTask, ...createTaskDto };
  }),
  save: jest.fn((task: Task) => {
    return task;
  }),
  delete: jest.fn((id: string, user: User) => {
    return { affected: 1 };
  }),
  getTasks: jest.fn((filterDto: GetTaskFilterDto, user: User) => {
    return [mockTask];
  }),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    jest.clearAllMocks(); // Reset mock function calls between tests

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepository,
        },
        {
          provide: DataSource, // Provide mock DataSource
          useFactory: mockDataSource,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('getTaskById', () => {
    it('should return the task with the given ID and user', async () => {
      expect(await tasksService.getTaskById(mockTask.id, mockUser)).toEqual(
        mockTask,
      );
    });

    it('should throw an error if the task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(undefined);
      await expect(tasksService.getTaskById('4', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
      };

      expect(await taskRepository.createTask(createTaskDto, mockUser)).toEqual(
        expect.objectContaining(createTaskDto),
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete the task with the given ID and user', async () => {
      expect(
        await tasksService.deleteTask(mockTask.id, mockUser),
      ).toBeUndefined();
    });

    it('should throw an error if the task is not found', async () => {
      await expect(tasksService.deleteTask('7', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTask', () => {
    it('should update the task status', async () => {
      const task = await tasksService.getTaskById(mockTask.id, mockUser);
      task.status = TaskStatus.DONE;
      await taskRepository.save(task);
      expect(task).toEqual(mockTask);
    });
  });

  describe('getTasks', () => {
    it('should return all tasks filtered by the given criteria', async () => {
      expect(
        await taskRepository.getTasks(
          { status: TaskStatus.OPEN, search: 'test' },
          mockUser,
        ),
      ).toEqual([mockTask]);
    });
  });
});
