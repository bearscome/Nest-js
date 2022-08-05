import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
// url entry point -> route
export class MoviesController {

    constructor(private readonly moviesService:MoviesService) {};

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    };


    @Get("search")
    search(@Query('year') searchingYear:string) {
        return `This is return all movies made after: ${searchingYear}`;
    };

    @Get("/:id")
    getOne(@Param('id') movieId:number): Movie {
        return this.moviesService.getOne(movieId)
    };

    @Post()
    create(@Body() movieData ) {
        return this.moviesService.create(movieData);
    };

    @Delete('/:id')
    delete(@Param() movieId:number) {
        return this.moviesService.deleteOne(movieId);
    };

    @Patch('/:id') // Put은 모두 업데이트 Patch는 리소스의 일부분만 업데이트
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    };
}
