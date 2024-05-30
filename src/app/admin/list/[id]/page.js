"use client";
import PageTitle from "@/components/PageTitle";

const Detail = ({ params }) => {
  return (
    <div>
      <PageTitle title="Detail" backTo="/admin/list" />
      Detail of: {params.id}
    </div>
  );
};

export default Detail;
