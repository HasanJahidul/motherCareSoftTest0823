import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm';
import * as csvParser from 'csv-parser';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  unlink,
} from 'fs';
import * as uuid from 'uuid';
import { ObjectId } from 'mongodb';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(skip?: number, take?: number){
    const [data,total] = await this.userRepository.findAndCount({ skip, take });
    return {data,total};
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy(new ObjectId(id));
  }

  async findByColumn(column: string, value: string): Promise<User[]> {
    return this.userRepository.find({ [column]: value });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.userRepository.update(new ObjectId(id), user);
    return this.userRepository.findOneBy(new ObjectId(id));
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }
  async bulkUploadUsers(file: Express.Multer.File): Promise<User[]> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file uploaded.');
    }
    if (file.mimetype !== 'text/csv')
      throw new BadRequestException('File must be a CSV');

    const filename = `${uuid.v4()}.csv`;
    console.log('service 1');

    // Save the file to the uploads directory
    await new Promise<void>((resolve, reject) => {
      // check if uploads directory exists
      if (!existsSync('uploads')) {
        mkdirSync('uploads');
      }
      createWriteStream(`uploads/${filename}`).end(file.buffer, 'binary', () =>
        resolve(),
      );
    });

    const users = [];
    const saltRounds = 8;

    // Parse CSV file and create User objects
    return new Promise<User[]>((resolve, reject) => {
      createReadStream(`uploads/${filename}`)
        .pipe(csvParser())
        .on('data', (data: any) => {
          //   const user  = {
          //       firstName: data.firstName,
          //       lastName: data.lastName,
          //       email: data.email,
          //       username: data.username,
          //       password: bcrypt.hash(data.password, saltRounds),
          //       role: data.role,
          //       createdAt: undefined,
          //       updatedAt: undefined,
          //       id: new ObjectId
          //   };
          //   console.log(user.id);
          console.log('service 2');
          users.push(
            new Promise<User>(async (resolve) => {
              resolve({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: await bcrypt.hash(data.password, saltRounds),
                role: data.role,
                createdAt: undefined,
                updatedAt: undefined,
              });
            }),
          );
        })
        .on('end', async () => {
          // Save users to the database in bulk
          const newUser = await Promise.all(users);
          console.log(newUser);
          const savedUsers = await this.userRepository.save(newUser);

          // Delete the temporary file after processing
          await new Promise<void>((resolve, reject) => {
            unlink(`uploads/${filename}`, (err) => {
              if (err) {
                console.error('Error deleting temporary file:', err);
              }
              resolve();
            });
          });

          resolve(savedUsers);
        })
        .on('error', (error: any) => {
          // Delete the temporary file on error
          unlink(`uploads/${filename}`, (err) => {
            if (err) {
              console.error('Error deleting temporary file:', err);
            }
            reject(error);
          });
        });
    });
  }
}
