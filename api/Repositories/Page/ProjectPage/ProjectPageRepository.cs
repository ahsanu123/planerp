using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;
using SqlKata;
using static Planerp.Extensions.UtilityExtension;

namespace Planerp.Repository;

public interface IProjectPageRepository
{
    public Task<ProjectPageDetailInformation> GetProjectPageDetail(int projectId);
    public Task AddIdToDatabaseArray<T>(T value);
}

public class ProjectPageRepository : IProjectPageRepository
{
    private readonly PostgresqlConnectionProvider _connection;

    public ProjectPageRepository(PostgresqlConnectionProvider connection)
    {
        this._connection = connection;
    }

    public async Task AddIdToDatabaseArray<T>(T value)
    {
        using (var conn = _connection.CreateConnection())
        {
            await DapperSqlKataExtension.AddIdToDatabaseArray(conn, value);
        }
    }

    public async Task<ProjectPageDetailInformation> GetProjectPageDetail(int projectId)
    {
        var SelectProject_QUERY = new Query(nameof(Project));

        var SelectProjectWhereProjectIdEqual_QUERY = SelectProject_QUERY
            .Clone()
            .Where(FullNameof(nameof(Project.Id)), projectId)
            .SelectAllClassProperties(typeof(Project));

        var WithProjectLoggerList_CTE = new Query(nameof(ProjectLoggerList))
            .Select(nameof(ProjectLoggerList.LoggerModelId))
            .Where(nameof(ProjectLoggerList.ProjectId), projectId);

        var SelectArrayLoggerWhereProjectLoggerIdEqual_QUERY = new Query(nameof(LoggerModel))
            .WithAutoAlias(WithProjectLoggerList_CTE)
            .Join(
                nameof(WithProjectLoggerList_CTE),
                nameof(ProjectLoggerList.LoggerModelId),
                FullNameof(nameof(LoggerModel.Id))
            )
            .SelectAllClassProperties(typeof(LoggerModel));

        var WithProjectComponentList_CTE = new Query(nameof(ProjectComponentList))
            .Select(nameof(ProjectComponentList.ComponentId))
            .Where(nameof(ProjectComponentList.ProjectId), projectId);

        var SelectArrayComponentWhereProjectComponentIdEqual_QUERY = new Query(nameof(Component))
            .WithAutoAlias(WithProjectComponentList_CTE)
            .SelectAllClassProperties(typeof(Component))
            .Join(
                nameof(WithProjectComponentList_CTE),
                nameof(ProjectComponentList.ComponentId),
                FullNameof(nameof(Component.Id))
            );

        using (var conn = _connection.CreateConnection())
        {
            var resultProject = await conn.QuerySingleSqlKataAsync<Project>(
                SelectProjectWhereProjectIdEqual_QUERY,
                true
            );

            var resultLogger = await conn.QuerySqlKataAsync<LoggerModel>(
                SelectArrayLoggerWhereProjectLoggerIdEqual_QUERY,
                true
            );

            var resultComponent = await conn.QuerySqlKataAsync<Component>(
                SelectArrayComponentWhereProjectComponentIdEqual_QUERY,
                true
            );

            var projectDetails = new ProjectPageDetailInformation
            {
                ListLog = resultLogger,
                Project = resultProject,
                ListComponent = resultComponent,
            };

            return projectDetails;
        }
    }
}
