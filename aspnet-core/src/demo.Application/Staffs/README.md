FE: Chức năng nhân viên: thêm - lấy tất cả các trường trừ StaffStatus
					 sửa - disable StaffCode, Email
					 tìm kiếm - StaffName, Email, PhoneNumber, Address -- lọc - StaffStatus

Tìm hiểu cơ chế rollback trong abp
 public interface IUnitOfWork
    {
        public IRepository<Staff, long> StaffRepository { get; }

        public void RollBack();

    }

    public class UnitOfWork
    {
        public IRepository<Staff, long> StaffRepository { get; }

        public UnitOfWork(IRepository<Staff, long> staffRepository)
        {
            this.StaffRepository = staffRepository;

        }
    }
