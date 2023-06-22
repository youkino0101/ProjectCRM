using demo.Debugging;

namespace demo
{
    public class demoConsts
    {
        public const string LocalizationSourceName = "demo";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "4b7b35d7596548f5834d3df87572fb14";
    }
}
