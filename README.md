
Thực thể "Kho" (Warehouse):

Mã kho (warehouse_id)
Tên kho (warehouse_name)
Địa chỉ kho (warehouse_address)
Diện tích kho (warehouse_area)
Ngày thành lập (founding_date)
Số điện thoại liên hệ (warehouse_phone)
Email liên hệ (warehouse_email)
...
Thực thể "Khoảng trống lưu trữ" (Storage Location):

Mã khoảng trống (location_id)
Vị trí khoảng trống (location_name)
Sức chứa (capacity)
Số lượng hàng tồn (inventory_count)
Khoảng cách từ cửa kho (distance_from_entrance)
...
Thực thể "Hàng tồn kho" (Inventory):

Mã hàng tồn kho (inventory_id)
Mã hàng hóa (product_id)
Số lô (lot_number)
Số lượng tồn (quantity_on_hand)
Ngày sản xuất (manufacture_date)
Hạn sử dụng (expiration_date)
...
Thực thể "Phiếu nhập kho" (Inbound Shipment):

Mã phiếu nhập (inbound_shipment_id)
Ngày nhập kho (arrival_date)
Mã đơn hàng (order_id)
Tổng số lượng nhập (total_quantity)
Nguồn gốc hàng hóa (source)
...
Thực thể "Phiếu xuất kho" (Outbound Shipment):

Mã phiếu xuất (outbound_shipment_id)
Ngày xuất kho (departure_date)
Mã đơn hàng (order_id)
Tổng số lượng xuất (total_quantity)
Đơn vị nhận hàng (receiver)
...
Thực thể "Đơn vị đo lường" (Unit of Measure):

Mã đơn vị (unit_id)
Tên đơn vị (unit_name)
Miêu tả (description)
...
Thực thể "Vận chuyển" (Transportation):

Mã vận đơn (shipment_id)
Hãng vận chuyển (carrier)
Điểm xuất phát (origin)
Điểm đến (destination)
Ngày vận chuyển (shipment_date)
...
Thực thể "Bưu kiện" (Parcel):

Mã bưu kiện (parcel_id)
Số lượng hàng (quantity)
Trọng lượng (weight)
Kích thước (dimensions)
Trạng thái vận chuyển (status)
...
Thực thể "Lệnh lấy hàng" (Picking Order):

Mã lệnh lấy hàng (picking_order_id)
Mã đơn hàng (order_id)
Ngày lấy hàng (picking_date)
...
Thực thể "Lệnh đặt hàng" (Purchase Order):

Mã lệnh đặt hàng (purchase_order_id)
Mã nhà cung cấp (vendor_id)
Ngày đặt hàng (order_date)
...
Thực thể "Lịch trình vận chuyển" (Delivery Schedule):
Mã lịch trình (schedule_id)
Thời gian vận chuyển (delivery_time)
Tần suất vận chuyển (frequency)
...
Thực thể "Khách hàng" (Customer):
Mã khách hàng (customer_id)
Tên khách hàng (customer_name)
Địa chỉ (customer_address)
Số điện thoại (customer_phone)
Email (customer_email)
...
Thực thể "Nhà cung cấp" (Vendor):
Mã nhà cung cấp (vendor_id)
Tên nhà cung cấp (vendor_name)
Địa chỉ (vendor_address)
Số điện thoại (vendor_phone)
Email (vendor_email)
...
Thực thể "Nhóm kho" (Warehouse Group):
Mã nhóm kho (group_id)
Tên nhóm kho (group_name)
Miêu tả (description)
...
Thực thể "Tham số hệ thống" (System Parameter):
Mã tham số (parameter_id)
Tên tham số (parameter_name)
Giá trị (value)
...
Thực thể "Hướng dẫn và quy trình" (Instruction and Procedure):
Mã hướng dẫn (instruction_id)
Tên hướng dẫn (instruction_name)
Mô tả (description)
...
Thực thể "Báo cáo" (Report):
Mã báo cáo (report_id)
Tên báo cáo (report_name)
Miêu tả (description)
Ngày tạo báo cáo (creation_date)
...


Mối quan hệ giữa "Kho" và "Khoảng trống lưu trữ" (One-to-Many):

Mỗi "Kho" có nhiều "Khoảng trống lưu trữ" (vì một kho có nhiều vị trí lưu trữ).
Mối quan hệ giữa "Khoảng trống lưu trữ" và "Hàng tồn kho" (One-to-Many):

Mỗi "Khoảng trống lưu trữ" có nhiều "Hàng tồn kho" (vì nhiều hàng hóa có thể được lưu trữ trong một vị trí lưu trữ).
Mối quan hệ giữa "Hàng tồn kho" và "Phiếu nhập kho" (One-to-Many):

Mỗi "Phiếu nhập kho" liên kết với nhiều "Hàng tồn kho" (vì một phiếu nhập kho có thể chứa nhiều hàng hóa).
Mối quan hệ giữa "Hàng tồn kho" và "Phiếu xuất kho" (One-to-Many):

Mỗi "Phiếu xuất kho" liên kết với nhiều "Hàng tồn kho" (vì một phiếu xuất kho có thể xuất nhiều hàng hóa).
Mối quan hệ giữa "Hàng tồn kho" và "Đơn vị đo lường" (Many-to-One):

Mỗi "Hàng tồn kho" được đo lường bằng một "Đơn vị đo lường" (vì mỗi hàng hóa có một đơn vị đo lường riêng).
Mối quan hệ giữa "Phiếu nhập kho" và "Nhà cung cấp" (Many-to-One):

Mỗi "Phiếu nhập kho" có thể được liên kết với một "Nhà cung cấp" (vì mỗi phiếu nhập kho thường là từ một nhà cung cấp).
Mối quan hệ giữa "Phiếu xuất kho" và "Khách hàng" (Many-to-One):

Mỗi "Phiếu xuất kho" có thể được liên kết với một "Khách hàng" (vì mỗi phiếu xuất kho thường là để đáp ứng đơn hàng của khách hàng).
Mối quan hệ giữa "Lệnh lấy hàng" và "Phiếu xuất kho" (One-to-One hoặc One-to-Many):

Mỗi "Lệnh lấy hàng" liên kết với một hoặc nhiều "Phiếu xuất kho" (tùy vào mỗi lệnh lấy hàng có thể xuất cho một hoặc nhiều đơn hàng).
Mối quan hệ giữa "Lệnh đặt hàng" và "Nhà cung cấp" (Many-to-One):

Mỗi "Lệnh đặt hàng" có thể được liên kết với một "Nhà cung cấp" (vì mỗi lệnh đặt hàng thường là từ một nhà cung cấp).
Mối quan hệ giữa "Lịch trình vận chuyển" và "Vận chuyển" (One-to-Many):

Mỗi "Lịch trình vận chuyển" liên kết với nhiều "Vận chuyển" (vì một lịch trình vận chuyển có thể bao gồm nhiều lần vận chuyển).
Mối quan hệ giữa "Vận chuyển" và "Bưu kiện" (One-to-Many):
Mỗi "Vận chuyển" liên kết với nhiều "Bưu kiện" (vì mỗi lần vận chuyển có thể chứa nhiều bưu kiện).
Mối quan hệ giữa "Đơn hàng" và "Khách hàng" (Many-to-One):
Mỗi "Đơn hàng" được đặt bởi một "Khách hàng" (vì mỗi đơn hàng là từ một khách hàng).