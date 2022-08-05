import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll():Movie[] {
        console.log('asdsadsadsadsa', this.movies)
        return this.movies;
    };

    getOne(id:number):Movie {
        const movie = this.movies.find(movie => movie.id === id) // string to number
        if(!movie) {
            throw new NotFoundException(`movie is not Found ${id}`);
        }
        console.log('현재 무비',movie)
        return movie
    };

    deleteOne(id:number) {
        console.log('delete ONE:', id)
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    };

    create(movieData) {
        this.movies.push({
            id:this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData:UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
