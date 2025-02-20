import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('upload')
export class UploadController {
    // 📌 Загрузка ОДНОГО файла
    @Post('one')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Папка для сохранения файлов
            filename: (req, file, cb)=> {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname)); // Генерируем уникальное имя файла
            },
        }),
    }))
    uploadSingle(@UploadedFile() file) {
        return { message: 'Файл загружен', file };
    }

    // 📌 Загрузка НЕСКОЛЬКИХ файлов
    @Post('multiple')
    @UseInterceptors(FilesInterceptor('files', 10, { // Максимум 10 файлов
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb)=> {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    uploadMultiple(@UploadedFiles() files: []) {
        return { message: `Загружено файлов: ${files.length}`, files };
    }
}