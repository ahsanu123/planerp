using TypeGen.Core.TypeAnnotations;

namespace Planerp.Model;

/*
 * Create Project Properties like Notion, included:
 *  Text
 *  Number
 *  Select
 *  Multi Select
 *  Status
 *  Date
 *  Person
 *  File And Media
 *  Checkbox
 *  Url
 *  Email
 *  Phone
 *  Formula
 *  Relation
 *  Rollup
 *  Created Time
 *  Last Edited Time
 *  Last Edited By
 *  Button
 *  Id
 * */
public enum ProjectPropertiesType
{
    Text,
    Number,
    Select,
    MultiSelect,
    Status,
    Date,
    Person,
    FileAndMedia,
    Checkbox,
    Url,
    Email,
    Phone,
    Formula,
    Relation,
    Rollup,
    CreatedTime,
    LastEditedTime,
    LastEditedBy,
    Button,
    Id,
}

[ExportTsInterface(OutputDir = Constant.TypeGenBaseDirectory)]
public class ProjectProperties : BaseModel
{
    public string Name { get; set; }
    public ProjectPropertiesType PropertiesType { get; set; }
}
