"use client";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { useEffect, useState } from "react";
import Datatable from "../../../components/DataTable";

const generateData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${index}999-0000-000${index}`,
    name: `name ${index}`,
    surName: `surname ${index}`,
    birthDate: `01/02/199${index}`,
  }));
};

const List = () => {
  const [source, setSource] = useState([]);

  useEffect(() => {
    setSource(generateData(55));
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surName",
      key: "surName",
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (row) => (
        <Link href={`list/${row.id}`} className="text-blue-500">
          Detail
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="List" />
      <Datatable source={source} columns={columns} />
    </div>
  );
};

export default List;
