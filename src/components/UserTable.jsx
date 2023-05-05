import { Button, Flex, Kbd, Loader, ScrollArea, Table } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserTable = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  //fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/get");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      const timerId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchUsers();
    // return clearTimeout(timerId);
  }, []);

  const rows = users.map((user) => (
    <tr key={user.name}>
      <td>{user.name}</td>
      <td>
        {user.age}Y/ {user.sex === "Male" ? "M" : "F"}
      </td>
      <td>{user.mobile || "--NA--"}</td>
      <td>{user.address || "--NA--"}</td>
      <td>{user.idType || "--NA--"}</td>
      <td>{user.govtId || "--NA--"}</td>
      <td>{user.gaurdian || "--NA--"}</td>
      <td>{user.Nationality || "--NA--"}</td>
    </tr>
  ));
  if (loading) {
    return (
      <Flex
        justify={"center"}
        align={"center"}
        w={"90vw"}
        h={"90vh"}>
        <Loader
          color='grape'
          variant='bars'
          size={"xl"}
        />
      </Flex>
    );
  }

  return (
    <Table
      highlightOnHover
      // withBorder
      withColumnBorders>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age/Sex</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>ID Type</th>
          <th>Govt ID</th>
          <th>Gaurdian Details</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      <Button
        compact
        color='grape'
        onClick={onClose}
        rightIcon={<Kbd>Esc</Kbd>}
        leftIcon={<IconX />}
        variant='subtle'
        p={0}
        sx={{
          position: "absolute",
          top: 2,
          left: 0,
          "&:hover": {
            color: "red",
            backgroundColor: "rgba(252, 3, 3,0.01)",
            textTransform: "uppercase",
          },
        }}>
        Close Table
      </Button>
    </Table>
  );
};

export default UserTable;
