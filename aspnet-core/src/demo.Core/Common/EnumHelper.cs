using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace demo.Common
{
    public static class EnumHelper
    {
        public static List<SelectListItem> GetSelectListFromEnum<TEnum>() where TEnum : Enum
        {
            return Enum.GetValues(typeof(TEnum))
                .Cast<TEnum>()
                .Select(value => new SelectListItem
                {
                    Value = value.ToString(),
                    Text = GetDisplayName(value)
                })
                .ToList();
        }

        public static string GetDisplayName<TEnum>(TEnum enumValue) where TEnum : Enum
        {
            var memberInfo = typeof(TEnum).GetMember(enumValue.ToString()).FirstOrDefault();
            if (memberInfo != null)
            {
                var displayAttribute = memberInfo.GetCustomAttribute<DisplayAttribute>();
                if (displayAttribute != null)
                {
                    return displayAttribute.Name;
                }
            }
            return enumValue.ToString();
        }

        public static string GetDescription<T>(this T enumValue) where T : struct, IConvertible
        {
            if (!typeof(T).IsEnum)
                return null;

            var description = enumValue.ToString();
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            if (fieldInfo != null)
            {
                var attrs = fieldInfo.GetCustomAttributes(typeof(DisplayAttribute), true);
                if (attrs != null && attrs.Length > 0)
                {
                    description = ((DisplayAttribute)attrs[0]).Name;
                }
            }

            return description;
        }
    }
}
