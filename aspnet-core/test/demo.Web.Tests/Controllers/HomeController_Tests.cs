using System.Threading.Tasks;
using demo.Models.TokenAuth;
using demo.Web.Controllers;
using Shouldly;
using Xunit;

namespace demo.Web.Tests.Controllers
{
    public class HomeController_Tests: demoWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}