FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend/certificate-mcp/certificate-mcp.csproj", "backend/certificate-mcp/"]
RUN dotnet restore "backend/certificate-mcp/certificate-mcp.csproj"

COPY . .
WORKDIR "/src/backend/certificate-mcp"
RUN dotnet publish "certificate-mcp.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "certificate-mcp.dll"]