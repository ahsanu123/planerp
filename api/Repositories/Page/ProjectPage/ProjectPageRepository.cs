using Planerp.Extensions;
using Planerp.Model;
using Planerp.Services;
using SqlKata;
using static Planerp.Extensions.UtilityExtension;

namespace Planerp.Repository;

public interface IProjectPageRepository
{
    public Task<ProjectPageDetailInformation> GetProjectPageDetail(int projectId);
    public Task AddUsedComponent(UsedComponent usedComponent);
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

    public async Task AddUsedComponent(UsedComponent usedComponent)
    {
        var CheckIfUsedComponentAlreadyAdded_QUERY = new Query(nameof(UsedComponent))
            .SelectAllClassProperties(new[] { typeof(UsedComponent) })
            .Where(
                new { ProjectId = usedComponent.ProjectId, ComponentId = usedComponent.ComponentId }
            );

        var UpdateUsedComponent_Query = new Query(nameof(UsedComponent))
            .AsUpdate(new { Count = usedComponent.Count, TotalPrice = usedComponent.TotalPrice })
            .Where(
                FullNameof(nameof(UsedComponent)),
                new { ProjectId = usedComponent.ProjectId, ComponentId = usedComponent.ComponentId }
            );

        var AddUsedComponent_QUERY = new Query(nameof(UsedComponent)).AsInsert(
            new UsedComponent
            {
                ProjectId = usedComponent.ProjectId,
                ComponentId = usedComponent.ComponentId,
                Count = usedComponent.Count,
                TotalPrice = usedComponent.TotalPrice,
            }
        );

        using (var conn = _connection.CreateConnection())
        {
            var isUsedComponentExists = await conn.QuerySingleSqlKataAsync<UsedComponent>(
                CheckIfUsedComponentAlreadyAdded_QUERY,
                true
            );

            if (isUsedComponentExists == null)
            {
                await conn.InsertToDatabase(usedComponent);
            }
            else
            {
                await conn.ExecuteSqlKataAsync(UpdateUsedComponent_Query);
            }
        }
    }

    public async Task<ProjectPageDetailInformation> GetProjectPageDetail(int projectId)
    {
        var SelectProject_QUERY = new Query(nameof(Project));

        var SelectProjectWhereProjectIdEqual_QUERY = SelectProject_QUERY
            .Clone()
            .Where(FullNameof(nameof(Project.Id)), projectId)
            .SelectAllClassProperties(new[] { typeof(Project) });

        var WithProjectLoggerList_CTE = new Query(nameof(ArrayDatabaseRelation))
            .Select(nameof(ArrayDatabaseRelation.LoggerModelId))
            .Where(nameof(ArrayDatabaseRelation.ProjectId), projectId);

        var SelectArrayLoggerWhereProjectLoggerIdEqual_QUERY = new Query(nameof(LoggerModel))
            .WithAutoAlias(WithProjectLoggerList_CTE)
            .Join(
                nameof(WithProjectLoggerList_CTE),
                nameof(ArrayDatabaseRelation.LoggerModelId),
                FullNameof(nameof(LoggerModel.Id))
            )
            .SelectAllClassProperties(new[] { typeof(LoggerModel) });

        var WithProjectComponentList_CTE = new Query(nameof(ArrayDatabaseRelation))
            .Select(nameof(ArrayDatabaseRelation.ComponentId))
            .Where(nameof(ArrayDatabaseRelation.ProjectId), projectId);

        var SelectArrayComponentWithCountWhereProjectComponentIdEqual_QUERY = new Query(
            nameof(Component)
        )
            .WithAutoAlias(WithProjectComponentList_CTE)
            .SelectAllClassProperties(new[] { typeof(Component), typeof(UsedComponent) })
            .Join(
                nameof(WithProjectComponentList_CTE),
                nameof(ArrayDatabaseRelation.ComponentId),
                FullNameof(nameof(Component.Id))
            )
            .Join(
                nameof(UsedComponent),
                FullNameof(nameof(UsedComponent.ComponentId)),
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

            var resultComponent = await conn.QuerySqlKataAsync<ComponentWithCount>(
                SelectArrayComponentWithCountWhereProjectComponentIdEqual_QUERY,
                true
            );

            var projectDetails = new ProjectPageDetailInformation
            {
                ListLog = resultLogger,
                Project = resultProject,
                ListComponentWithCount = resultComponent,
            };

            return projectDetails;
        }
    }
}
