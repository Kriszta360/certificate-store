using MongoDB.Driver;
using certificate_api.Models;

namespace certificate_api.Services
{
    public class MongoService
    {
        private readonly IMongoCollection<Certificate> _certificates;

        public MongoService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var database = client.GetDatabase(configuration["MongoDB:DatabaseName"]);

            _certificates = database.GetCollection<Certificate>(
                configuration["MongoDB:CollectionName"]);
        }

        public async Task<List<Certificate>> GetAllAsync()
        {
            return await _certificates.Find(_ => true).ToListAsync();
        }

        public async Task<Certificate?> GetByIdAsync(string id)
        {
            return await _certificates.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Certificate certificate)
        {
            await _certificates.InsertOneAsync(certificate);
        }

        public async Task UpdateAsync(string id, Certificate certificate)
        {
            await _certificates.ReplaceOneAsync(c => c.Id == id, certificate);
        }

        public async Task DeleteAsync(string id)
        {
            await _certificates.DeleteOneAsync(c => c.Id == id);
        }
    }
}