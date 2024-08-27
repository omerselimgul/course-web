import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { renderCellExpand } from "../../Base/render-expandable-cell/RenderExpandableCell";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { WrapperContainer } from "../../Base";

const CourseProgram = ({ source, ...props }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (source) {
      setDataSource(
        source.courseDetails.map((item) => {
          item.Id = item.id;
          return item;
        })
      );
    }
  }, [source]);

  const columns = [
    { field: "weekNo", headerName: "Hafta", minWidth: 130 },
    { field: "id", headerName: "Id", minWidth: 130, hide: true },
    {
      field: "issue",
      headerName: "Konu",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
    },
    {
      field: "content",
      headerName: "İçerik",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
    },
    {
      field: "duration",
      headerName: "Süre (s)",
      width: 80,
      renderCell: renderCellExpand,

      // type: "number",
    },
    {
      field: "aim",
      headerName: "Amaç",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
    },
    {
      field: "method",
      headerName: "Yöntem",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
    },
    {
      field: "activity",
      headerName: "Etkinlik",
      minWidth: 250,
      flex: 1,
      renderCell: renderCellExpand,
    },

    {
      field: "educators",
      headerName: "Eğitmen(ler)",
      flex: 1,
      minWidth: 250,
      renderCell: renderCellExpand,
    },
  ];

  return (
    <>
      {source?.courseDocument && (
        <WrapperContainer>
          <span>Kurs dökümanı : </span>
          <a href={source?.courseDocument} target="_blank" rel="noreferrer">
            <FindInPageIcon />
          </a>
        </WrapperContainer>
      )}
      <DataGrid
        getRowId={(row) => row.id}
        rows={dataSource}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rowHeight={35}
      />
    </>
  );
};

export default CourseProgram;
