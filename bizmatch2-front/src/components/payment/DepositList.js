import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Tabs = styled.div`
  display: flex;

  button {
    padding: 10px 20px;
    margin-left: 10px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      background: #0070f3;
      color: #fff;
      border-color: #0070f3;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  select,
  button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    background: #f9f9f9;
  }

  .type-icon,
  .where-icon {
    margin-right: 10px;
  }

  .amount {
    font-weight: bold;

    &.negative {
      color: red;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      background: #0070f3;
      color: #fff;
      border-color: #0070f3;
    }
  }
`;

export default function DepositList() {
  const navigate = useNavigate();
  const moveDownpaymentPage = () => {
    navigate("/payment/downpayment");
  };
  const moveDepositPage = () => {
    navigate("/payment/deposit");
  };
  return (
    <>
      <Container>
        <Header>
          <h1>보증금 결제내역</h1>
          <Tabs>
            <button className="active" onClick={moveDepositPage}>
              보증금
            </button>
            <button onClick={moveDownpaymentPage}>계약금</button>
          </Tabs>
        </Header>
        <Filters>
          <select>
            <option>30일 전</option>
            <option>60일 전</option>
            <option>90일 전</option>
          </select>
          <button>필터</button>
        </Filters>
        <Table>
          <thead>
            <tr>
              <th>프로젝트</th>
              <th>수주자</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>프로젝트 이름</td>
              <td>ktds</td>
              <td className="amount negative">결제 금액</td>
            </tr>
          </tbody>
        </Table>
        <Pagination>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </Pagination>
      </Container>
    </>
  );
}
