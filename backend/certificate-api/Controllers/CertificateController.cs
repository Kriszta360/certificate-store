using Microsoft.AspNetCore.Mvc;
using certificate_api.Models;
using certificate_api.Services;

namespace certificate_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificateController : ControllerBase
    {
        private readonly MongoService _mongoService;

        public CertificateController(MongoService mongoService)
        {
            _mongoService = mongoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Certificate>>> Get()
        {
            var certificates = await _mongoService.GetAllAsync();
            return Ok(certificates);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Certificate>> Get(string id)
        {
            var certificate = await _mongoService.GetByIdAsync(id);

            if (certificate == null)
                return NotFound("A tanúsítvány nem található.");

            return Ok(certificate);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Certificate certificate)
        {
            await _mongoService.CreateAsync(certificate);
            return Ok(certificate);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, Certificate certificate)
        {
            var existing = await _mongoService.GetByIdAsync(id);

            if (existing == null)
                return NotFound("A tanúsítvány nem található.");

            await _mongoService.UpdateAsync(id, certificate);

            return Ok(certificate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var existing = await _mongoService.GetByIdAsync(id);

            if (existing == null)
                return NotFound("A tanúsítvány nem található.");

            await _mongoService.DeleteAsync(id);

            return Ok("Törölve");
        }
    }
}