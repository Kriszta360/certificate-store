FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend/certificate-api/certificate-api.csproj", "backend/certificate-api/"]
RUN dotnet restore "backend/certificate-api/certificate-api.csproj"

COPY . .
WORKDIR "/src/backend/certificate-api"
RUN dotnet publish "certificate-api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "certificate-api.dll"]