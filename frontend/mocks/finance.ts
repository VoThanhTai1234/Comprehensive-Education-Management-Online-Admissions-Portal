export const MOCK_INVOICES = [
  { 
    id: "INV-202609-001", 
    title: "Học phí và các khoản thu Tháng 9/2026", 
    studentName: "Trần Bình", 
    studentCode: "HS26001",
    class: "10A1",
    issueDate: "15/09/2026",
    dueDate: "05/10/2026",
    status: "UNPAID",
    totalAmount: 4500000,
    items: [
      { name: "Học phí chính khóa", amount: 2500000 },
      { name: "Tiền ăn bán trú", amount: 1200000 },
      { name: "Bảo hiểm y tế (Cả năm)", amount: 800000 }
    ],
    qrCodeString: "vietqr:970422:0123456789:4500000:EduMS INV-202609-001" // Định dạng mô phỏng
  },
  { 
    id: "INV-202608-015", 
    title: "Đồng phục và sách vở đầu năm", 
    studentName: "Trần Bình", 
    studentCode: "HS26001",
    class: "10A1",
    issueDate: "10/08/2026",
    dueDate: "25/08/2026",
    status: "PAID",
    paidDate: "15/08/2026",
    totalAmount: 1250000,
    items: [
      { name: "Đồng phục thể dục (2 bộ)", amount: 500000 },
      { name: "Đồng phục sơ mi (2 áo)", amount: 450000 },
      { name: "SGK và tài liệu học tập", amount: 300000 }
    ],
    qrCodeString: null
  }
];

export const MOCK_RECONCILIATION_STATS = {
  totalExpected: 1800000000,
  totalCollected: 1250000000,
  collectionRate: 69.4,
  unpaidCount: 154,
  paidCount: 346,
};
