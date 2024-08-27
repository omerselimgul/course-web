import { Accordion, AccordionSummary, Grid, List } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Input, WrapperContainer } from "../../Base";
import CourseGrid from "./coursegrid";
import { GridActionsCellItem, GridDeleteIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const Week = ({ id, deleteClicked, no, source, setSource, ...props }) => {
  const [rowSource, setRowSource] = useState([]);

  useEffect(() => {
    setRowSource(source[no]?.data || []);
  }, []);

  useEffect(() => {
    let newSource = [...source];
    newSource[no].data = rowSource;
    setSource([...newSource]);
  }, [rowSource]);

  const handleDeleteClick = (rowId) => {
    let counter = 1;

    let newSource = rowSource.filter((row) => row.id !== rowId);
    setRowSource(
      newSource.map((item) => {
        item.No = counter++;
        return item;
      })
    );
  };

  const columns = [
    { field: "WeekNo", headerName: "Hafta", minWidth: 130 },
    { field: "id", headerName: "Id", minWidth: 130 },
    { field: "No", headerName: "No", width: 50 },
    {
      field: "Issue",
      headerName: "Konu",
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Content",
      headerName: "İçerik",
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Duration",
      headerName: "Süre (s)",
      editable: true,
      width: 80,
      // type: "number",
    },
    {
      field: "Aim",
      headerName: "Amaç",
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Method",
      headerName: "Yöntem",
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Activity",
      headerName: "Etkinlik",
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Educators",
      headerName: "Eğitmen(ler)",
      editable: true,
      flex: 1,
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 50,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const updateRow = (newItem, oldItem) => {
    setRowSource(
      rowSource.map((item) => {
        if (item?.id === oldItem?.id) {
          return newItem;
        }
        return item;
      })
    );
  };
  const headerChange = (value) => {
    let newSource = [...source];
    newSource[no].header = value;
    setSource([...newSource]);
  };

  return (
    <div style={{ width: "100%", margin: "1rem" }}>
      <Accordion xs={10}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Input
            placeholder={`${no + 1}. hafta konu başlığı`}
            onBlur={(value) => headerChange(value)}
            value={source[no]?.header}
          />
          <Grid
            style={{
              margin: "0px 1rem",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DeleteIcon onClick={() => deleteClicked && deleteClicked(id)} />
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CourseGrid
              gridId={id}
              columns={columns}
              dataSource={rowSource}
              setDataSource={setRowSource}
              updateRow={updateRow}
              ColumnNotVisibilityModel={{ WeekNo: false, id: false }}
              loading={rowSource.length === 0}
              disableRowSelectionOnClick
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Week;
