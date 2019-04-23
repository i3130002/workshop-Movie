using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieSite.Models;

namespace MovieSite.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly Context _context;

        public MoviesController(Context context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovie()
        {
            var list= await _context.Movie.ToListAsync();
           
            return list;
        }

        // GET: api/Movies/5
        [HttpGet("{name}/{published}")]
        public async Task<ActionResult<Movie>> GetMovie(string name, DateTime published)
        {
            var movie = await _context.Movie.FindAsync(name, published);
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(string id)
        {
            if (!int.TryParse(id, out var idNum) || idNum < 1)
                return Content("Movie ID should be Greater than 0");

            var movie = await _context.Movie.Skip<Movie>(idNum - 1).FirstOrDefaultAsync();
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }

        private bool DateMatch(string date)
        {
            return Regex.IsMatch(date, @"^([12]\d{3}-(0[1-9]|1[0-2]|\d)-(0[1-9]|[12]\d|3[01]))$");
        }

        [HttpPost("{name}/{published}")]
        public async Task<ActionResult<Movie>> EditMovie(string name, string published, Movie newMovie)
        {
            if (!ModelState.IsValid || !DateMatch(published))
                return BadRequest();

            //var movie = await _context.Movie.FindAsync(name, published);
            //if (movie == null)
            //{
            //    return NotFound();
            //}

            if (name == newMovie.Name && published == newMovie.Published)
            {
                try
                {
                    _context.Movie.Update(newMovie);

                }
                catch (Exception e)
                {
                    return Content(e.Message);
                }
                await _context.SaveChangesAsync();
                return Content("Updated");
            }

            await DeleteMovie(name, published);
            await PostMovie(newMovie);
            return Content("Updated");
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            if (!ModelState.IsValid || !DateMatch(movie.Published))
                return BadRequest();

            _context.Movie.Add(movie);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MovieExists(movie.Name, movie.Published))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMovie", new { id = movie.Name }, movie);
        }

        // DELETE: api/Movies/5
        [HttpDelete("{name?}/{published?}")]
        public async Task<ActionResult<Movie>> DeleteMovie(string name, string published)
        {
            var movie = await _context.Movie.FindAsync(name, published);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movie.Remove(movie);
            await _context.SaveChangesAsync();

            return movie;
        }

        private bool MovieExists(string movieName, string published)
        {
            return _context.Movie.Any(e => e.Name == movieName && e.Published == published);
        }


    }
}
