using System.Collections;

namespace Learn.AppIdentity;

public static class StoreClassExtension
{
    public static T UpdateFrom<T>(this T target, T source)
    {
        return target;
    }

    public static T UpdateFrom<T>(this T target, T source, out bool changes)
    {
        object value;
        var changeCount = 0;
        var classType = typeof(T);

        foreach (var prop in classType.GetProperties())
        {
            var isGeneric = prop.PropertyType.IsGenericType;
            var isList = prop.PropertyType.GetGenericTypeDefinition().Equals(typeof(IList<>));

            if (isGeneric && isList)
            {
                var listType = typeof(List<>).MakeGenericType(
                    prop.PropertyType.GetGenericArguments()[0]
                );
                var sourceList = prop.GetValue(source) as IList;
                if (sourceList != null)
                {
                    prop.SetValue(target, Activator.CreateInstance(listType, sourceList));
                }
            }
            else
            {
                if ((value = prop.GetValue(source)) != null && !value.Equals(prop.GetValue(target)))
                {
                    classType.GetProperty(prop.Name).SetValue(target, value);
                    changeCount++;
                }
            }
        }

        changes = changeCount > 0;
        return target;
    }

    public static T Clone<T>(this T original)
    {
        return Activator.CreateInstance<T>().UpdateFrom(original);
    }
}
