import { DataGrid } from "@mui/x-data-grid";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { renderCellExpand } from "../../Base/render-expandable-cell/RenderExpandableCell";
import { Box, Stack } from "@mui/material";
import { Button } from "../../Base";

const Type = {
  Day: 1,
  Week: 2,
};
const CourseGrid = forwardRef(({ source, ...props }, componentRef) => {
  const [dataSource, setDataSource] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useImperativeHandle(componentRef, () => ({
    value: dataSource,
  }));

  useEffect(() => {
    if (source) {
      let counter = 1;
      setDataSource(
        source.map((item) => {
          item.rowId = counter++;
          return item;
        })
      );
    }
  }, [source]);

  const columns = [
    { field: "weekNo", headerName: "Hafta", minWidth: 130, editable: true },
    { field: "rowId", headerName: "Id", minWidth: 130 },
    {
      field: "issue",
      headerName: "Konu",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
      editable: true,
    },
    {
      field: "content",
      headerName: "İçerik",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Süre (s)",
      width: 80,
      renderCell: renderCellExpand,
      editable: true,

      // type: "number",
    },
    {
      field: "aim",
      headerName: "Amaç",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
      editable: true,
    },
    {
      field: "method",
      headerName: "Yöntem",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
      editable: true,
    },
    {
      field: "activity",
      headerName: "Etkinlik",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
      editable: true,
    },

    {
      field: "educators",
      headerName: "Eğitmen(ler)",
      flex: 1,
      minWidth: 250,
      renderCell: renderCellExpand,
      editable: true,
    },
  ];

  const cellEditHandler = (newValue) => {
    const updatedSource = dataSource.map((item) => {
      if (item.rowId === newValue.rowId) {
        return newValue;
      }
      return item;
    });
    setDataSource(updatedSource);
  };

  const newRow = (type) => {
    let weekno = 1;
    if (dataSource.length > 0) {
      weekno =
        type === Type.Week
          ? Math.max(...dataSource.map((obj) => obj.weekNo)) + 1
          : Math.max(...dataSource.map((obj) => obj.weekNo));
    }

    const newOBject = {
      rowId: dataSource.length + 1,
      weekNo: weekno,

      field: 2,
      issue: "test",
      content: "sadas",
      duration: "213",
      aim: "test",
      method: "yok",
      activity: "er",
      educators: "selim",
    };
    return newOBject;
  };

  const handleAddRow = (type) => {
    const newSource = [...dataSource, newRow(type)];
    let counter = 1;

    setDataSource(
      newSource.map((item) => {
        item.rowId = counter++;
        return item;
      })
    );
  };

  const handleDeleteRow = () => {
    if (dataSource.length === 0) {
      return;
    }

    const newArray = dataSource.filter(
      (x) => rowSelectionModel.findIndex((item) => item === x.rowId) === -1
    );

    setDataSource([...newArray]);
  };

  return (
    <Box sx={{ width: "100%" }} xs={12}>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          onClick={() => handleAddRow(Type.Week)}
          label={"Hafta Ekle"}
        />
        <Button
          size="small"
          onClick={() => handleAddRow(Type.Day)}
          label={"Gün  Ekle"}
        />
        <Button
          size="small"
          onClick={() => handleDeleteRow()}
          label={"Seçili  satırları sil"}
        />
      </Stack>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGrid
          getRowId={(row) => row.rowId}
          editMode={"cell"}
          rows={dataSource}
          columns={columns}
          rowHeight={35}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          checkboxSelection
          processRowUpdate={(newVal, oldVal) => {
            cellEditHandler(newVal, oldVal);
            return newVal;
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                rowId: false,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
});

export default CourseGrid;
