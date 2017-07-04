using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Classlink.Dashboard.Web.Startup))]
namespace Classlink.Dashboard.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
