using Dapper;
using Planerp.Model;
using Planerp.Services;

namespace Planerp.Repository;

public interface IComponentRepository
{
    public Task<Component> GetMaterialById(int Id);
    public Task<IEnumerable<Component>> GetMaterial();
    public Task<IEnumerable<Component>> GetMaterialByProjectId(int Id);
}
