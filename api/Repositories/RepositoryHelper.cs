namespace Planerp.Repository;

using System.Data;
using SqlKata;

public class RepositoryHelper
{
    // TODO:
    public static bool AddToDatabaseList<T>(IDbConnection conn, int primaryId, int insertedId)
    {
        var className = typeof(T).Name;
        var classInstance = Activator.CreateInstance(typeof(T), primaryId, insertedId);

        var ProjectComponentList_Query = new Query();

        return true;
    }
}
