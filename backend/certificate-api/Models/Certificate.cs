namespace certificate_api.Models
{
    public class Certificate
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string OwnerName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Type { get; set; } = "";
        public string Status { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ValidUntil { get; set; }
    }
}