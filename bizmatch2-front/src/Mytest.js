import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 2.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  color: #9ca3af;
`;

const DropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: white;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #6b7280;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownIcon = styled.svg`
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10rem;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  margin-top: 3rem;
  z-index: 10;
`;

const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TableWrapper = styled.div`
  max-height: 405px;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
  font-weight: 700;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
`;

const TableRow = styled.tr`
  border-top: 1px dashed #e5e7eb;
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  text-align: left;
  color: #4b5563;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const RowSelectionAlert = styled.div`
  background-color: #99f6e4;
  color: #0d9488;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  width: 100%;
`;

const RowSelectionText = styled.div`
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Mytest = () => {
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([
    {
      userId: 1,
      firstName: "Cort",
      lastName: "Tosh",
      emailAddress: "ctosh0@github.com",
      gender: "Male",
      phoneNumber: "327-626-5542",
    },
    {
      userId: 2,
      firstName: "Brianne",
      lastName: "Dzeniskevich",
      emailAddress: "bdzeniskevich1@hostgator.com",
      gender: "Female",
      phoneNumber: "144-190-8956",
    },
    {
      userId: 3,
      firstName: "Isadore",
      lastName: "Botler",
      emailAddress: "ibotler2@gmpg.org",
      gender: "Male",
      phoneNumber: "350-937-0792",
    },
    {
      userId: 4,
      firstName: "Janaya",
      lastName: "Klosges",
      emailAddress: "jklosges3@amazon.de",
      gender: "Female",
      phoneNumber: "502-438-7799",
    },
    {
      userId: 5,
      firstName: "Freddi",
      lastName: "Di Claudio",
      emailAddress: "fdiclaudio4@phoca.cz",
      gender: "Female",
      phoneNumber: "265-448-9627",
    },
    {
      userId: 6,
      firstName: "Oliy",
      lastName: "Mairs",
      emailAddress: "omairs5@fda.gov",
      gender: "Female",
      phoneNumber: "221-516-2295",
    },
    {
      userId: 7,
      firstName: "Tabb",
      lastName: "Wiseman",
      emailAddress: "twiseman6@friendfeed.com",
      gender: "Male",
      phoneNumber: "171-817-5020",
    },
    {
      userId: 8,
      firstName: "Joela",
      lastName: "Betteriss",
      emailAddress: "jbetteriss7@msu.edu",
      gender: "Female",
      phoneNumber: "481-100-9345",
    },
    {
      userId: 9,
      firstName: "Alistair",
      lastName: "Vasyagin",
      emailAddress: "avasyagin8@gnu.org",
      gender: "Male",
      phoneNumber: "520-669-8364",
    },
    {
      userId: 10,
      firstName: "Nealon",
      lastName: "Ratray",
      emailAddress: "nratray9@typepad.com",
      gender: "Male",
      phoneNumber: "993-654-9793",
    },
    {
      userId: 11,
      firstName: "Annissa",
      lastName: "Kissick",
      emailAddress: "akissicka@deliciousdays.com",
      gender: "Female",
      phoneNumber: "283-425-2705",
    },
    {
      userId: 12,
      firstName: "Nissie",
      lastName: "Sidnell",
      emailAddress: "nsidnellb@freewebs.com",
      gender: "Female",
      phoneNumber: "754-391-3116",
    },
    {
      userId: 13,
      firstName: "Madalena",
      lastName: "Fouch",
      emailAddress: "mfouchc@mozilla.org",
      gender: "Female",
      phoneNumber: "584-300-9004",
    },
    {
      userId: 14,
      firstName: "Rozina",
      lastName: "Atkins",
      emailAddress: "ratkinsd@japanpost.jp",
      gender: "Female",
      phoneNumber: "792-856-0845",
    },
    {
      userId: 15,
      firstName: "Lorelle",
      lastName: "Sandcroft",
      emailAddress: "lsandcrofte@google.nl",
      gender: "Female",
      phoneNumber: "882-911-7241",
    },
  ]);

  const headings = [
    { key: "userId", value: "User ID" },
    { key: "firstName", value: "Firstname" },
    { key: "lastName", value: "Lastname" },
    { key: "emailAddress", value: "Email" },
    { key: "gender", value: "Gender" },
    { key: "phoneNumber", value: "Phone" },
  ];

  const toggleColumn = (key) => {
    const columns = document.querySelectorAll(`.${key}`);
    columns.forEach((column) => {
      column.classList.toggle("hidden");
    });
  };

  const getRowDetail = (e, id) => {
    const rows = [...selectedRows];
    if (rows.includes(id)) {
      const index = rows.indexOf(id);
      rows.splice(index, 1);
    } else {
      rows.push(id);
    }
    setSelectedRows(rows);
  };

  const selectAllCheckbox = (e) => {
    const columns = document.querySelectorAll(".rowCheckbox");
    const newSelectedRows = [];

    if (e.target.checked) {
      columns.forEach((column) => {
        column.checked = true;
        newSelectedRows.push(parseInt(column.name));
      });
    } else {
      columns.forEach((column) => {
        column.checked = false;
      });
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <Container>
      <Title>Datatable</Title>

      {selectedRows.length > 0 && (
        <RowSelectionAlert>
          <RowSelectionText>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {selectedRows.length} rows are selected
          </RowSelectionText>
        </RowSelectionAlert>
      )}

      <SearchContainer>
        <SearchInputWrapper>
          <SearchInput type="search" placeholder="Search..." />
          <SearchIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </SearchIcon>
        </SearchInputWrapper>

        <DropdownButton onClick={() => setOpen(!open)}>
          Display
          <DropdownIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </DropdownIcon>
        </DropdownButton>
      </SearchContainer>

      {open && (
        <DropdownMenu>
          {headings.map((heading) => (
            <DropdownItem key={heading.key}>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked
                  onClick={() => toggleColumn(heading.key)}
                />
                {heading.value}
              </CheckboxLabel>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <CheckboxLabel>
                  <Checkbox type="checkbox" onClick={selectAllCheckbox} />
                </CheckboxLabel>
              </TableHeader>
              {headings.map((heading) => (
                <TableHeader key={heading.key}>{heading.value}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      className="rowCheckbox"
                      name={user.userId}
                      onClick={(e) => getRowDetail(e, user.userId)}
                    />
                  </CheckboxLabel>
                </TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.emailAddress}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Mytest;
