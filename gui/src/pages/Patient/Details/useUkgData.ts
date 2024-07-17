import useGetUkgList, { UkgListItem } from "@/queries/useGetUkgList";
import { useState } from "react";
import { TableProps } from "antd";
import { defaultPageSize } from "@/utility/table";

export const useUkgData = (patientId?: string) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

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
