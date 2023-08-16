using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo.Demo
{
    public class ProductAppService : ApplicationService
    {
        private readonly IRepository<Project.Project, long> repository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        public ProductAppService(IRepository<Project.Project, long> repository, IUnitOfWorkManager unitOfWorkManager)
        {
            this.repository = repository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task CreateProduct(CreateProjectDto input)
        {
            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                try
                {

                    // Perform your logic to create the product
                    var newProduct = ObjectMapper.Map<Project.Project>(input);
                    await repository.InsertAsync(newProduct);
                    new Exception();
                    // If everything is successful, complete the unit of work
                    await unitOfWork.CompleteAsync();
                }
                catch (Exception ex)
                {
                    // If an exception occurs, the unit of work will be automatically rolled back
                    // You can log the exception or perform any other necessary actions
                    Logger.Error(ex.Message);
                }
            }
        }
    }
}
