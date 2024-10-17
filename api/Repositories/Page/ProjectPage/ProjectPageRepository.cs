using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;
using SqlKata;
using static Planerp.Extensions.UtilityExtension;

namespace Planerp.Repository;

public interface IProjectPageRepository
{
    public Task<ProjectPageDetailInformation> GetProjectPageDetail(int id);
}

public class ProjectPageRepository : IProjectPageRepository
{
    private readonly PostgresqlConnectionProvider _connection;

    public ProjectPageRepository(PostgresqlConnectionProvider connection)
    {
        this._connection = connection;
    }

    public async Task<ProjectPageDetailInformation> GetProjectPageDetail(int id)
    {
        var SelectProject_QUERY = new Query(nameof(Project));

        var SelectProjectWhereProjectIdEqual_QUERY = SelectProject_QUERY
            .Clone()
            .Where(FullNameof(nameof(Project.Id)), id)
            .SelectAllClassProperties(typeof(Project));

        var SelectModelLoggerWhereProjectIdEqual_QUERY = SelectProject_QUERY
            .Clone()
            .Join(
                nameof(LoggerModel),
                FullNameof(nameof(Project.Id)),
                FullNameof(nameof(LoggerModel.ProjectId))
            )
            .SelectAllClassProperties(typeof(LoggerModel));

        var WithProjectComponentList_CTE = new Query(nameof(ProjectComponentList))
            .Select(nameof(ProjectComponentList.ComponentId))
            .Where(nameof(ProjectComponentList.ProjectId), id);

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
                SelectModelLoggerWhereProjectIdEqual_QUERY,
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
