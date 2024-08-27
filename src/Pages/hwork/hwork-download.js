import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../Base";
import { renderCellExpand } from "../../Base/render-expandable-cell/RenderExpandableCell";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";
import { convertDateTimeToDate, isNullOrUndefinedOrEmpty } from "../../Helper/helper";
import { useLoadingSpinner } from "../../Context/LoadingSpinnerContext";

const HworkDownload = () => {
  const { executeGet, executeAsync } = UseApi();
  const [dataSource, setDataSource] = useState([]);
  const [updatedSource, setUpdatedSource] = useState([]);
  const { courseid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { openSpinner, closeSpinner } = useLoadingSpinner();

  useEffect(() => {
    if (!isNullOrUndefinedOrEmpty(courseid)) getData();
  }, [courseid]);

  const getData = () => {
    executeGet({
      url: apiUrls.studentHomeworks + "/allhomework?courseid=" + courseid,
      spinner: true,
    }).then((res) => {
      if (res?.success) {
        const source = res.data;
        const sorted = source.sort((a, b) => {
          return a.homeWorkId - b.homeWorkId;
        });

        setDataSource(
          sorted.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          })
        );
      }
    });
  };

  const saveClick = () => {
    if (updatedSource.length > 0) {
      let payload = [];
      updatedSource?.map((item) => {
        payload.push({
          id: item?.studentHomeworkId,
          score: item?.score,
          userId: item?.userId,
        });
        return item;
      });
      executeAsync({
        url: apiUrls.studentHomeworks + "/updatescores",
        method: "PUT",
        data: payload,
        spinner: true,
      }).then((res) => {
        if (res?.success) {
          enqueueSnackbar("İşlem başarıyla gerçekleşti.", {
            variant: "success",
          });
          getData();
          setUpdatedSource([]);
        }
      });
    }
  };

  const updateList = (newData) => {
    var index = updatedSource.findIndex((item) => item?.studentHomeworkId === newData?.studentHomeworkId);

    if (index !== -1) {
      let newArray = updatedSource.map((obj) => (obj.studentHomeworkId === newData.studentHomeworkId ? newData : obj));
      console.log(newArray);
      setUpdatedSource([...newArray]);
    } else {
      setUpdatedSource([...updatedSource, newData]);
    }
  };

  const columns = [
    {
      field: "homeWorkId",
      headerName: "Ödev numarası",
      minWidth: 130,
      visable: false,
    },
    {
      field: "homeworkHeader",
      headerName: "Ödev",
      minWidth: 250,
      renderCell: renderCellExpand,
    },
    { field: "userId", headerName: "userId", minWidth: 130 },
    {
      field: "sendDate",
      headerName: "Yüklenme tarihi",
      minWidth: 150,
      renderCell: renderCellExpand,
      valueGetter: ({ value }) => {
        return convertDateTimeToDate(value);
      },
    },

    {
      field: "homeWorkFile",
      headerName: "Yüklenen ödev",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <a href={row?.homeWorkFile} target="_blank" rel="noreferrer">
            {row?.homeWorkFile}
          </a>
        );
      },
    },
    {
      field: "score",
      headerName: "score",
      minWidth: 80,
      editable: true,
    },
  ];

  return (
    <>
      <DataGrid
        getRowId={(row) => row.id}
        editMode={"cell"}
        rows={dataSource}
        columns={columns}
        rowHeight={35}
        processRowUpdate={(newVal, oldVal) => {
          updateList(newVal);
        }}
        disableRowSelectionOnClick
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              homeWorkId: false,
            },
          },
        }}
      />
      <Button label={"Kaydet"} onClick={() => saveClick()} />
    </>
  );
};

export default HworkDownload;
