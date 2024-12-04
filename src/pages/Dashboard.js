import InquiryManagement from "../components/admin/InquiryManagement";
import MemberManagement from "../components/admin/MemberManagement";
import ReviewManagement from "../components/admin/ReviewManagement";

export default function Dashboard() {
  return (
    <div>
      <h1>관리자 페이지</h1>
      <MemberManagement />
      <ReviewManagement />
      <InquiryManagement />
    </div>
  );
}
