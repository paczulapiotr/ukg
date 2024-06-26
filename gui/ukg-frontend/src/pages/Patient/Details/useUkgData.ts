import useGetUkgList, { UkgListItem } from "@/queries/useGetUkgList";
import { useState } from "react";
import { TableProps } from "antd";

export const useUkgData = (patientId?: string) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const {
    data: { data, total },
    isFetching: isLoading,
  } = useGetUkgList(page, pageSize, patientId);

  const onChange: TableProps<UkgListItem>["onChange"] = (
    pagination,
    _filters,
    _sorter
  ) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  return { data, total, isLoading, onChange, page, pageSize };
};
