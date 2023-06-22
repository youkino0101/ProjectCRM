FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/demo.Web.Host/demo.Web.Host.csproj", "src/demo.Web.Host/"]
COPY ["src/demo.Web.Core/demo.Web.Core.csproj", "src/demo.Web.Core/"]
COPY ["src/demo.Application/demo.Application.csproj", "src/demo.Application/"]
COPY ["src/demo.Core/demo.Core.csproj", "src/demo.Core/"]
COPY ["src/demo.EntityFrameworkCore/demo.EntityFrameworkCore.csproj", "src/demo.EntityFrameworkCore/"]
WORKDIR "/src/src/demo.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/demo.Web.Host", "src/demo.Web.Host"]
COPY ["src/demo.Web.Core", "src/demo.Web.Core"]
COPY ["src/demo.Application", "src/demo.Application"]
COPY ["src/demo.Core", "src/demo.Core"]
COPY ["src/demo.EntityFrameworkCore", "src/demo.EntityFrameworkCore"]
WORKDIR "/src/src/demo.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "demo.Web.Host.dll"]
