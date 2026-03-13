# Travaux pratiques de génie logiciel

## Cheat Sheet

### Git

- Configurer git sur la machine :
```
git config --global user.name <Prénom Nom>
git config --global user.email <email@ensc.fr>
```
- Cloner un dépôt : `git clone <adresse du dépôt>`
- Ajouter tous les fichiers à l’index : `git add .`
- Archiver une modification : `git commit -m <message de commit>`
- Pousser vers le dépôt distant : `git push`
- Récupérer les modification distantes :
  - mettre à jour l’espace de travail : `git pull`
  - ne pas modifier l’espace de travail : `git fetch`
- Regarder le statut du dépôt local : `git status`

### Dotnet

- Vérifier la version de .Net : `dotnet --version`
- Créer une application console : `dotnet new console -o <nom du projet>`
- Créer un service web : `dotnet new webapi -o <nom du projet>`
- Créer un projet de test : `dotnet new mstest -n <nom du projet>.UnitTests`
- Créer une référence depuis un projet vers un autre : `dotnet add <projet 1>.csproj reference <projet 2>.csproj`
- Créer un fichier `.gitignore` par défaut : `dotnet new gitignore`
- Ajouter un paquet à un projet : `dotnet add package <nom du paquet>`
- Pour gérer les problèmes de certificat :
```
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

### C#

- Afficher une ligne console : `Console.WriteLine("Enter username:");`
- Lire une ligne console : `string userName = Console.ReadLine();`
- Effacer la console : `Console.Clear(); `

### Linq

### Entity Framework

- Installer les outils d'interface de ligne de commande (CLI) : `dotnet tool install --global dotnet-ef`
- Vérifier l'installation : `dotnet ef`
- Ajouter Entity Framework (avec SQLite) à un projet :
```
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```
- Ajouter une migration suite à évolution du modèle : `dotnet ef migrations add <message de migration>`
- Créer ou mettre à jour la base de données : `dotnet ef database update`

#### Exemple de fichier Context

```csharp
using Microsoft.EntityFrameworkCore;

public class TodoContext : DbContext
{
  private const string DbPath = "data.sqlite";

  // Mettre à jour cette section en fonction du projet (Models/)
  public DbSet<Todo> Todos { get; set; } = null!;
  public DbSet<List> Lists { get; set; } = null!;
  public DbSet<User> Users { get; set; } = null!;

  protected override void OnConfiguring(DbContextOptionsBuilder options)
  {
    options.UseSqlite($"Data Source={DbPath}");
  }
}
```

### cURL

- Requête GET simple : `curl <url>` ou `curl -X GET <url>` (par défaut cURL fait du GET)
- Requête GET en suivant les redirections : `curl -L <url>`
- Requête POST JSON : `curl -X POST -H 'Content-Type: application/json' -d '{…}' <url>`
- Requête PUT avec JSON : `curl -X PUT -H 'Content-Type: application/json' -d '{…}' <url>`
- Requête DELETE : `curl -X DELETE <url>`
- Afficher l'en-têtes de la réponse : `curl -i …`

### Contrôleur HTTP

#### Exemple de contrôleur HTTP

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController] // Déclare un contrôleur HTTP (≈ point d'entrée HTTP)
[Route("api/tache")] // Définit le chemin d’accès de base pour ce contrôleur
// ControllerBase permet de bénéficier des utilitaires HTTP (Ok, NotFound, etc.)
public class TacheController : ControllerBase
{
    [HttpGet] // Répond aux requêtes HTTP GET sur "api/tache"
    public List<Tache> GetTaches()
    {
        // Retourner la liste de toutes les tâches
    }

    [HttpGet("{id}")] // Répond aux requêtes HTTP GET sur "api/tache/{id}"
    public Tache GetTache(int id)
    {
        // Retourner la tâche id
    }

    [HttpPost] // Répond aux requêtes HTTP POST sur "api/tache/"
    public Tache PostTache(Tache tache)
    {
        // Stocker en base la tache
        // Retourner la tache
    }

    [HttpPut("{id}")] // Répond aux requêtes HTTP PUT sur "api/tache/{id}"
    public Tache PutTache(int id, Tache tache)
    {
        // Modifier la tache id
        // Retourner la tache id
    }

    [HttpDelete("{id}")] // Répond aux requêtes HTTP DELETE sur "api/tache/{id}"
    public void DeleteTache(int id)
    {
        // Supprimer la tache id
    }
}
```

#### Activer les contrôleurs HTTP

```csharp
// Program.cs

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddControllers(); // <-- !! Ajoutez cette ligne !!

...

app.MapControllers(); // <-- !! Ajoutez cette ligne !!

app.UseHttpsRedirection();

app.Run();
```

### Scalar (interface développeur)

Pour activer Scalar sur `http://localhost:<port>/scalar/`

- Ajouter Scalar à un projet : `dotnet add package Scalar.AspNetCore`
- Activer Scalar :
```csharp
// Program.cs
using Scalar.AspNetCore; // <-- !! Ajoutez cette ligne !!

var builder = WebApplication.CreateBuilder(args);

...

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
	app.MapScalarApiReference(); // <-- !! Ajoutez cette ligne !!
}

...

app.Run();
```
