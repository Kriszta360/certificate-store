var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/api/stats", () =>
{
    return Results.Ok(new
    {
        service = "certificate-mcp",
        description = "MCP microservice for Certificate Store",
        status = "running",
        timestamp = DateTime.UtcNow
    });
});

app.Run();